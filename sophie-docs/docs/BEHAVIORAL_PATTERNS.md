# Product Design Agent: Behavioral Patterns & Conversational Dynamics

**Date:** 2025-11-10
**Purpose:** Deep analysis of what makes the agent feel collaborative, proactive, and trustworthy

---

## Executive Summary

The Product Design Agent's "soul" - that feeling of collaboration, trust, and proactive guidance - emerges from **specific behavioral patterns** encoded in `assets/instructions.md`. These patterns are not abstract; they're concrete decision trees, validation loops, and error handling strategies that create the experience of talking with an expert mentor rather than querying a database.

This document maps those patterns for preservation in the new architecture.

---

## 1. The Conversational Flow Pattern

### 1.1 How the Agent "Listens" (Input Processing)

**Step 0: User Preference Detection** (Optional but Critical)
```
IF file named "user_preferences" exists:
  → Parse preference categories
  → Set overrides for defaults
  → Note conflicts or malformed entries
  → Fallback to defaults if invalid
ELSE:
  → Use system defaults
```

**Impact:** Makes the agent feel "personalized" - it remembers how you like to work.

**Step 1: Context Awareness** (Before Responding)
```
IF uploaded files present:
  → Scan for project context
  → Extract goals, constraints, stakeholders
  → Identify terminology and conventions
  → Map available resources
  → PRIORITIZE this context as authoritative
ELSE:
  → Proceed with generic methodology
  → Request project details
```

**Impact:** Agent adapts to YOUR project, not generic advice. Feels contextual.

**Step 2: Intent Extraction** (Understanding the Ask)
```
Parse user query:
  → Extract keywords (bilingual: EN/ES)
  → Identify core task requirements
  → Apply language preferences if configured
  → Connect query to uploaded project context
```

**Impact:** Agent understands what you're REALLY asking, not just literal words.

### 1.2 How the Agent "Thinks" (Task Matching)

**Step 3: Task Registry Search** (Finding Relevant Expertise)
```
Access config/tasks.yaml:
  → Search for keyword matches
  → Apply fuzzy matching for variations
  → Calculate confidence scores:
    - HIGH: >80% match
    - MEDIUM: 50-80% match
    - LOW: <50% match
  → Apply user search strategy preferences
  → Narrow by project context
```

**Decision Tree:**
```
IF HIGH confidence match found:
  → Proceed to agent selection
ELIF MEDIUM confidence match:
  → Proceed but note uncertainty
  → Offer alternative interpretations
ELIF LOW confidence or no match:
  → Trigger error handling (see Section 2)
```

**Impact:** Agent doesn't fail silently - it transparently assesses its confidence.

**Step 4: Agent Selection** (Choosing Expertise)
```
Access config/agents.yaml:
  → Load assigned agent for matched task
  → Adopt agent's:
    - Role (persona/title)
    - Goal (mission statement)
    - Backstory (expertise context)
    - Capabilities (skills)
    - Tools (resources)
    - Operating procedures (workflow)
    - Handoffs (collaboration patterns)
```

**Impact:** Different expertise "voices" - Strategy Analyst feels different from Research Analyst.

### 1.3 How the Agent "Learns" (Knowledge Synthesis)

**Step 5: Just-In-Time Knowledge Loading**
```
Based on matched task:
  → Load specific task_guide from knowledge/task_guides/
  → Load referenced materials from knowledge/materials/
  → Parse methodology structure:
    - Executive Summary
    - Overview (Purpose, Scope, Audience, Success Criteria)
    - Preparation steps
    - Main Flow / Process
    - Templates / Frameworks
    - Best Practices / Pitfalls
    - Examples / Case Studies
    - Resources / References
```

**Adaptation Process:**
```
Take generic methodology from guides
+ Apply to uploaded project context
+ Integrate user preferences
+ Adopt agent persona voice
= Contextualized, personalized guidance
```

**Impact:** Feels like a mentor who studied YOUR situation, not generic advice.

### 1.4 How the Agent "Responds" (Response Generation)

**Step 6: Contextualized Response Synthesis**
```
Generate response that:
  → Applies methodology to project context
  → Uses agent's operating procedures
  → Follows user output style preferences
  → Integrates project constraints
  → Aligns with project goals
  → Uses project-specific terminology
```

**Format Requirements:**
- **Structured Documents:** Formatted guides, checklists, plans
- **Code Blocks:** For prompts, instructions, technical content
- **Citations:** Source URLs and references
- **Bold:** Only for headings, critical terms, keywords
- **Bilingual:** Respond in user's language, provide terms in both when helpful

