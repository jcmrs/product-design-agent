# Windows Environment Setup (No-WSL)

> **This guide helps you set up the development environment for Sophie on Windows without WSL.**

---

## Prerequisites

### Required Software

1. **Deno Runtime** (Recommended: v1.40+)
   - Download: https://deno.land/#installation
   - Windows installer: `irm https://deno.land/install.ps1 | iex`
   - Verify: `deno --version`

2. **Git for Windows**
   - Download: https://git-scm.com/download/win
   - Verify: `git --version`

3. **Claude Code CLI** (Local)
   - Should already be installed if you're reading this
   - Verify: `claude-code --version` (or equivalent command)

4. **SQLite** (Built into Deno, no separate install)

5. **Text Editor / IDE**
   - VS Code (recommended) with Deno extension
   - Or any editor with TypeScript support

### Optional But Recommended

- **PowerShell 7+** (better than Windows PowerShell 5.1)
- **Windows Terminal** (better terminal experience)

---

## Step-by-Step Setup

### Step 1: Clone Repository

```powershell
# Navigate to your projects directory
cd C:\Users\YourName\Projects

# Clone the repository
git clone https://github.com/jcmrs/product-design-agent.git
cd product-design-agent

# Checkout the correct branch
git checkout claude/project-documentation-bootstrap-01RVeVueyR6skQq1W5UuD6GN
```

### Step 2: Install Deno (if not already installed)

```powershell
# Using PowerShell (run as Administrator)
irm https://deno.land/install.ps1 | iex

# Add to PATH if not automatic
$env:Path += ";$env:USERPROFILE\.deno\bin"

# Verify installation
deno --version
```

### Step 3: Verify Claude Code CLI Access

```powershell
# Test Claude Code CLI is accessible
claude-code --help
# OR (check actual command for local installation)
claude --help

# Note the exact command structure for invoking Claude Code CLI
# This will be needed for the AI provider integration (Phase 3)
```

**IMPORTANT:** Document how Claude Code CLI is invoked on your system:
- Command name (`claude-code`, `claude`, or something else?)
- How to pass prompts (via argument? via stdin? via API?)
- Any authentication requirements

This information is CRITICAL for Phase 3 (AI Integration).

### Step 4: Verify Git Configuration

```powershell
# Check git config
git config --list

# Set user info if not configured
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"
```

### Step 5: Create Project Structure

```powershell
# Create source directories (when you start Phase 1)
New-Item -ItemType Directory -Force -Path src\cli
New-Item -ItemType Directory -Force -Path src\config
New-Item -ItemType Directory -Force -Path src\orchestration
New-Item -ItemType Directory -Force -Path src\providers
New-Item -ItemType Directory -Force -Path src\memory
New-Item -ItemType Directory -Force -Path src\utils
New-Item -ItemType Directory -Force -Path tests\config
New-Item -ItemType Directory -Force -Path tests\integration

# Create config directories
New-Item -ItemType Directory -Force -Path config
New-Item -ItemType Directory -Force -Path knowledge\task_guides
New-Item -ItemType Directory -Force -Path knowledge\materials
```

### Step 6: Create Deno Configuration

Create `deno.json` in project root:

```json
{
  "tasks": {
    "dev": "deno run --allow-read --allow-write --allow-net src/main.ts",
    "test": "deno test --allow-read --allow-write",
    "check": "deno check src/**/*.ts",
    "fmt": "deno fmt",
    "lint": "deno lint"
  },
  "fmt": {
    "useTabs": false,
    "lineWidth": 100,
    "indentWidth": 2,
    "semiColons": true,
    "singleQuote": false,
    "proseWrap": "preserve"
  },
  "lint": {
    "rules": {
      "tags": ["recommended"]
    }
  },
  "compilerOptions": {
    "strict": true,
    "lib": ["deno.window", "deno.ns", "deno.unstable"]
  }
}
```

### Step 7: Verify Setup

```powershell
# Check Deno can read files
deno run --allow-read --eval "console.log(await Deno.readTextFile('README.md').then(() => 'OK'))"

# Check directory structure
Get-ChildItem -Recurse -Directory | Select-Object FullName
```

---

## Windows-Specific Considerations

### Path Separators

Deno handles path separators automatically, but be aware:

```typescript
// ✓ Works on Windows and Unix
const path = `${this.configPath}/agents.yaml`;

// ✓ Also works - Deno normalizes
import { join } from "https://deno.land/std@0.208.0/path/mod.ts";
const path = join(this.configPath, "agents.yaml");
```

