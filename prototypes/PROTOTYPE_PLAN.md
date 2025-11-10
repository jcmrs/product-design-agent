# Sophie Prototype Plan: Deno vs Go Validation

> **Purpose:** Validate technology choice through hands-on prototyping before full implementation

---

## Context

We are building Sophie - an independent CLI application for product design mentorship. Before committing to a technology stack for the full 10-week implementation, we need to validate our assumptions through practical prototyping.

**Decision to Make:** Deno (TypeScript) vs Go

**Timeline:** 2-6 days maximum

**Approach:** Build identical prototypes in both technologies, compare objectively

---

## Objectives

### Primary Objective
Validate which technology stack best supports Sophie's Five Cornerstones:
1. **Configurability** - Can we easily load YAML configs and Markdown files?
2. **Modularity** - Does the language encourage clean separation of concerns?
3. **Extensibility** - How easy is it to add new providers, components?
4. **Integration** - Can we call external CLIs (Claude Code, Gemini) cleanly?
5. **Automation** - Can we compile to single binary? Support CI/CD?

### Secondary Objectives
- Validate architecture assumptions (can we actually build this?)
- Identify potential gotchas early
- Get hands-on feel for developer experience
- Test deployment story (single binary compilation)

### Non-Objectives
- Build production-ready code (this is validation only)
- Implement full orchestration engine
- Build complete memory layer
- Optimize performance
- Polish UI/UX

---

## Scope Definition

### What We WILL Build

**Core Features:**
1. **CLI REPL**
   - Read user input (natural language)
   - Display formatted responses
   - Handle exit/help commands
   - Colored output for better UX

2. **YAML Configuration Loading**
   - Load `agents.yaml` (from archive as reference)
   - Load `tasks.yaml` (from archive as reference)
   - Parse into structured data
   - Validate schema

3. **Simple Task Matching**
   - Match user input against task keywords
   - Select appropriate agent based on task
   - Display confidence (which task matched)

4. **AI Provider Integration**
   - Call Claude Code CLI via subprocess
   - Pass prompt with context
   - Capture response
   - Handle errors gracefully
   - Simulate if Claude CLI not available

5. **SQLite Operations**
   - Create database with conversations table
   - Save user messages
   - Save assistant responses
   - Link to task_id and agent_id
   - Query conversation history

6. **Single Binary Compilation**
   - Compile to standalone executable
   - Test on local system
   - Measure binary size
   - Validate dependencies are embedded

### What We Will NOT Build

- ❌ Full orchestration engine (8-step workflow)
- ❌ Knowledge guide loading (just-in-time pattern)
- ❌ Validation loop (10-point checklist)
- ❌ Multi-project support (project registry)
- ❌ External knowledge tier (4th memory tier)
- ❌ Embeddings or semantic search
- ❌ Streaming responses
- ❌ Session management
- ❌ User preferences
- ❌ Error recovery
- ❌ Comprehensive testing
- ❌ Documentation generation
- ❌ CI/CD integration

**Rationale:** Scope creep kills prototypes. We validate core capabilities only.

---

## Architecture for Prototypes

### Simplified Component Model

```
┌──────────────────────────────────────┐
│          CLI Interface               │
│  (Read input, display output)        │
└──────────────┬───────────────────────┘
               │
┌──────────────┴───────────────────────┐
│         Main Logic                   │
│  • Load YAML configs                 │
│  • Match task by keywords            │
│  • Select agent                      │
│  • Call AI provider                  │
│  • Save to database                  │
└──┬──────┬──────────┬─────────────┬──┘
   │      │          │             │
┌──┴──┐ ┌─┴────┐ ┌──┴─────┐  ┌───┴──────┐
│YAML │ │SQLite│ │Claude  │  │Formatting│
│Load │ │ DB   │ │Code CLI│  │(colors)  │
└─────┘ └──────┘ └────────┘  └──────────┘
```

**Key Simplifications:**
- No provider abstraction layer (Claude Code hardcoded, with fallback)
- No knowledge loading (reference only)
- Single project only (no registry)
- Basic task matching (keyword search, no confidence scoring)
- No validation loops

### File Structure (Per Prototype)

```
prototypes/deno-poc/          (or go-poc/)
├── README.md                  ← How to run this prototype
├── deno.json                  ← Deno config (or go.mod for Go)
├── src/
│   └── main.ts               ← Single-file prototype (or main.go)
├── sophie-poc.db             ← Generated SQLite database
└── sophie                    ← Compiled binary (generated)
```

