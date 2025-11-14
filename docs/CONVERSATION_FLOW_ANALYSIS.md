# Conversation Flow Pattern Analysis

> **How users experience the Product Design Agent - the actual conversation patterns**

**Date:** 2025-11-10
**Purpose:** Understand UX patterns to preserve in Sophie
**Status:** In Progress

---

## Core Pattern: Guided Professional Mentorship

### The Experience (User Perspective)

**Not:** "Here's information about usability testing"
**Instead:** "Let's plan your usability test together. First, let me understand your context..."

**Not:** Generic documentation lookup
**Instead:** Expert walking you through proven process, step-by-step

---

## Universal Guide Structure

**Every methodology guide follows this pattern:**

### 1. Executive Summary (Orientation)
```
> **Executive Summary** — [What you'll accomplish with this guide]
```

**Purpose:**
- Immediate clarity on what you'll learn
- Sets expectations for deliverables
- Often includes related guides ("defer to X.md for details")

**Example (MVP Definition):**
> "This guide helps product teams pick the *right* build artifact for their stage: **POC**, **Prototype**, **MVP**, **MVE/MUE**, **MLP**, or **MAP**."

### 2. Overview & Objectives (Context Setting)

**Standard Sections:**
- **Purpose:** Why this methodology exists
- **Scope:** What's included/excluded
- **Audience:** Who should use this
- **Success Criteria / KPIs:** How to know it worked

**Purpose:** Frames the work before diving in

**Example (Design Critique):**
```
- Purpose: Improve a design against stated goals
- Scope: Remote sessions (async + synchronous)
- Audience: Designers and collaborators
- Success Criteria: Presenter unblocked with clear next steps
```

### 3. Preparation (Before You Start)

**Always includes:**
- **Research & Planning:** What to do first
- **Checklist:** Concrete pre-work items

**Pattern:** Prevents starting unprepared

**Example (MVP Definition):**
```
Checklist:
- [ ] Problem & segment validated
- [ ] Primary unknown classified: Feasibility, Experience, or Market fit
- [ ] Success metrics/hypotheses defined
- [ ] Non-goals list created
- [ ] Baseline experience bar agreed
```

**Example (Design Critique):**
```
- [ ] Create pre-read (share 24-48h ahead)
- [ ] Define feedback scope explicitly
- [ ] Curate audience (3-7 active critiquers)
- [ ] Confirm roles: Presenter, Facilitator, Notetaker
- [ ] Set up shared workspace
```

### 4. Main Flow / Process (The Work)

**Key Characteristics:**
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

**Example (MVP Definition - Decision Flow):**
```
1) Is core feasibility unknown?
   → POC (smallest tech experiment)

2) Is usability/interaction unclear?
   → Prototype (test tasks & flows)

3) Need market signal with real users?
   → MVP (ship core value)

4) Crowded competitive space?
   → Raise bar to MLP/MAP
```

### 5. Templates / Canvases / Frameworks (Tools)

**Provides:**
- Actual formats you can use
- Fill-in-the-blank structures
- Visual frameworks

**Example (Design Critique - Remote Crit Frame):**
```
- Title & Date
- Problem & Goals
- Users & Scenarios
- Stage (30/60/90)
- Seeking / Not Seeking
- Key Insights & Constraints
- Open Questions
- Risks & Assumptions
- Next Steps (draft)
```

**Example (MVP - POC One-Pager):**
```
- Hypothesis: e.g., "We can generate summaries <500ms @P95"
- Method: dataset/stub, environment, constraints
- Exit Criteria: Go/No-Go thresholds; follow-up risks
```

### 6. Best Practices by Context (Specialized Guidance)

**When guides cover multiple approaches:**
- POC vs Prototype vs MVP vs MLP vs MAP
- Each gets dedicated section with:
  - When to use
  - Scope definition
  - Success metrics
  - Do checklist
  - Avoid pitfalls

**Example (MVP Definition has 6 artifact types, each with):**
```
### MVP (Minimum Viable Product)
- Use when: Need real-user validation of core value
- Success Metric: Activation %, retention proxy
- Do:
  - [ ] Ship one clear value path end-to-end
  - [ ] Define activation event & time-to-value
  - [ ] Instrument feedback loops
- Avoid: Over-stuffing features; conflating MVP with "low quality"
```

### 7. Roles & Responsibilities (When Collaborative)

**Defines:**
- Who does what
- Clear ownership
- Collaboration patterns

**Example (Design Critique):**
```
- Presenter: Tell story, ask for targeted feedback, listen
- Critiquers: Offer objective, specific, actionable feedback
- Facilitator: Enforce norms, ensure balanced participation
- Notetaker: Capture decisions, risks, actions
```

### 8. Aftermath / Follow-ups (What's Next)

**Always includes:**
- Next steps after completing this work
- Documentation requirements
- Follow-up cadence
- Handoffs to related work

