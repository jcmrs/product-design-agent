# Claude Code Development Guide for Sophie

> **This document ensures AI assistants working on Sophie maintain context, principles, and architectural decisions across sessions.**

---

## Project Identity

**Name:** Sophie
**Purpose:** AI-powered product design mentor with persistent memory and multi-project support
**Status:** Phase 0 Complete → Phase 1 Ready (Foundation implementation can begin)

**What Sophie Is:**
- Independent CLI application for product design mentorship
- 12 specialized agent personas, 80+ task methodologies
- Persistent memory across sessions (SQLite)
- Multi-project support with isolated contexts
- Natural conversational UX (no commands)
- Provider-agnostic (Claude Code CLI, Gemini CLI via OAuth)

**What Sophie Is NOT:**
- Not an extension of the archived Product Design Agent
- Not dependent on Claude Desktop or Gemini Gems platforms
- Not a web application (CLI first, web UI future enhancement)
- Not a code-only tool (human-AI collaboration is core)

---

## 🚀 For Local AI: Start Here

**If you're a local Claude Code CLI picking up this project:**

This project includes a comprehensive **AI Bootstrap Package** in `docs/bootstrap/` designed specifically for knowledge transfer.

**Your entry point:** `docs/bootstrap/START_HERE.md`

The bootstrap package contains:
- **START_HERE.md** - Entry point with reading order and critical warnings
- **SOPHIE_ESSENCE.md** - Vision, soul, and purpose (the "why")
- **IMPLEMENTATION_ROADMAP.md** - Detailed phase-by-phase implementation guide
- **WINDOWS_SETUP.md** - Environment setup for Windows (no-WSL)
- **VALIDATION_CHECKLIST.md** - 45 questions to verify comprehension
- **AI_BOOTSTRAP_GUIDE.md** - Quick-start practical guide

**Critical:** Read documents in the order specified in START_HERE.md, complete the validation checklist, and have a conversation with the user before writing any code.

This document (CLAUDE.md) is part of your reading list - continue below after reading the bootstrap package.

---

## Five Cornerstones

Every decision, every line of code, every document must adhere to these principles:

### 1. **Configurability**
- File-driven configuration (YAML for structure, Markdown for content)
- User preferences stored in database
- Trust levels and permissions configurable
- No hardcoded values that should be user-controlled
- Support for bilingual operation (EN/ES minimum)

**Examples:**
- Agent definitions in `config/agents.yaml`
- Task methodologies in `config/tasks.yaml`
- Knowledge guides in `knowledge/task_guides/`
- User preferences in SQLite `user_preferences` table

### 2. **Modularity**
- Clean separation of concerns
- Each component has single, well-defined responsibility
- No tight coupling between components
- Database, AI provider, CLI, orchestration all separate
- Easy to test components in isolation

**Examples:**
- Provider abstraction: swap Claude Code for Gemini CLI without changing core
- Memory layer: independent of orchestration logic
- YAML loader: separate from task matching
- CLI interface: separate from conversation engine

### 3. **Extensibility**
- Easy to add new agents without code changes (YAML only)
- Easy to add new tasks (YAML + Markdown guides)
- Easy to add new AI providers (implement adapter interface)
- Support for plugins/extensions (future)
- Knowledge base grows without refactoring

**Examples:**
- Adding 13th agent: edit `agents.yaml`, add knowledge guide
- Adding new provider: implement `AIProvider` interface
- Adding search capability: extend memory layer, don't rebuild it

### 4. **Integration**
- Designed for multi-AI collaboration workflows
- External knowledge tier for Perplexity AI, Claude, other tools
- Git integration for version control
- Export/import capabilities for portability
- API-first design (even if CLI is primary interface)

**Examples:**
- User workflow: Sophie + Perplexity research + Claude Code + other AIs
- External knowledge provenance tracking
- Citation format: `[Perplexity AI, 2025-11-08, ✓ verified]`
- Future MCP server integration

### 5. **Automation**
- CI/CD for quality assurance
- Auto-detection (language, intent, task matching)
- Auto-tagging and categorization
- Testing framework from day one
- Documentation generation where possible

**Examples:**
- Intent extraction: no explicit task selection needed
- Language detection: automatic EN/ES switching
- Confidence scoring: automatic task matching validation
- Unit tests for all core components
- Integration tests for workflows