**Impact:** Delivers ACTIONABLE resources, not just advice.

### 1.5 How the Agent "Double-Checks" (Validation)

**Step 7: Quality Control Loop** (The Secret Sauce)
```
Before delivering, verify:
1. ✓ Uploaded files analyzed (if present)
2. ✓ User preferences integrated (if present)
3. ✓ Project context integrated into response
4. ✓ Task registry checked for methodologies
5. ✓ All relevant sources accessed (or failures noted)
6. ✓ Information synthesized from both contexts
7. ✓ Methodology adapted to project needs
8. ✓ Citations reference actual retrieved content
9. ✓ Confidence level assessed for task match
10. ✓ Alignment verified with project goals

IF any validation fails:
  → Return to Step 6
  → Fix issues
  → Re-validate
ELSE:
  → Proceed to delivery
```

**Impact:** This creates the "thoughtful collaborator" feeling - agent checks its work.

---

## 2. The Proactive Guidance Pattern

### 2.1 Error Handling as Guidance (When Things Don't Match)

**Scenario A: No Direct Task Match**
```
Instead of: "Task not found"
Do:
1. Context-First Approach:
   → Analyze uploaded project context
   → Infer user's actual needs
   → Suggest what they might be trying to accomplish

2. Semantic Search:
   → Look for related concepts in guide content
   → Find adjacent methodologies
   → Offer closest matches with explanations

3. Problem Decomposition:
   → Break complex request into smaller tasks
   → Suggest sequence: "It sounds like you need X, then Y, then Z"

4. Alternative Approaches:
   → Suggest related methodologies
   → Explain trade-offs

5. External Resources:
   → Recommend web search or additional learning
   → Admit limitations transparently
```

**Example Transformation:**
```
User: "Help me with the thing for users"

Bad response: "I don't understand 'the thing'"

Good response: "I see you're working on improving user experience for
your checkout flow (from your uploaded project brief). Are you looking to:
- Conduct usability testing to identify issues?
- Map the user journey to find pain points?
- Create user personas based on your analytics?
Let me know which direction and I'll guide you through it."
```

**Impact:** Feels like a mentor redirecting you, not a system failing.

### 2.2 Ambiguity Resolution (Seeking Clarity)

**Pattern from instructions.md:**
```
Clarity Requirement:
"Upon detecting ambiguous request, seek clarification before proceeding"
```

**Implementation:**
```
IF user request has multiple interpretations:
  → Don't guess
  → Present interpretations as options
  → Ask which they mean
  → Explain why each matters differently

IF missing critical context:
  → Flag what's missing
  → Explain why it matters
  → Proceed with noted assumptions OR wait for input
```

**Example:**
```
User: "Help me test this"

Response: "I'd be happy to help you test! To provide the most relevant
guidance, could you clarify:
- Is this usability testing with users?
- Content testing (readability, comprehension)?
- Technical QA testing?
- A/B test design?

Each requires a different methodology. Based on your [uploaded project docs],
I see you mentioned user feedback, so I'm leaning toward usability testing,
but wanted to confirm."
```

**Impact:** Agent asks smart questions, not dumb ones. Shows it's THINKING.

### 2.3 Confidence Transparency (Building Trust)

**Pattern from instructions.md:**
```
Confidence Level Assessment:
- HIGH: >80% match
- MEDIUM: 50-80% match
- LOW: <50% match
```

**Communication Strategy:**
```
HIGH Confidence:
  → Proceed directly
  → No disclaimer needed

MEDIUM Confidence:
  → Proceed but note: "This seems like a [X] task, though it could also be [Y]"
  → Offer to adjust if user corrects

LOW Confidence or No Match:
  → "I'm not certain I have a direct methodology for this"
  → Explain what you DO have that's related
  → Suggest alternatives
  → Offer to improvise with general principles
```

**Impact:** Honesty builds trust. Agent admits when uncertain.

### 2.4 Limitation Acknowledgment (Graceful Degradation)

**Pattern from validation checklist:**
```
Partial Matches:
- Use available guides as foundation
- Adapt to project context
- Fill gaps with general UX principles
- ** Note limitations explicitly **
- Suggest validation methods
```

**Example:**
```
User: "Help me with VR onboarding for enterprise users"

Response: "I have comprehensive guides for:
- Onboarding design (general)
- B2B/enterprise design patterns
- User journey mapping

I don't have VR-specific guidance, but I can help you apply general
onboarding principles to your VR context. I'll note where VR introduces
unique considerations you should validate with VR-specific research.

Would you like me to proceed with that approach, or would you prefer
I help you find VR-specific resources first?"
```

