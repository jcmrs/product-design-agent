# Agent-Task Mapping Analysis

> **Complete mapping of 12 agents × 64 tasks in Product Design Agent**

**Date:** 2025-11-10
**Purpose:** Understand work distribution and agent specialization patterns
**Source:** `archive/original-claude-desktop-agent/config/`

---

## Task Distribution by Agent

**Total Tasks:** 64
**Total Agents:** 12

| Agent | Task Count | Percentage | Primary Domain |
|-------|------------|------------|----------------|
| **Research Analyst** | 14 | 21.9% | User research, testing, synthesis |
| **Strategy Analyst** | 13 | 20.3% | Product strategy, prioritization, frameworks |
| **Collaboration Facilitator** | 6 | 9.4% | Meetings, critiques, stakeholder management |
| **AI Specialist** | 6 | 9.4% | Prompts, automation, AI integration |
| **Onboarding Specialist** | 3 | 4.7% | Team onboarding programs |
| **Discovery Analyst** | 3 | 4.7% | Journey mapping, problem framing |
| **Design System Specialist** | 3 | 4.7% | Components, tokens, patterns |
| **Design Educator** | 3 | 4.7% | Learning, education, maturity building |
| **Content Specialist** | 3 | 4.7% | Content audits, IA, accessibility |
| **Team Lead** | 3 | 4.7% | Leadership, culture, hiring |
| **Requirements Analyst** | 2 | 3.1% | PRDs, requirements gathering |
| **Project Manager** | 2 | 3.1% | Planning, kickoffs, execution |
| **Product Designer** | 1 | 1.6% | Visual design (appears once, may be typo) |

---

## Insights

### Core Work Distribution

**Research & Strategy Dominate (42.2%)**
- Research Analyst: 14 tasks (usability testing, personas, surveys, synthesis)
- Strategy Analyst: 13 tasks (MVPs, prioritization, canvases, KPIs)
- These are the two most active agents, reflecting that research and strategy are central to product design work

**Collaboration & AI Modernization (18.8%)**
- Collaboration Facilitator: 6 tasks (meetings, critiques, difficult conversations)
- AI Specialist: 6 tasks (prompt engineering, automation, vibe coding)
- Both are high-value, reflecting importance of teamwork and AI integration

**Specialized Support (33.7%)**
- Remaining 8 agents handle 3 tasks or fewer each
- These are **depth specialists**: onboarding, discovery, systems, education, content, leadership, requirements, project management
- Quality over quantity - deep expertise when needed

**Minimal Visual Design**
- Only 1 task explicitly assigned to "product_designer" (likely typo for "visual_designer")
- Visual Designer mentioned in agents.yaml but minimal task assignment
- May indicate visual work is integrated across other roles

---

## Agent Specialization Patterns

### High-Volume Generalists

**Research Analyst** (14 tasks)
- Covers full research lifecycle
- Multiple methodologies (usability testing, personas, surveys, synthesis)
- Both planning and execution
- Qualitative and quantitative
- **Why so many:** Research is iterative and methodology-heavy

**Strategy Analyst** (13 tasks)
- Strategic framing and planning
- Multiple frameworks (RICE, MoSCoW, canvases)
- From discovery to delivery planning
- **Why so many:** Strategy touches every phase of product work

### Mid-Volume Specialists

**Collaboration Facilitator** (6 tasks)
- Meeting design and facilitation
- Critique and feedback
- Stakeholder management
- Conflict resolution
- Executive communication
- **Pattern:** All about *people and processes*

**AI Specialist** (6 tasks)
- Prompt engineering
- Automation
- Vibe coding (rapid prototyping)
- Style extraction
- AI image generation
- **Pattern:** *Modern AI-augmented workflows*

### Low-Volume Depth Experts

**Onboarding Specialist** (3 tasks)
- Designer onboarding
- Lead onboarding
- Agent onboarding (meta - teaching users about the agent itself)
- **Pattern:** *Specific lifecycle events*

**Discovery Analyst** (3 tasks)
- Journey mapping
- Statement writing (problem framing)
- Mental modeling
- **Pattern:** *Early-stage problem definition*

**Design System Specialist** (3 tasks)
- Component documentation
- Token naming
- Icon creation/matching
- **Pattern:** *System governance and standards*

**Design Educator** (3 tasks)
- Cognitive biases
- B2B design
- Economics for designers
- **Pattern:** *Knowledge building and maturity*

**Content Specialist** (3 tasks)
- Content audits
- Content inventory
- Content testing
- **Pattern:** *Content quality and findability*

**Team Lead** (3 tasks)
- Team management
- Boosting UX culture
- Hiring designers
- **Pattern:** *People leadership*

