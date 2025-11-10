# Sophie Deno Prototype

> **Purpose:** Validate Deno (TypeScript) as technology stack for Sophie CLI

---

## What This Is

This is a **prototype**, not production code. Its purpose is to validate:
- Can Deno handle YAML config loading?
- Is subprocess management clean for Claude Code CLI integration?
- Does SQLite work well with Deno?
- Can we compile to a single binary?
- Is the developer experience good?

**Scope:** CLI REPL, YAML loading, task matching, SQLite persistence, Claude Code integration

**Not in scope:** Full orchestration, knowledge loading, multi-project, external knowledge tier

---

## Prerequisites

**Deno Installation:**
```bash
# macOS / Linux
curl -fsSL https://deno.land/x/install/install.sh | sh

# Or via package manager
brew install deno    # macOS
```

**Optional (for Claude Code integration):**
- Claude Code CLI installed and authenticated (OAuth)
- If not available, prototype runs in simulation mode

---

## Quick Start

### 1. Run in Development Mode

```bash
cd prototypes/deno-poc
deno task dev
```

This runs with all necessary permissions:
- `--allow-read` - Load YAML configs
- `--allow-write` - Create SQLite database
- `--allow-run` - Call Claude Code CLI
- `--allow-env` - Access environment variables

### 2. Compile to Single Binary

```bash
cd prototypes/deno-poc
deno task compile
```

This creates a `sophie` executable in the current directory.

### 3. Run the Binary

```bash
./sophie
```

---

## Usage

### Starting a Conversation

```
$ ./sophie

╔═══════════════════════════════════════════════════════╗
║                                                       ║
║                 Sophie (Deno Prototype)               ║
║                                                       ║
║   AI-powered product design mentor                    ║
║   Type 'exit' to quit, 'help' for commands           ║
║                                                       ║
╚═══════════════════════════════════════════════════════╝

You: I need to plan a usability test for our mobile app

[Task matched: Plan a Usability Test]
[Agent: Research Analyst]

Sophie: I'll help you plan a comprehensive usability test...
```

### Commands

- `exit` - Quit the CLI
- `help` - Show prototype capabilities
- Any natural language input - Attempt task matching

---

## How It Works

### 1. Configuration Loading

On startup, loads:
- `../../archive/original-claude-desktop-agent/config/agents.yaml` (12 agents)
- `../../archive/original-claude-desktop-agent/config/tasks.yaml` (80+ tasks)

These serve as reference data. Sophie's own configs will be different.

### 2. Task Matching

Simple keyword-based matching:
- User message: "I need to plan a usability test"
- Keywords: ["usability", "test", "planning"]
- Match: Task "Plan a Usability Test" → Agent "Research Analyst"

**Note:** Production Sophie will use confidence scoring and intent extraction.

### 3. AI Provider Integration

Attempts to call Claude Code CLI:
```bash
claude --no-interactive --prompt "<context + user message>"
```

If Claude CLI not available, simulates a response.

**Note:** Production Sophie will support multiple providers (Claude, Gemini) via abstraction layer.

### 4. Conversation Persistence

All messages saved to SQLite (`sophie-poc.db`):

**Schema:**
```sql
CREATE TABLE conversations (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  timestamp TEXT NOT NULL,
  role TEXT NOT NULL,           -- 'user' or 'assistant'
  message TEXT NOT NULL,
  task_id TEXT,                 -- matched task (if any)
  agent_id TEXT                 -- selected agent (if any)
);
```

**Note:** Production Sophie has 4-tier memory (Agent/Project/External/Registry).

---

## Project Structure

```
deno-poc/
├── README.md              ← You are here
├── FINDINGS.md            ← Evaluation notes (created after testing)
├── deno.json              ← Deno configuration
├── src/
│   └── main.ts           ← Single-file prototype
├── sophie-poc.db         ← SQLite database (generated)
└── sophie                ← Compiled binary (generated)
```