**Example (Design Critique):**
```
- Recap package (post within 24h):
  - Recording + transcript
  - Decisions, rejected options (and why)
  - Actions with owners and dates
- Change log in design doc
- Track ritual health metrics
```

**Example (MVP Definition):**
```
- POC → Prototype? If feasible, resolve UX unknowns next
- Prototype → MVP? When tasks succeed and desirability clear
- MVP → MLP/MAP? When market validates and competition raises bar
- Experience Debt Log: Track MUE/MVE gaps
```

### 9. Best Practices & Pitfalls (Do's and Don'ts)

**Universal Pattern:**

**Do:**
- [Recommended approaches]
- [Quality standards]
- [Success behaviors]

**Avoid:**
- [Common mistakes]
- [Anti-patterns]
- [Failure modes]

**Example (Design Critique):**
```
Do:
- Tie every comment to goal, user outcome, or constraint
- Prefer questions to assertions
- Normalize work-in-progress

Avoid:
- Bikeshedding (dwelling on low-impact details)
- Solutioneering inside the crit
- Vague feedback ("doesn't feel right")
- Dominance effects
```

### 10. Tools & Resources (Practical Enablers)

**Lists:**
- Specific tools (UserTesting, Miro, Figma, etc.)
- Software platforms
- Templates (often linked to /materials)

**Example (Design Critique):**
```
- Core stack: shared design files with comments, collaborative boards,
  meeting platform with recording/captions
- Optional: lightweight voting, linkable screen/flow IDs
```

### 11. FAQ / Quick Answers (Common Questions)

**Addresses:**
- Clarifications on concepts
- Disambiguation between similar approaches
- Quick decision guidance

**Example (MVP Definition):**
```
- POC vs Prototype? POC proves feasibility; Prototype tests usability/UX
- MVP vs MVE? MVP = product with core value; MVE = experience baseline
- When MLP/MAP? When experience differentiation needed at launch
- What's "minimum" here? Contextual—brand maturity sets the bar
```

### 12. References (Expert Sources)

**Every guide includes:**
- Practitioner articles
- Framework creators
- Methodology sources
- Tool documentation

**Example (5-7 expert references per guide):**
```
- Design Critiques at Figma — six methods: [link]
- Practical Design Critique — Darrin Henein: [link]
- How to run effective design critique — zeroheight: [link]
```

---

## Conversation Flow Dynamics

### Phase 1: Orientation (Executive Summary + Overview)

**Agent provides:**
- What you'll accomplish
- Why this methodology
- Who it's for
- Success looks like

**User gains:**
- Confidence this is the right approach
- Clear expectations
- Context for the work ahead

### Phase 2: Preparation (Before Starting)

**Agent guides through:**
- What research/planning needed
- Checklist of pre-work
- Who to involve
- Tools to set up

**User completes:**
- Concrete preparation steps
- Stakeholder alignment
- Environment setup

**Pattern:** Prevents "jumping in unprepared"

### Phase 3: Execution (Main Flow)

**Agent walks through:**
- Time-boxed steps
- Sequential process
- Decision points
- Options when multiple paths exist

**User follows:**
- Clear sequence
- Knows how long each step takes
- Has structure without rigidity

**Pattern:** Professional process execution

### Phase 4: Tooling (Templates & Frameworks)

**Agent provides:**
- Actual formats to use
- Fill-in-the-blank structures
- Visual frameworks

**User applies:**
- Professional templates
- Proven formats
- Industry-standard structures

**Pattern:** Quality outputs by design

### Phase 5: Quality Control (Best Practices & Pitfalls)

**Agent reinforces:**
- What to do (positive behaviors)
- What to avoid (anti-patterns)
- Context-specific guidance

**User internalizes:**
- Professional standards
- Common mistakes to avoid
- Success patterns

**Pattern:** Embedded quality assurance

### Phase 6: Closure (Aftermath & Follow-ups)

**Agent ensures:**
- Next steps are clear
- Documentation captured
- Handoffs identified
- Follow-up planned

**User knows:**
- What comes next
- Who does what
- When to revisit

**Pattern:** Continuity and momentum

---

## Cross-Guide Patterns

### Explicit Cross-References

**Guides reference each other:**
- "For prioritization details, see `prioritization.md`"
- "Reporting results covered in `reporting_test_results.md`"
- "For interview questions, reference `user_feedback_questions.md` in materials"

**Creates:**
- Connected knowledge system
- Prevents duplication
- Enables progressive disclosure

### Bilingual Support

**Every guide includes:**
- English primary content
- Spanish terms where appropriate
- Key phrases in both languages

**Example:**
```
Research Analyst / Analista de Investigación
Team Lead / Líder de Equipo
Strategy Analyst / Analista de Estrategia
```

### Progressive Complexity

