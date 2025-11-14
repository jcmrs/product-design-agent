# Integration Model Analysis

> **How the Product Design Agent works in Claude Desktop and Gemini Gems**

**Date:** 2025-11-14
**Purpose:** Understand technical implementation to inform Sophie's Claude Code/Gemini CLI integration
**Status:** Complete

---

## Executive Summary

The Product Design Agent is **NOT a standalone application**. It's a **file-based knowledge system with orchestration instructions** that runs within AI platform features:

- **Claude Desktop:** Uses "Projects" feature (Claude Pro required)
- **Gemini:** Uses "Gems" feature (Google One AI Premium required)

**Core Pattern:**
1. Upload files (config, knowledge, assets) to platform
2. Set custom instructions (from `assets/instructions.md`)
3. Instructions orchestrate workflow when user sends messages
4. Platform LLM executes orchestration with file context

**No code execution, no server, no CLI app—pure file-based AI orchestration.**

---

## Integration Architecture

### Claude Desktop (Projects)

**Setup:**
1. Create new Claude Project
2. Upload from GitHub: `config/`, `knowledge/`, `README.md`
3. Copy contents of `assets/instructions.md`
4. Paste into Project Custom Instructions
5. Optionally upload `user_preferences.md` or `user_preferences.yaml`

**Runtime:**
- All uploaded files become "Project Knowledge"
- Custom instructions execute on every message
- Claude can read any uploaded file on demand
- Instructions guide workflow step-by-step

**File Access Pattern:**
```
User: "Help me plan a usability test"
  ↓
Instructions execute Step 1-7:
  ↓
Step 3: Access tasks.yaml → find usability_testing
  ↓
Step 4: Access agents.yaml → identify research_analyst
  ↓
Step 5: Read knowledge/task_guides/usability_testing.md
  ↓
Step 6: Generate contextualized response (as research_analyst)
  ↓
Step 7: Validate and deliver
```

### Gemini (Gems)

**Setup:**
1. Create new Gem
2. Upload files individually or as ZIP: `config/`, `knowledge/`, `assets/`
3. Copy contents of `assets/instructions.md`
4. Paste into Gem Instructions field
5. Set conversation starters
6. Optionally upload user preferences

**Runtime:**
- Similar to Claude Projects
- Files automatically available in conversation context
- Instructions merged with file knowledge
- Gemini's conversation patterns slightly different

**Differences from Claude:**
- Single instruction field (not separate project instructions)
- Files and instructions merged automatically
- Context management differs (Gemini-specific optimizations)
- Conversation memory per gem thread

---

## Orchestration Instructions

**File:** `assets/instructions.md` (218 lines)

**Purpose:** Guide the LLM through workflow for every user message

### Step-by-Step Workflow

**Step 0: Check User Preferences** (optional)
```markdown
- Look for file named `user_preferences` in uploaded files
- Parse preference categories: response_format, language, search_strategy, workflow, output_style
- Set preference overrides for default behaviors
- Fallback to defaults if missing/invalid
```

**Step 1: Analyze Uploaded Files** (if present)
```markdown
- Scan for project context, requirements, constraints
- Identify stakeholders, goals, success metrics
- Extract research insights, user data, specifications
- Note project-specific terminology
- Map available resources and existing work
```

**Step 2: Extract Task Intent**
```markdown
- Parse keywords (Spanish/English) from user query
- Apply user language preferences if configured
- Identify core task requirements
- Connect query to project context
```

**Step 3: Access Tasks**
```markdown
- MUST access `tasks.yaml` at `product-design-assistant/config/tasks.yaml`
- Search for matching task(s) using extracted keywords
- Apply project context to narrow relevant methodologies
```

**Step 4: Access Agents**
```markdown
- MUST access `agents.yaml` at `product-design-assistant/config/agents.yaml`
- Identify and configure specific agents/workflows relevant to task
- Ensure agents aligned with task intent and project context
```

**Step 5: Learn Task Methodology**
```markdown
- Access task guide(s) in `product-design-assistant/knowledge/task_guides/`
- Review additional content in `product-design-assistant/knowledge/materials/`
- Follow cross-references within task guide
- Adapt methodology to project-specific context
```