---

## Five Cornerstones Evaluation

### 1. Configurability (?/5)

**Test:**
- Load YAML configs from files ✓
- Parse structured data ✓
- Paths not hardcoded ✓

**Score:** ___ (fill in after testing)
**Notes:**

### 2. Modularity (?/5)

**Test:**
- Can we see clear separation even in single file?
- Are functions single-purpose?
- Could we split into modules easily?

**Score:** ___ (fill in after testing)
**Notes:**

### 3. Extensibility (?/5)

**Test:**
- How hard to add a new AI provider?
- How hard to add new config sources?
- Does TypeScript help or hinder?

**Score:** ___ (fill in after testing)
**Notes:**

### 4. Integration (?/5)

**Test:**
- Subprocess management clean? ✓
- Error handling for external CLI ✓
- Could we stream output?

**Score:** ___ (fill in after testing)
**Notes:**

### 5. Automation (?/5)

**Test:**
- Single binary compilation ✓
- Binary size reasonable?
- Built-in formatter/linter ✓
- Built-in test runner ✓

**Score:** ___ (fill in after testing)
**Notes:**

---

## Known Limitations

1. **Single-file prototype** - Production will be properly modularized
2. **Simple task matching** - Production will use confidence scoring
3. **No knowledge loading** - Production loads task guides just-in-time
4. **Single project only** - Production supports multi-project
5. **No external knowledge tier** - Production has 4-tier memory
6. **No streaming** - Production will stream Claude responses
7. **Hardcoded Claude CLI** - Production has provider abstraction

**This is intentional.** Prototypes validate core capabilities, not full features.

---

## Testing Checklist

Manual testing required:

- [ ] CLI starts successfully
- [ ] YAML configs load without errors
- [ ] User input accepted
- [ ] Task matching works for sample inputs
- [ ] Agent selection displays correctly
- [ ] SQLite database created
- [ ] Messages saved to database
- [ ] Claude Code CLI called (or simulation works)
- [ ] Responses displayed properly
- [ ] Exit command works
- [ ] Help command works
- [ ] Binary compiles successfully
- [ ] Binary runs independently (no Deno required)

---

## Performance Notes

(Fill in after testing)

- Binary size: ___ MB
- Startup time: ___ ms
- Memory usage: ___ MB
- YAML load time: ___ ms
- SQLite operations: ___ ms

---

## Developer Experience Notes

(Fill in after building)

**What worked well:**
-

**What was painful:**
-

**Surprises (good or bad):**
-

**Would I choose Deno again?**
-

---

## Comparison with Go

(Fill in after building Go prototype)

| Aspect | Deno | Go |
|--------|------|-----|
| Setup ease | | |
| Code readability | | |
| YAML handling | | |
| SQLite integration | | |
| Subprocess management | | |
| Binary compilation | | |
| Binary size | | |
| Error handling | | |
| Overall DX | | |

---

## Next Steps

After completing this prototype:

1. Document findings in `FINDINGS.md`
2. Fill in Five Cornerstones scores
3. Build Go prototype (same scope)
4. Create comparison document
5. Make technology decision
6. Begin Phase 1 implementation

---

## Questions & Issues

**If Claude Code CLI integration fails:**
- Check if `claude` command is in PATH
- Verify OAuth authentication: `claude auth status`
- Prototype should still work in simulation mode

**If YAML loading fails:**
- Check paths are relative to prototype directory
- Verify archive exists: `../../archive/original-claude-desktop-agent/config/`

**If SQLite issues:**
- Check write permissions in prototype directory
- SQLite library should be bundled with Deno

**If compilation fails:**
- Check Deno version: `deno --version` (need v1.30+)
- Try manual compile: `deno compile --allow-all --output=sophie src/main.ts`

---

**Created:** 2025-11-10
**Status:** In Development
**Timeline:** Day 1-3 of prototype phase
