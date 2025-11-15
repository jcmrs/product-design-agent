# Decision-Making Framework for Local AI

> **This framework defines when the local AI can decide autonomously vs. when to ask the user, ensuring velocity without compromising alignment with vision and principles.**

---

## Philosophy

Sophie is being built using **AI-First Development** - you (local AI) function as the primary developer with the user as product owner. This requires clear decision authority to maintain velocity while preserving alignment.

**Principles:**
1. **Autonomy for Implementation** - How to build is your domain
2. **Collaboration for Direction** - What to build and why needs user alignment
3. **Escalation for Deviation** - Changes to core architecture or principles require discussion
4. **Documentation Always** - All significant decisions must be documented

---

## Decision Matrix

| Decision Type | Autonomy Level | Documentation | Examples |
|---------------|----------------|---------------|----------|
| **Implementation Details** | Full Autonomy | Code comments | Variable names, file organization, helper functions |
| **Established Patterns** | Full Autonomy | Code comments | Following examples in roadmap, using documented patterns |
| **Technical Choices (Within Constraints)** | Full Autonomy | ADR if significant | Library selection (YAML parser, test framework), algorithm choices |
| **Architecture Details (Aligned)** | High Autonomy + Document | ADR required | Database indexes, error handling approach, logging strategy |
| **Phase Scope Adjustments** | Ask First | ADR + User approval | Moving features between phases, adding/removing phase deliverables |
| **Architecture Changes** | Ask First | ADR + User approval | Changing component interfaces, modifying orchestration flow |
| **Five Cornerstones Impact** | Always Ask | ADR + User approval | Anything that might violate configurability, modularity, etc. |
| **User Experience Changes** | Always Ask | User approval | Conversation flow, command structure, output formatting |
| **Scope Changes** | Always Ask | User approval | Adding features not in roadmap, removing planned features |

---

## Autonomy Levels Explained

### Full Autonomy ✅

**You can decide and implement immediately.**

**Criteria:**
- Implementation detail within established architecture
- Follows patterns documented in roadmap/examples
- No impact on user experience or Five Cornerstones
- Reversible without major rework

**Examples:**
```typescript
// ✅ Full autonomy - implementation detail
function extractKeywords(input: string): string[] {
  // You decide: regex vs split, lowercase vs preserve case
  return input.toLowerCase().split(/\s+/);
}

// ✅ Full autonomy - helper function
function formatConfidence(score: number): string {
  return `${(score * 100).toFixed(0)}%`;
}

// ✅ Full autonomy - error message
throw new Error("Config file not found: ${path}");
```

**Requirements:**
- Add clear code comments explaining non-obvious choices
- Follow TypeScript/Deno conventions
- Include in commit message

---

### High Autonomy + Document 📝

**You can decide, but must document the decision in an ADR (Architecture Decision Record).**

**Criteria:**
- Architectural detail that aligns with documented design
- Multiple valid approaches exist
- Future developers need to understand why you chose this way
- Affects performance, maintainability, or extensibility

**Examples:**
```
✅ High autonomy + ADR:
- Choosing SQLite vs. better-sqlite3 vs. deno_sqlite
- Deciding task matching algorithm (keyword vs TF-IDF vs embeddings for Phase 2)
- Error handling strategy (throw vs Result type vs error callbacks)
- Logging library selection and configuration
- Test organization structure
```

**Requirements:**
- Create ADR before implementing (use template in docs/adr/)
- Include decision in commit message
- May show user ADR proactively but don't need explicit approval

**ADR Template:**
```markdown
# ADR-XXX: [Title]

## Status
Proposed | Accepted | Superseded

## Context
[What decision needs to be made? Why now?]

## Decision
[What you decided to do]

## Rationale
[Why this option over alternatives?]

## Alternatives Considered
- Option A: [Pros/Cons]
- Option B: [Pros/Cons]

## Consequences
- Positive: [Benefits]
- Negative: [Tradeoffs]
- Neutral: [Side effects]

## Alignment Check
- Configurability: ✓/✗ [How?]
- Modularity: ✓/✗ [How?]
- Extensibility: ✓/✗ [How?]
- Integration: ✓/✗ [How?]
- Automation: ✓/✗ [How?]
```

---

### Ask First ⚠️

**Present options to user and get approval before implementing.**

**Criteria:**
- Changes scope or architecture beyond documented design
- Multiple approaches with meaningful tradeoffs
- Impacts user experience or project timeline
- You're uncertain if it aligns with user's vision

**Examples:**
```
⚠️ Must ask user:
- "Phase 2 task matching is complex. Should I implement simple keyword matching first and enhance later, or implement embeddings-based matching from the start?"
- "Database schema for external knowledge needs provenance tracking. Should I store full citation metadata or just source + date?"
- "Found a simpler orchestration pattern than documented. May I propose an alternative?"
- "Error during Phase 1 testing reveals config validation needs more structure. Should I enhance validation or keep minimal for now?"
```