**Step 6: Generate Contextualized Response**
```markdown
- Apply user output style and format preferences
- Apply methodologies to uploaded project context
- Prioritize project-specific requirements over generic approaches
- Integrate research data and constraints
- Ensure alignment with project goals
```

**Step 7: Validate Response**
```markdown
- Run validation checklist (10 items)
- If gaps exist, fix issues and return to Step 6
- Confirm project context properly integrated
```

**Step 8: Deliver Final Response**

### Key Orchestration Patterns

**1. File Path References Are Explicit**
```markdown
MUST access the `tasks.yaml` file located at `product-design-assistant/config/tasks.yaml`
```
Instructions tell LLM exactly where to look.

**2. Conditional Execution**
```markdown
Analyze Uploaded Files (if present)
```
Workflow adapts based on what user uploaded.

**3. Two-Tier Knowledge System**

**Primary Context (User Uploads):**
- Project goals, objectives, brief
- Team structure, stakeholder mapping
- Current project state, constraints, requirements
- Research data (usability tests, surveys, analytics)
- Brand guidelines, design systems
- Technical specifications, limitations

**Methodology Framework (GitHub Files):**
- Task guides and methodologies
- General design frameworks and principles
- Templates and reusable resources
- Best practices and industry standards
- Process documentation and workflows

**Project context ALWAYS takes priority over generic methodology.**

**4. Validation Checklist**

Before delivering response, verify:
1. Uploaded files analyzed (if present)
2. User preferences integrated (if present)
3. Project context integrated into response
4. Task registry checked for relevant methodologies
5. All relevant sources accessed (or failures noted)
6. Information synthesized from both uploaded files and GitHub
7. Methodology adapted to project-specific needs
8. Citations reference actual retrieved content
9. Confidence level assessed for task match
10. Alignment verified with project goals

**This ensures quality and completeness.**

---

## Task Matching Mechanism

### Search Strategy

**From instructions:**
```markdown
### Primary Context Integration
- First check uploaded files for project-specific requirements
- Use project terminology to enhance keyword matching
- Apply project constraints as filters for methodology selection

### GitHub Repository Search
- Use direct keyword matches or fuzzy matching for variations/typos
- Confidence scoring: HIGH (>80% match), MEDIUM (50-80%), LOW (<50%)
- Cross-reference information across all retrieved sources
- Identify overlapping concepts and complementary insights
```

### Example Task Match Flow

**User Query:** "I need to plan a usability test for our checkout flow"

**Keywords Extracted:**
- "usability test"
- "checkout flow" (project context)

**Tasks.yaml Search:**
```yaml
usability_testing:
  task_id: "usability_testing"
  description: >
    Design and execute remote usability tests covering:
    1. Test planning and objectives
    2. Participant recruiting
    ...
  agent: research_analyst
  task_guide:
    - "usability_testing.md"
```
**Match:** HIGH confidence (>80%) - "usability test" directly matches `usability_testing`

**Agent Identified:** `research_analyst`

**Guide Loaded:** `knowledge/task_guides/usability_testing.md`

**Response Generated:** As Research Analyst, using methodology from guide, adapted to "checkout flow" context

### Fuzzy Matching Examples

**User:** "How do I do user interviews?"
**Matched:** `contextual_inquiry` (MEDIUM confidence - semantic match)

**User:** "Need help with A/B testing strategy"
**Matched:** `evaluation_type` + `ux_research_without_users` (MEDIUM - partial match)

**User:** "What's a good design process?"
**Matched:** `agile_lean_ux_frameworks` (LOW - vague query)

### No Match Handling

**From error handling:**
```markdown
When Things Don't Match (No direct task match)
1. Context-First Approach: Use uploaded project context to infer needs
2. Semantic search: Look for related concepts in guide content
3. Problem decomposition: Break complex requests into smaller tasks
4. Alternative approaches: Suggest related methodologies
5. External resources: Recommend web search or additional learning
```

---

## Agent Persona Activation

### From agents.yaml