**Impact:** Agent doesn't pretend to know everything. Admits gaps.

---

## 3. The Collaborative Partnership Pattern

### 3.1 Language & Tone

**From instructions.md Core Identity:**
> "You are an adaptive product design mentor combining expertise across product
> design, user research, strategy, UX/UI, neuropsychology, AI, UX writing, and
> prompt engineering. You provide hands-on guidance, create practical resources,
> facilitate learning, and accelerate professional growth through personalized
> mentorship."

**Key Attributes:**
- **Adaptive:** Changes approach based on context
- **Hands-on:** Creates deliverables, not just advice
- **Personalized:** Uses YOUR context and preferences
- **Mentorship-oriented:** Guides, teaches, facilitates growth

**Tone Characteristics:**
- Professional but not formal
- Expert but not condescending
- Helpful but not hand-holding
- Transparent about limitations
- Bilingual without language-switching friction

### 3.2 Co-Creation Dynamic

**Pattern:** Agent positions itself as PARTNER, not tool.

**Indicators:**
- "Let's map out..." (not "I will map...")
- "We should consider..." (not "You should...")
- "I'll guide you through..." (collaborative framing)
- "Based on your project context..." (acknowledges user ownership)

**User Experience:**
- User feels like they're working WITH the agent
- Agent respects user's expertise about their project
- Agent provides structure, user provides content
- Both contribute to the outcome

### 3.3 Bilingual Fluidity

**From instructions.md:**
```
Seamless Bilingual Support:
- Respond in user's query language
- Provide key terms in both languages when helpful
- Adapt cultural context (Spanish business practices, regional UX patterns)
- Handle code-switching naturally
- Respect regional variations (MX, ES, AR, US, UK)
```

**Implementation:**
```
User types: "Necesito ayuda con usability testing"

Agent responds in Spanish:
"Te puedo ayudar con la planificación de pruebas de usabilidad (usability
testing). Basándome en tu [contexto del proyecto], sugiero que empecemos
definiendo las preguntas de investigación..."

[Provides guidance in Spanish, but keeps technical terms in both languages
when they're commonly used in English in the field]
```

**Impact:** No friction for bilingual users. Feels natural.

---

## 4. The "Backroom Team" Pattern (Agent Collaboration)

### 4.1 Agent Persona System

**How Different Agents "Feel" Different:**

Each agent in `config/agents.yaml` has distinct:
- **Voice** (role/backstory creates persona)
- **Approach** (operating_procedures define workflow)
- **Expertise** (capabilities define what they can do)
- **Tools** (resources they reference)

**Example: Strategy Analyst vs. Research Analyst**

**Strategy Analyst:**
```yaml
goal: "Translate opportunities into coherent product/design strategies
       with measurable outcomes"
backstory: "A strategist who connects discovery insights, business goals,
            and delivery plans"
operating_procedures:
  - Clarify objectives → choose approach
  - Synthesize inputs → define bets & KPIs
  - Facilitate decisions → document trade-offs
  - Outline roadmap → align stakeholders
```

**Research Analyst:**
```yaml
goal: "Plan, execute, and synthesize research to inform decisions with
       evidence and clarity"
backstory: "A mixed-methods practitioner who balances rigor with speed
            and communicates insightfully"
operating_procedures:
  - Define questions → select method
  - Prepare instruments → recruit participants
  - Run sessions/analysis → synthesize
  - Report findings → recommendations & severity
  - Feed insights into backlog & KPIs
```

**Impact:** Strategy Analyst focuses on synthesis and decisions. Research Analyst focuses on evidence and rigor. Different workflows, different outcomes.

### 4.2 Agent Handoffs (Inter-Agent Collaboration)

**Pattern:** Agents reference each other via handoffs.

**Example from strategy_analyst:**
```yaml
handoffs:
  - To project_manager: scoped plan & milestones
  - To collaboration_facilitator: sessions to align/decide
  - From research_analyst/discovery_analyst: insights & opportunities
```

**How This Creates "Team" Feeling:**

When strategy_analyst delivers a strategy document, it might say:
"Next steps: I'll hand this scoped plan to the Project Manager to create
a detailed timeline, and I recommend involving the Collaboration Facilitator
to run an alignment session with stakeholders."

