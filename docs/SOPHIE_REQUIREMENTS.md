# Sophie: Requirements & Design Specification

> **Synthesis of all analyses → Technical requirements for Sophie implementation**

**Date:** 2025-11-14
**Purpose:** Define what Sophie must be, how it must work, and what it must produce
**Status:** Complete - Ready for Implementation Planning

---

## Executive Summary

After comprehensive analysis of the Product Design Agent (5 analysis documents, 127K+ conversation tokens), we now understand **WHY it works** and can define **WHAT Sophie must be**.

**The Core Discovery:**

The Product Design Agent isn't a CLI application—it's an **expert guidance system** that combines:
- 12 specialized agent personas with distinct expertise
- 64 comprehensive methodologies (15,793 lines of curated knowledge)
- File-based orchestration (YAML config + markdown guides)
- Just-in-time knowledge loading (load what's needed, when it's needed)
- Natural conversation UX (no commands, LLM handles flow)
- Expert mentorship experience (invisible structure, visible expertise)

**What This Means for Sophie:**

Sophie is **NOT** a CLI app that replaces the Product Design Agent.

Sophie **IS** the Product Design Agent **evolved** to:
- Run within Claude Code CLI / Gemini CLI (not Claude Desktop / Gemini Gems)
- Add persistent memory (SQLite database across sessions)
- Support multi-project workflows (isolated contexts)
- Integrate external knowledge (Perplexity AI, other tools with provenance)
- Maintain the exact same user experience (natural conversation, expert mentorship)

---

## The Three Requirements

Per user's directive: "To bring to fruition what we set out to do requires Claude Code to fully understand it so that it can build it - in such a way that:"

### 1. It Feels and Functions as Required to the User

**User Experience Requirements:**

**Natural Conversation (Zero-Scripted)**
- User speaks naturally: "I need to plan a usability test"
- Agent responds as expert mentor (not documentation lookup)
- NO commands (no /usability-test, no menus, no numbered options)
- Conversation flows naturally with back-and-forth
- Structure exists in knowledge content, not in conversation script

**Expert Mentorship Feel**
- 12 agent personas (Research Analyst, Strategy Analyst, etc.)
- Each with role, backstory, expertise, operating procedures
- Consistency in character throughout conversation
- Professional guidance, not robotic instructions
- "Let's plan your usability test together" vs "Here are the steps"

**Invisible Orchestration**
- User doesn't see task matching happening
- User doesn't know guides are being loaded
- User doesn't notice validation checklist running
- Magic happens out of sight
- User experiences seamless expertise

**Bilingual & Culturally Adaptive**
- Responds in user's language (EN/ES, auto-detected)
- Handles code-switching naturally
- Regional variations (mx, es, ar, us, uk)
- Cultural context adaptation (Spanish business practices, regional UX patterns)

**Project-Aware Context**
- Remembers project details across sessions (NEW: persistent memory)
- Adapts methodology to project constraints
- Uses project terminology
- Maintains alignment with stated goals

**Confidence-Building**
- Examples, templates, checklists provided
- "Here's how" not just "here's what"
- References to expert sources (credibility)
- Clear next steps and follow-ups

### 2. It Functions and Operates as Required for the Process

**Orchestration Requirements:**

**Task Matching System**
```
User message
  ↓
Intent extraction (keywords, semantic meaning)
  ↓
Task matching (tasks.yaml)
  - Confidence scoring: HIGH (>80%), MEDIUM (50-80%), LOW (<50%)
  - Fuzzy matching for variations
  - Multi-task matches when appropriate
  ↓
Agent identification (agents.yaml)
  - Load agent persona
  - Activate operating procedures
  - Prepare for handoffs
  ↓
Knowledge loading (just-in-time)
  - Load matched task guide(s)
  - Resolve cross-references
  - Load materials if referenced
  ↓
Response generation
  - As agent persona
  - Using methodology from guide
  - Adapted to project context
  - Following user preferences
  ↓
Validation
  - 10-point checklist
  - Fix gaps, re-generate if needed
  ↓
Delivery
```

**Two-Tier Knowledge System**

**Tier 1: Agent Memory (Built-in)**
- config/agents.yaml (12 agent definitions)
- config/tasks.yaml (64 task mappings)
- knowledge/task_guides/ (64 methodology files)
- knowledge/materials/ (11 support files)
- Total: 15,793 lines of expert knowledge