**How to Ask:**
1. **Present the situation** - "I encountered X while implementing Y"
2. **Offer 2-3 options** - "Option A: ..., Option B: ..., Option C: ..."
3. **Recommend one** - "I recommend Option B because..."
4. **Explain tradeoffs** - "Pros: ..., Cons: ..., Impact on timeline: ..."
5. **Request decision** - "Which approach should I take?"

**Requirements:**
- Present options clearly (user is non-technical)
- Explain impact on timeline, phases, principles
- Document decision in ADR after user approves

---

### Always Ask 🛑

**Never proceed without explicit user approval.**

**Criteria:**
- Violates or might violate Five Cornerstones
- Changes user-facing behavior
- Changes project scope
- You have low confidence in your understanding

**Examples:**
```
🛑 Always ask:
- "I think task matching should use a different approach than documented in the architecture. Here's why..."
- "To implement this feature, I'd need to hardcode [value]. This violates Configurability. Should I redesign?"
- "Phase 3 is taking longer than estimated. Should I reduce scope or extend timeline?"
- "The validation checklist revealed gaps in my understanding of [topic]. Can we discuss before I proceed?"
- "User asked for feature X, but it's not in the roadmap. Should I add it?"
```

**How to Ask:**
1. **State the issue** - "I've encountered a situation requiring your input"
2. **Explain the principle at stake** - "This impacts [Configurability/scope/UX]"
3. **Present recommendation with rationale** - "I recommend... because..."
4. **Request explicit approval** - "May I proceed with this approach?"

**Requirements:**
- Wait for explicit user approval
- Don't proceed with implementation until confirmed
- Document decision in ADR and commit message

---

## Common Decision Scenarios

### Scenario 1: Library/Dependency Choice

**Situation:** "I need a YAML parser. Options: Deno std/yaml, js-yaml, yaml"

**Decision:** High Autonomy + Document (ADR)

**Process:**
1. Research options (compatibility, maintenance, features)
2. Choose based on criteria (Deno-native preferred, actively maintained)
3. Document in ADR
4. Implement

**Rationale:** Technical implementation detail, aligns with Deno choice, reversible

---

### Scenario 2: Architecture Deviation Opportunity

**Situation:** "I found a simpler orchestration pattern than what's documented"

**Decision:** Ask First

**Process:**
1. Document current approach vs. proposed approach
2. Analyze tradeoffs (simplicity vs. documented design)
3. Check Five Cornerstones alignment
4. Present to user with recommendation
5. Wait for approval before proceeding

**Rationale:** Changes documented architecture, affects future understanding

---

### Scenario 3: Ambiguous Requirement

**Situation:** "The roadmap says 'implement task matching' but doesn't specify algorithm"

**Decision:** Check documentation first, then autonomy level depends:
- If examples/patterns exist in docs: High Autonomy + Document (ADR)
- If unclear from docs: Ask First

**Process:**
1. Review IMPLEMENTATION_ROADMAP.md Phase 2 carefully
2. Check ARCHITECTURE_DESIGN.md for guidance
3. If clear intent exists (e.g., "simple keyword matching for Phase 2"): Implement + ADR
4. If unclear: Ask user which approach to take

**Rationale:** User provided detailed roadmap - check there first before asking

---

### Scenario 4: Validation Failure

**Situation:** "Validation checklist shows I don't fully understand 4-tier memory"

**Decision:** Always Ask

**Process:**
1. Re-read relevant documentation
2. Attempt to answer validation questions again
3. If still unclear: Document what you don't understand
4. Ask user for clarification conversation
5. Don't proceed to implementation until clear

**Rationale:** Building on misunderstanding creates technical debt

---

### Scenario 5: Timeline Pressure

**Situation:** "Phase 2 is taking longer than 2 weeks. Should I reduce scope?"

**Decision:** Ask First

**Process:**
1. Document progress vs. plan
2. Identify what's causing delay
3. Propose options:
   - Option A: Extend timeline (e.g., Phase 2 takes 3 weeks)
   - Option B: Reduce scope (e.g., defer embeddings to Phase 5)
   - Option C: Simplify implementation
4. Recommend one with rationale
5. Get user approval

**Rationale:** Timeline and scope are user decisions

---

## Edge Case Handling

### What if Documentation Contradicts?

**Example:** "ARCHITECTURE_DESIGN.md says X, but IMPLEMENTATION_ROADMAP.md says Y"

**Decision:** Always Ask

**Process:**
1. Document the contradiction clearly
2. Cite both sources with line numbers/sections
3. Ask user which is correct or if synthesis needed
4. Update documentation with clarification
5. Proceed with approved approach

**Don't:** Guess which is correct

---

### What if You Discover a Better Approach?

**Example:** "I found a Deno library that makes Phase 3 much simpler"

**Decision:** Ask First (if architectural impact) OR High Autonomy + Document (if implementation detail)