**Impact:** User doesn't see agents directly, but feels like there's a team coordinating in the background.

### 4.3 Operating Procedures as Workflow

**Pattern:** Each agent follows its operating_procedures.

**Example: ai_specialist workflow:**
```yaml
operating_procedures:
  - Intake request → scope outcome and constraints
  - Select model/approach → draft prompts & test data
  - Run evals → measure quality/cost/latency
  - Iterate with SMEs → harden templates & guardrails
  - Publish kits → train team and monitor usage
  - Report metrics → adoption, savings, quality deltas
```

**In Practice:**
When ai_specialist handles a prompt engineering task, the response follows this workflow structure:
1. "Let's start by scoping the outcome..." (Intake)
2. "I'll draft a prompt template..." (Select model/approach)
3. "We should test this with..." (Run evals)
4. "I'll create a template you can reuse..." (Publish kits)

**Impact:** Methodical, professional approach. Feels like working with an expert who has a process.

---

## 5. The Transparency Pattern (Building Trust)

### 5.1 Citation Requirements

**From instructions.md:**
```
Citations: Always include source URLs and reference specific sources
           at bottom of response
```

**Purpose:**
- User can verify information
- Agent acknowledges sources
- Creates audit trail

**Impact:** Builds trust through verifiability.

### 5.2 Assumption Noting

**Pattern from error handling:**
```
Missing Context Scenarios:
- No uploaded files: Proceed with GitHub methodology, request project details
- Incomplete project info: Flag missing context, proceed with assumptions noted
- Conflicting requirements: Surface conflicts, request clarification
```

**Example:**
```
"Based on your project brief, I'm assuming your target users are B2B
enterprise admins (you mentioned 'enterprise dashboard' but didn't specify
user roles). If that's incorrect, let me know and I'll adjust the approach."
```

**Impact:** Agent makes reasoning transparent. User can correct if wrong.

### 5.3 Trade-off Communication

**Pattern from strategy_analyst operating_procedures:**
```
- Facilitate decisions → document trade-offs
```

**Example:**
```
"For your MVP scope, we have three options:

Option A: Include login + dashboard + basic reporting
- Pros: Complete user flow, validates core value
- Cons: 8-week timeline, higher risk
- Trade-off: Speed vs. completeness

Option B: Include login + dashboard only
- Pros: 5-week timeline, lower risk
- Cons: Can't validate reporting value proposition
- Trade-off: Completeness vs. speed

Option C: Dashboard only (assume logged in)
- Pros: 3-week timeline, minimal risk
- Cons: Can't validate login UX, incomplete flow
- Trade-off: Validation thoroughness vs. speed

Which trade-off makes sense for your constraints (you mentioned
tight deadline in your brief)?"
```

**Impact:** Agent doesn't make decisions FOR user. Presents options + trade-offs. User decides.

---

## 6. The Adaptation Pattern (Contextual Intelligence)

### 6.1 Project Context Priority

**From instructions.md:**
```
Project Context Priority:
When uploaded files contain project information:
1. Treat as authoritative source for project requirements
2. Override generic approaches with project-specific needs
3. Maintain consistency with established project terminology
4. Respect existing constraints (technical, budget, timeline)
5. Align with stated goals and success metrics
6. Consider stakeholder perspectives identified in files
```

**Example Transformation:**

**Generic approach (no context):**
"Here's a standard usability testing plan with 8 participants, 5 tasks..."

**Contextualized approach (with uploaded project brief):**
"Based on your project brief:
- Budget constraint: $5K → I'm recommending 5 participants instead of 8
- Timeline: 2 weeks → Remote unmoderated testing with UserBrain
- Target users: B2B admins → Recruiting via LinkedIn, not consumer panels
- Key hypothesis: Navigation confusing → Focusing tasks on wayfinding
- Stakeholder concern: Accessibility → Including WCAG validation in protocol"

**Impact:** Feels like the agent READ and UNDERSTOOD your situation.

### 6.2 Terminology Consistency

**Pattern:**
```
Project context integration:
- Identify project-specific terminology and conventions
- Use project terminology in responses
- Maintain consistency with established naming
```

**Example:**
If project docs call it "Member Dashboard" (not "User Dashboard"), agent uses "Member Dashboard" throughout.

**Impact:** Small detail, but creates feeling that agent is "part of the team."

### 6.3 Constraint Respect

**Pattern:**
```
Project context integration:
- Extract constraints (technical, budget, timeline)
- Respect existing constraints in recommendations
- Adapt methodology to fit constraints
```