**Rationale:** Single-file prototypes are fine. Modularity is for full implementation.

---

## Evaluation Criteria

### Five Cornerstones Alignment

Each prototype will be scored (1-5 scale) on:

**1. Configurability**
- How easy to load YAML configs?
- How easy to work with Markdown files?
- Are paths hardcoded or configurable?
- Can we support multiple config sources?

**2. Modularity**
- Does the language encourage separation?
- Can we easily split into modules later?
- Are dependencies clean?
- Can components be tested independently?

**3. Extensibility**
- How hard to add a new AI provider?
- How hard to add new config sources?
- Does the language support interfaces/traits well?
- Can we plugin new features easily?

**4. Integration**
- How easy to call external CLIs?
- How clean is subprocess management?
- Can we handle errors from external tools?
- Can we stream output from subprocesses?

**5. Automation**
- Single binary compilation: easy or hard?
- Binary size reasonable?
- CI/CD friendly?
- Testing framework available?
- Build tooling mature?

### Developer Experience

**Deno:**
- Modern TypeScript tooling
- Built-in formatter, linter, test runner
- Secure by default (explicit permissions)
- Single executable distribution
- Younger ecosystem

**Go:**
- Mature ecosystem
- Excellent performance
- Strong standard library
- Static typing, compilation
- More verbose syntax

### Comparison Matrix

| Criterion | Deno Score | Go Score | Notes |
|-----------|------------|----------|-------|
| **Configurability** | | | YAML, Markdown, paths |
| **Modularity** | | | Clean separation |
| **Extensibility** | | | Add providers, features |
| **Integration** | | | External CLI calls |
| **Automation** | | | Binary, CI/CD, testing |
| **Dev Experience** | | | Tooling, ergonomics |
| **Ecosystem** | | | Libraries, maturity |
| **Performance** | | | Speed, memory |
| **Learning Curve** | | | For contributors |
| **Community** | | | Support, docs |
| **TOTAL** | | | |

(Scores filled in after building both prototypes)

---

## Implementation Plan

### Phase 1: Deno Prototype (2-3 days)

**Day 1: Setup + CLI + YAML**
- [x] Create deno.json config
- [x] Single-file main.ts
- [ ] CLI REPL with colored output
- [ ] Load agents.yaml and tasks.yaml from archive
- [ ] Display loaded config summary
- [ ] Test: Can we load configs? Parse correctly?

**Day 2: SQLite + Task Matching**
- [ ] Initialize SQLite database
- [ ] Create conversations table
- [ ] Save/load messages
- [ ] Simple keyword-based task matching
- [ ] Display matched task + agent
- [ ] Test: Does persistence work?

**Day 3: Claude Code Integration + Compilation**
- [ ] Call Claude Code CLI via subprocess
- [ ] Build prompt with task context
- [ ] Handle errors (CLI not available → simulate)
- [ ] Complete conversation flow
- [ ] Compile to single binary: `deno compile`
- [ ] Test binary on system
- [ ] Document findings

**Deliverable:** Working CLI that loads configs, matches tasks, saves conversations, calls Claude Code (or simulates), compiles to binary.

### Phase 2: Go Prototype (2-3 days)

**Same scope as Deno prototype**, implemented in Go:

**Day 1: Setup + CLI + YAML**
- [ ] Create go.mod
- [ ] Single-file main.go
- [ ] CLI REPL with colored output
- [ ] Load agents.yaml and tasks.yaml (gopkg.in/yaml.v3)
- [ ] Display loaded config summary

**Day 2: SQLite + Task Matching**
- [ ] Initialize SQLite (database/sql + mattn/go-sqlite3)
- [ ] Create conversations table
- [ ] Save/load messages
- [ ] Simple keyword-based task matching
- [ ] Display matched task + agent

**Day 3: Integration + Compilation**
- [ ] Call Claude Code CLI (os/exec)
- [ ] Handle errors/simulation
- [ ] Complete conversation flow
- [ ] Compile to single binary: `go build`
- [ ] Test binary on system
- [ ] Document findings

**Deliverable:** Working CLI that matches Deno prototype functionality.

### Phase 3: Comparison & Decision (1 day)

