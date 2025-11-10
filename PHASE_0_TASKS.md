# Phase 0: Technology Validation - Actionable Tasks

> **This is your concrete task list. Each task is ready to work on.**

---

## Current Status

**Phase:** Phase 0 - Technology Validation
**Goal:** Choose technology stack (Deno vs Go) through prototyping
**Timeline:** 2-6 days
**Started:** 2025-11-10

**Progress:**
- ✅ Repository structure established
- ✅ Development methodology documented
- ✅ Tracking system designed
- 🔄 **NEXT: Complete technology validation tasks below**

---

## Task Queue (Work Through in Order)

### Task 1: Define Prototype Evaluation Criteria ⚡ START HERE

**Status:** 🔴 Not Started
**Priority:** HIGH (Must complete before prototypes)
**Estimated Time:** 30 minutes

**What to do:**
Create a document that defines exactly how we'll compare Deno vs Go prototypes.

**Acceptance Criteria:**
- [ ] Create `docs/PROTOTYPE_EVALUATION.md`
- [ ] Define scoring criteria based on Five Cornerstones (1-5 scale each)
- [ ] Add practical criteria (ease of development, deployment, debugging)
- [ ] Document minimum acceptance threshold for each criterion
- [ ] Include timeline/effort considerations

**Five Cornerstones Scoring Template:**
```markdown
## Evaluation Criteria

### Configurability (Weight: 20%)
- YAML parsing (1-5)
- Environment variables (1-5)
- File-based config loading (1-5)

### Modularity (Weight: 20%)
- Component separation (1-5)
- Interface definitions (1-5)
- Testability (1-5)

### Extensibility (Weight: 20%)
- Adding new providers (1-5)
- Plugin system potential (1-5)
- Third-party library ecosystem (1-5)

### Integration (Weight: 20%)
- Subprocess handling (1-5)
- SQLite integration (1-5)
- CLI integration (1-5)

### Automation (Weight: 20%)
- Build automation (1-5)
- Testing framework (1-5)
- Deployment simplicity (1-5)

## Practical Criteria (Weight: 50% of total)
- Single binary distribution (1-5)
- Development speed (1-5)
- Debugging experience (1-5)
- Documentation quality (1-5)
- Community support (1-5)

## Decision Threshold
Minimum score to proceed: 70/100
Winner must exceed runner-up by: 10 points or more
```

**Done When:**
- Document exists
- Criteria are measurable
- Can score both prototypes objectively

---

### Task 2: Complete Deno Prototype

**Status:** 🟡 In Progress (partially complete)
**Priority:** HIGH
**Estimated Time:** 2-3 hours remaining

**Current State:**
- Basic structure exists in `prototypes/deno-poc/src/main.ts`
- Config loading implemented
- Database initialization started
- Claude Code adapter partially implemented

**What to do:**
Finish the Deno prototype so it demonstrates all core capabilities.

**Acceptance Criteria:**
- [ ] CLI REPL works (user can type, get responses)
- [ ] YAML config loading works (agents.yaml, tasks.yaml)
- [ ] SQLite persistence works (save/load conversations)
- [ ] Claude Code CLI adapter works (call via subprocess OR simulate)
- [ ] Task matching works (basic keyword search)
- [ ] Agent selection works (find agent by task)
- [ ] Can run full conversation loop
- [ ] Code is commented and follows Five Cornerstones
- [ ] Create `prototypes/deno-poc/FINDINGS.md` documenting:
  - What worked well
  - What was difficult
  - Performance observations
  - Development experience notes
  - Five Cornerstones score (use Task 1 criteria)

**Files to Complete:**
- `prototypes/deno-poc/src/main.ts` - Main implementation
- `prototypes/deno-poc/README.md` - How to run it
- `prototypes/deno-poc/FINDINGS.md` - Evaluation results

**Test It:**
```bash
cd prototypes/deno-poc
deno run --allow-read --allow-write --allow-env --allow-run src/main.ts
# Should show Sophie REPL
# Type: "I need to plan a usability test"
# Should match task, select agent, respond
```

**Done When:**
- All acceptance criteria checked
- FINDINGS.md documents score using Task 1 criteria
- Prototype demonstrates feasibility