**Guides offer multiple paths:**
- Quick reference (FAQ, checklists)
- Standard flow (main process)
- Deep dive (specialized sections)
- Expert resources (references)

**Users can:**
- Skim for quick answers
- Follow full methodology
- Go deep when needed
- Learn from experts

---

## Conversation Characteristics

### 1. Professional Voice

**Agent speaks as expert:**
- Uses first-person when appropriate
- Professional but approachable
- Contextual (Research Analyst vs Strategy Analyst)

**Not academic, not casual - professional mentor**

### 2. Actionable Over Theoretical

**Every guide:**
- Provides concrete steps
- Includes checklists
- Offers templates
- Shows examples

**Not:** "Here's what design critique is"
**Instead:** "Here's how to run one, with this template, these time boxes, these roles"

### 3. Evidence-Based

**Every guide:**
- References expert practitioners
- Cites frameworks and methodologies
- Links to source materials
- Provides real examples

**Builds credibility and learning**

### 4. Context-Aware

**Guides acknowledge:**
- Different situations need different approaches
- Constraints matter (remote vs in-person, startup vs enterprise)
- One size doesn't fit all
- Trade-offs exist

**Example (MVP Definition):**
```
"What's 'minimum' here? Contextual—brand maturity and market norms set the bar"
```

### 5. Quality-Focused

**Every guide:**
- Defines success criteria upfront
- Embeds best practices
- Warns against pitfalls
- Maintains professional standards

**"Minimum" never means "low quality"**

---

## User Experience Patterns

### Discovery Without Knowing

**User doesn't need to know:**
- That methodology exists
- What it's called
- Where it lives

**Agent matches:**
- "I need to validate my MVP idea" → `mvp_definition.md`
- "We need to run a design critique" → `design_critique.md`
- "How do I handle a difficult conversation?" → `difficult_conversations.md`

### Just-in-Time Guidance

**Agent loads:**
- Relevant methodology when needed
- Not all knowledge upfront
- Contextual to current task

**Prevents:**
- Information overload
- Paralysis by analysis
- Irrelevant suggestions

### Completeness Without Overwhelm

**Guides are comprehensive but:**
- Executive summary frontloads key points
- Sections are clearly labeled
- Checklists enable scanning
- FAQ provides quick answers

**Can skim OR go deep**

### Confidence Building

**Structure provides:**
- Clear path forward
- Professional validation (expert references)
- Success criteria (know when done)
- Templates (don't start from scratch)

**User feels:** "I can do this professionally"

---

## Critical Success Factors for Conversation Flow

### Must Preserve in Sophie

1. **Structured Guidance Pattern**
   - 12-section format (Summary → Process → Tools → Follow-up → References)
   - Checklists throughout
   - Time-boxed steps
   - Clear deliverables

2. **Professional Mentorship Voice**
   - Agent speaks as expert in role
   - First-person when appropriate
   - Conversational but professional
   - Context-aware guidance

3. **Progressive Disclosure**
   - Summary → Detail → Deep-dive
   - FAQ for quick answers
   - Full methodology for thoroughness
   - References for learning

4. **Actionable Templates**
   - Fill-in-the-blank formats
   - Visual frameworks
   - Checklists
   - Real examples

5. **Quality Standards Embedded**
   - Success criteria upfront
   - Best practices throughout
   - Pitfall warnings
   - Expert validation

6. **Connected Knowledge**
   - Cross-references between guides
   - Handoffs to related work
   - Progressive methodology chains
   - Materials library

---

## Implications for Sophie

### Conversation Engine Requirements

1. **Intent Matching**
   - Natural language → task identification
   - Context-aware (project phase, user role)
   - Confidence scoring when ambiguous

2. **Methodology Loading**
   - Just-in-time guide injection
   - Full structure (all 12 sections)
   - Related materials included
   - Cross-references resolved

3. **Agent Persona Activation**
   - Load appropriate agent character
   - Operating procedures contextual
   - Handoff awareness
   - Professional voice maintained

4. **Progress Tracking**
   - Where in methodology user is
   - Checklists completion
   - Next steps awareness
   - Follow-up scheduling

5. **Template Generation**
   - Populate formats with user context
   - Adapt to their situation
   - Maintain professional standards
   - Output in requested format

---

## Next Analysis

1. **Knowledge Architecture**
   - How are 15,793 lines organized?
   - What's in /materials vs /task_guides?
   - How do cross-references work?

2. **Integration Model**
   - How does this work in Claude Desktop technically?
   - How are guides loaded?
   - How is context managed?

3. **Requirements for Claude Code/Gemini CLI**
   - What's the porting strategy?
   - MCP? Custom instructions? Other?

---

**Analysis Status:** Complete (Conversation Flow Patterns)
**Last Updated:** 2025-11-10
**Next:** Analyze knowledge architecture organization