**Requirements Analyst** (2 tasks)
- PRD creation
- Requirements gathering
- **Pattern:** *Specification and documentation*

**Project Manager** (2 tasks)
- Kickoff meetings
- Project planning
- **Pattern:** *Delivery execution*

---

## Work Flow Patterns

### Typical Project Lifecycle Agent Sequence

```
1. Discovery Analyst
   ↓ (journey maps, problem framing)

2. Research Analyst
   ↓ (user research, validation)

3. Strategy Analyst
   ↓ (prioritization, roadmaps)

4. Requirements Analyst
   ↓ (PRD, specifications)

5. Project Manager
   ↓ (planning, execution)

6. Collaboration Facilitator
   ↓ (throughout - meetings, alignment)

With support from:
- AI Specialist (automation, prompts)
- Design System Specialist (patterns, components)
- Content Specialist (clarity, findability)
```

### Supporting Infrastructure

**Team Building:**
- Onboarding Specialist → Team Lead
- New hire → Culture & growth

**Knowledge Building:**
- Design Educator → Team (ongoing)
- Learning programs, reference materials

---

## Cross-Functional Collaboration

### Agent Handoff Network

From agents.yaml, agents explicitly define handoffs:

**Example: Research Analyst**
- **Hands off TO:** Strategy Analyst (insights)
- **Hands off TO:** Content Specialist (report polish)
- **Receives FROM:** Discovery Analyst (prioritized questions)

**Example: Strategy Analyst**
- **Hands off TO:** Project Manager (scoped plan)
- **Hands off TO:** Collaboration Facilitator (alignment sessions)
- **Receives FROM:** Research/Discovery Analysts (insights)

**Example: AI Specialist**
- **Hands off TO:** Strategy Analyst (AI-assisted artifacts)
- **Hands off TO:** Research Analyst (synthesis scripts)
- **Receives FROM:** Collaboration Facilitator (meeting notes to summarize)
- **Hands off TO:** Visual Designer (style specs, image prompts)

**This creates a collaboration network, not isolated specialists.**

---

## Task Coverage Validation

### What's Covered

✅ **Discovery & Research**
- Journey mapping, personas, usability testing, synthesis
- Mental models, empathy mapping, contextual inquiry

✅ **Strategy & Planning**
- MVPs, prioritization, business models, value props
- Initiative canvases, roadmaps, KPIs

✅ **Execution & Delivery**
- PRDs, project plans, kickoffs
- Design critiques, stakeholder management

✅ **Leadership & Culture**
- Team management, hiring, difficult conversations
- UX culture, onboarding

✅ **Modern Workflows**
- AI/prompt engineering, vibe coding
- Design systems, content strategy

✅ **Communication**
- Executive presentations, facilitation
- Breaking bad news, conflict resolution

### What's Light

⚠️ **Visual Design Work**
- Only 1 task assigned explicitly to designer
- May be intentional (focus on process, not craft)
- Or visual work integrated across roles

⚠️ **Technical/Development**
- No explicit development/engineering tasks
- Focus is design leadership, not implementation
- Appropriate for design org focus

---

## Implications for Sophie

### Must Preserve

1. **Research-Strategy Core**
   - These 27 tasks (42%) are the heart of the system
   - Must have full methodologies
   - Critical for value proposition

2. **Agent Specialization**
   - Each agent's expertise is distinct
   - Handoff patterns enable collaboration
   - Personas create appropriate guidance

3. **Comprehensive Coverage**
   - All phases of design work
   - From discovery through delivery
   - Including leadership and communication

### Can Optimize

1. **Consolidate Where Appropriate**
   - Do we need separate Requirements Analyst (2 tasks)?
   - Could fold into Strategy or Research?
   - Or maintain for specialization?

2. **Expand Where Needed**
   - Visual Designer underdeveloped (1 task)
   - Could add more visual/craft methodologies
   - Or maintain strategic/process focus?

3. **Modern Additions**
   - AI Specialist is forward-looking (good!)
   - Could expand AI-augmented workflows
   - Opportunity for Sophie to lead here

---

## Next Analysis Steps

1. **Read all 64 task guides**
   - Understand methodology depth
   - Extract patterns
   - Identify cross-references

2. **Map conversation flows**
   - How do tasks connect?
   - What are common sequences?
   - Where do users get stuck?

3. **Analyze integration model**
   - How does this work in Claude Desktop?
   - What's the technical implementation?
   - How to port to Claude Code/Gemini CLI?

---

**Analysis Status:** Complete (Agent-Task Mapping)
**Last Updated:** 2025-11-10
**Next:** Analyze conversation flow patterns
