# Product Design Agent: Comprehensive System Analysis
**Date:** 2025-11-10
**Purpose:** Complete mapping of current implementation to inform architectural transformation

---

## Executive Summary

The Product Design Agent is a sophisticated, knowledge-driven AI mentorship system with a file-based architecture that creates a natural, conversational relationship between AI and human user. It employs:

- **12 specialized agent personas** with distinct expertise, workflows, and collaboration patterns
- **80+ structured tasks** with methodology guides (15,793 lines of domain knowledge)
- **Intelligent, on-demand knowledge loading** (not naive context loading)
- **Validation-driven quality control** ensuring contextual, adapted responses
- **Graceful error handling** with semantic matching and transparent limitations

**Current Constraint:** Dependent on Claude Desktop/Gemini Gems platforms with inherent session limits, no persistent memory, and token consumption constraints.

**Transformation Goal:** Liberate the agent to run via CLI (Claude Code OAuth, Gemini CLI OAuth) with persistent memory, while preserving its conversational soul and collaborative dynamic.

---

## 1. Repository Structure & Metrics

### Directory Organization

```
product-design-agent/
├── assets/
│   └── instructions.md (217 lines) - Core orchestration logic
├── config/
│   ├── agents.yaml (431 lines) - 12 specialized agent personas
│   └── tasks.yaml (1,444 lines) - 80+ task definitions
├── knowledge/
│   ├── materials/ (11 files) - Templates, checklists, data
│   └── task_guides/ (64 files, 15,793 lines) - Methodology guides
├── CLAUDE_INSTALLATION.md
├── GEMINI_INSTALLATION.md
├── CONTRIBUTING.md
├── README.md
├── LICENSE
├── product-map.md - Architecture documentation
└── product-future.md - Go-based implementation vision
```

### Quantitative Metrics

- **Total files:** 207
- **Markdown files:** 77
- **YAML configuration files:** 2
- **Task guides:** 64 (avg ~247 lines each, range 100-879)
- **Material files:** 11 (templates, CSVs, JSON schemas)
- **Core config:** 2,092 lines (instructions + agents + tasks)
- **Total knowledge base:** ~15,793 lines

---

## 2. Core Architecture Patterns

### 2.1 File-Based Knowledge System

**Two-Tier Architecture** (from instructions.md):

1. **Primary Context** (User-uploaded files)
   - Project goals, briefs, constraints
   - Research data, team structure
   - Brand guidelines, design systems
   - Technical specifications

2. **Methodology Framework** (Repository files)
   - Task guides and methodologies (knowledge/task_guides/)
   - General frameworks and principles
   - Templates and reusable resources (knowledge/materials/)
   - Best practices (agents.yaml operating procedures)

**Key Insight:** The agent treats user-uploaded context as authoritative, methodology as adaptable. This creates personalization.

### 2.2 Intelligent Knowledge Loading (Just-In-Time)

**NOT** loading all files into context. Instead:

```
User Query → Task Intent Extraction → Task Registry Match →
Agent Selection → Specific Task Guide Loading → Response Synthesis
```

**Process Flow** (from instructions.md):

0. **Check User Preferences** (if `user_preferences.md` exists)
   - Parse response format, language, workflow preferences
   - Override defaults gracefully

1. **Analyze Uploaded Files** (if present)
   - Extract project context, requirements, stakeholders
   - Map terminology, goals, success metrics

2. **Extract Task Intent**
   - Parse keywords (bilingual: EN/ES)
   - Identify core task requirements
   - Connect to project context

3. **Access Tasks**
   - Load `config/tasks.yaml`
   - Search for matching task_id using keywords
   - Apply fuzzy matching (HIGH >80%, MEDIUM 50-80%, LOW <50%)

4. **Access Agents**
   - Load `config/agents.yaml`
   - Identify assigned agent persona for matched task
   - Adopt agent's role, capabilities, operating_procedures

5. **Learn Task Methodology**
   - Load specific task_guide from `knowledge/task_guides/`
   - Load referenced materials from `knowledge/materials/`
   - Adapt methodology to project context