---

## Holistic System Thinking

**Principle:** Every component affects every other component. Design decisions ripple through the entire system.

### Questions to Ask Before Any Change:

1. **Configurability Impact:** Does this introduce hardcoded values? Should it be configurable?
2. **Modularity Impact:** Does this couple components unnecessarily? Can it be isolated?
3. **Extensibility Impact:** Will adding a new [agent/task/provider] require code changes?
4. **Integration Impact:** Does this affect external tool collaboration? Data portability?
5. **Automation Impact:** Can this be automated? Should users manually trigger it?

### Ripple Analysis:

Before implementing any feature, trace its impact:

```
Example: Adding "Switch Project" feature

Memory Layer:
  → Need project_id in all conversation tables
  → Need project registry table
  → Need last_active_project in user preferences

Orchestration:
  → Need to load project-specific context
  → Need to clear cached knowledge on switch
  → Need to update project metadata (last_accessed)

CLI:
  → Need to detect "switch to X project" intent
  → Need to list available projects
  → Need to confirm switch (if unsaved work?)

AI Provider:
  → No direct impact (good modularity!)

Configuration:
  → Should "auto-switch on keyword" be configurable?
```

This prevents "gotcha" moments where we implement something and realize it breaks elsewhere.

---

## Development Methodology

### Framework: Iterative Validation-Driven Development (IVDD)

**Core Principles:**
1. **Build → Validate → Refine** (not Build → Build → Build)
2. **Document → Implement → Test** (documentation first)
3. **Prototype → Compare → Decide** (validate tech choices)
4. **Conversation → Code** (understand before coding)

### Workflow:

```
Phase Start:
  1. Document objectives and constraints
  2. Design architecture (align with Five Cornerstones)
  3. Review against Holistic System Thinking
  4. Get user validation (user is non-technical, needs clarity)

Implementation:
  5. Write tests first (TDD where applicable)
  6. Implement minimal viable component
  7. Validate against objectives
  8. Refine based on validation
  9. Document decisions and learnings

Phase End:
  10. Integration test with other components
  11. Update architecture docs if design changed
  12. User validation of functionality
```

### Quality Gates:

Before marking any task complete, validate:
- ✓ Adheres to all Five Cornerstones
- ✓ Documented (code comments + external docs)
- ✓ Tested (unit + integration where applicable)
- ✓ No hardcoded values that should be configurable
- ✓ No tight coupling introduced
- ✓ Extensibility preserved

---

## Current Status & Roadmap

### Completed:
- ✓ Repository transformation (archive original, establish Sophie)
- ✓ System analysis (SYSTEM_ANALYSIS.md)
- ✓ Behavioral patterns analysis (BEHAVIORAL_PATTERNS.md)
- ✓ Architecture design (ARCHITECTURE_DESIGN.md)
- ✓ Feature matrix (FEATURE_MATRIX.md)
- ✓ External knowledge design (EXTERNAL_KNOWLEDGE.md)

### Current Phase: Phase 0 - Technology Validation

**Objective:** Validate Deno vs Go for Sophie implementation

**Scope:**
- Deno prototype (CLI REPL, YAML loading, Claude adapter, SQLite)
- Go prototype (same scope)
- Comparison document
- Technology decision

**NOT in scope for prototypes:**
- Full orchestration engine
- Complete memory layer
- Web UI
- Advanced features

**Timeline:** 2-6 days maximum

### Next Phases:
- Phase 1: Foundation (Weeks 1-2)
- Phase 2: Orchestration (Weeks 3-4)
- Phase 3: AI Integration (Week 5)
- Phase 4: Memory Layer (Weeks 6-7)
- Phase 5: Enhancements (Weeks 8-9)
- Phase 6: Polish (Week 10)

---

## Architecture Principles

### 4-Tier Memory System

**Critical Design:** Sophie has FOUR memory tiers, not three.

1. **Agent Memory** - Built-in knowledge (task guides, agent personas)
2. **Project Memory** - User conversations, decisions, context per project
3. **Project Registry** - Cross-project metadata, preferences
4. **External Knowledge** - Perplexity AI research, other AI outputs (with provenance)

**Why Four Tiers?**
- Prevents context contamination
- Enables multi-AI collaboration
- Maintains source attribution
- Allows conflict detection between internal and external knowledge