---

### Task 3: Build Go Prototype

**Status:** 🔴 Not Started
**Priority:** HIGH
**Estimated Time:** 3-4 hours

**What to do:**
Build equivalent prototype in Go to compare against Deno.

**Acceptance Criteria:**
- [ ] Same scope as Deno prototype (CLI, YAML, SQLite, subprocess)
- [ ] Project structure in `prototypes/go-poc/`
- [ ] CLI REPL works
- [ ] YAML config loading works (go-yaml library)
- [ ] SQLite persistence works (go-sqlite3 or modernc.org/sqlite)
- [ ] Claude Code CLI adapter works (subprocess or simulation)
- [ ] Task matching works
- [ ] Agent selection works
- [ ] Can run full conversation loop
- [ ] Code is well-structured and commented
- [ ] Create `prototypes/go-poc/FINDINGS.md` documenting:
  - Development experience
  - Language ergonomics
  - Library ecosystem experience
  - Build/distribution process
  - Five Cornerstones score (use Task 1 criteria)

**Files to Create:**
```
prototypes/go-poc/
├── main.go
├── config/
│   └── loader.go
├── memory/
│   └── sqlite.go
├── providers/
│   └── claude.go
├── orchestration/
│   └── matcher.go
├── go.mod
├── go.sum
├── README.md
└── FINDINGS.md
```

**Test It:**
```bash
cd prototypes/go-poc
go run main.go
# Same test as Deno: "I need to plan a usability test"
```

**Done When:**
- All acceptance criteria checked
- FINDINGS.md documents score using Task 1 criteria
- Can directly compare with Deno prototype

---

### Task 4: Score and Compare Prototypes

**Status:** 🔴 Not Started (blocked by Tasks 2 & 3)
**Priority:** HIGH
**Estimated Time:** 1 hour

**What to do:**
Objectively compare both prototypes using the criteria from Task 1.

**Acceptance Criteria:**
- [ ] Create `docs/PROTOTYPE_COMPARISON.md`
- [ ] Score Deno against all criteria (from FINDINGS.md)
- [ ] Score Go against all criteria (from FINDINGS.md)
- [ ] Create comparison table
- [ ] Document qualitative observations
- [ ] Identify clear winner (or indicate if too close to call)
- [ ] Document reasoning

**Comparison Template:**
```markdown
# Prototype Comparison: Deno vs Go

## Scores

| Criterion | Weight | Deno | Go | Winner |
|-----------|--------|------|-----|--------|
| **Configurability** | 20% | X/25 | Y/25 | [Deno/Go] |
| - YAML parsing | - | X/5 | Y/5 | - |
| - Environment vars | - | X/5 | Y/5 | - |
| - File-based config | - | X/5 | Y/5 | - |
| **Modularity** | 20% | X/25 | Y/25 | [Deno/Go] |
| ... | ... | ... | ... | ... |
| **TOTAL** | 100% | X/100 | Y/100 | **[Winner]** |

## Qualitative Comparison

### Development Speed
[Observations]

### Debugging Experience
[Observations]

### Distribution Simplicity
[Observations]

## Recommendation
**Chosen Technology:** [Deno/Go]
**Confidence Level:** [High/Medium/Low]
**Rationale:** [Why, aligned with Five Cornerstones and project goals]
```

**Done When:**
- Objective scores documented
- Clear recommendation made
- Rationale aligns with Five Cornerstones

---

### Task 5: Make Technology Decision

**Status:** 🔴 Not Started (blocked by Task 4)
**Priority:** HIGH
**Estimated Time:** 30 minutes

**What to do:**
Formally decide on technology stack and document decision.