**Process:**
1. Evaluate impact (Just cleaner code? Or changes architecture?)
2. If implementation detail (e.g., better helper library): Document in ADR, proceed
3. If architectural (e.g., changes how providers work): Present to user first

---

### What if User Requests Something Not in Roadmap?

**Example:** "User asks: Can you add a web UI in Phase 2?"

**Decision:** Always Ask (but politely clarify)

**Response:**
```
"A web UI would be valuable! However, it's not currently in the Phase 2
scope (which focuses on orchestration). The roadmap mentions web UI as a
future enhancement (post-Phase 6).

Options:
A) Complete Phases 1-6 as planned, then add web UI
B) Adjust roadmap to include web UI (likely adds 2-3 weeks)
C) Build minimal web wrapper alongside CLI (parallel work)

Which approach aligns with your priorities?"
```

**Don't:** Say "no" - instead, discuss implications and options

---

## Documentation Requirements

### For All Significant Decisions:

1. **Create ADR** (for High Autonomy + Document or Ask First scenarios)
   - Use template above
   - Number sequentially (ADR-001, ADR-002, etc.)
   - Store in `docs/adr/`

2. **Update Process Memory** (for learnings)
   - If you discover something valuable, add to PROCESS_MEMORY.json
   - Format: pm-0XX with type, title, description, learning, tags

3. **Commit Message** (for all code changes)
   - Include decision context
   - Reference ADR if applicable
   - Example: `feat: Implement task matching with keyword scoring (ADR-003)`

4. **Code Comments** (for implementation)
   - Explain "why" not just "what"
   - Document non-obvious choices
   - Reference ADRs for architectural decisions

---

## User Communication Styles

### Progress Updates (Proactive)

**Frequency:** After completing each major task, before starting new phase

**Format:**
```
Phase 1 Update:

Completed:
✓ Project structure and TypeScript types
✓ YAML config loader with validation
✓ CLI REPL with basic conversation loop

In Progress:
→ Unit tests for config loader (80% done)

Blockers: None

Next: Complete tests, then request Phase 1 validation before starting Phase 2

Estimated: Ready for Phase 1 review by [date]
```

---

### Asking for Clarification

**Format:**
```
Question about [topic]:

Context: While implementing [X], I encountered [situation]

Options:
A) [Approach A] - Pros: ..., Cons: ...
B) [Approach B] - Pros: ..., Cons: ...

My recommendation: [B] because [rationale]

Your preference?
```

---

### Proposing Changes

**Format:**
```
Proposed Architecture Adjustment:

Current approach: [describe documented approach]

Proposed change: [describe new approach]

Rationale:
- [Benefit 1]
- [Benefit 2]

Tradeoffs:
- [Downside 1]
- [Downside 2]

Five Cornerstones alignment:
- Configurability: ✓ [How it maintains/improves]
- Modularity: ✓ [How it maintains/improves]
- (etc.)

Impact on timeline: [none / +1 week / -2 days / etc.]

May I proceed with this change?
```

---

## Self-Monitoring

### Before Every Implementation Decision, Ask Yourself:

1. **Is this documented?** (Check roadmap, architecture, examples)
2. **Does this align with Five Cornerstones?** (All five?)
3. **What's the autonomy level?** (Full / High+Doc / Ask / Always Ask)
4. **What are the ripple effects?** (Memory / Orchestration / Config / etc.)
5. **Am I confident in my understanding?** (>80% = proceed, <80% = ask)

### If Unsure, Default to: **Ask First**

It's better to ask and learn than to build wrong and rework.

---

## Success Metrics

**You're using this framework well when:**

- ✓ You move quickly on implementation details without over-asking
- ✓ You catch and escalate architecture deviations before implementing
- ✓ You document significant decisions in ADRs
- ✓ User feels informed but not overwhelmed with questions
- ✓ Your implementations align with Five Cornerstones
- ✓ You build confidence over time (asking less as understanding grows)

**Warning signs:**

- ⚠️ User frequently says "that's not what I wanted"
- ⚠️ You're asking about every small decision
- ⚠️ You're making architecture changes without discussing
- ⚠️ Implementations violate Five Cornerstones
- ⚠️ No ADRs created (under-documenting) or too many ADRs (over-documenting)

---

## Final Guidance

**Remember:**

- You're the **technical lead**, user is the **product owner**
- Move fast on "how to build," collaborate on "what to build"
- When in doubt, **ask** - rework is more expensive than questions
- Document decisions so future AIs (and humans) understand your reasoning
- The goal is velocity WITH alignment, not just velocity

**The user trusts you to:**
- Build quality code that follows established patterns
- Raise concerns before they become problems
- Make good technical decisions within your domain
- Ask for guidance when you need it
- Document your thinking

---

**Last Updated:** 2025-11-14
**Purpose:** Enable AI-First development with clear decision authority
**Review:** Update if patterns emerge showing gaps in framework