### Service-Oriented Architecture

```
┌─────────────────────────────────────────────────────┐
│                    CLI Interface                     │
└──────────────────────┬──────────────────────────────┘
                       │
┌──────────────────────┴──────────────────────────────┐
│              Orchestration Engine                    │
│  (Intent → Task → Agent → Knowledge → Response)     │
└──┬────────┬─────────┬──────────┬────────────────┬──┘
   │        │         │          │                │
   │        │         │          │                │
┌──┴──┐ ┌──┴────┐ ┌─┴─────┐ ┌──┴────────┐  ┌───┴──────┐
│ AI  │ │Memory │ │Config │ │ Knowledge │  │Validation│
│Prov │ │Layer  │ │Loader │ │  Loader   │  │  Engine  │
└─────┘ └───────┘ └───────┘ └───────────┘  └──────────┘
```

**Key Interfaces:**

```typescript
// AI Provider abstraction
interface AIProvider {
  name: string;
  call(prompt: string, options?: CallOptions): Promise<string>;
  stream(prompt: string, options?: CallOptions): AsyncIterator<string>;
}

// Memory layer abstraction
interface MemoryLayer {
  saveConversation(projectId: string, message: Message): void;
  loadContext(projectId: string, limit?: number): Message[];
  searchConversations(projectId: string, query: string): SearchResult[];
}

// Config loader abstraction
interface ConfigLoader {
  loadAgents(): Agent[];
  loadTasks(): Task[];
  validateConfig(): ValidationResult;
}
```

### Just-in-Time Knowledge Loading

**DO NOT bulk-load all knowledge files.** This was a critical insight from analyzing the original agent.

**Pattern:**
1. User sends message
2. Match task based on keywords/intent
3. Load ONLY the knowledge guide for that task
4. Inject into AI provider prompt
5. Generate response
6. Clear loaded knowledge

This keeps token usage minimal and context relevant.

---

## Working with This Project

### For AI Assistants (Claude Code, etc.):

**On Session Start:**
1. Read this file (CLAUDE.md) first
2. Read docs/ARCHITECTURE_DESIGN.md for system blueprint
3. Check current phase/status above
4. Review recent commits to understand what's been done

**Before Implementing:**
1. Check if there's a design doc for this feature
2. Validate against Five Cornerstones
3. Trace ripple effects (Holistic System Thinking)
4. Document design decisions

