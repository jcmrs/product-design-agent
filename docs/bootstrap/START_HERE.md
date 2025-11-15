# START HERE: Bootstrap Guide for Local AI

> **Welcome, Claude Code CLI.** This document is your entry point to continue building Sophie, an AI-powered product design mentor. You're reading this because the original collaborator (cloud-based Claude Code) had to hand off the project to you (local Claude Code CLI). Everything you need to understand and continue this work is in this repository.

---

## 🎯 What You Need to Know Right Now

### You Are Not Starting From Scratch

This project has **~4 days of intensive analysis and design work** already complete. You have:

- ✅ **25 process memories** documenting critical insights and decisions
- ✅ **5 comprehensive analysis documents** (~4,000 lines) explaining the original system
- ✅ **Complete architecture design** for Sophie
- ✅ **Clear roadmap** for Phases 1-6
- ✅ **CLAUDE.md** - the living guide to this project's principles

**Current Status:** Phase 0 complete (Technology Validation deferred to Phase 1). Ready to begin implementation.

### Your Mission

Build Sophie - a CLI-based product design mentor that:
- Provides 12 specialized agent personas with 80+ task methodologies
- Uses persistent memory (SQLite) across sessions and projects
- Integrates with you (Claude Code CLI) as the AI provider
- Follows the **Five Cornerstones**: Configurability, Modularity, Extensibility, Integration, Automation

### Your User