**Tier 2: Project Memory (User-specific, NEW)**
- Conversation history per project
- Decisions made
- Project context (goals, constraints, stakeholders)
- User preferences
- Work artifacts created
- SQLite database, isolated by project

**Just-in-Time Loading**
- Don't bulk-load all 64 guides (token waste)
- Load guide only when task matched
- Follow cross-references on demand
- Progressive disclosure through links
- Keep context minimal and relevant

**Cross-Reference Network**
- Guides reference other guides
- Guides reference materials
- Materials reference guides
- System must resolve references
- Enable progressive learning

**Agent Collaboration**
- Handoff patterns defined in agents.yaml
- "Research Analyst → Strategy Analyst for prioritization"
- "Strategy Analyst → UX Specialist for design"
- Multi-agent workflows for complex tasks
- Smooth transitions between expertise areas

**User Preferences**
- Optional user_preferences.yaml or .md
- Categories: response_format, language, search_strategy, workflow
- Checked before every response
- Graceful degradation if missing
- Project constraints override preferences

**Validation & Quality**
- 10-point validation checklist before delivery
- Ensure project context integrated
- Verify sources accessed
- Assess confidence level
- Note limitations explicitly

### 3. It Produces What is Required for Product Development

**Deliverable Requirements:**

**Structured Documents**
- Usability test plans (complete with objectives, tasks, questionnaires)
- Journey maps (with entry points, scenarios, metrics)
- Research reports (synthesis, insights, recommendations)
- Strategy documents (MVP definitions, prioritization frameworks)
- Workshop templates (mental models, design critiques)
- Design briefs (requirements, constraints, success criteria)

**Formatted Outputs**
- Markdown-formatted (professional, readable)
- Code blocks for prompts, scripts, technical content
- Tables for comparisons, checklists, matrices
- Headings, lists, emphasis for structure
- Citations to expert sources

**Templates with Examples**
- Not just blank templates (overwhelming)
- Filled examples from different domains (B2B, healthcare, e-commerce)
- 500+ lines of realistic content to adapt
- Show pattern through demonstration
- Reduce cognitive load to customize

**Reusable Components**
- Checklists (preparation, validation, follow-up)
- Question banks (categorized with "When/How to Use")
- Prompt libraries (with usefulness ratings)
- Data lists (cognitive biases, metrics, audit checklists)
- JSON/CSV formats for machine-readable data

**Professional Quality Standards**
- Evidence-based (5-7 expert references per guide)
- Industry-standard terminology
- Best practices embedded
- Anti-patterns explicitly noted
- Quality bars defined

**Actionable, Not Theoretical**
- Concrete steps, not concepts
- Checklists throughout
- Time estimates (60-min workshop, 2-week timeline)
- Tool recommendations (specific platforms)
- "Do this" not "think about this"

**Bilingual Outputs**
- Primary language based on user preference
- Key terms in both EN/ES when helpful
- Bilingual role names (Research Analyst / Analista de Investigación)
- Regional content audit checklists (EN, ES)

---

## What Sophie Must Preserve

### From Product Design Agent

**1. File-Based Knowledge System**
- config/ (YAML: agents, tasks)
- knowledge/task_guides/ (64 methodologies)
- knowledge/materials/ (11 support files)
- Separation of configuration, methodology, tools
- No code changes to add agents/tasks

**2. Orchestration Pattern**
- 8-step workflow (check preferences → analyze files → extract intent → match task → identify agent → load knowledge → generate → validate)
- Conditional execution (if project files present, if preferences set)
- Validation checklist (10 items)
- Error handling (no match, partial match, missing context)

**3. Agent Persona System**
- 12 specialized roles
- Backstories and operating procedures
- Collaboration and handoff patterns
- Character consistency
- Expert mentorship tone

**4. Universal Guide Structure**
- 12-section pattern (summary → overview → preparation → process → templates → practices → roles → follow-up → FAQ → references)
- Depth varies (50-500 lines), structure doesn't
- Actionable orientation (checklists, examples, scripts)
- Evidence-based (expert references)

**5. Just-in-Time Loading**
- Task matching first
- Load guide only when matched
- Cross-reference resolution
- Progressive disclosure
- Token efficiency