**Structure:**
```yaml
research_analyst:
  role: Research Analyst / Analista de Investigación
  goal: Plan, execute, and synthesize research to inform decisions
  backstory: A mixed-methods practitioner who balances rigor with speed
  capabilities:
    - Planning (method, sampling, metrics)
    - Recruiting and moderation
    - Synthesis and reporting
  operating_procedures:
    - Define questions → select method
    - Prepare instruments → recruit participants
    - Run sessions/analysis → synthesize
    - Report findings → recommendations
  handoffs:
    - To strategy_analyst: insights and implications
    - From discovery_analyst: prioritized questions
  example_tasks:
    - usability_testing
    - user_personas
    - ux_survey_design
```

### How LLM Uses This

**Once agent identified (e.g., research_analyst):**

1. **Adopts Role:** "Research Analyst / Analista de Investigación"
2. **Speaks to Goal:** "Plan, execute, and synthesize research"
3. **Uses Backstory:** "A mixed-methods practitioner" (shapes tone)
4. **Applies Capabilities:** References planning, recruiting, synthesis in response
5. **Follows Operating Procedures:** Structures response around define → prepare → run → synthesize
6. **Mentions Handoffs:** "Once we have insights, we can work with the Strategy Analyst to prioritize..."

**This creates persona consistency throughout conversation.**

### Example Response Pattern

**Without Agent Persona:**
> "To plan a usability test, you should define objectives, recruit participants, create tasks, run sessions, and synthesize findings."

**With Research Analyst Persona:**
> "Let's plan your usability test together. As a research analyst, I'll guide you through a mixed-methods approach that balances rigor with your timeline constraints.
>
> First, we need to define clear research questions that tie to your checkout flow goals. What specific aspects of the checkout experience are you trying to validate?
>
> [continues with structured methodology, references recruiting guide, mentions eventual handoff to Strategy Analyst for prioritization]"

**Difference:** Expert mentorship vs generic instructions

---

## Knowledge Loading Pattern

### Just-in-Time Loading

**NOT bulk-loaded:**
- Instructions don't say "load all 64 task guides"
- Only accessed when task matched

**Loaded on demand:**
```markdown
Step 5: Learn Task Methodology
- Access task guide(s) located in `product-design-assistant/knowledge/task_guides/` directory
- Review additional content in `product-design-assistant/knowledge/materials/` directory
- Follow references within the task guide
```

**Cross-reference resolution:**
- Guide references another guide → LLM reads that guide too
- Guide references materials → LLM reads materials file
- Progressive loading as needed

**Example:**

**Initial Load:**
- `usability_testing.md` (100 lines)

**Cross-References Found:**
- "For recruiting guidance, see `recruiting_users.md`"
- "For questionnaires, reference `user_feedback_questions.md` in materials"
- "For synthesis, see `reporting_test_results.md`"

**LLM May Load:**
- `recruiting_users.md` (if user asks about recruiting)
- `user_feedback_questions.md` (if creating questionnaires)
- `reporting_test_results.md` (if discussing synthesis)

**Pattern:** Load what's needed, when it's needed

### Materials Integration

**Templates:**
```markdown
Step 5: Review additional content in `product-design-assistant/knowledge/materials/` directory
```

**When user needs journey map:**
1. Load `journey_mapping.md` (task guide)
2. Task guide references `journey_map_template.md`
3. LLM loads template
4. Shows template structure + examples
5. User adapts to their context

**Data Lists (CSV):**
- Loaded when guide references them
- Example: `cognitive_biases.md` references `cognitive_biases_list.csv`
- LLM reads CSV, surfaces relevant rows based on user's design challenge

---

## User Preferences

**Optional file:** `user_preferences.md` or `user_preferences.yaml`

**Categories:**

**Response Format:**
- Detail level: `minimal`, `standard`, `comprehensive`
- Structure: `conversational`, `structured`, `hybrid`
- Code blocks: `minimal`, `standard`, `extensive`

**Language & Terminology:**
- Primary language: `en`, `es`, `auto-detect`
- Terminology style: `technical`, `business`, `accessible`
- Regional variations: `mx`, `es`, `ar`, `us`, `uk`

**Search Strategy:**
- Confidence threshold: `high` (>80%), `medium` (>50%), `low` (>30%)
- Source priority: `project-first`, `methodology-first`, `balanced`
- Fuzzy matching: `strict`, `moderate`, `permissive`

**Workflow Preferences:**
- Skip steps: `validation`, `citations`, `context-analysis`
- Emphasis areas: `research`, `strategy`, `execution`, `validation`
- Output priorities: `speed`, `thoroughness`, `clarity`

