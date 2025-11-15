# AI Bootstrap Guide: Quick Start for Local Claude Code CLI

> **TL;DR:** You're continuing a well-designed project. Read docs, understand principles, then build systematically. This guide gives you the express path to productivity.

---

## 30-Second Summary

**What:** Sophie is an AI-powered product design mentor (CLI app, not web)
**Status:** Phase 0 complete (analysis done), Phase 1 ready (implementation starts)
**You:** Local Claude Code CLI on Windows (no-WSL)
**Principles:** Five Cornerstones (Configurability, Modularity, Extensibility, Integration, Automation)
**Memory:** 4 tiers (Agent, Project, Registry, External)
**Approach:** Document → Implement → Test (not code-first)

---

## Hour 1: Reading & Understanding

### Must-Read (in this order):

1. **PROCESS_MEMORY.json** (15 min) - 25 critical learnings, especially:
   - pm-006: Wrong Problem Recognition (original agent is file-based, not CLI)
   - pm-018: Just-in-Time Knowledge Loading (don't bulk-load)
   - pm-023: 10-Point Validation Checklist (run before every decision)

2. **CLAUDE.md** (20 min) - Your operational manual:
   - Five Cornerstones (all decisions align with these)
   - Holistic System Thinking (trace ripple effects)
   - Development Methodology (IVDD framework)
   - Quality Gates (validate before committing)

3. **SOPHIE_ESSENCE.md** (15 min) - The vision and soul:
   - What Sophie is (mentor, not automation)
   - What makes her different (4-tier memory, multi-project, natural UX)
   - Why this matters (human-AI collaboration pattern)

4. **ARCHITECTURE_DESIGN.md** (10 min, skim) - Technical blueprint:
   - Service-oriented architecture
   - Orchestration workflow (8 steps)
   - Component interfaces

---

## Hour 2: Environment & Validation

### Setup (20 min)

Follow **WINDOWS_SETUP.md** to:
- Install/verify Deno
- Install/verify Git
- Document Claude Code CLI invocation (critical for Phase 3)
- Create project structure
- Create `deno.json`

### Validate Understanding (40 min)

Complete **VALIDATION_CHECKLIST.md**:
- Answer 45 questions without looking at docs
- Self-assess your comprehension
- Identify areas to review

**Critical:** Don't skip this. It prevents building the wrong thing.

---

## Hour 3: User Conversation & Planning

### Confirm Understanding (20 min)

Have conversation with user covering:
1. Five Cornerstones - explain how they guide work
2. 4-Tier Memory - why 4, what each does
3. Architecture - how orchestration works
4. Implementation Plan - Phases 1-6 overview
5. Questions - any clarifications needed

**User must confirm you're ready before you code.**

### Plan Phase 1 (40 min)

Read detailed tasks in **IMPLEMENTATION_ROADMAP.md** Phase 1:
- Task 1.1: Project structure
- Task 1.2: Config types
- Task 1.3: YAML loader
- Task 1.4: CLI REPL
- Task 1.5: Main entry point

Create your own task breakdown using TodoWrite tool.

---

## Hour 4+: Implementation Begins

### Phase 1: Foundation (Weeks 1-2)

**Goal:** CLI REPL with config loading

**Critical Path:**

```
Day 1:
├── Create project structure (src/, config/, knowledge/, tests/)
├── Define TypeScript types (Agent, Task, Config)
├── Create deno.json with tasks
└── Validate: deno task check passes

Days 2-3:
├── Implement YAML config loader
├── Write unit tests for loader
├── Create sample agents.yaml (2-3 agents)
├── Create sample tasks.yaml (2-3 tasks)
└── Validate: Tests pass, config loads

Days 3-4:
├── Implement CLI REPL (read-eval-print loop)
├── Echo mode (just echo input for now)
├── Handle exit/quit commands
└── Validate: REPL starts, echoes, exits cleanly

Day 4:
├── Implement main.ts entry point
├── Load config on startup
├── Start REPL
└── Validate: End-to-end works

User Validation: Demo working REPL, show config loading
```

**Do NOT proceed to Phase 2 until user confirms Phase 1 complete.**

### Phase 2: Orchestration (Weeks 3-4)

**Goal:** Task matching, agent selection, knowledge loading

**After Phase 1 approval:**
- Implement Workflow Orchestrator
- Task matching with confidence scoring
- Knowledge loader (just-in-time pattern!)
- Update REPL to use orchestrator
- Validate: Can match tasks, load knowledge, show results

### Phase 3: AI Integration (Week 5)

**Goal:** Connect to Claude Code CLI, generate responses

**Critical:** Research how Claude Code CLI works on Windows
- Subprocess invocation? API? SDK?
- Prompt format? Streaming support?
- Authentication requirements?

**After research:**
- Create AIProvider abstraction
- Implement Claude Code CLI adapter
- Build prompt engineering (agent persona + knowledge)
- Update REPL to generate actual responses
- Validate: End-to-end conversations work

### Phases 4-6: Memory, Features, Polish

See IMPLEMENTATION_ROADMAP.md for details.

---

## Key Patterns & Anti-Patterns

### ✅ Do This

**Follow Five Cornerstones:**
```typescript
// ✓ Configurable
const config = await loadConfig("./config/agents.yaml");

// ✓ Modular
export class TaskMatcher {
  // Single responsibility, testable, replaceable
}

// ✓ Extensible
// Adding new agent = edit YAML only, no code changes

// ✓ Integration-ready
export interface AIProvider {
  // Abstract provider - swap Claude for Gemini easily
}

// ✓ Automated
const match = await taskMatcher.match(intent, context);
// No manual task selection
```

**Document First:**
```typescript
/**
 * Matches user intent to tasks using keyword scoring and context.
 *
 * @param intent - Extracted keywords and domain from user input
 * @param context - Conversation history and recent tasks
 * @returns Best-matching task with confidence score (0-1)
 *
 * Low confidence (<0.5): Requires clarification from user
 * Medium (0.5-0.8): Suggest task, offer alternatives
 * High (>0.8): Proceed with matched task
 */
async match(intent: Intent, context: Context): Promise<TaskMatch> {
```

**Trace Ripple Effects:**
```
Before adding "Switch Project":

Memory impact? → Need project_id in all tables
Orchestration impact? → Need to load project context
CLI impact? → Need to detect switch intent
Config impact? → Make auto-switch configurable?
```

### ❌ Don't Do This

**Don't hardcode:**
```typescript
// ❌ Hardcoded threshold
if (confidence > 0.7) { ... }

// ✓ Configurable
if (confidence > task.confidence_threshold) { ... }
```

**Don't bulk-load:**
```typescript
// ❌ Loading all knowledge at startup
const allGuides = await loadAllTaskGuides(); // 15,793 lines!

// ✓ Just-in-time loading
const guide = await knowledgeLoader.load(matchedTask);
```

**Don't couple components:**
```typescript
// ❌ Tight coupling
class REPL {
  private claudeAPI = new ClaudeAPI(); // Locked to Claude!
}

// ✓ Dependency injection
class REPL {
  constructor(private aiProvider: AIProvider) {
    // Can swap providers
  }
}
```

**Don't skip validation:**
```typescript
// ❌ Commit without checking
git commit -m "Added feature"

// ✓ Validate first
deno task check  // TypeScript errors?
deno task test   // Tests pass?
deno task fmt    // Formatted?
// Check Five Cornerstones alignment?
// Traced ripple effects?
// Updated docs if architecture changed?
git commit -m "feat: Add task matching with confidence scoring"
```

---

## Communication with User

### When to Ask

- You find contradictions in docs
- You need user preferences/constraints
- You're considering Five Cornerstones deviation
- You discover missing requirements

### When NOT to Ask

- Things clearly documented
- Standard implementation details
- Minor coding decisions within established patterns

### How to Communicate

- **Explain "why"** not just "what"
- **Present options** when multiple paths exist
- **Ask for validation** before major changes
- **Summarize progress** regularly
- **Be clear and concise** - user is non-technical

---

## Quality Checklist (Before Every Commit)

Run this mental checklist:

1. ✓ **Adheres to Five Cornerstones?**
   - Configurable? Modular? Extensible? Integration-ready? Automated?

2. ✓ **Documented?**
   - Code comments for non-obvious decisions?
   - External docs updated if architecture changed?

3. ✓ **Tested?**
   - Unit tests for new components?
   - Integration test for workflows?
   - Manual test confirms it works?

4. ✓ **No hardcoded values?**
   - Everything that should be configurable is?

5. ✓ **No tight coupling?**
   - Components are independent?
   - Can swap implementations?

6. ✓ **Extensibility preserved?**
   - Adding agents/tasks still YAML-only?

7. ✓ **Holistic thinking applied?**
   - Traced ripple effects?
   - No surprise impacts on other components?

8. ✓ **Process memory consulted?**
   - Not repeating documented mistakes?

9. ✓ **TypeScript clean?**
   - `deno task check` passes?

10. ✓ **User would approve?**
    - Aligns with vision in SOPHIE_ESSENCE.md?

If all 10: ✅ Ready to commit

If any NO: ⚠️ Fix before committing

---

## Common Pitfalls (from Process Memory)

### Pitfall 1: Technology Before Understanding
- **Trap:** Choosing Deno vs Go before understanding requirements
- **Lesson:** Understand → Define Requirements → Choose Technology
- **Action:** Read all analysis docs before coding

### Pitfall 2: Bulk Knowledge Loading
- **Trap:** Loading all 64 task guides (15,793 lines) into context
- **Lesson:** Just-in-time loading (load matched task only)
- **Action:** Implement KnowledgeLoader with lazy loading

### Pitfall 3: Microfixing Without Holistic Thinking
- **Trap:** "Just fix this one thing" without tracing impact
- **Lesson:** Every component affects every other component
- **Action:** Always trace ripple effects before implementing

### Pitfall 4: Command-Driven UX
- **Trap:** Using `/select-task` or `/choose-agent` commands
- **Lesson:** Natural conversation with intent detection
- **Action:** No slash commands, detect intent from conversation

### Pitfall 5: Three-Tier Memory (Missing External Knowledge)
- **Trap:** Agent + Project + Registry (standard pattern)
- **Lesson:** Need 4th tier for Perplexity research, multi-AI collaboration
- **Action:** Design for External Knowledge tier from day one

### Pitfall 6: Single Project Assumption
- **Trap:** Designing for one project at a time
- **Lesson:** Multi-project is core, not addon
- **Action:** Include project_id in all memory operations

---

## Quick Reference

### Key Documents

- **PROCESS_MEMORY.json** - 25 critical learnings
- **CLAUDE.md** - Operational manual, principles, methodology
- **SOPHIE_ESSENCE.md** - Vision, soul, purpose
- **ARCHITECTURE_DESIGN.md** - Technical blueprint
- **IMPLEMENTATION_ROADMAP.md** - Phase-by-phase tasks
- **WINDOWS_SETUP.md** - Environment setup
- **VALIDATION_CHECKLIST.md** - Comprehension verification

### Key Principles

- **Five Cornerstones:** Configurability, Modularity, Extensibility, Integration, Automation
- **Holistic Thinking:** Trace ripple effects before implementing
- **IVDD:** Iterative Validation-Driven Development (Document → Implement → Test)
- **Just-in-Time:** Load knowledge only when needed
- **Natural UX:** Conversation, not commands

### Key Architecture

- **4-Tier Memory:** Agent, Project, Registry, External
- **Orchestration:** Intent → Match → Select → Load → Generate → Validate
- **12-Section Guides:** Invisible structure, visible guidance
- **Provider Abstraction:** Swap AI providers easily

### Commands (Deno)

```bash
deno task dev      # Run Sophie
deno task test     # Run tests
deno task check    # Type check
deno task fmt      # Format code
deno task lint     # Lint code
```

---

## Success Criteria

**You're successful when:**

1. You understand Five Cornerstones and apply them to every decision
2. You understand 4-tier memory and why there are 4 (not 3)
3. You understand why original agent succeeds (and what to preserve)
4. You can explain Sophie's architecture without looking at docs
5. You've completed validation checklist with confidence
6. User confirms you're ready to implement Phase 1
7. You follow IVDD (Document → Implement → Test)
8. You validate quality gates before every commit

**You're NOT ready if:**

- You want to start coding immediately
- You think this is just a CLI with YAML configs
- You don't know what the Five Cornerstones are
- You haven't completed the validation checklist
- You haven't had the user confirmation conversation

---

## Your First Day

**Hour 1:** Read PROCESS_MEMORY.json, CLAUDE.md, SOPHIE_ESSENCE.md
**Hour 2:** Setup environment (WINDOWS_SETUP.md), start validation checklist
**Hour 3:** Complete validation, have user conversation
**Hour 4:** Plan Phase 1 tasks, get user approval to begin
**Hours 5-8:** Start Phase 1 implementation (project structure, types, config loader)

**End of Day:** Have working `deno.json` and TypeScript types, config loader started

---

## Remember

- **Take your time with reading** - understanding > speed
- **Ask the user when uncertain** - they're collaborative
- **Validate before building** - prevents rework
- **Follow the patterns** - they're well-researched
- **Build something remarkable** - Sophie helps designers create better products

---

**Last Updated:** 2025-11-14
**Purpose:** Quick-start guide for local AI
**Audience:** Claude Code CLI (local, Windows no-WSL)
