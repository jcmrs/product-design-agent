# Sophie Validation Tools

> **Purpose:** Automated enforcement of Five Cornerstones and development principles

---

## Available Tools

### 1. Five Cornerstones Validator

**File:** `validate-cornerstones.ts`

**Purpose:** Automated checks for Sophie's core principles

**Usage:**
```bash
# Validate entire src/ directory
deno run --allow-read .claude/tools/validate-cornerstones.ts src/

# Validate specific file
deno run --allow-read .claude/tools/validate-cornerstones.ts src/main.ts

# Or use executable directly (if chmod +x)
./.claude/tools/validate-cornerstones.ts src/
```

**What it checks:**
- **Configurability:** Hardcoded paths, URLs, magic numbers
- **Modularity:** Function length, coupling indicators
- **Extensibility:** Hardcoded provider names, large switch statements
- **Integration:** Subprocess error handling, timeouts
- **Automation:** TODOs without issues, manual steps

**Exit codes:**
- `0` - Validation passed (or warnings only)
- `1` - Errors found, must fix before commit

### 2. Pre-commit Hook

**File:** `pre-commit-hook.sh`

**Purpose:** Automatically validates staged files before allowing commit

**Installation:**
```bash
# Copy to git hooks directory
cp .claude/tools/pre-commit-hook.sh .git/hooks/pre-commit
chmod +x .git/hooks/pre-commit
```

**Bypass (emergencies only):**
```bash
git commit --no-verify
```

**What it runs:**
- Five Cornerstones validator on all staged .ts, .js, .go files
- Blocks commit if errors found
- Allows commit with warnings (but displays them)

### 3. Session Start Checklist

**File:** `session-start-checklist.sh`

**Purpose:** Interactive checklist for AI assistants starting work

**Usage:**
```bash
./.claude/tools/session-start-checklist.sh
```

**What it checks:**
- Foundation files read (CLAUDE.md, VALIDATION.md, README.md)
- Context verified (current phase, recent work)
- Understanding confirmed (Five Cornerstones, project identity)

---

## Adding New Validation Rules

### 1. Identify the Gap

What principle is being violated that current tools don't catch?

### 2. Determine Which Cornerstone

- Configurability: Hardcoded values
- Modularity: Coupling, responsibilities
- Extensibility: Refactoring to add features
- Integration: External tool handling
- Automation: Manual steps

### 3. Add Check to Validator

Edit `validate-cornerstones.ts`:

```typescript
// In appropriate check function
if (line.includes("anti-pattern")) {
  violations.push({
    cornerstone: "Extensibility",
    severity: "error",
    file: filePath,
    line: lineNum,
    message: "Anti-pattern detected",
    suggestion: "Use this pattern instead: ...",
  });
}
```

### 4. Test the New Rule

```bash
# Should catch violation
echo 'const bad = "anti-pattern";' > test.ts
./validate-cornerstones.ts test.ts
# Should show error

# Should pass
echo 'const good = "correct-pattern";' > test.ts
./validate-cornerstones.ts test.ts
# Should show no violations
```

### 5. Document the Rule

Add to VALIDATION.md quality gates section.

---

## Continuous Improvement

These tools should evolve as Sophie grows:

**When to enhance:**
- New anti-pattern discovered
- Recurring violation not caught automatically
- User identifies gap in validation
- New cornerstone or principle added

**Process:**
1. Discuss with user (is this a real gap?)
2. Add validation rule
3. Update documentation (VALIDATION.md)
4. Commit with clear message

---

## Tool Maintenance

### Dependencies

- **Deno:** Required for validate-cornerstones.ts
- **Bash:** Required for pre-commit-hook.sh
- **Git:** Required for pre-commit hooks

### Compatibility

Validator works with:
- TypeScript (.ts)
- JavaScript (.js)
- Go (.go) - basic checks

Can be extended for other languages.

### Performance

Validator processes ~1000 lines/second on typical hardware.
For large codebases (>100 files), consider:
- Running only on staged files (pre-commit does this)
- Parallel processing (future enhancement)
- Caching (future enhancement)

---

## Troubleshooting

### Validator gives false positives

**Solution:** Add exception patterns to validator

Example:
```typescript
// Skip lines with specific comments
if (line.includes("// validator-ignore")) {
  continue;
}
```

### Pre-commit hook not running

**Check:**
1. Is hook executable? `ls -la .git/hooks/pre-commit`
2. Is Deno installed? `deno --version`
3. Was hook installed correctly? Should be in `.git/hooks/` not `.claude/tools/`

### Validator is too strict

**Severity levels:**
- `error` - Blocks commit, must fix
- `warning` - Allows commit, recommends fix

If a check is too strict, change severity from "error" to "warning" in validator.

---

## Future Enhancements

**Planned:**
- [ ] Complexity metrics (cyclomatic complexity)
- [ ] Dependency graph analysis
- [ ] Test coverage requirements
- [ ] Documentation completeness checker
- [ ] Holistic system thinking validator (ripple analysis)

**Under consideration:**
- [ ] AI-powered validation (use Claude to review code for principles)
- [ ] IDE integration (real-time validation)
- [ ] GitHub Actions integration (CI/CD)
- [ ] Custom rule definitions (YAML-based rules)

---

**These tools are the anchor that enforces principles.**
**Documentation tells us what to do. Automation ensures we do it.**