**Example:**
If project brief says "no budget for user research," agent doesn't recommend expensive lab studies. Instead: "Given your no-budget constraint, I'll focus on low-cost research methods: analytics analysis, customer support ticket mining, guerrilla testing..."

**Impact:** Agent gives PRACTICAL advice for YOUR situation, not ideal-world advice.

---

## 7. Key Behavioral Patterns Summary

### What Creates the "Collaborative Soul"

| Pattern | Implementation | User Experience |
|---------|---------------|-----------------|
| **Proactive Guidance** | Error handling as redirection, not failure | "It helps me think" |
| **Transparency** | Confidence levels, limitation notes, assumption documentation | "I trust it" |
| **Adaptation** | Project context priority, constraint respect, terminology consistency | "It gets me" |
| **Validation Loop** | 10-point quality checklist before delivery | "It's thorough" |
| **Expert Voices** | Different agent personas with distinct workflows | "Feels like a team" |
| **Co-Creation** | Partner framing, not tool framing | "We work together" |
| **Clarification Seeking** | Ambiguity resolution, not guessing | "It asks smart questions" |
| **Trade-off Communication** | Options + implications, user decides | "It respects my judgment" |
| **Bilingual Fluidity** | Natural language switching, cultural context | "No friction" |

---

## 8. Preservation Requirements for New Architecture

### Critical Behaviors to Maintain

1. **The Validation Loop** - This creates thoroughness
2. **Error Handling as Guidance** - This creates proactive feeling
3. **Confidence Transparency** - This creates trust
4. **Project Context Priority** - This creates personalization
5. **Agent Operating Procedures** - This creates expert voices
6. **Clarification Seeking** - This creates smart collaboration
7. **Limitation Acknowledgment** - This creates honesty
8. **Trade-off Communication** - This creates respect

### How to Implement in New Architecture

**Option A: Encode as System Prompts**
- Convert instructions.md patterns to LLM system prompts
- Inject agent persona + operating procedures into prompts
- Maintain validation loop via prompt instructions

**Option B: Encode as Orchestration Logic**
- Implement validation loop as programmatic checks
- Implement confidence scoring as code
- Implement error handling as decision trees
- Feed results to LLM for natural language generation

**Recommendation: Hybrid Approach**
- **Orchestration Logic** handles: Task matching, confidence scoring, validation checks, error routing
- **System Prompts** handle: Agent persona, tone, operating procedures, response formatting
- **Best of both:** Reliability of code + Flexibility of LLM

---

## 9. New Architecture Implications

### Multi-Project Support

**New Behavioral Pattern Needed:**
```
Project Switching:
User: "Let's switch to the mobile app project"

Agent should:
1. Save current project state
2. Load target project context:
   - Conversation history
   - Project files
   - Decisions made
   - User preferences (if project-specific)
3. Acknowledge switch
4. Resume conversation in new context
```

**Example:**
```
Agent: "Switching to 'Mobile App Redesign' project.
Last conversation: 3 days ago, we discussed navigation patterns.
You uploaded new wireframes since then.
Should we review those, or continue with navigation?"
```

### Memory-Enhanced Collaboration

**New Behavioral Pattern:**
```
Process Memory Integration:
User: "Why did we go with the card layout instead of list view?"

Agent should:
1. Search project memory for decision
2. Retrieve conversation context
3. Summarize rationale
4. Cite conversation date/context
```

**Example:**
```
Agent: "We decided on card layout on Nov 5th during the visual design
discussion. The rationale was:
1. Your user research showed users scan rather than read linearly
2. Cards support the media-rich content in your product catalog
3. Your brand guidelines favor visual-first approaches

However, we noted that cards are less accessible on small screens,
which is why we planned a breakpoint-based layout switch.

Should we revisit that decision?"
```

**Impact:** Agent remembers YOUR journey together. Massive trust builder.

---

## 10. Open Questions for Implementation

1. **How much personality?**
   - Keep agent personas subtle (current approach)?
   - Or make them more distinct (different agents feel more different)?

2. **Proactive suggestions?**
   - Should agent proactively suggest next steps?
   - Or wait for user to ask?
   - Current: Mostly reactive. New: Could be more proactive with memory?

3. **Cross-project learning?**
   - Should agent suggest "you solved a similar problem in Project X"?
   - Or keep projects isolated?

4. **Conversation threading?**
   - Simple linear history?
   - Or branching conversations (explore alternatives, then return)?

---

*End of Behavioral Patterns Document*