**6. Two-Tier Context Priority**
- User project context (authoritative)
- Methodology framework (reference)
- Project-specific requirements override generic
- Integration of both in responses

**7. Bilingual Support**
- Intelligent language detection
- Code-switching support
- Regional variations
- Cultural context adaptation

---

## What Sophie Must Add

### New Capabilities (Not in Original)

**1. Persistent Memory**

**Project Memory (per project):**
- Conversation history (messages, responses, context)
- Decisions made and rationale
- Project metadata (goals, constraints, stakeholders)
- Work artifacts created (documents, templates populated)
- User feedback on guidance quality
- Timestamps and provenance

**Project Registry (cross-project):**
- List of all projects
- Project names, descriptions
- Last accessed, creation dates
- Project-level preferences
- Cross-project insights (optional: "similar to X project")

**User Preferences (global):**
- Response format, language, search strategy
- Workflow preferences, output priorities
- Trust levels, permissions
- Persistent across all projects

**Implementation:** SQLite database
- projects table (id, name, description, created, last_accessed)
- conversations table (id, project_id, role, content, timestamp)
- decisions table (id, project_id, decision, rationale, timestamp)
- artifacts table (id, project_id, type, content, timestamp)
- user_preferences table (key, value, category)

**2. Multi-Project Support**

**Project Switching:**
- "Switch to X project" → load project-specific context
- Clear cached knowledge from previous project
- Update last_accessed timestamp
- Maintain context isolation

**Project Creation:**
- "Create new project: [name]" → new project in registry
- Initialize empty conversation history
- Set default preferences (inherited from global)
- Confirmation message with project ID

**Project Listing:**
- "Show my projects" → list from registry
- Display name, last accessed, conversation count
- Enable quick switching

**Context Isolation:**
- Project A conversations never bleed into Project B
- Agent memory scoped to current project
- Prevent cross-contamination

**3. External Knowledge Integration (4th Memory Tier)**

**Sources:**
- Perplexity AI research
- Claude Code collaboration outputs
- Other AI tool results
- Web research, articles, documentation

**Provenance Tracking:**
- Source attribution: `[Perplexity AI, 2025-11-08, ✓ verified]`
- Timestamp of retrieval
- Verification status (verified, unverified, conflicting)
- Citation format for external knowledge

**Conflict Detection:**
- Internal knowledge (agent memory) vs external knowledge
- Flag discrepancies: "Guide suggests X, but Perplexity research shows Y"
- Surface to user for resolution
- Maintain both sources, note conflict

**Storage:**
- external_knowledge table (id, project_id, source, content, timestamp, verified)
- Link to conversations where cited
- Enable search across external knowledge

**4. Provider Agnosticism**

**AI Provider Abstraction:**
```
interface AIProvider {
  name: string
  call(prompt: string, options?: CallOptions): Promise<string>
  stream(prompt: string, options?: CallOptions): AsyncIterator<string>
}
```

**Supported Providers:**
- Claude Code CLI (via subprocess or API)
- Gemini CLI (via OAuth and API)
- Future: Other providers (OpenAI, Anthropic API directly)

**Configuration:**
- User selects provider in preferences
- Provider-specific settings (API keys, model selection)
- Fallback logic if provider unavailable

**5. Enhanced Search**

**Conversation History Search:**
- "What did we decide about X?" → search project conversations
- Semantic search (not just keyword)
- Return context (surrounding messages)

**Cross-Project Insights:**
- "Have I dealt with similar challenges before?" → search all projects
- Pattern recognition (similar tasks, similar decisions)
- Learning from past experiences

**Knowledge Base Search:**
- "Is there a guide about X?" → search task_guides/
- Fuzzy matching, semantic relevance
- Return guide summary + confidence

---

## Sophie's Architecture

### Component Diagram

```
┌─────────────────────────────────────────────────┐
│              CLI Interface (REPL)                │
│  Natural language input, formatted output       │
└──────────────────┬──────────────────────────────┘
                   │
┌──────────────────┴──────────────────────────────┐
│         Orchestration Engine                     │
│  Intent → Task → Agent → Knowledge → Response   │
└──┬───────┬─────────┬─────────┬──────────┬───┬──┘
   │       │         │         │          │   │
┌──┴──┐ ┌─┴────┐ ┌──┴──┐ ┌────┴─────┐ ┌─┴┐ ┌┴────┐
│ AI  │ │Memory│ │Config│ │Knowledge │ │Val│ │Ext  │
│Prov │ │Layer │ │Loader│ │ Loader   │ │Eng│ │Know │
└─────┘ └──────┘ └──────┘ └──────────┘ └───┘ └─────┘
          │
          └─ SQLite (projects, conversations, decisions, artifacts, external_knowledge)
```