### Line Endings

Git should handle CRLF ↔ LF conversion automatically, but verify:

```powershell
# Check git config
git config core.autocrlf
# Should be "true" on Windows

# If not set:
git config --global core.autocrlf true
```

### File Permissions

Windows doesn't have Unix-style file permissions. SQLite files work differently:
- No need to `chmod` database files
- File locking works differently (uses Windows file locking)

### Process Invocation

When invoking Claude Code CLI from Deno on Windows:

```typescript
// Use Deno.Command (works cross-platform)
const command = new Deno.Command("claude-code", {
  args: ["--prompt", prompt],
  stdout: "piped",
  stderr: "piped"
});

// On Windows, .exe extension is optional
// Deno.Command handles it automatically
```

---

## Troubleshooting

### Deno Permission Errors

```powershell
# If you see "Requires read access"
# Grant specific permissions when running:
deno run --allow-read --allow-write --allow-net src/main.ts

# For development, can use --allow-all (less secure)
deno run --allow-all src/main.ts
```

### SQLite Issues

```powershell
# Deno includes SQLite support via FFI
# No separate installation needed

# If you see FFI errors, update Deno:
deno upgrade
```

### Claude Code CLI Not Found

```powershell
# Find where Claude Code CLI is installed
where.exe claude-code
# OR
where.exe claude

# Add to PATH if needed
$env:Path += ";C:\Path\To\Claude\CLI"

# Make permanent:
[Environment]::SetEnvironmentVariable("Path", $env:Path, [System.EnvironmentVariableTarget]::User)
```

### Git Line Ending Warnings

```powershell
# If you see CRLF warnings:
git config --global core.autocrlf true
git config --global core.eol lf

# Re-checkout files:
git rm --cached -r .
git reset --hard
```

---

## Development Workflow

### Running Sophie (Phase 1+)

```powershell
# Start the REPL
deno task dev

# Or with explicit permissions:
deno run --allow-read --allow-write --allow-net src/main.ts
```

### Running Tests

```powershell
# Run all tests
deno task test

# Run specific test file
deno test tests/config/loader.test.ts --allow-read

# Watch mode (re-run on changes)
deno test --watch --allow-read
```

### Type Checking

```powershell
# Check all TypeScript files
deno task check

# Check specific file
deno check src/main.ts
```

### Formatting

```powershell
# Format all files
deno task fmt

# Check formatting without changes
deno fmt --check
```

---

## IDE Setup (VS Code)

### Extensions

1. **Deno** (denoland.vscode-deno)
   - Official Deno language server
   - Install from VS Code marketplace

2. **GitLens** (optional, for git visualization)

3. **Markdown All in One** (for editing docs)

### VS Code Settings

Create `.vscode/settings.json`:

```json
{
  "deno.enable": true,
  "deno.lint": true,
  "deno.unstable": false,
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "denoland.vscode-deno",
  "[typescript]": {
    "editor.defaultFormatter": "denoland.vscode-deno"
  },
  "files.eol": "\n"
}
```

### VS Code Tasks

Create `.vscode/tasks.json`:

```json
{
  "version": "2.0.0",
  "tasks": [
    {
      "label": "deno: run",
      "type": "shell",
      "command": "deno task dev",
      "problemMatcher": [],
      "group": {
        "kind": "build",
        "isDefault": true
      }
    },
    {
      "label": "deno: test",
      "type": "shell",
      "command": "deno task test",
      "problemMatcher": []
    }
  ]
}
```

---

## Validation Checklist

After setup, verify:

- ✓ Deno installed and in PATH (`deno --version` works)
- ✓ Git installed and configured
- ✓ Claude Code CLI accessible and command documented
- ✓ Repository cloned and on correct branch
- ✓ Project directories created
- ✓ `deno.json` created and tasks work
- ✓ VS Code (if using) configured with Deno extension
- ✓ Can run `deno task check` (even if no source files yet)
- ✓ Can run `deno task test` (even if no tests yet)

---

## Next Steps

1. ✓ Environment set up
2. → Read VALIDATION_CHECKLIST.md to verify understanding
3. → Read IMPLEMENTATION_ROADMAP.md for phase details
4. → Begin Phase 1 implementation

---

**Last Updated:** 2025-11-14
**Platform:** Windows (no-WSL)
**Deno Version:** 1.40+
