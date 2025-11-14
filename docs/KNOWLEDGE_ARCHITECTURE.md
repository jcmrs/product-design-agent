# Knowledge Architecture Analysis

> **How 15,793 lines of expert knowledge are organized to power the Product Design Agent**

**Date:** 2025-11-14
**Purpose:** Understand knowledge organization to preserve structure in Sophie
**Status:** Complete

---

## Executive Summary

The Product Design Agent's knowledge base is a **two-tier system**:

1. **Task Guides** (64 methodologies) - HOW to do the work
2. **Materials** (11 support files) - TOOLS to use during work

**Total:** 75 files, 15,793 lines of expert-curated content

**Key Pattern:** Guides reference materials, materials enable guides, creating **knowledge network** not knowledge library.

---

## Knowledge Base Inventory

### Task Guides: 64 Methodologies

**Location:** `knowledge/task_guides/*.md`

**Categories (by agent assignment):**

**Research (14 guides) - Research Analyst**
- usability_testing.md
- usability_testing_userbrain.md
- moderating_usability_test.md
- recruiting_users.md
- reporting_test_results.md
- ux_survey_design.md
- user_personas.md
- contextual_inquiry.md
- heuristic_evaluation.md
- ux-audit-expert-review.md
- evaluation_type.md
- ux_research_without_users.md
- affinity_diagramming.md
- test_plan.md

**Strategy (13 guides) - Strategy Analyst**
- mvp_definition.md
- prioritization.md
- initiative_canvas.md
- business_model.md
- value_proposition.md
- define_product_assumptions.md
- design_kpis.md
- project_type_strategy.md
- critical_path.md
- product_requirements_document.md
- executive_summary.md
- executive_presentation.md
- design_pitch.md

**Collaboration (6 guides) - Collaboration Facilitator**
- design_critique.md
- meeting_facilitation.md
- stakeholder_management.md
- difficult_conversations.md
- kickoff_meeting.md
- brainstorming.md

**AI/Automation (6 guides) - AI Specialist**
- writing_prompts.md
- writing_ai_image_prompts.md
- snowball_vibe_coding.md
- prompt_minification.md
- prototype_prompt_creation.md
- style_spec_json_builder.md

**Discovery (3 guides) - Discovery Analyst**
- journey_mapping.md
- mental_modeling.md
- writing_statements.md

**Design Systems (3 guides) - Design System Specialist**
- component_documentation.md
- design_token_naming.md
- creating_icons.md
- matching_icon_typefaces.md

**Content (3 guides) - Content Specialist**
- content_audit.md
- content_inventory.md
- content_testing.md

**Onboarding (3 guides) - Onboarding Specialist**
- onboarding_designers.md
- onboarding_design_leads.md
- agent_onboarding_guide.md

**Education (3 guides) - Design Educator**
- cognitive_biases.md
- b2b_design.md
- economics_for_designers.md

**Leadership (3 guides) - Team Lead**
- team_management.md
- hiring_designers.md
- boost_ux_culture.md

**Project Management (2 guides) - Project Manager**
- kickoff_meeting.md
- writing_tasks.md

**Specialized Topics (5 guides)**
- empathy_mapping.md
- data_information_knowledge.md
- creating_design_teams.md
- designing_ai_assistants.md
- agile_lean_ux_frameworks.md

### Materials: 11 Support Files

**Location:** `knowledge/materials/*`

**Templates (2 .md files)** - Fillable frameworks for workshops/deliverables
- `journey_map_template.md` (505 lines) - Complete journey mapping structure with 3 examples
- `mental_model_workshop_template.md` (119 lines) - Workshop facilitation template

**Registries (2 .md files)** - Collections of reusable content
- `user_feedback_questions.md` - Question bank for research (categorized with "When/How to Use")
- `prompt_templates_registry.md` - AI prompt templates with usefulness ratings

**Catalogs (1 .md file)** - Annotated guides to tasks
- `agent_task_catalog.md` - Complete task list with "What it is / How it helps / When to use"

**Triggers (1 .md file)** - Pattern matching rules
- `onboarding_triggers.md` (113 lines) - Keywords/phrases that activate agent onboarding