### Key Components

**1. CLI Interface**
- Interactive REPL (not commands, natural language)
- Session management (start, resume, end)
- Project switching ("Switch to X project")
- Output formatting (markdown rendering)
- Bilingual input/output

**2. Orchestration Engine**
- 8-step workflow execution
- Intent extraction (NLP, keyword parsing)
- Task matching (confidence scoring)
- Agent activation (persona loading)
- Knowledge loading (just-in-time)
- Response generation (LLM call with context)
- Validation (checklist verification)

**3. AI Provider Layer**
- Abstract interface for multiple providers
- Claude Code CLI adapter
- Gemini CLI adapter
- Prompt construction (instructions + context + knowledge)
- Stream handling (for real-time responses)

**4. Memory Layer**
- Project management (CRUD operations)
- Conversation persistence (save, load, search)
- Decision tracking (record, retrieve)
- Artifact storage (documents created)
- User preferences (get, set, validate)
- External knowledge (store, cite, conflict detection)

**5. Config Loader**
- YAML parsing (agents.yaml, tasks.yaml)
- Validation (schema checking)
- Caching (avoid re-parsing on every message)
- Hot-reload (detect file changes, refresh)

**6. Knowledge Loader**
- Task guide loading (from task_guides/)
- Materials loading (from materials/)
- Cross-reference resolution (parse markdown links, load referenced files)
- Just-in-time mechanism (load when needed)
- Cache management (LRU cache for guides)

**7. Validation Engine**
- 10-point checklist execution
- Gap detection (missing context, incomplete synthesis)
- Quality scoring (confidence, completeness)
- Feedback loop (trigger re-generation if needed)

**8. External Knowledge Manager**
- Source attribution
- Provenance tracking
- Conflict detection (internal vs external)
- Citation formatting

---

## Critical Design Decisions

### 1. How Does Sophie Run?

**DECISION NEEDED:** Integration model with Claude Code / Gemini CLI

**Option A: MCP Server**
- Sophie as MCP (Model Context Protocol) server
- Claude Code connects via MCP
- Server provides tools: match_task, load_guide, save_conversation, etc.
- Orchestration in MCP tool implementations

**Pros:**
- Clean separation (Sophie = server, Claude Code = client)
- Standard protocol (MCP is designed for this)
- Tool-based interaction (explicit actions)

**Cons:**
- MCP overhead (more complex than needed?)
- Requires MCP server infrastructure
- User must configure MCP in Claude Code

**Option B: Custom Instructions + Session Bootstrap**
- Sophie prepares session (load config, knowledge, instructions)
- Bootstrap script injects into Claude Code session
- Custom instructions (like original assets/instructions.md)
- File loading via environment or temp files

**Pros:**
- Similar to original Product Design Agent
- Leverages Claude Code's file reading
- Minimal infrastructure

**Cons:**
- How to inject instructions into CLI session?
- How to maintain across messages?
- How to enable file loading on demand?

**Option C: Wrapper CLI**
- Sophie CLI wraps Claude Code / Gemini CLI
- Intercepts user input
- Performs orchestration before passing to AI
- Captures AI output, post-processes
- Manages memory, state, projects

**Pros:**
- Full control over workflow
- Can manage memory, projects outside AI
- Works with any provider

**Cons:**
- Sophie becomes the CLI (more complex)
- Wrapper adds latency
- Harder to maintain "natural conversation" feel

**RECOMMENDATION FOR EVALUATION:**
- Start with **Option B** (closest to original pattern)
- Prototype MCP approach if custom instructions insufficient
- Fallback to Wrapper CLI if neither works

### 2. How to Load Knowledge Just-in-Time?

**Challenge:** Original relies on platform file reading (Claude Desktop can read uploaded files)

**Sophie's Solution:**

**Pre-Load Config (Startup):**
- Load agents.yaml, tasks.yaml at Sophie startup
- Cache in memory (small files, ~2K lines total)
- No need to re-load on every message