**Integration:**
- Checked in Step 0 (before anything else)
- Preferences override defaults
- Graceful degradation if missing/malformed
- Project constraints override preferences

---

## Bilingual Support

### Intelligent Language Detection

**From instructions:**
```markdown
### Seamless Bilingual Support
- Respond in user's query language
- Provide key terms in both languages when helpful
- Adapt cultural context (Spanish business practices, regional UX patterns)
- Use appropriate examples and references
```

### How It Works

**User query in Spanish:**
> "Necesito ayuda con pruebas de usabilidad para mi aplicación móvil"

**Task matching:**
- Extracts keywords: "pruebas de usabilidad" → matches `usability_testing`
- Agent role loaded: "Research Analyst / **Analista de Investigación**"
- Response in Spanish with methodology from guide

**Mixed Spanish/English:**
> "I need help with diseño de encuestas for user research"

**Code-switching support:**
- Handles mixed queries naturally
- Provides translations for technical terms
- Response in primary language detected (English here)

**Regional variations:**
- User preferences can specify: `mx`, `es`, `ar` (Spanish) or `us`, `uk` (English)
- Adapts terminology and examples

---

## Response Format Requirements

**From instructions:**

**Structured Documents:**
- Guides, checklists, surveys, workshops, test plans → formatted documents

**Code Blocks:**
- Prompts, instructions, code, RAG files → single code block (or multiple if exceeds limit)

**Citations:**
- Always include source URLs
- Reference specific sources at bottom

**Bold Usage:**
- Only for headings, critical terms, unique keywords directly relevant to query

**Clarity:**
- Detect ambiguous requests → seek clarification before proceeding

**Language:**
- Handle bilingual queries seamlessly without switching context

**Completeness:**
- Ensure all task-related sources AND uploaded files consulted

---

## Error Handling

### Missing Task Match

**Instructions define fallback:**
```markdown
When Things Don't Match (No direct task match)
1. Context-First Approach: Use uploaded project context to infer needs
2. Semantic search: Look for related concepts in guide content
3. Problem decomposition: Break complex requests into smaller tasks
4. Alternative approaches: Suggest related methodologies
5. External resources: Recommend web search or additional learning
```

### User Preference File Issues

```markdown
- Malformed YAML/Markdown: Log error, use defaults, notify user
- Invalid preference values: Use nearest valid option, note in response
- Conflicting preferences: Prioritize project requirements, note conflicts
```

### Partial Matches

```markdown
- Use available guides as foundation
- Adapt to project context from uploaded files
- Fill gaps with general UX principles
- Note limitations explicitly
- Suggest validation methods specific to project
```

### Missing Context

```markdown
- No uploaded files: Proceed with GitHub methodology, request project details
- Incomplete project info: Flag missing context, proceed with assumptions noted
- Conflicting requirements: Surface conflicts, request clarification
```

---

## Platform-Specific Considerations

### Claude Desktop (Projects)

**Strengths:**
- GitHub upload integration (direct from repository)
- Folder selection (upload `config/`, `knowledge/` separately)
- Custom instructions field (clear separation)
- Project knowledge scoped per project

**Limitations:**
- Requires Claude Pro subscription
- No persistent memory across sessions (each chat resets)
- Limited to Claude's context window
- Single project active per conversation

### Gemini (Gems)

**Strengths:**
- Gem-specific instructions
- Conversation starters (pre-configured queries)
- Integration with Google Workspace
- Per-thread conversation memory

**Limitations:**
- Requires Google One AI Premium
- Single instruction field (not separate project instructions)
- File upload process less streamlined than Claude's GitHub integration
- Context window management different from Claude

### Common Constraints

**Both platforms:**
- **No persistent memory** - sessions reset, no cross-conversation learning
- **No multi-project support** - one project/gem per conversation
- **Platform-dependent** - locked to Claude Pro or Google One AI Premium
- **Limited token usage** - constrained by platform context windows
- **No external knowledge integration** - can't cite Perplexity AI, other tools

**These constraints motivated Sophie's development.**

---

## What Sophie Must Preserve

### Core Mechanisms

1. **File-Based Knowledge System**
   - config/ (YAML configurations)
   - knowledge/ (markdown guides + materials)
   - Separation of configuration, methodology, tools