6. **Generate Contextualized Response**
   - Apply agent persona voice and approach
   - Synthesize methodology + project context + user preferences
   - Format per expected_output specification

7. **Validate Response** (quality control loop)
   - Run 10-point validation checklist
   - If gaps exist, iterate back to step 6
   - Confirm project alignment

8. **Deliver Final Response**

**Efficiency:** Only loads what's needed for THIS task + THIS project. Avoids context bloat.

### 2.3 Validation-Driven Quality Control

Before delivering any response, the agent validates:

1. ✓ Uploaded files analyzed
2. ✓ User preferences integrated
3. ✓ Project context integrated into response
4. ✓ Task registry checked for relevant methodologies
5. ✓ All relevant sources accessed (or failures noted)
6. ✓ Information synthesized from both contexts
7. ✓ Methodology adapted to project-specific needs
8. ✓ Citations reference actual retrieved content
9. ✓ Confidence level assessed for task match
10. ✓ Alignment verified with project goals

**Impact:** This creates the "thoughtful collaborator" feeling - the agent double-checks its work.

### 2.4 Graceful Error Handling

**When no direct task match:**
1. Context-first approach (infer from uploaded files)
2. Semantic search (fuzzy matching in guide content)
3. Problem decomposition (break complex into smaller tasks)
4. Alternative approaches (suggest related methodologies)
5. External resources (admit limitations honestly)

**Partial matches:**
- Use available guides as foundation
- Adapt to project context
- Fill gaps with general UX principles
- **Note limitations explicitly** (builds trust)
- Suggest validation methods

**Missing context:**
- Proceed with noted assumptions
- Flag missing information
- Request clarification
- Surface conflicts openly

**Impact:** Creates trust through transparency and adaptability, not rigid failure.

---

## 3. Agent Orchestration ("The Backroom Team")

### 3.1 Agent Persona Structure

Each agent in `config/agents.yaml` has:

- **role:** Bilingual persona/title (e.g., "Strategy Analyst / Analista de Estrategia")
- **goal:** Mission statement
- **backstory:** Expertise and character
- **capabilities:** Bulleted skills list
- **tools:** Resources they use
- **operating_procedures:** Step-by-step workflow (how they work)
- **handoffs:** Collaboration with other agents
- **example_tasks:** List of task_ids they handle

### 3.2 The 12 Specialized Agents

| Agent | Role | Example Capabilities | Example Tasks |
|-------|------|---------------------|---------------|
| **ai_specialist** | Operationalize AI across design workflows | Prompt engineering, evals, vibe coding, style extraction | writing_prompts, snowball_vibe_coding, style_spec_json_builder |
| **collaboration_facilitator** | Orchestrate communication and decision-making | Critiques, workshops, stakeholder mapping, conflict resolution | meeting_facilitation, design_critique, stakeholder_management |
| **content_specialist** | Ensure clarity, consistency, accessibility | Content audits, IA, SEO, style alignment | content_audit, content_inventory |
| **design_educator** | Raise design maturity via education | Curriculum design, reference guides, workshops | cognitive_biases, b2b_design, economics_for_designers |
| **design_system_specialist** | Create and govern design system | Component specs, token management, accessibility | component_documentation, design_token_naming, creating_icons |
| **discovery_analyst** | Clarify problem spaces and opportunities | Journey mapping, hypothesis crafting, statement writing | journey_mapping, writing_statements, critical_path |
| **onboarding_specialist** | Ramp up new designers and leads | Onboarding plans, tool training, progress tracking | onboarding_designers, onboarding_design_leads, agent_onboarding_guide |
| **project_manager** | Deliver initiatives predictably | Scoping, planning, risk management, tracking | kickoff_meeting, project_planning |
| **requirements_analyst** | Transform concepts into PRDs | Requirements gathering, user stories, technical specs | product_requirements_document, requirements_gathering |
| **research_analyst** | Plan, execute, synthesize research | Usability testing, measurement frameworks, synthesis | usability_test_planning, affinity_diagramming, empathy_mapping |
| **strategy_analyst** | Translate opportunities into strategies | KPI trees, prioritization, MVP definition, ideation | brainstorming, kpi_metrics, value_proposition, mvp_definition |
| **team_lead** | Build high-performing design teams | Staffing, performance management, culture development | team_management, boost_ux_culture, hiring_designers |
| **visual_designer** | Elevate product aesthetics and clarity | Visual storytelling, asset creation, AI image prompting | writing_ai_image_prompts, executive_presentation |