**On-Demand Guide Loading (Per Message):**
```
User message
  ↓
Task matching (uses cached tasks.yaml)
  ↓
Identify guide filename (e.g., "usability_testing.md")
  ↓
Check guide cache (LRU cache, max 5-10 guides)
  ↓
If not cached:
  - Read file from knowledge/task_guides/
  - Parse markdown
  - Extract cross-references
  - Store in cache
  ↓
Inject guide content into LLM context
  ↓
If cross-references found:
  - Load referenced guides on demand
  - Load materials if referenced
  ↓
Generate response with full context
```

**Cross-Reference Resolution:**
```markdown
## In usability_testing.md:
"For recruiting guidance, see `recruiting_users.md`"

→ Sophie parses markdown, finds reference
→ Loads recruiting_users.md
→ Adds to context for this response
```

**Materials Loading:**
```markdown
## In journey_mapping.md:
"Use `journey_map_template.md` for structure"

→ Sophie loads materials/journey_map_template.md
→ Includes template in response
```

**Token Management:**
- Monitor context window usage
- If approaching limit, summarize/compress earlier context
- Prioritize: current task guide > cross-references > conversation history

### 3. How to Manage Multi-Project Contexts?

**Project Switching Flow:**

```
User: "Switch to mobile app redesign project"
  ↓
Sophie:
  1. Save current project state (if any)
  2. Query projects table: WHERE name LIKE '%mobile app redesign%'
  3. Load project context:
     - Project metadata (goals, constraints)
     - Recent conversation history (last 10-20 messages)
     - Active decisions
  4. Clear knowledge cache (prevent bleed from previous project)
  5. Update last_accessed timestamp
  6. Confirm switch: "Switched to 'Mobile App Redesign'. Last conversation: 2025-11-12."
```

**Context Isolation:**
- Each project has separate conversation history
- Agent memory scoped to project (no cross-talk)
- Cached guides cleared on switch
- External knowledge linked to project_id

**Cross-Project Insights (Optional, Future):**
- "Have I solved similar problems before?" → search across projects
- Privacy control: user can disable cross-project search
- Always attribute to source project

### 4. How to Handle User Preferences?

**Storage:**
- user_preferences table (key-value, categorized)
- Global preferences (apply to all projects)
- Project-specific overrides (optional)

**Loading:**
- Load at session start
- Cache in memory
- Checked before every response

**Categories:**

**response_format:**
- detail_level: minimal | standard | comprehensive
- structure: conversational | structured | hybrid

**language:**
- primary: en | es | auto-detect
- regional: mx | es | ar | us | uk

**search_strategy:**
- confidence_threshold: high (>80%) | medium (>50%) | low (>30%)
- fuzzy_matching: strict | moderate | permissive

**workflow:**
- emphasis_areas: research | strategy | execution | validation
- output_priority: speed | thoroughness | clarity

**Example Preference Application:**
```
User preference: detail_level = minimal
  ↓
Orchestration adjusts:
  - Shorter explanations
  - Fewer examples
  - Checklist only (no elaboration)
  - Quick answers prioritized
```

### 5. How to Integrate External Knowledge?

**User Workflow:**

```
User does Perplexity AI research on "B2B SaaS onboarding best practices"
  ↓
User shares with Sophie: "I found this research on onboarding..."
  ↓
Sophie:
  1. Detect external knowledge (not from guides)
  2. Store in external_knowledge table
     - source: "Perplexity AI"
     - content: [research summary]
     - timestamp: 2025-11-14
     - verified: unverified (initial state)
  3. Link to current project
  4. Check for conflicts with internal knowledge
     - Compare with onboarding_designers.md guide
     - Flag if discrepancies found
  5. Incorporate into response with attribution
```

**Citation Format:**
```markdown
Based on best practices from our methodology guides and your Perplexity research [Perplexity AI, 2025-11-14], here's a recommended onboarding flow:

1. [Step from guide]
2. [Step incorporating external research]
3. [Step synthesizing both]

**Note:** The guide suggests X, while your research emphasizes Y. Both are valid—X for enterprise contexts, Y for SMB. Which fits your target market?
```

**Conflict Handling:**
- Detect: Compare external knowledge with guide content
- Surface: "Guide says X, external source says Y"
- Explain: When each applies, why they differ
- User decides: Sophie asks which to prioritize

