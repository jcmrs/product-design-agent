#!/usr/bin/env -S deno run --allow-read

/**
 * Five Cornerstones Validator
 *
 * Automated checks for Sophie's core principles:
 * 1. Configurability - No hardcoded paths/values
 * 2. Modularity - Low coupling, single responsibility
 * 3. Extensibility - Easy to add features without refactoring
 * 4. Integration - Clean external tool integration
 * 5. Automation - Minimal manual steps
 *
 * Usage: deno run --allow-read .claude/tools/validate-cornerstones.ts [path]
 * Exit codes: 0 = pass, 1 = violations found
 */

interface Violation {
  cornerstone: string;
  severity: "error" | "warning";
  file: string;
  line: number;
  message: string;
  suggestion: string;
}

const violations: Violation[] = [];

// ============================================================================
// Validation Rules
// ============================================================================

/**
 * Cornerstone 1: Configurability
 * Check for hardcoded paths, URLs, API keys, magic numbers
 */
async function checkConfigurability(filePath: string, content: string): Promise<void> {
  const lines = content.split("\n");

  lines.forEach((line, index) => {
    const lineNum = index + 1;

    // Check for hardcoded absolute paths (but allow in tests/prototypes)
    if (!filePath.includes("test") && !filePath.includes("prototype")) {
      const absolutePathRegex = /["'](\/[a-zA-Z0-9_\-./]+)["']/g;
      const matches = line.match(absolutePathRegex);

      if (matches) {
        matches.forEach((match) => {
          // Exclude common non-path strings
          if (
            !match.includes("://") && // URLs are ok
            !match.includes("\\x") && // ANSI codes are ok
            match.length > 5 // Very short paths unlikely to be real
          ) {
            violations.push({
              cornerstone: "Configurability",
              severity: "error",
              file: filePath,
              line: lineNum,
              message: `Hardcoded absolute path: ${match}`,
              suggestion: "Use CONFIG object with environment variable fallback, or relative path",
            });
          }
        });
      }
    }

    // Check for hardcoded URLs (should be in config)
    const urlRegex = /(https?:\/\/[^\s"']+)/g;
    if (line.match(urlRegex) && !line.includes("example.com") && !filePath.includes(".md")) {
      violations.push({
        cornerstone: "Configurability",
        severity: "warning",
        file: filePath,
        line: lineNum,
        message: `Hardcoded URL in code: ${line.trim()}`,
        suggestion: "Move URLs to configuration file",
      });
    }

    // Check for potential API keys (common patterns)
    const apiKeyPatterns = [
      /api[_-]?key\s*=\s*["'][^"']+["']/i,
      /token\s*=\s*["'][^"']+["']/i,
      /secret\s*=\s*["'][^"']+["']/i,
    ];

    apiKeyPatterns.forEach((pattern) => {
      if (line.match(pattern)) {
        violations.push({
          cornerstone: "Configurability",
          severity: "error",
          file: filePath,
          line: lineNum,
          message: "Potential hardcoded API key or secret",
          suggestion: "Use environment variables via Deno.env.get()",
        });
      }
    });

    // Check for magic numbers (numbers without explanation)
    // Skip lines with common non-magic numbers (0, 1, 2, etc.)
    const magicNumberRegex = /(?<!\d)(\d{3,})(?!\d)/g;
    if (line.match(magicNumberRegex) && !line.includes("//") && !line.includes("*")) {
      const numbers = line.match(magicNumberRegex);
      if (numbers && numbers.some(n => parseInt(n) > 100)) {
        violations.push({
          cornerstone: "Configurability",
          severity: "warning",
          file: filePath,
          line: lineNum,
          message: `Possible magic number: ${numbers?.join(", ")}`,
          suggestion: "Extract to named constant with explanation",
        });
      }
    }
  });
}

/**
 * Cornerstone 2: Modularity
 * Check for function length, import count, coupling indicators
 */
async function checkModularity(filePath: string, content: string): Promise<void> {
  const lines = content.split("\n");

  // Check function length (functions > 100 lines likely doing too much)
  let inFunction = false;
  let functionStartLine = 0;
  let functionName = "";
  let braceCount = 0;

  lines.forEach((line, index) => {
    const lineNum = index + 1;

    // Simple function detection (not perfect, but good enough)
    const functionMatch = line.match(/(?:function|async function)\s+(\w+)/);
    if (functionMatch && !inFunction) {
      inFunction = true;
      functionStartLine = lineNum;
      functionName = functionMatch[1];
      braceCount = 0;
    }

    if (inFunction) {
      braceCount += (line.match(/{/g) || []).length;
      braceCount -= (line.match(/}/g) || []).length;

      if (braceCount === 0 && line.includes("}")) {
        const functionLength = lineNum - functionStartLine;
        if (functionLength > 100) {
          violations.push({
            cornerstone: "Modularity",
            severity: "warning",
            file: filePath,
            line: functionStartLine,
            message: `Function '${functionName}' is ${functionLength} lines long`,
            suggestion: "Break into smaller, single-purpose functions",
          });
        }
        inFunction = false;
      }
    }

    // Check for too many imports (> 20 suggests tight coupling)
    if (line.includes("import {") && !filePath.includes("prototype")) {
      const importMatch = line.match(/import\s+{([^}]+)}/);
      if (importMatch) {
        const imports = importMatch[1].split(",").length;
        if (imports > 10) {
          violations.push({
            cornerstone: "Modularity",
            severity: "warning",
            file: filePath,
            line: lineNum,
            message: `Importing ${imports} items from single module`,
            suggestion: "Consider if this file has too many responsibilities",
          });
        }
      }
    }
  });
}

/**
 * Cornerstone 3: Extensibility
 * Check for hardcoded provider names, switch statements that could be maps, etc.
 */
async function checkExtensibility(filePath: string, content: string): Promise<void> {
  const lines = content.split("\n");

  lines.forEach((line, index) => {
    const lineNum = index + 1;

    // Check for hardcoded provider names (should use abstraction)
    const providerNames = ["claude", "gemini", "openai", "anthropic"];
    providerNames.forEach((provider) => {
      if (
        line.toLowerCase().includes(`"${provider}"`) ||
        line.toLowerCase().includes(`'${provider}'`)
      ) {
        if (!line.includes("//") && !filePath.includes("prototype")) {
          violations.push({
            cornerstone: "Extensibility",
            severity: "warning",
            file: filePath,
            line: lineNum,
            message: `Hardcoded provider name: '${provider}'`,
            suggestion: "Use provider abstraction interface instead",
          });
        }
      }
    });

    // Check for large switch statements (could use strategy pattern)
    if (line.includes("switch") && !filePath.includes("prototype")) {
      // Count case statements in this switch
      let caseCount = 0;
      for (let i = index; i < Math.min(index + 50, lines.length); i++) {
        if (lines[i].includes("case ")) caseCount++;
      }

      if (caseCount > 5) {
        violations.push({
          cornerstone: "Extensibility",
          severity: "warning",
          file: filePath,
          line: lineNum,
          message: `Large switch statement with ${caseCount} cases`,
          suggestion: "Consider using strategy pattern or map of functions",
        });
      }
    }
  });
}

/**
 * Cornerstone 4: Integration
 * Check for subprocess calls without error handling, no timeouts, etc.
 */
async function checkIntegration(filePath: string, content: string): Promise<void> {
  const lines = content.split("\n");

  lines.forEach((line, index) => {
    const lineNum = index + 1;

    // Check for subprocess calls
    if (line.includes("Deno.Command") || line.includes("exec(")) {
      // Look ahead to see if there's error handling
      const nextLines = lines.slice(index, index + 10).join("\n");

      if (!nextLines.includes("try") && !nextLines.includes("catch")) {
        violations.push({
          cornerstone: "Integration",
          severity: "error",
          file: filePath,
          line: lineNum,
          message: "Subprocess call without try/catch error handling",
          suggestion: "Wrap external calls in try/catch with graceful degradation",
        });
      }

      if (!nextLines.includes("timeout") && !filePath.includes("prototype")) {
        violations.push({
          cornerstone: "Integration",
          severity: "warning",
          file: filePath,
          line: lineNum,
          message: "Subprocess call without timeout",
          suggestion: "Add timeout to prevent hanging on unresponsive external tools",
        });
      }
    }

    // Check for fetch without error handling
    if (line.includes("fetch(") && !line.includes("//")) {
      const nextLines = lines.slice(index, index + 5).join("\n");
      if (!nextLines.includes("catch")) {
        violations.push({
          cornerstone: "Integration",
          severity: "warning",
          file: filePath,
          line: lineNum,
          message: "Network call without error handling",
          suggestion: "Handle network errors gracefully (timeout, retry, fallback)",
        });
      }
    }
  });
}

/**
 * Cornerstone 5: Automation
 * Check for TODOs without issues, manual steps in comments, etc.
 */
async function checkAutomation(filePath: string, content: string): Promise<void> {
  const lines = content.split("\n");

  lines.forEach((line, index) => {
    const lineNum = index + 1;

    // Check for TODOs without issue references
    if (line.includes("TODO") && !line.includes("#") && !line.includes("http")) {
      violations.push({
        cornerstone: "Automation",
        severity: "warning",
        file: filePath,
        line: lineNum,
        message: "TODO without issue reference",
        suggestion: "Create GitHub issue and reference it: // TODO(#123): ...",
      });
    }

    // Check for "manual" or "manually" in comments (indicates automation gap)
    if (
      (line.includes("manual") || line.includes("manually")) &&
      (line.includes("//") || line.includes("*"))
    ) {
      violations.push({
        cornerstone: "Automation",
        severity: "warning",
        file: filePath,
        line: lineNum,
        message: "Comment mentions manual step",
        suggestion: "Consider if this can be automated",
      });
    }
  });
}

// ============================================================================
// File Processing
// ============================================================================

async function validateFile(filePath: string): Promise<void> {
  try {
    const content = await Deno.readTextFile(filePath);

    // Run all validators
    await checkConfigurability(filePath, content);
    await checkModularity(filePath, content);
    await checkExtensibility(filePath, content);
    await checkIntegration(filePath, content);
    await checkAutomation(filePath, content);
  } catch (error) {
    console.error(`Failed to read ${filePath}:`, error);
  }
}

async function* walkDirectory(dir: string): AsyncIterableIterator<string> {
  for await (const entry of Deno.readDir(dir)) {
    const path = `${dir}/${entry.name}`;

    // Skip common non-source directories
    if (
      entry.name.startsWith(".") ||
      entry.name === "node_modules" ||
      entry.name === "dist" ||
      entry.name === "build"
    ) {
      continue;
    }

    if (entry.isDirectory) {
      yield* walkDirectory(path);
    } else if (entry.isFile && (path.endsWith(".ts") || path.endsWith(".js") || path.endsWith(".go"))) {
      yield path;
    }
  }
}

// ============================================================================
// Main
// ============================================================================

async function main() {
  const args = Deno.args;
  const targetPath = args[0] || ".";

  console.log("🔍 Five Cornerstones Validator");
  console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n");
  console.log(`Scanning: ${targetPath}\n`);

  // Check if path exists and is directory or file
  const stat = await Deno.stat(targetPath);

  if (stat.isDirectory) {
    for await (const file of walkDirectory(targetPath)) {
      await validateFile(file);
    }
  } else if (stat.isFile) {
    await validateFile(targetPath);
  }

  // Report results
  console.log("\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
  console.log("📊 Validation Results\n");

  if (violations.length === 0) {
    console.log("✅ No violations found! Five Cornerstones validated.\n");
    Deno.exit(0);
  }

  // Group by cornerstone
  const grouped = violations.reduce((acc, v) => {
    if (!acc[v.cornerstone]) acc[v.cornerstone] = [];
    acc[v.cornerstone].push(v);
    return acc;
  }, {} as Record<string, Violation[]>);

  let errorCount = 0;
  let warningCount = 0;

  Object.entries(grouped).forEach(([cornerstone, viols]) => {
    console.log(`\n🔸 ${cornerstone} (${viols.length} issues)`);
    console.log("─".repeat(50));

    viols.forEach((v) => {
      const icon = v.severity === "error" ? "❌" : "⚠️ ";
      if (v.severity === "error") errorCount++;
      else warningCount++;

      console.log(`\n${icon} ${v.file}:${v.line}`);
      console.log(`   ${v.message}`);
      console.log(`   💡 ${v.suggestion}`);
    });
  });

  console.log("\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
  console.log(`\n📈 Summary:`);
  console.log(`   Errors:   ${errorCount}`);
  console.log(`   Warnings: ${warningCount}`);
  console.log(`   Total:    ${violations.length}\n`);

  if (errorCount > 0) {
    console.log("❌ Validation failed. Fix errors before committing.\n");
    Deno.exit(1);
  } else {
    console.log("⚠️  Warnings found. Consider addressing them.\n");
    Deno.exit(0);
  }
}

if (import.meta.main) {
  main();
}