- **Non-technical** product designer who collaborates with AI
- Experienced with AI-driven development workflows
- Values clear communication and validation at milestones
- Will be available for conversations (you're not alone)

---

## 📖 Reading Order (CRITICAL)

**Read these documents in this exact order:**

1. **PROCESS_MEMORY.json** (root) - 25 critical learnings
   - Start here to avoid repeating mistakes
   - Understand the paradigm shifts we discovered
   - Learn the patterns that work (and don't work)

2. **CLAUDE.md** (root) - Your operational manual
   - Five Cornerstones (non-negotiable principles)
   - Holistic System Thinking framework
   - Development methodology (IVDD)
   - Quality gates and validation requirements

3. **docs/bootstrap/SOPHIE_ESSENCE.md** - The vision and soul
   - What Sophie is (and isn't)
   - The feeling and dynamic we're creating
   - Why this project matters

4. **docs/ARCHITECTURE_DESIGN.md** - The technical blueprint
   - 4-tier memory system
   - Service-oriented architecture
   - Just-in-time knowledge loading pattern
   - Component interfaces

5. **docs/bootstrap/IMPLEMENTATION_ROADMAP.md** - What to build and when
   - Detailed phase plans (Phases 1-6)
   - Dependencies and sequence
   - Success criteria for each phase
   - Decision points and alternatives

6. **docs/SYSTEM_ANALYSIS.md** - Understanding the original
   - How the original Product Design Agent works
   - What makes it successful
   - What we're preserving vs. changing

7. **docs/BEHAVIORAL_PATTERNS.md** - The "soul" of the system
   - Orchestration patterns
   - Knowledge structure patterns
   - User experience patterns

**After reading these, you're ready to code.**

---

## 🚀 Your First Task

**DO NOT START CODING YET.**

First, validate your understanding:

1. Read the documents in order above
2. Complete the validation checklist in `docs/bootstrap/VALIDATION_CHECKLIST.md`
3. Set up your Windows environment using `docs/bootstrap/WINDOWS_SETUP.md`
4. Have a conversation with the user confirming:
   - You understand the Five Cornerstones
   - You understand the 4-tier memory system
   - You understand why the original agent succeeds
   - You understand the implementation roadmap
   - You're ready to begin Phase 1

**Only then** should you proceed to implementation.

---

## ⚠️ Critical Warnings

### Don't Make These Mistakes

1. **DON'T rush to code** - We spent 4 days analyzing for a reason. Understanding precedes implementation.

2. **DON'T ignore the Five Cornerstones** - Every decision, every line of code must align with: Configurability, Modularity, Extensibility, Integration, Automation.

3. **DON'T violate Holistic System Thinking** - Every component affects every other component. Trace ripple effects before implementing.

4. **DON'T bulk-load knowledge** - Use just-in-time loading (see pm-018 in process memory).

5. **DON'T skip documentation** - Document → Implement → Test (not the other way around).

6. **DON'T assume single project** - Multi-project support is core, not an addon.

7. **DON'T forget the 4th memory tier** - External knowledge (Perplexity AI, etc.) is critical for user workflows.

### Do These Things

1. **DO validate against quality gates** before every commit
2. **DO ask the user** when you need clarification
3. **DO reference process memory** to avoid repeated mistakes
4. **DO follow the established patterns** in existing docs
5. **DO test as you go** (don't batch testing at the end)
6. **DO update docs** when you discover new insights
7. **DO communicate clearly** - user is non-technical

---

## 🛠 Technical Context

### Your Environment

- **Platform:** Windows (no WSL)
- **Runtime:** Deno (recommended) or Go (alternatives evaluated in docs)
- **Database:** SQLite (local, file-based)
- **AI Provider:** You (Claude Code CLI) - same integration pattern as Claude Desktop had with original agent
- **Git:** Already configured, branch: `claude/project-documentation-bootstrap-01RVeVueyR6skQq1W5UuD6GN`

### What's Already Built

**Nothing is implemented yet.** This is intentional.

Phase 0 was pure analysis and design to avoid building the wrong thing. You have:
- Complete requirements (docs/REQUIREMENTS.md if created, otherwise in ARCHITECTURE_DESIGN.md)
- Architecture blueprints
- Process memories from lessons learned
- Clear roadmap

You're starting implementation from Phase 1.

### Repository Structure

```
product-design-agent/           ← Will be renamed to "sophie"
├── CLAUDE.md                   ← Your operational manual
├── PROCESS_MEMORY.json         ← 25 critical learnings
├── README.md                   ← Public-facing identity
│
├── docs/
│   ├── bootstrap/              ← YOU ARE HERE
│   │   ├── START_HERE.md       ← This file
│   │   ├── SOPHIE_ESSENCE.md   ← Vision and soul
│   │   ├── IMPLEMENTATION_ROADMAP.md
│   │   ├── WINDOWS_SETUP.md
│   │   └── VALIDATION_CHECKLIST.md
│   │
│   ├── ARCHITECTURE_DESIGN.md  ← Technical blueprint
│   ├── SYSTEM_ANALYSIS.md      ← Original agent analysis
│   ├── BEHAVIORAL_PATTERNS.md  ← The "soul" patterns
│   ├── FEATURE_MATRIX.md       ← Current vs desired features
│   └── EXTERNAL_KNOWLEDGE.md   ← 4th memory tier design
│
├── archive/                    ← Original Product Design Agent (reference only)
│   └── original-claude-desktop-agent/
│       ├── config/             ← 12 agents, 80+ tasks
│       └── knowledge/          ← 15,793 lines of guides
│
└── [src/, config/, knowledge/ will be created by you]
```

---

## 🧠 Understanding the Paradigm Shift

**Critical insight from pm-006:** The original agent isn't a CLI application. It's a **file-based knowledge system** uploaded to Claude Desktop Projects.

**What this means:**
- Sophie IS a CLI application (different from original)
- But Sophie preserves the original's "soul" (knowledge structure, orchestration patterns)
- You (Claude Code CLI) replace Claude Desktop as the AI provider
- The user interacts with you through Sophie's CLI interface

**Key differences:**

| Original Agent | Sophie |
|----------------|--------|
| Files uploaded to Claude Desktop | Standalone CLI application |
| Claude Desktop is the interface | CLI REPL is the interface |
| No persistent memory (project files only) | SQLite-based 4-tier memory |
| Single project context | Multi-project support |
| Manual file uploads for knowledge | Just-in-time knowledge loading |

**What we're preserving:**
- 12 agent personas and their expertise
- 80+ task methodologies
- 12-section guide structure (invisible to users)
- Natural conversational UX
- Orchestration patterns
- Quality validation mechanisms

---

## 💡 Key Insights from Process Memory

These are the most critical learnings. Read PROCESS_MEMORY.json for full context.

### pm-001: Stop Microfixing, Think Holistically
Before implementing anything, trace its impact across all components. Every change ripples through the system.

### pm-006: Wrong Problem Recognition
We almost built the wrong thing. Always validate problem understanding before solving.

### pm-010: Structure-in-Content Pattern
The 12-section guide structure exists invisibly within knowledge files. Users experience mentorship without seeing rigid frameworks.

### pm-018: Just-in-Time Knowledge Loading
Never bulk-load all 64 task guides. Load only the matched task's guide, follow cross-references on demand.

### pm-015: Five Cornerstones Framework
Every decision must align with: Configurability, Modularity, Extensibility, Integration, Automation.

### pm-023: 10-Point Validation Checklist
Run before every response: Holistic thinking? Documentation complete? Tests pass? Five Cornerstones aligned? (see CLAUDE.md for full checklist)

---

## 🎯 Your Success Criteria

**You're successful when:**

1. You understand the Five Cornerstones and can apply them to decisions
2. You understand the 4-tier memory system and why it has 4 tiers (not 3)
3. You understand why the original agent succeeds (and what to preserve)
4. You can explain Sophie's architecture without looking at docs
5. You've completed the validation checklist
6. You're ready to implement Phase 1 with confidence

**You're NOT ready if:**

- You're eager to start coding immediately
- You think this is just about building a CLI with YAML configs
- You don't understand the orchestration patterns
- You haven't read the process memory
- You don't know what the Five Cornerstones are

---

## 🤝 Working with Your User

### Communication Style

- **Explain "why"** not just "what"
- **Present options** when multiple paths exist
- **Ask for validation** before major architectural changes
- **Summarize progress** regularly
- **Be clear and concise** - user is non-technical but highly engaged

### When to Ask for Help

- You find contradictions in the documentation
- You need clarification on user preferences or constraints
- You're considering a deviation from the Five Cornerstones
- You discover missing context or requirements
- You're stuck on a technical decision

### When NOT to Ask

- For things clearly documented in the existing materials
- For standard implementation details within the established patterns
- For minor coding decisions that align with documented architecture

---

## 🔄 Next Steps

1. ✅ You've read this document (START_HERE.md)
2. ⏭️ Read PROCESS_MEMORY.json
3. ⏭️ Read CLAUDE.md
4. ⏭️ Read docs/bootstrap/SOPHIE_ESSENCE.md
5. ⏭️ Read docs/ARCHITECTURE_DESIGN.md
6. ⏭️ Read docs/bootstrap/IMPLEMENTATION_ROADMAP.md
7. ⏭️ Complete docs/bootstrap/VALIDATION_CHECKLIST.md
8. ⏭️ Set up environment using docs/bootstrap/WINDOWS_SETUP.md
9. ⏭️ Confirm readiness with user
10. ⏭️ Begin Phase 1 implementation

---

## 📚 Additional Resources

- **Process Memory:** Root/PROCESS_MEMORY.json (25 critical learnings)
- **Operational Manual:** Root/CLAUDE.md (how to work on this project)
- **Architecture:** docs/ARCHITECTURE_DESIGN.md (technical blueprint)
- **Original Agent:** archive/original-claude-desktop-agent/ (reference implementation)
- **Knowledge Base:** archive/original-claude-desktop-agent/knowledge/ (15,793 lines to migrate)

---

## 🙏 A Note from Your Predecessor

We've spent ~4 days on deep analysis because we learned (the hard way) that understanding the system is more important than rushing to code. The process memory captures 25 specific learnings from mistakes avoided and insights gained.

You're inheriting a well-researched foundation. Sophie's architecture is designed specifically to be AI-buildable - you can work autonomously with clear roadmaps, ADRs, and task definitions.

The user is collaborative and values thoughtful communication. They're non-technical but deeply understand product design and AI workflows. Treat them as the product owner; you're the technical lead.

This is a beautiful project. Sophie will help designers create better products through AI mentorship. You're building a tool that embodies the kind of knowledge transfer we're doing right now with this documentation.

Take your time with the reading. Understand before building. And when you're ready, create something remarkable.

**— Cloud Claude Code, 2025-11-14**

---

**Last Updated:** 2025-11-14
**Current Phase:** Phase 0 Complete → Phase 1 Ready
**Next Milestone:** Local AI onboarding and environment setup