---

## Implementation Phases (Refined)

### Phase 0: Foundation (CURRENT)
- ✅ Repository transformation
- ✅ Deep analysis (5 documents completed)
- ✅ Requirements definition (this document)
- ⏳ Technology decision (deferred until requirements clear)
- **Status:** COMPLETE

### Phase 1: Core Infrastructure (Week 1-2)
**Objective:** Minimal viable Sophie that can load knowledge and respond

**Tasks:**
1. Choose integration approach (Option A, B, or C above)
2. Build config loader (YAML parsing, caching)
3. Build knowledge loader (markdown parsing, cross-references)
4. Implement task matching (keyword extraction, confidence scoring)
5. Create AI provider abstraction (interface definition)
6. Build first provider adapter (Claude Code CLI OR Gemini CLI)
7. Basic REPL (read input, pass to orchestration, display output)

**Acceptance Criteria:**
- Can load agents.yaml and tasks.yaml
- Can match user query to task (with confidence score)
- Can load task guide on demand
- Can generate response using loaded knowledge
- Single project, no memory, no preferences

### Phase 2: Memory & Persistence (Week 3-4)
**Objective:** Add persistent memory and project support

**Tasks:**
1. Design SQLite schema (projects, conversations, decisions, artifacts)
2. Implement memory layer (CRUD operations)
3. Add conversation persistence (save/load)
4. Build project management (create, switch, list)
5. Implement context isolation (project-scoped queries)
6. Add decision tracking
7. Build conversation history search

**Acceptance Criteria:**
- Conversations persist across sessions
- Can switch between projects
- Project contexts isolated
- Can search conversation history
- Decisions tracked and retrievable

### Phase 3: Agent Personas & Orchestration (Week 5-6)
**Objective:** Full orchestration engine with agent system

**Tasks:**
1. Implement agent loading (from agents.yaml)
2. Build persona activation (role, backstory, procedures)
3. Create handoff system (agent collaboration)
4. Implement validation engine (10-point checklist)
5. Add user preferences support (storage, loading, application)
6. Build error handling (no match, partial match, missing context)
7. Implement just-in-time cross-reference resolution

**Acceptance Criteria:**
- Responses use agent personas
- Character consistency maintained
- Handoffs between agents work
- Validation checklist runs
- User preferences applied
- Cross-references resolved automatically

### Phase 4: External Knowledge & Advanced Features (Week 7-8)
**Objective:** 4th memory tier and enhanced capabilities

**Tasks:**
1. Design external knowledge schema
2. Implement provenance tracking
3. Build conflict detection (internal vs external)
4. Add citation formatting
5. Implement cross-project search (optional)
6. Add semantic search (conversation history, knowledge base)
7. Build second provider adapter (if first was Claude, add Gemini, or vice versa)

**Acceptance Criteria:**
- Can store external knowledge with attribution
- Conflicts detected and surfaced
- Citations formatted correctly
- Can search across projects (if enabled)
- Works with 2 AI providers

### Phase 5: Polish & Optimization (Week 9-10)
**Objective:** Production-ready quality

**Tasks:**
1. Implement token management (context window monitoring)
2. Add guide caching (LRU, performance)
3. Build bilingual support (language detection, code-switching)
4. Improve error messages (user-friendly)
5. Add logging and diagnostics
6. Create user documentation
7. Build test suite (unit + integration)

**Acceptance Criteria:**
- Token usage optimized
- Guide loading performant
- Bilingual queries handled
- Error messages clear
- Tests passing
- Documentation complete

---

## Success Criteria

### For the User (Experience)

**Feels Like:**
- Expert design mentor, not software tool
- Natural conversation, no commands
- Invisible orchestration, visible expertise
- Confidence-building guidance
- Professional, actionable outputs

**Functions Like:**
- Remembers project context across sessions
- Adapts to user preferences
- Switches between projects seamlessly
- Integrates external research naturally
- Provides consistent expert guidance

### For the Process (Orchestration)

**Operates Like:**
- Task matching accurate (>80% confidence on direct matches)
- Knowledge loading efficient (<2s for guide load)
- Agent personas consistent (character maintained)
- Validation thorough (10-point checklist always runs)
- Context isolation complete (no project bleed)