**Data Lists (4 .csv files)** - Structured reference data
- `cognitive_biases_list.csv` (76 biases with descriptions, problems, usage, examples)
- `product_metrics_list.csv` - KPI/metrics reference
- `content_audit_checklist_EN.csv` - English content audit checklist
- `content_audit_checklist_ES.csv` - Spanish content audit checklist (bilingual support)

**Structured Data (1 .json file)** - Template format
- `icon_family_json_template.json` - Icon system specification format

---

## Universal Guide Structure

**Every task guide follows 12-section pattern:**

### 1. Executive Summary
```markdown
> **Executive Summary** — [What you'll accomplish with this guide]
```
**Purpose:** Immediate clarity, sets expectations, often includes cross-references

**Example (MVP Definition):**
> "This guide helps product teams pick the *right* build artifact for their stage: **POC**, **Prototype**, **MVP**, **MUE/MVE**, **MLP**, or **MAP**."

### 2. Overview & Objectives
- **Purpose:** Why this methodology exists
- **Scope:** What's included/excluded
- **Audience:** Who should use this
- **Success Criteria / KPIs:** How to know it worked

### 3. Preparation
- **Research & Planning:** What to do first
- **Checklist:** Concrete pre-work items

**Pattern:** Prevents starting unprepared

### 4. Main Flow / Process
- **Time-boxed:** Every step has duration estimate
- **Sequential:** Clear order of operations
- **Options:** Multiple paths when appropriate
- **Concrete actions:** Not theory, but "do this"

**Example (Design Critique - Synchronous, 60 min):**
```
1) Opening (5 min)
2) Presenter Context (8-10 min)
3) Silent Scan (5 min)
4) Clarifying Questions (3-5 min)
5) Feedback Round (20 min)
6) Focused Deep-Dive (10 min, optional)
7) Wrap-up (5 min)
```

### 5. Templates / Canvases / Frameworks
- Actual formats you can use
- Fill-in-the-blank structures
- Visual frameworks