### 3.3 Agent Collaboration Patterns

Agents have **handoffs** defining inter-agent coordination:

Example (strategy_analyst):
```yaml
handoffs:
  - To project_manager: scoped plan & milestones
  - To collaboration_facilitator: sessions to align/decide
  - From research_analyst/discovery_analyst: insights & opportunities
```

**Impact:** Creates impression of a "team working in the background" - different expertise areas collaborate.

### 3.4 Agent Operating Procedures

Each agent has a workflow pattern. Example (strategy_analyst):

```yaml
operating_procedures:
  - Clarify objectives → choose approach
  - Synthesize inputs → define bets & KPIs
  - Facilitate decisions → document trade-offs
  - Outline roadmap → align stakeholders
```

**Impact:** Guides HOW the agent helps, not just WHAT it delivers. Creates consistent, professional approach.

---

## 4. Task System Architecture

### 4.1 Task Definition Structure

Each task in `config/tasks.yaml` has:

- **task_id:** Unique identifier
- **description:** High-level overview (numbered steps)
- **expected_output:** Deliverable specification
- **task_guide:** References to knowledge/task_guides/*.md files
- **materials:** (optional) References to knowledge/materials/* files
- **agent:** Assigned agent persona

Example:
```yaml
brainstorming:
  task_id: "brainstorming"
  description: >
    Facilitate ideation sessions using:
    1. Workshop planning and setup
    2. Divergent thinking techniques
    3. Idea generation methods
    4. Convergent prioritization
    5. Action planning
  expected_output: >
    A brainstorming package containing:
    - Workshop agenda
    - Facilitation guide
    - Idea capture templates
    - Prioritization framework
    - Next steps document
    Formatted as markdown workshop kit
  task_guide:
    - "brainstorming.md"
  agent: strategy_analyst
```

### 4.2 Task Guide Structure

Task guides in `knowledge/task_guides/` follow consistent pattern:

1. **Executive Summary** - Quick overview
2. **Overview** - Purpose, Scope, Audience, Success Criteria
3. **Preparation** - Research, Roles, Logistics, Checklists
4. **Main Flow / Process** - Step-by-step methodology
5. **Templates / Frameworks** - Specific tools and methods
6. **Best Practices / Pitfalls** - Expert guidance
7. **Examples / Case Studies** - Concrete applications
8. **Resources / References** - External links, citations

**Average length:** ~247 lines
**Range:** 100-879 lines
**Total corpus:** 15,793 lines of domain knowledge

### 4.3 Task Categories (80+ Tasks)

**Onboarding & Training:**
- agent_onboarding_guide, onboarding_designers, onboarding_design_leads

**Project Framing:**
- kickoff_meeting, initiative_canvas, project_type_strategy, product_requirements_document

**Discovery:**
- writing_statements, user_personas, journey_mapping

**User Research:**
- affinity_diagramming, contextual_inquiry, empathy_mapping, usability_test_planning/recruiting/moderation/reporting, ux_audit, survey_design

**Strategy:**
- agile_lean_ux_frameworks, brainstorming, business_model, critical_path, kpi_metrics, mvp_definition, prioritization, value_proposition

**Visual Design & Systems:**
- component_documentation, design_token_naming, creating_icons, icon_family_specification, matching_icons_typefaces

**Leadership:**
- team_management, boost_ux_culture, hiring_designers

**Collaboration:**
- conflict_resolution, stakeholder_management, meeting_facilitation, design_critique, executive_presentation

**AI & Prompts:**
- prompt_minification, writing_prompts, snowball_vibe_coding, style_spec_json_builder, writing_ai_image_prompts

**Content:**
- content_audit, content_inventory, writing_tasks

**General Knowledge:**
- cognitive_biases, designing_ai_assistants, b2b_design, economics_for_designers

---

## 5. Behavioral Patterns & "Soul" of the Agent

### 5.1 Core Identity (from instructions.md)

> "You are an adaptive product design mentor combining expertise across product design, user research, strategy, UX/UI, neuropsychology, AI, UX writing, and prompt engineering. You provide hands-on guidance, create practical resources, facilitate learning, and accelerate professional growth through personalized mentorship."

**Key Attributes:**
- **Adaptive:** Changes approach based on context
- **Hands-on:** Creates deliverables, not just advice
- **Personalized:** Uses uploaded context and preferences
- **Mentorship-oriented:** Guides, teaches, facilitates growth

### 5.2 Conversational Dynamics

**Natural Language First:**
- No commands, no scripts
- True conversation between AI and Human
- Co-creative partnership
- User and agent are "co-product owners"

**Proactive Guidance:**
- Agent redirects when users get lost in ideas
- Filters signal from noise
- Asks clarifying questions
- Surfaces conflicts and ambiguities

**Transparency:**
- Notes limitations explicitly
- Assesses confidence levels
- Flags missing context
- Admits when external resources needed

### 5.3 Response Format Requirements

- **Structured Documents:** Return formatted guides, checklists, surveys, plans
- **Code Blocks:** Place prompts, instructions, code in single blocks
- **Citations:** Always include source URLs and references
- **Bold Usage:** Only for headings, critical terms, unique keywords
- **Clarity:** Seek clarification for ambiguous requests
- **Language:** Seamless bilingual EN/ES support
- **Completeness:** Ensure all task-related sources consulted

### 5.4 Bilingual Support

**Intelligent Language Detection:**
- Respond in user's query language
- Provide key terms in both languages when helpful
- Adapt cultural context (regional UX patterns)
- Handle code-switching naturally

**Supported:**
- English (primary)
- Spanish (full support with regional variations: MX, ES, AR)

### 5.5 User Preferences System

Optional `user_preferences.md` or `user_preferences.yaml` file supports:

**Response Format:**
- Detail level: minimal/standard/comprehensive
- Structure: conversational/structured/hybrid
- Code block usage

**Language & Terminology:**
- Primary language
- Terminology style: technical/business/accessible
- Regional variations

**Search Strategy:**
- Confidence threshold (high/medium/low)
- Source priority (project-first/methodology-first/balanced)
- Fuzzy matching tolerance

**Workflow Preferences:**
- Skip steps (validation/citations/context-analysis)
- Emphasis areas (research/strategy/execution/validation)
- Output priorities (speed/thoroughness/clarity)

---

## 6. Current Implementation Constraints

### 6.1 Platform Dependencies

**Claude Desktop (Claude Projects):**
- Requires Claude Pro subscription
- Files uploaded to Project Knowledge
- Custom Instructions from assets/instructions.md
- **Session limits:** ~3-4 exchanges before hitting context/message limits
- **Context window constraints:** Even with smart loading, platform limits apply
- **No persistent memory:** Each session starts fresh

**Gemini (Gems):**
- Requires Google One AI Premium
- Files uploaded to Gem creation interface
- Instructions in single instruction field
- **File upload limits:** 5 files maximum (crippled the implementation)
- **No persistent memory:** Each session isolated
- **Platform changes break implementation**

### 6.2 Memory Limitations

**No Process Memory:**
- Agent doesn't remember "why we decided against X"
- Can't track decision rationale across sessions
- No learning from past interactions

**No Project Memory:**
- Doesn't remember previous conversations
- Can't build on prior context
- User must re-explain each session

**No Continuity:**
- Each session is isolated
- No conversation threading
- No state persistence

### 6.3 Context Management Constraints

**Smart but Limited:**
- Agent uses just-in-time loading (efficient)
- But still constrained by platform session limits
- Can't manage own context window strategically
- Dependent on host platform's resource allocation

---

## 7. Key Features, Functionalities & Capabilities

### 7.1 Task Matching & Orchestration

- 80+ task definitions with keyword-based matching
- Fuzzy matching with confidence scoring (HIGH/MEDIUM/LOW)
- Semantic search for partial matches
- Problem decomposition for complex requests

### 7.2 Agent Persona System

- 12 specialized agent personas
- Role-based expertise (capabilities, tools, procedures)
- Inter-agent collaboration (handoffs)
- Consistent professional voice per persona

### 7.3 Knowledge Synthesis

- Just-in-time guide loading
- Methodology adaptation to project context
- Multi-source synthesis (uploaded files + repository guides)
- Template and framework provision

### 7.4 Quality Assurance

- 10-point validation checklist
- Confidence assessment
- Limitation transparency
- Citation requirements

### 7.5 Context Awareness

- User preference detection and integration
- Uploaded file analysis
- Project goal alignment
- Stakeholder consideration

### 7.6 Bilingual Operation

- English/Spanish seamless switching
- Regional variation support
- Cultural context adaptation
- Code-switching handling

### 7.7 Error Handling & Adaptation

- Graceful degradation for partial matches
- Alternative suggestion for no-match scenarios
- Assumption transparency for missing context
- Conflict surfacing and clarification requests

### 7.8 Deliverable Generation

- Structured documents (guides, plans, checklists)
- Templates and frameworks
- Actionable resources
- Context-specific recommendations

---

## 8. Critical Insights for Transformation

### 8.1 What Must Be Preserved

**The "Soul" - Conversational Relationship:**
- Natural language interaction (no commands)
- Co-creative partnership dynamic
- Proactive guidance and redirection
- Trust through transparency

**The Intelligence:**
- Just-in-time knowledge loading
- Context-aware adaptation
- Validation-driven quality control
- Graceful error handling

**The Expertise:**
- 12 agent personas with operating procedures
- 80+ task methodologies
- 15,793 lines of domain knowledge
- Bilingual capabilities

### 8.2 What Must Be Added

**Persistent Memory:**
1. **Agent Memory** (internal)
   - Process memory ("why we decided X")
   - Methodology knowledge (already exists in files)
   - Operating procedures (already exists in agents.yaml)

2. **Project Memory** (external)
   - Conversation history
   - Decisions made
   - Context built up
   - User preferences
   - Uploaded project files

**State Management:**
- Conversation threading
- Session continuity
- Context window optimization
- Resource management

**CLI Integration:**
- Claude Code CLI (OAuth) as AI provider
- Gemini CLI (OAuth) as AI provider
- Provider abstraction layer (future: other LLMs)

**Future Web UI Support:**
- Streaming chat interface
- Conversation management
- File handling
- Real-time voice (future consideration)

### 8.3 What Can Be Improved

**Context Window Management:**
- More sophisticated knowledge chunking
- Embeddings for semantic search
- Selective knowledge caching
- Dynamic context prioritization

**Memory Architecture:**
- Dual-graph memory (agent internal + project external)
- Searchable conversation history
- Decision tracking and rationale
- Learning from interactions

**Provider Independence:**
- Not hostage to platform changes
- Own resource management
- Portable across environments
- API-free (OAuth only)

---

## 9. Architectural Observations

### 9.1 Current Strengths

✓ **Clean Separation of Concerns:**
  - Orchestration (instructions.md)
  - Configuration (agents.yaml, tasks.yaml)
  - Knowledge (task_guides/, materials/)

✓ **Version Control Friendly:**
  - All files are human-readable text
  - Easy to track changes
  - Collaborative editing possible

✓ **Modular & Extensible:**
  - Adding task = new YAML entry + new guide file
  - Adding agent = new YAML entry
  - No code changes needed

✓ **Already Configuration-Driven:**
  - Behavior emerges from files, not hardcoded logic
  - Easy to customize and extend

### 9.2 Natural Transformation Path

The current file-based architecture **perfectly suits CLI/programmatic execution**:

1. **Instructions.md → Orchestration Engine**
   - Convert workflow steps to executable code
   - Preserve validation logic
   - Implement error handling patterns

2. **Agents.yaml → Agent Registry**
   - Load agent personas as objects/structs
   - Implement operating_procedures as methods
   - Enable handoff routing

3. **Tasks.yaml → Task Registry**
   - Index tasks for fast matching
   - Implement confidence scoring
   - Enable semantic search

4. **Knowledge Files → Knowledge Base**
   - Keep files as source of truth
   - Add optional indexing/embedding layer
   - Implement on-demand loading

5. **User Context → Session State**
   - Persist uploaded files
   - Track conversation history
   - Store user preferences

### 9.3 Service-Oriented Architecture Fit

The current architecture already suggests natural service boundaries:

- **Orchestration Service:** Process flow, validation, quality control
- **Agent Registry Service:** Persona selection and configuration
- **Task Matching Service:** Intent extraction, confidence scoring
- **Knowledge Service:** Guide loading, synthesis, adaptation
- **Memory Service:** Session state, conversation history, decisions
- **Provider Adapter Service:** Claude CLI, Gemini CLI, future LLMs
- **Interface Service:** CLI, future Web UI, future voice

---

## 10. Technology Stack Considerations (Preliminary)

### 10.1 Requirements Analysis

**Must Support:**
- File-based configuration (YAML, Markdown, CSV parsing)
- OAuth CLI integration (subprocess execution)
- Persistent storage (SQLite or embedded DB)
- Conversational state management
- Fast startup (good CLI UX)
- Single-binary deployment (no dependency hell)
- Cross-platform (Linux, macOS, Windows)

**Must Avoid:**
- Python (dependency hell, security concerns per user)
- NPM ecosystem (same concerns)
- External API dependencies (OAuth only)

**Five Cornerstones Alignment:**
- **Configurability:** File-driven config system
- **Modularity:** Clean service boundaries
- **Extensibility:** Plugin architecture for providers/tasks
- **Integration:** CLI and future Web UI support
- **Automation:** CI/CD, testing, deployment pipelines

### 10.2 Candidate Technologies (Post-Mapping Analysis)

**Option 1: Deno (TypeScript/JavaScript)**
- ✓ Modern, secure, contained footprint
- ✓ Built-in TypeScript support
- ✓ Permission-based security model
- ✓ Single executable compilation
- ✓ Good standard library
- ✓ Fast startup
- ? Ecosystem maturity for some use cases

**Option 2: Go (Golang)**
- ✓ Compiled, statically typed
- ✓ Excellent concurrency (goroutines)
- ✓ Single binary deployment
- ✓ Strong standard library
- ✓ Fast execution
- ✓ Cross-platform
- ? More verbose than TypeScript
- ? Less familiar to web developers

**Option 3: Rust**
- ✓ Memory safety without GC
- ✓ Excellent performance
- ✓ Strong type system
- ✓ Growing ecosystem
- ? Steeper learning curve
- ? Slower compilation
- ? Potentially overkill for this use case

**Trade-off analysis deferred** until architecture design phase.

---

## 11. Next Steps & Recommendations

### 11.1 Immediate Analysis Tasks

1. ✓ **Complete comprehensive system mapping** (this document)

2. **Document current behavioral patterns** (next)
   - Detailed analysis of instructions.md orchestration logic
   - Agent persona voice patterns
   - Error handling decision trees

3. **Map agent orchestration workflows**
   - Visual workflow diagrams
   - Agent collaboration patterns
   - Handoff sequences

4. **Analyze knowledge base access patterns**
   - Task→Guide reference matrix
   - Material usage patterns
   - Knowledge chunking opportunities

5. **Create feature matrix**
   - Current vs. desired capabilities
   - Must-have vs. nice-to-have
   - Migration complexity assessment

6. **Document constraints and requirements**
   - OAuth integration requirements
   - Memory architecture needs
   - Performance requirements
   - User experience requirements

### 11.2 Design Phase Tasks

7. **Research and analyze technology stack options**
   - Deep dive on Deno vs. Go vs. Rust
   - Prototype proof-of-concepts
   - Performance benchmarking
   - Developer experience evaluation

8. **Design memory architecture**
   - Agent memory (internal knowledge, process memory)
   - Project memory (conversation, decisions, context)
   - Storage strategy (SQLite, file-based, hybrid)
   - Search and retrieval patterns

9. **Create architecture blueprint**
   - Service boundaries and interfaces
   - Data flow diagrams
   - API/CLI contract specifications
   - Migration path from current to future

### 11.3 Success Criteria

**We will know we've succeeded when:**

1. **Preserved the Soul:**
   - Natural conversation feels identical
   - Proactive guidance still works
   - Trust and transparency maintained
   - Bilingual support seamless

2. **Added Memory:**
   - Agent remembers process decisions
   - Project context persists across sessions
   - Conversation history searchable
   - User preferences sticky

3. **Achieved Independence:**
   - Runs via Claude Code CLI (OAuth)
   - Runs via Gemini CLI (OAuth)
   - No platform constraints
   - Own resource management

4. **Enabled Future:**
   - Architecture ready for Web UI
   - Provider abstraction allows new LLMs
   - Knowledge base extensible
   - Clean migration path

---

## 12. Open Questions for User

1. **Technology Stack:**
   - Should we prioritize Deno's modern DX or Go's maturity?
   - What's your comfort level with learning curve (Rust steeper, Deno/Go moderate)?

2. **Memory Scope:**
   - How long should project memory persist? (days? weeks? indefinitely?)
   - Should agent memory evolve (learn from all users) or stay static?

3. **CLI UX:**
   - Interactive conversation (like Claude Code itself)?
   - Command flags for automation alongside conversation?
   - Both modes?

4. **Web UI Priority:**
   - Design architecture for it from day one?
   - Or add it as Phase 2 after CLI works?

5. **Knowledge Base Evolution:**
   - Keep files as sole source of truth?
   - Add indexing/embedding layer for search?
   - Hybrid approach?

---

## Appendix A: File Inventory

### Configuration Files
- `assets/instructions.md` - 217 lines
- `config/agents.yaml` - 431 lines (12 agents)
- `config/tasks.yaml` - 1,444 lines (80+ tasks)

### Knowledge Base Files
- `knowledge/task_guides/` - 64 files, 15,793 lines total
- `knowledge/materials/` - 11 files (templates, data, schemas)

### Documentation Files
- `README.md`
- `CLAUDE_INSTALLATION.md`
- `GEMINI_INSTALLATION.md`
- `CONTRIBUTING.md`
- `product-map.md`
- `product-future.md`
- `LICENSE`

---

## Appendix B: Agent-Task Assignment Matrix

| Agent | Task Count | Example Tasks |
|-------|------------|---------------|
| ai_specialist | 6 | writing_prompts, snowball_vibe_coding, style_spec_json_builder |
| collaboration_facilitator | 6 | meeting_facilitation, design_critique, executive_presentation |
| content_specialist | 3 | content_audit, content_inventory, writing_tasks |
| design_educator | 3 | cognitive_biases, b2b_design, economics_for_designers |
| design_system_specialist | 5 | component_documentation, design_token_naming, creating_icons |
| discovery_analyst | 3 | journey_mapping, writing_statements, critical_path |
| onboarding_specialist | 3 | onboarding_designers, onboarding_design_leads, agent_onboarding_guide |
| project_manager | 2 | kickoff_meeting, project_planning |
| requirements_analyst | 2 | product_requirements_document, requirements_gathering |
| research_analyst | 15 | usability_test_*, affinity_diagramming, empathy_mapping, ux_audit |
| strategy_analyst | 11 | brainstorming, kpi_metrics, mvp_definition, prioritization |
| team_lead | 3 | team_management, boost_ux_culture, hiring_designers |
| visual_designer | 2 | writing_ai_image_prompts, executive_presentation |

---

## Appendix C: Knowledge Access Patterns

### Most Referenced Task Guides
- `usability_testing.md` - Referenced by 5 tasks
- `cognitive_biases.md` - Referenced by 4 tasks
- `data_information_knowledge.md` - Referenced by 4 tasks

### Most Referenced Materials
- `cognitive_biases_list.csv` - 4 references
- `product_metrics_list.csv` - 3 references
- `prompt_templates_registry.md` - 3 references
- `content_audit_checklist_EN.csv` - 2 references

### Knowledge Loading Efficiency
- Average task references: 1.5 guides, 0.5 materials
- Maximum references: 5 guides (usability_test_planning)
- Typical load: <1,000 lines per task (efficient)

---

*End of System Analysis Document*