**Handles Like:**
- Graceful degradation (missing preferences, no match)
- Error recovery (partial matches, conflicting requirements)
- Cross-reference resolution (automatic, transparent)
- Token management (stays within limits)
- Multi-project switching (fast, reliable)

### For the Product (Deliverables)

**Produces:**
- Professional documents (markdown-formatted)
- Actionable plans (checklists, time estimates, steps)
- Reusable templates (with examples)
- Evidence-based guidance (expert references)
- Contextual recommendations (adapted to project)

**Quality:**
- Accurate (methodology from guides)
- Complete (validation checklist ensures)
- Cited (sources attributed)
- Bilingual (EN/ES supported)
- Professional (industry standards)

---

## Non-Functional Requirements

### Performance
- Task matching: <500ms
- Guide loading: <2s
- Response generation: <10s (depends on AI provider)
- Project switching: <1s
- Conversation search: <1s for recent history

### Reliability
- Database corruption recovery
- Graceful AI provider failures
- File reading error handling
- Network timeout handling
- Data backup and restore

### Security
- User preferences validation (prevent injection)
- File path sanitization (prevent traversal)
- API key protection (encrypted storage)
- Project isolation enforcement
- External knowledge verification

### Usability
- Clear error messages (non-technical language)
- Progress indicators (for long operations)
- Confirmation prompts (destructive actions)
- Help system (built-in guidance)
- Onboarding flow (first-time users)

### Maintainability
- Modular architecture (components independent)
- Configuration-driven (YAML, no hardcoded values)
- Extensible (easy to add agents/tasks/providers)
- Documented (code comments, architecture docs)
- Tested (unit + integration coverage)

---

## Technology Decision (Deferred to Phase 1)

**Now we can make informed decision:**

**Requirements:**
- YAML parsing (agents, tasks)
- Markdown parsing (guides, cross-references)
- SQLite database (projects, conversations, memory)
- AI provider integration (subprocess or API)
- CLI REPL (interactive, formatted output)
- File watching (hot-reload config)
- Semantic search (optional, future)

**Options:**

**Deno (TypeScript):**
- Pros: TypeScript type safety, modern runtime, built-in tools
- Cons: Ecosystem smaller than Go for some libraries
- Fit: Good for prototyping, web UI future

**Go:**
- Pros: Performance, strong ecosystem, excellent tooling
- Cons: More verbose, less rapid prototyping
- Fit: Production-grade, CLI excellence

**Python:**
- Pros: Rapid development, rich AI/ML libraries, simple
- Cons: Performance, packaging complexity
- Fit: Quick prototyping, AI integration ease

**Rust:**
- Pros: Performance, safety, excellent CLI ecosystem
- Cons: Steep learning curve, slower development
- Fit: Production-grade, but may be overkill

**RECOMMENDATION:**
- **For rapid prototyping (Phase 1-2):** Deno or Python
- **For production (Phase 3+):** Go or Deno (with TypeScript strictness)

**Decision deferred to Phase 1** when we prototype integration approach.

---

## Open Questions for Phase 1

1. **Integration Model:** Which option (MCP, Custom Instructions, Wrapper)?
2. **AI Provider Interface:** How to construct prompts with knowledge context?
3. **Cross-Reference Parsing:** Regex, markdown parser, or AST?
4. **Token Management:** How to detect approaching context limit?
5. **Bilingual Detection:** NLP library or simple heuristics?
6. **Semantic Search:** Vector embeddings (heavy) or keyword-based (light)?

**Answer through prototyping in Phase 1.**

---

## Conclusion

We now have complete understanding:

**WHY it works:**
- Expert guidance system, not "AI that knows design"
- 12 personas + 64 methodologies + orchestration = mentorship
- Natural conversation + invisible structure = magic
- Just-in-time loading + validation = quality

**WHAT Sophie must be:**
- Product Design Agent evolved for CLI environments
- Persistent memory + multi-project + external knowledge
- Same UX, same expertise, new capabilities

**HOW to build it:**
- File-based knowledge (preserve)
- Orchestration pattern (preserve)
- Memory layer (add)
- Provider abstraction (add)
- 5-phase implementation plan

**READY FOR:** Phase 1 - Core Infrastructure

---

**Status:** Requirements Complete
**Next:** Phase 1 Kickoff - Technology decision + integration prototyping
**Last Updated:** 2025-11-14