**Cross-references materials/** - e.g., "Use journey_map_template.md"

### 6. Best Practices by Context
When guides cover multiple approaches:
- Each gets dedicated section with:
  - When to use
  - Scope definition
  - Success metrics
  - Do checklist
  - Avoid pitfalls

### 7. Roles & Responsibilities
- Who does what
- Clear ownership
- Collaboration patterns

### 8. Aftermath / Follow-ups
- Next steps after completing this work
- Documentation requirements
- Follow-up cadence
- Handoffs to related work

### 9. Best Practices & Pitfalls
**Do:**
- [Recommended approaches]
- [Quality standards]
- [Success behaviors]

**Avoid:**
- [Common mistakes]
- [Anti-patterns]
- [Failure modes]

### 10. Tools & Resources
- Specific tools (UserTesting, Miro, Figma, etc.)
- Software platforms
- Templates (often linked to /materials)

### 11. FAQ / Quick Answers
- Clarifications on concepts
- Disambiguation between similar approaches
- Quick decision guidance

### 12. References
- Practitioner articles
- Framework creators
- Methodology sources
- Tool documentation

**Every guide includes 5-7 expert references**

---

## Knowledge Integration Patterns

### 1. Guide → Guide Cross-References

**Explicit Links Throughout:**
- "For prioritization details, see `prioritization.md`"
- "Reporting results covered in `reporting_test_results.md`"
- "For interview questions, reference `user_feedback_questions.md` in materials"

**Creates:**
- Connected knowledge system
- Prevents duplication
- Enables progressive disclosure

**Example (Journey Map Template):**
```markdown
## Related Task Guides

**Before Journey Mapping:**
- `user_personas.md` - Validate persona accuracy and completeness
- `empathy_mapping.md` - Understand emotional drivers and pain points
- `writing_statements.md` - Craft supporting user stories and hypotheses

**During Journey Mapping:**
- `journey_mapping.md` - Advanced techniques for complex multi-system journeys
- `mental_modeling.md` - Understanding user assumptions and workflows

**After Journey Mapping:**
- `usability_testing.md` - Validate journey assumptions with real users
- `product_requirements_document.md` - Translate insights into feature specifications
```

### 2. Guide → Materials References

**Task guides reference supporting materials:**

**From journey_mapping.md:**
```markdown
## Templates
- See `journey_map_template.md` for complete structure
- Includes B2B SaaS, Healthcare, E-commerce examples
```

**From ux_survey_design.md:**
```markdown
## Question Bank
- See `user_feedback_questions.md` in materials/
- Categorized by research goal
- Includes "When/How to Use" guidance
```

**From cognitive_biases.md:**
```markdown
## Reference Data
- See `cognitive_biases_list.csv` for complete list
- 76 biases with examples and design implications
```

### 3. Materials → Guide Support

**Materials designed to enable guides:**

**journey_map_template.md includes:**
- **Template Customization Rules** (what's required vs flexible)
- **Validation Checklist** (before using template)
- **Integration Requirements** (links back to guides)
- **Related Task Guides** (before/during/after workflow)
- **Complete Template Structure** (markdown-ready)
- **3 Full Examples** (B2B SaaS, Healthcare, E-commerce with 500 lines of realistic content)

**Pattern:** Materials aren't just reference—they teach HOW to use them

### 4. Agent Collaboration References

**Guides specify handoff points:**

**From tasks.yaml:**
```yaml
usability_testing:
  agent: research_analyst
```

**From research_analyst in agents.yaml:**
```yaml
handoffs:
  - To strategy_analyst: insights and implications
  - To content_specialist: report polish
  - From discovery_analyst: prioritized questions
```

**Guides reflect this:**
```markdown
## Aftermath / Follow-ups
- Share findings with strategy_analyst for prioritization
- Work with content_specialist to polish final report
```

---

## Knowledge Depth Examples

### Example 1: Usability Testing (100 lines)

**Structure:**
- Executive summary
- Preparation checklist (8-step pre-test checklist)
- 6-phase process (Planning → Recruiting → Pre-test → Testing → Post-test → Wrap-up)
- Templates (test plans, questionnaires, task scripts)
- Best practices vs pitfalls
- Tools (UserTesting, Loop11, specific platforms)
- Cross-references to recruiting_users.md, reporting_test_results.md, user_feedback_questions.md

**Why this works:**
- Complete end-to-end process
- Actionable checklists
- Tool recommendations
- Integrated with other guides

### Example 2: Difficult Conversations (299 lines)

**Depth:**
- 4-phase conversation framework (with time allocations)
- Breaking bad news (7-step medical framework adapted for design)
- Advocacy conversations (response templates for objections)
- Argumentation techniques (steelmanning, double cruxing)
- Emergency 5-minute prep guide
- Decision trees and flowcharts
- Real examples and scripts

**Why this works:**
- Multiple methodologies for different contexts
- Emergency quick-reference included
- Evidence-based (medical framework, argumentation theory)
- Practical scripts reduce anxiety

### Example 3: Journey Map Template (505 lines)

**Comprehensive:**
- Template customization rules (required vs flexible elements)
- Validation checklist
- Integration requirements (cross-references to 6 guides)
- Related task guides (before/during/after workflow)
- Complete template structure (markdown-ready)
- **3 Full Examples:**
  - B2B SaaS Platform Onboarding (enterprise context)
  - Healthcare Patient Appointment Journey (consumer context)
  - E-commerce Product Discovery (transactional context)

**Each example includes:**
- Journey overview (user type, goal, context, success criteria)
- Entry points (multiple triggers)
- 3+ journey steps with scenarios (positive, negative, edge cases)
- Follow-up actions (immediate, medium-term, long-term)
- Success metrics
- Key insights & recommendations

**Why this works:**
- Not just template—shows HOW to fill it in
- Real-world examples from different domains
- Teaches pattern through demonstration
- 500 lines of realistic content = minimal cognitive load to adapt

### Example 4: Cognitive Biases List (76 biases, CSV)

**Data Structure:**
```csv
Name, Description, Problem, Usage(s), Examples
```

**Example Row:**
```
Aesthetic-Usability Effect,
"A user's perception that attractive products are more usable upon first impression. Users believe that designs that look more pleasing will work better, even if it is not more functional",
Filtering,
"Use clean visual design to increase forgiveness for minor issues.; Invest in polish for first-run and high-traffic surfaces.",
"Refined empty states reduce perceived complexity. • Micro-interactions smooth rough edges in forms. • Consistent typography makes dense tables feel lighter. • Visual hierarchy clarifies noisy dashboards. • Delightful loading states mask brief waits."
```

**Why CSV format:**
- Machine-readable for AI processing
- Easy to filter/search
- Structured for pattern matching
- Lightweight to load

**Integration:**
- cognitive_biases.md (guide) teaches WHEN/HOW to use
- cognitive_biases_list.csv (data) provides REFERENCE during design

---

## Bilingual Support Patterns

**Throughout knowledge base:**

**Agent Roles (from agents.yaml):**
```yaml
role: Research Analyst / Analista de Investigación
role: Strategy Analyst / Analista de Estrategia
role: Team Lead / Líder de Equipo
```

**Content Audit Checklists:**
- `content_audit_checklist_EN.csv`
- `content_audit_checklist_ES.csv`

**Key phrases in guides:**
- English primary content
- Spanish terms where appropriate
- Industry-standard terminology in both languages

**Pattern:** Accessibility without duplication—bilingual where it matters (roles, checklists), English primary for methodology depth

---

## Knowledge Organization Principles

### 1. **Two-Tier System**

**Tier 1: Task Guides (methodologies)**
- HOW to do the work
- Step-by-step processes
- Best practices embedded
- Expert references

**Tier 2: Materials (tools)**
- WHAT to use during work
- Templates, registries, data
- Supporting resources
- Quick reference

**Why this works:**
- Separation of concerns
- Guides don't duplicate templates
- Materials stay DRY (Don't Repeat Yourself)
- Easy to update templates without touching guides

### 2. **Universal Structure + Contextual Depth**

**Every guide has same 12 sections** (consistency)
- User knows where to find information
- Scanning is efficient
- Professional standard maintained

**But depth varies by complexity** (appropriateness)
- Usability Testing: 100 lines (straightforward process)
- Difficult Conversations: 299 lines (high complexity, multiple frameworks)
- MVP Definition: 201 lines (teaches decision framework)

**Pattern:** Structure creates familiarity, depth matches necessity

### 3. **Progressive Disclosure Through Links**

**Guides don't include everything—they link:**

**Example: MVP Definition**
```markdown
> **defer prioritization details to `prioritization.md`**
```

Instead of duplicating prioritization frameworks, quick reference + link.

**Why this works:**
- Prevents overwhelming users
- Maintains single source of truth
- Enables deep-dive when needed
- Reduces maintenance burden

### 4. **Evidence-Based Knowledge**

**Every guide includes References section:**
- Practitioner articles
- Framework creators
- Methodology sources
- Tool documentation

**Example (Design Critique):**
```markdown
## References
- Design Critiques at Figma — six methods: https://...
- Practical Design Critique — Darrin Henein: https://...
- How to run an effective design critique — zeroheight: https://...
- Design critique — checklists & framework — Jonny Czar (UX Collective): https://...
```

**Pattern:** Not opinion—curated expert knowledge with attribution

### 5. **Actionable Over Theoretical**

**Every guide:**
- Provides concrete steps
- Includes checklists
- Offers templates
- Shows examples

**NOT:** "Here's what design critique is"
**INSTEAD:** "Here's how to run one, with this template, these time boxes, these roles"

**Why this works:**
- User can DO the work immediately
- Reduces decision paralysis
- Professional outputs by default
- Quality standards embedded

---

## How Knowledge is Used (Inferred Pattern)

### User Conversation Flow

**User says:** *"I need to plan a usability test for our mobile app"*

**System (inferred):**
1. **Intent matching** → Identifies `usability_testing` task
2. **Agent loading** → Activates `research_analyst` persona
3. **Knowledge loading** → Loads `usability_testing.md` (just-in-time)
4. **Conversation** → Research Analyst guides through:
   - Preparation checklist
   - Recruiting considerations
   - Test plan creation
   - Task script development
   - Facilitation guidance
5. **Cross-references** → May surface:
   - `recruiting_users.md` if recruiting is challenge
   - `user_feedback_questions.md` for questionnaire design
   - `reporting_test_results.md` for synthesis phase

**Key insight:** Guides are REFERENCE not SCRIPT
- Agent speaks naturally in character
- Guide provides expertise invisibly
- User experiences mentorship, not documentation lookup
- Structure is in content, not conversation

### Materials Integration

**During conversation, agent may:**

**Surface templates:**
- "Let me share a journey map template you can use..."
- Loads `journey_map_template.md`
- Shows structure + examples
- User adapts to their context

**Reference data:**
- "Here are common cognitive biases to watch for..."
- Loads relevant rows from `cognitive_biases_list.csv`
- Explains in context of user's design challenge
- Doesn't dump entire list—curates relevant subset

**Trigger onboarding:**
- User says "What can you help me with?"
- Pattern matches `onboarding_triggers.md` rules
- Loads `agent_onboarding_guide.md`
- Loads `agent_task_catalog.md` for comprehensive overview
- Guides user to relevant starting point

**Pattern:** Materials are tools in agent's toolkit, surfaced contextually

---

## Critical Success Factors for Sophie

### Must Preserve

1. **Two-Tier Knowledge System**
   - Task guides (methodologies)
   - Materials (tools)
   - Separation of concerns
   - Cross-reference network

2. **Universal 12-Section Structure**
   - Consistency across all guides
   - Summary → Process → Tools → Follow-up → References
   - Depth varies, structure doesn't
   - Professional standard embedded

3. **Just-in-Time Loading**
   - Don't bulk-load all 15,793 lines
   - Load guide when task matched
   - Load materials when referenced
   - Keep token usage minimal

4. **Cross-Reference Network**
   - Guides reference guides
   - Guides reference materials
   - Materials reference guides
   - Creates connected knowledge, not isolated documents

5. **Evidence-Based Content**
   - Expert references in every guide
   - Proven frameworks
   - Industry-standard tools
   - Attribution and credibility

6. **Actionable Orientation**
   - Checklists throughout
   - Templates provided
   - Examples shown
   - Scripts included
   - Theory → Practice

7. **Progressive Disclosure**
   - Executive summary frontloads
   - FAQ provides quick answers
   - Full methodology for depth
   - Cross-references for related work
   - Users can skim OR dive deep

---

## Implications for Sophie

### Knowledge Architecture Requirements

1. **File Organization**
   - Maintain `knowledge/task_guides/` and `knowledge/materials/` separation
   - Preserve naming conventions (lowercase, underscores)
   - Keep bilingual support pattern

2. **Loading Mechanism**
   - Task matching → identify guide(s) to load
   - Just-in-time injection into context
   - Cross-reference resolution (when guide references another, load on demand)
   - Materials loading when template/data referenced

3. **Knowledge Network Traversal**
   - Parse cross-references in markdown
   - Resolve links to other guides/materials
   - Suggest related guides at conversation endpoints
   - Enable "progressive learning" through links

4. **Template Population**
   - Materials templates are markdown-ready
   - Can be populated with user context
   - Should maintain structure while adapting content
   - Examples teach pattern

5. **Data Access**
   - CSV files should be queryable
   - JSON files should be parseable
   - Enable filtering/searching within data
   - Surface relevant subsets, not entire lists

---

## Next Steps

1. **Analyze Claude Desktop Integration**
   - How are YAML configs loaded?
   - How are markdown guides injected?
   - What's the mechanism for task matching?
   - How is context managed across conversations?

2. **Extract Deliverable Requirements**
   - What does each task produce?
   - What are the output formats?
   - What quality standards are embedded?

3. **Document Sophie Technical Requirements**
   - How to implement two-tier knowledge in Claude Code/Gemini CLI?
   - MCP? Custom instructions? Other approach?
   - Just-in-time loading strategy
   - Cross-reference resolution mechanism

---

## Knowledge Metrics

**Task Guides:**
- 64 methodology files
- 12-section universal structure
- ~50-300 lines per guide
- 5-7 expert references per guide
- 3+ cross-references per guide (average)

**Materials:**
- 11 support files
- 2 templates (with 3 examples each)
- 2 registries (question bank, prompt library)
- 1 catalog (annotated task list)
- 1 trigger set (pattern matching rules)
- 4 CSV data files (76 biases, metrics, bilingual checklists)
- 1 JSON template (icon system spec)

**Cross-References:**
- Task guides reference 3-10 other guides each
- All guides reference materials where appropriate
- Materials reference guides for methodology context
- Dense knowledge network, not isolated documents

**Total Lines:** 15,793
**Total Files:** 75
**Languages:** English + Spanish (selective bilingual support)

---

**Analysis Status:** Complete (Knowledge Architecture)
**Last Updated:** 2025-11-14
**Next:** Analyze Claude Desktop integration model
