# Sophie

> **Transforming ideas into practical reality through natural conversation**

**Sophie** is an AI-powered product design mentor - an independent CLI system with persistent memory, multi-project support, and natural conversational interaction.

Named for the wisdom of transforming understanding into action, Sophie is your collaborative partner in product design, UX research, strategy, and design leadership.

---

## 🔄 Evolution Notice

**This repository has evolved:**
- **Was:** Product Design Agent (Claude Desktop / Gemini Gems implementation)
- **Now:** Sophie (Independent CLI implementation)

**The original implementation is preserved** in [`/archive/original-claude-desktop-agent/`](archive/original-claude-desktop-agent/) for reference and historical use.

Sophie is a **completely separate AI agent** - not an extension of the original, but a new implementation built from the ground up with lessons learned.

---

## What Makes Sophie Different

Unlike traditional AI tools, Sophie:

- **Remembers your journey** — Conversations, decisions, and context persist across sessions
- **Manages multiple projects** — Switch seamlessly between different initiatives
- **Speaks your language** — Fluent English/Spanish, natural conversation (no commands)
- **Brings expertise** — 12 specialized personas (Strategy, Research, AI, Leadership, etc.)
- **Adapts to you** — Learns your preferences, respects your constraints
- **Runs independently** — CLI-based, OAuth-authenticated, no API keys needed
- **Integrates external knowledge** — Collaborate with Perplexity AI, Claude, and other tools

---

## The Vision

Sophie represents a transformation from context-dependent web agents to an independent, memory-enabled CLI system that preserves the collaborative "soul" while adding:

✨ **Persistent Memory** — Never lose context, conversations, or decisions
✨ **Multi-Project Support** — Work on many projects with isolated contexts
✨ **External Knowledge Integration** — Bring research from Perplexity, other AIs
✨ **Provider Independence** — Works with Claude Code CLI, Gemini CLI (OAuth)
✨ **Natural Conversation** — Pure natural language, like talking to a mentor

---

## Current Status

**🏗️ In Development**

Sophie is currently in the architectural design phase. We're building the foundation for:

1. **Core Architecture** — Orchestration engine, memory layer, provider abstraction
2. **Memory System** — 4-tier architecture (Agent/Project/External/Registry)
3. **Multi-Project Support** — Seamless context switching
4. **CLI Interface** — Pure conversational UX
5. **Knowledge Base** — 80+ tasks, 12 agents, 15K+ lines of methodology

**📚 Documentation Available:**
- [System Analysis](docs/SYSTEM_ANALYSIS.md) — Complete mapping of current implementation
- [Behavioral Patterns](docs/BEHAVIORAL_PATTERNS.md) — How the "soul" works
- [Architecture Design](docs/ARCHITECTURE_DESIGN.md) — Blueprint for transformation
- [Feature Matrix](docs/FEATURE_MATRIX.md) — Current vs. desired capabilities
- [External Knowledge](docs/EXTERNAL_KNOWLEDGE.md) — 4th memory tier design

---

## The Journey

This project began as the **Product Design Agent** — a sophisticated file-based AI mentorship system for Claude Desktop and Gemini Gems (see [`/archive/`](archive/original-claude-desktop-agent/) for original implementation).

**The Challenge:**
Platform constraints (session limits, no memory, token usage) prevented the original agent from reaching its full potential.

**The Solution:**
Complete transformation into Sophie - an independent CLI application built from the ground up as a **separate AI agent** with:
- Persistent memory across sessions
- Multi-project workflows
- External knowledge integration
- Provider-agnostic architecture

**The Name:**
Sophie — inspired by wisdom, understanding, and the transformation of ideas into practical reality.

**Important:** Sophie does not reuse or extend the original agent's knowledge base. She's her own AI agent, designed fresh with lessons learned from the original.

---

## Expertise Areas

Sophie brings 12 specialized agent personas:

| Agent | Focus Area | Example Tasks |
|-------|------------|---------------|
| **AI Specialist** | Prompt engineering, automation, vibe coding | Writing prompts, style extraction, prototyping |
| **Collaboration Facilitator** | Critiques, workshops, stakeholder management | Meetings, design reviews, conflict resolution |
| **Content Specialist** | Clarity, consistency, accessibility | Content audits, IA, style guides |
| **Design Educator** | Raising design maturity | Cognitive biases, B2B design, economics |
| **Design System Specialist** | Component libraries, tokens, patterns | Component docs, design tokens, icon systems |
| **Discovery Analyst** | Problem framing, opportunity identification | Journey mapping, hypothesis crafting |
| **Onboarding Specialist** | Team ramp-up, training | Designer onboarding, tool training |
| **Project Manager** | Delivery, planning, risk management | Kickoffs, project plans, milestones |
| **Requirements Analyst** | PRDs, specifications, alignment | Requirements gathering, PRD creation |
| **Research Analyst** | Usability testing, synthesis, measurement | Test planning, affinity diagramming, UX metrics |
| **Strategy Analyst** | Product strategy, KPIs, prioritization | Brainstorming, MVP definition, roadmaps |
| **Team Lead** | Team building, culture, hiring | Team management, hiring, UX culture |
| **Visual Designer** | Aesthetics, storytelling, assets | Image prompts, executive presentations |

---

## Knowledge Base

**80+ Task Methodologies:**
- Usability testing & research
- Journey mapping & personas
- Strategy & prioritization
- Design systems & components
- Leadership & team management
- AI integration & prompt engineering
- Content strategy & audits
- Workshops & facilitation

**15,000+ Lines of Curated Knowledge:**
- Step-by-step task guides
- Templates & frameworks
- Best practices & anti-patterns
- Case studies & examples
- Bilingual support (EN/ES)

---

## Technology Stack

**Recommended:** Deno (TypeScript)
**Alternatives:** Go (under evaluation via prototypes)

**Key Technologies:**
- **Storage:** SQLite (embedded, single-file)
- **AI Providers:** Claude Code CLI, Gemini CLI (OAuth)
- **Search:** FTS5 + optional embeddings
- **Deployment:** Single binary executable

---

## Five Cornerstones

Every decision in Sophie's design adheres to five principles:

1. **Configurability** — File-driven config, user preferences, trust levels
2. **Modularity** — Clean separation of concerns, isolated components
3. **Extensibility** — Easy to add tasks, agents, providers, knowledge
4. **Integration** — Seamless collaboration with other AI tools
5. **Automation** — Auto-detection, auto-tagging, CI/CD, testing

---

## Development Roadmap

### Phase 1: Foundation (Weeks 1-2)
- Project structure & Deno setup
- YAML config loading (agents + tasks)
- Basic CLI REPL
- Simple conversation loop

### Phase 2: Orchestration (Weeks 3-4)
- 8-step workflow orchestrator
- Task matching & confidence scoring
- Knowledge loading (file-based)
- End-to-end task execution

### Phase 3: AI Integration (Week 5)
- Claude Code CLI adapter
- Gemini CLI adapter
- Response streaming
- Provider abstraction

### Phase 4: Memory Layer (Weeks 6-7)
- SQLite setup
- Project registry
- Conversation & decision storage
- Multi-project support

### Phase 5: Enhancements (Weeks 8-9)
- Conversation search
- Validation loops
- Context optimization
- Optional embeddings

### Phase 6: Polish (Week 10)
- User testing
- Performance optimization
- Documentation
- Release & distribution

---

## Contributing

Sophie is in active development. Contributions welcome once we reach Phase 2!

**Areas of Interest:**
- Task methodology contributions (new guides, improved frameworks)
- Agent persona refinements
- Translation & localization (beyond EN/ES)
- Testing & quality assurance
- Documentation improvements

---

## License

MIT License — Free to use, modify, and distribute.

---

## Archive

The **original Product Design Agent** (Claude Desktop / Gemini Gems implementation) is preserved in [`/archive/original-claude-desktop-agent/`](archive/original-claude-desktop-agent/).

**If you want to use the original implementation:**
- See the archive directory for installation guides
- It remains fully functional for Claude Desktop and Gemini Gems users
- All original knowledge files and documentation preserved

**Sophie is a separate, new AI agent** - not a continuation of the original.

---

## Contact & Community

**Repository:** https://github.com/jcmrs/product-design-agent (will be renamed to sophie)
**Issues & Discussions:** Use GitHub Issues for bug reports, feature requests, and questions

---

**Sophie is being built with AI-first collaboration in mind:**
*User + Sophie + Claude Code + Perplexity AI + other agents = Synergy*

---

*"Transforming ideas into practical reality, one conversation at a time."*