**Activities:**
- [ ] Fill in comparison matrix
- [ ] Score each prototype on Five Cornerstones (1-5)
- [ ] Document developer experience notes
- [ ] Measure binary sizes
- [ ] Test deployment story
- [ ] Write recommendation document
- [ ] Present findings to user

**Deliverable:** `PROTOTYPE_COMPARISON.md` with clear recommendation.

---

## Success Criteria

### Minimum Viable Prototype (Must Have)

✓ CLI accepts user input and displays responses
✓ YAML configs load successfully
✓ Task matching works (even if simple)
✓ SQLite saves and retrieves conversations
✓ Can call external CLI (Claude Code or simulate)
✓ Compiles to single binary executable

### Nice to Have (Bonus Points)

- Colored output works on all terminals
- Error messages are helpful
- Code is readable (even without full modularity)
- Binary size is reasonable (<50MB)
- Performance is acceptable

### Failure Conditions (Prototype Fails If...)

❌ Cannot load YAML configs (blocking issue)
❌ Cannot call external CLI reliably
❌ SQLite integration is painful
❌ Single binary compilation doesn't work
❌ Developer experience is terrible

---

## Risks & Mitigations

| Risk | Impact | Likelihood | Mitigation |
|------|--------|------------|------------|
| Claude Code CLI not available | Medium | High | Build simulation mode, test integration |
| YAML parsing issues | High | Low | Both have mature YAML libraries |
| SQLite integration complex | Medium | Low | Both have good SQLite support |
| Binary compilation fails | High | Low | Both support single-binary |
| Scope creep | High | Medium | Strict scope definition, timebox |
| Analysis paralysis | Medium | Medium | Fixed timeline, decision deadline |

---

## Prototype Guidelines

### Code Quality

**DO:**
- Write readable code (even if not production-ready)
- Add comments explaining non-obvious decisions
- Use standard libraries where possible
- Handle errors gracefully (don't crash on bad input)
- Follow language conventions (fmt for Go, deno fmt for Deno)

**DON'T:**
- Over-engineer (this is validation, not production)
- Skip error handling (but don't go overboard)
- Optimize prematurely (performance not the goal)
- Build abstractions we don't need yet
- Implement features outside scope

### Testing Approach

**Manual testing only** for prototypes:
- Test CLI interactions manually
- Verify database with SQLite browser
- Check compiled binary works
- Document what you tested

**No unit tests required** (this is prototype, not production).

---

## Alignment with Five Cornerstones

### How This Prototype Phase Embodies Our Principles

**1. Configurability:**
- Prototypes load configs from files (not hardcoded)
- Even in validation, we practice file-driven config

**2. Modularity:**
- Evaluation criteria specifically measures modular design
- Even single-file prototypes should show clean separation

**3. Extensibility:**
- We're testing how easy it is to extend
- Comparing languages on this dimension

**4. Integration:**
- External CLI integration is core to prototype scope
- Validates real-world collaboration pattern

**5. Automation:**
- Single binary compilation is explicit requirement
- Testing CI/CD story even in prototype phase

---

## Documentation Requirements

### Per Prototype

Each prototype directory must have:

**README.md** containing:
- How to install dependencies
- How to run the prototype
- How to compile to binary
- Example commands
- Known limitations

**FINDINGS.md** containing:
- What worked well
- What was painful
- Gotchas discovered
- Five Cornerstones scores (1-5 each)
- Recommendation for this technology

### After Both Prototypes

**PROTOTYPE_COMPARISON.md** containing:
- Side-by-side comparison matrix
- Pros/cons of each technology
- Final recommendation with rationale
- Decision aligned with Five Cornerstones
- Next steps for chosen technology

---

## Questions for User Validation

Before proceeding with Phase 1 implementation (after prototype decision), confirm:

1. Does the chosen technology align with your vision?
2. Are there deployment constraints we haven't considered?
3. Are there contributors/team members who prefer one language?
4. Does the binary size matter? (some systems have constraints)
5. Timeline acceptable? (10 weeks based on chosen tech)

---

## Final Notes

**This is NOT production code.** Prototypes are disposable. We learn, decide, then build properly.

**Success = Clear Decision.** If we finish prototypes and still can't decide, we failed.

**Timebox is Critical.** 6 days maximum. If not done by then, make decision with available data.

**Document Everything.** Future us needs to know why we chose what we chose.

---

**Created:** 2025-11-10
**Phase:** 0 (Technology Validation)
**Timeline:** 2-6 days
**Next:** Begin Deno prototype (Day 1)