2. **Orchestration Instructions**
   - Step-by-step workflow
   - Conditional execution
   - Validation checklist
   - Error handling

3. **Just-in-Time Loading**
   - Task matching first
   - Load guide only when matched
   - Cross-reference resolution
   - Progressive knowledge disclosure

4. **Agent Persona System**
   - Role-based expertise
   - Operating procedures
   - Handoff patterns
   - Character consistency

5. **Two-Tier Context**
   - User project files (authoritative)
   - Methodology framework (reference)
   - Project context overrides generic

6. **User Preferences**
   - Optional customization
   - Graceful degradation
   - Category-based configuration

7. **Bilingual Support**
   - Intelligent language detection
   - Code-switching
   - Regional variations

---

## What Sophie Must Add

### Missing Capabilities

1. **Persistent Memory**
   - Cross-session conversation history
   - Learning from user interactions
   - Project state persistence

2. **Multi-Project Support**
   - Switch between projects seamlessly
   - Isolated project contexts
   - Project metadata tracking

3. **External Knowledge Integration**
   - Perplexity AI research
   - Claude Code collaboration
   - Other AI tool outputs
   - Provenance tracking

4. **Provider Agnosticism**
   - Works with Claude Code CLI
   - Works with Gemini CLI
   - Abstracted AI provider interface

5. **Enhanced Search**
   - Semantic search within knowledge base
   - Conversation history search
   - Cross-project insights

---

## Sophie's Integration Strategy (To Define)

### For Claude Code CLI

**Options:**

**Option 1: MCP Server**
- Sophie as MCP server
- Claude Code connects via MCP
- Server loads config/knowledge files
- Orchestration in MCP tools

**Option 2: Custom Instructions + File Loading**
- Instructions similar to original
- CLI loads files programmatically
- Injects into Claude Code session

**Option 3: Session Bootstrap**
- Sophie CLI prepares session
- Loads config + knowledge into context
- Launches Claude Code with pre-loaded context

### For Gemini CLI

**Similar patterns, OAuth-based**
- Gemini CLI uses OAuth (no desktop app)
- File loading mechanism needed
- Instructions injection strategy

### Key Technical Challenges

1. **How to load files into CLI session?**
   - Original: Platform uploads files, makes available
   - Sophie: Need programmatic file injection

2. **How to maintain instructions across messages?**
   - Original: Custom instructions persist in project/gem
   - Sophie: Need session-level instruction persistence

3. **How to enable just-in-time loading?**
   - Original: LLM reads files on demand from project knowledge
   - Sophie: Need file reading capability during conversation

4. **How to manage multi-project contexts?**
   - Original: One project per conversation
   - Sophie: Need project switching + context isolation

**These challenges define Sophie's Phase 1-2 work.**

---

## Key Insights

### What Makes It Work

1. **Instructions as Orchestration Engine**
   - Not hardcoded logic
   - LLM interprets and executes
   - Flexible, adaptable workflow

2. **YAML as Configuration**
   - Agents defined declaratively
   - Tasks mapped to guides
   - No code changes to add tasks/agents

3. **Markdown as Knowledge**
   - Human-readable expertise
   - LLM-parseable format
   - Cross-references enable navigation

4. **Platform Provides Infrastructure**
   - File storage
   - File reading capability
   - Custom instruction persistence
   - Conversation management

### What Sophie Changes

1. **Platform Independence**
   - Original: Locked to Claude Desktop / Gemini Gems
   - Sophie: Runs on Claude Code CLI / Gemini CLI

2. **Persistent Memory**
   - Original: Sessions reset
   - Sophie: SQLite database across sessions

3. **Multi-Project**
   - Original: One project per conversation
   - Sophie: Switch projects, isolated contexts

4. **External Knowledge**
   - Original: Only uploaded files + GitHub
   - Sophie: 4th tier for Perplexity AI, other tools

### What Stays the Same

- File-based knowledge system
- Orchestration pattern
- Just-in-time loading
- Agent personas
- 12-section guide structure
- Two-tier context (project + methodology)
- Bilingual support

---

**Analysis Status:** Complete (Integration Model)
**Last Updated:** 2025-11-14
**Next:** Extract deliverable requirements from task guides