**Acceptance Criteria:**
- [ ] Review comparison from Task 4
- [ ] Create `docs/ADR-001-TECHNOLOGY-CHOICE.md` (Architecture Decision Record)
- [ ] Document decision with full context
- [ ] Update ROADMAP.md Phase 0 status
- [ ] Update README.md with chosen technology
- [ ] Archive losing prototype (don't delete, keep for reference)
- [ ] Git commit with decision documented

**ADR Template:**
```markdown
# ADR-001: Technology Stack Choice (Deno vs Go)

**Status:** Accepted
**Date:** 2025-11-10
**Decision Maker:** Claude + User Validation

## Context
Sophie requires a technology stack for CLI implementation with specific requirements:
- Single binary distribution
- YAML config loading
- SQLite persistence
- Subprocess handling (Claude Code CLI, Gemini CLI)
- Natural conversation UX
- Fast development iteration

## Options Considered

### Option 1: Deno (TypeScript)
**Score:** X/100
**Pros:** [from comparison]
**Cons:** [from comparison]

### Option 2: Go
**Score:** Y/100
**Pros:** [from comparison]
**Cons:** [from comparison]

## Decision
**Chosen:** [Deno/Go]

**Rationale:**
[Alignment with Five Cornerstones, project goals, practical considerations]

## Consequences

### Positive
- [List benefits]

### Negative
- [List tradeoffs]

### Action Items
- [ ] Set up Phase 1 project structure with [chosen technology]
- [ ] Archive non-chosen prototype
- [ ] Update all documentation references
- [ ] Begin Phase 1 implementation
```

**Done When:**
- ADR document exists
- ROADMAP.md updated
- README.md updated
- Decision is clear and documented

---

### Task 6: Phase 0 Completion & Transition

**Status:** 🔴 Not Started (blocked by Task 5)
**Priority:** HIGH
**Estimated Time:** 1 hour

**What to do:**
Close out Phase 0 and prepare for Phase 1.

**Acceptance Criteria:**
- [ ] All Phase 0 tasks marked complete in this document
- [ ] Update ROADMAP.md:
  - Mark Phase 0 complete ✅
  - Update "Current Status" section
  - Update "Last Updated" date
- [ ] Create `docs/PHASE_0_RETROSPECTIVE.md`:
  - What went well
  - What was challenging
  - Lessons learned
  - Adjustments for Phase 1
- [ ] Create initial Phase 1 task list (PHASE_1_TASKS.md)
- [ ] Git commit: "Complete Phase 0: Technology validation"
- [ ] Celebrate! 🎉

**Phase 1 Preview (to be created):**
- Task 1: Set up Phase 1 project structure
- Task 2: Implement YAML config loader
- Task 3: Implement CLI REPL
- Task 4: Implement basic conversation loop
- Task 5: Integration test

**Done When:**
- Phase 0 retrospective documented
- Phase 1 tasks listed
- Ready to begin Phase 1 implementation

---

## Quick Reference: What To Do Right Now

**If you're an AI session starting work:**
1. ✅ Look at this file (you're doing it!)
2. ✅ Find the first 🔴 Not Started or 🟡 In Progress task
3. ✅ Read the acceptance criteria
4. ✅ Start working through the checklist
5. ✅ Check off items as you complete them
6. ✅ Mark task complete when all criteria met
7. ✅ Move to next task

**If you're the user checking progress:**
1. ✅ Open this file
2. ✅ Look at task statuses (🔴 Not Started, 🟡 In Progress, ✅ Complete)
3. ✅ See exactly what's being worked on
4. ✅ See what's remaining

---

## Progress Tracking

**Phase 0 Progress:** 0/6 tasks complete (0%)

- [ ] Task 1: Define evaluation criteria
- [ ] Task 2: Complete Deno prototype
- [ ] Task 3: Build Go prototype
- [ ] Task 4: Score and compare
- [ ] Task 5: Make decision
- [ ] Task 6: Phase 0 completion

**Estimated Time to Complete Phase 0:** 8-10 hours of focused work

---

## Notes

**Why this format?**
- Immediately actionable (no GitHub setup needed first)
- Can work through sequentially
- Clear acceptance criteria
- Progress visible at a glance
- Can be migrated to GitHub Issues later if desired

**What about GitHub Projects?**
This task list can be:
1. Used as-is (update this file as you work)
2. Migrated to GitHub Issues (one issue per task)
3. Put into GitHub Project board (kanban visualization)

For now, this gives you **immediate actionability** while we validate the approach.

---

**Last Updated:** 2025-11-10
**Current Task:** Task 1 (Define evaluation criteria) ⚡
**Next Session Should:** Start with Task 1 or continue Task 2 if Deno prototype already in progress