**While Implementing:**
1. Follow the established patterns in existing code
2. Add comments explaining non-obvious decisions
3. Update this file if you discover new principles
4. Test as you go (don't batch testing at end)

**Before Committing:**
1. Validate against quality gates (see above)
2. Update relevant docs if architecture changed
3. Run tests (when test framework exists)
4. Clear, descriptive commit message

### For Human Collaborators:

**User is non-technical** - AI leads with expertise, explains decisions, seeks validation on direction.

**Communication Style:**
- Explain "why" not just "what"
- Present options when multiple paths exist
- Ask for validation before major architectural changes
- Summarize progress regularly

**When Stuck:**
- Review this document
- Check docs/ for design context
- Look at archive/ to understand original patterns
- Ask user for clarification (they may have constraints we don't know)

---

## File Structure

```
product-design-agent/ (to be renamed to sophie)
├── CLAUDE.md                    ← You are here
├── README.md                    ← Sophie's public identity
├── LICENSE                      ← MIT
│
├── docs/                        ← Architecture & analysis
│   ├── SYSTEM_ANALYSIS.md       ← Original agent mapping
│   ├── BEHAVIORAL_PATTERNS.md   ← How the "soul" works
│   ├── ARCHITECTURE_DESIGN.md   ← Sophie's blueprint
│   ├── FEATURE_MATRIX.md        ← Current vs desired
│   └── EXTERNAL_KNOWLEDGE.md    ← 4th memory tier design
│
├── archive/                     ← Original Product Design Agent
│   └── original-claude-desktop-agent/
│       ├── config/              ← Reference: 12 agents, 80+ tasks
│       ├── knowledge/           ← Reference: 15,793 lines of guides
│       └── [installation docs]
│
├── config/                      ← Sophie's configuration (empty, to be created)
│   ├── agents.yaml              ← Sophie's agent definitions
│   └── tasks.yaml               ← Sophie's task definitions
│
├── knowledge/                   ← Sophie's knowledge base (empty, to be created)
│   ├── task_guides/             ← Methodology guides
│   └── materials/               ← Supporting materials
│
├── src/                         ← Implementation (empty, to be created)
│   ├── cli/                     ← CLI interface
│   ├── orchestration/           ← Workflow engine
│   ├── memory/                  ← 4-tier memory system
│   ├── providers/               ← AI provider adapters
│   ├── config/                  ← Config loading
│   ├── knowledge/               ← Knowledge loading
│   └── validation/              ← Quality control
│
└── prototypes/                  ← Technology validation
    ├── deno-poc/                ← Deno prototype (in progress)
    └── go-poc/                  ← Go prototype (pending)
```

---

## Common Pitfalls

### ❌ Don't:
- Jump into code without design docs
- Hardcode values that should be configurable
- Couple components tightly
- Bulk-load all knowledge files
- Assume single project (multi-project is core)
- Ignore external knowledge tier
- Skip testing
- Write code without comments
- Commit without validating against Five Cornerstones

### ✓ Do:
- Document first, implement second
- Think through ripple effects
- Keep components modular
- Load knowledge just-in-time
- Design for multi-project from start
- Separate internal and external knowledge
- Write tests alongside code
- Explain non-obvious decisions in comments
- Validate quality gates before committing

---

## Decision Log

**Major decisions made during development:**

1. **Repository Strategy** (2025-11-10)
   - Decision: Transform product-design-agent repo into Sophie (vs new repo)
   - Rationale: Preserve 127K tokens of conversation context
   - Archive: Original agent preserved in archive/

2. **Name: Sophie** (2025-11-10)
   - Decision: Sophie (wisdom, transformation, practical reality)
   - Rationale: Memorable, meaningful, works as CLI command

3. **Technology Stack** (2025-11-10)
   - Recommendation: Deno (TypeScript)
   - Alternative: Go (under evaluation)
   - Decision pending: Prototype comparison (Phase 0)

4. **4-Tier Memory** (2025-11-10)
   - Decision: Add External Knowledge tier
   - Rationale: Support multi-AI collaboration, prevent context contamination
   - User innovation: Perplexity + Claude Code + Sophie workflow

5. **Development Methodology** (2025-11-10)
   - Framework: Iterative Validation-Driven Development (IVDD)
   - Principles: Document → Implement → Test
   - Quality gates enforced before task completion

---

## Questions & Clarifications

**If you need clarification:**
- Check docs/ for design context
- Review this file for principles
- Check git history for evolution
- Ask user (they're involved, may have constraints)

**If you discover missing context:**
- Add it to this file
- Update relevant docs
- Commit with clear message explaining addition

**If you find a contradiction:**
- Raise it immediately (don't assume)
- Document the contradiction
- Propose resolution aligned with Five Cornerstones

---

## Success Criteria

**Sophie is successful when:**

1. **Configurability:** Users can customize agents, tasks, preferences without code
2. **Modularity:** Components can be tested, replaced, extended independently
3. **Extensibility:** Adding agents/tasks/providers requires minimal effort
4. **Integration:** Works seamlessly with Perplexity, Claude Code, other AI tools
5. **Automation:** Intent detection, task matching, language detection work automatically

**Sophie is NOT successful if:**
- Requires technical expertise to configure
- Components are tightly coupled
- Adding features requires refactoring
- Can't collaborate with other AI tools
- Users must manually select tasks/agents

---

## Final Notes

**This is a Living Project.**

- This document evolves as we learn
- Architecture adapts based on validation
- User needs drive decisions
- Five Cornerstones are non-negotiable
- Holistic System Thinking prevents shortcuts

**Remember:**
- User is non-technical (AI leads with expertise)
- Sophie is separate from archived agent (new identity, new architecture)
- Multi-project support is core (not an addon)
- External knowledge tier is critical (4 tiers, not 3)
- Natural conversation UX (no commands)

---

**Last Updated:** 2025-11-14
**Current Phase:** Phase 0 Complete → Phase 1 Ready
**Next Milestone:** Local AI onboarding and Phase 1 implementation (Foundation)
**Bootstrap Package:** docs/bootstrap/ (AI handoff documentation complete)
