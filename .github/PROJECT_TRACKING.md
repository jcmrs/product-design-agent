# Sophie Project Tracking System

> **How we systematically progress through development using GitHub's free features**

---

## The System

Sophie uses a **structured, self-progressing** development approach:

**Roadmap → Milestones → Issues → Tasks → Progress**

This creates a system where:
- Progress is visible
- AI can work autonomously
- User can track status anytime
- Nothing gets forgotten
- Decisions are documented

---

## Core Components

### 1. ROADMAP.md - The Master Plan

**What it is:** Complete development plan from Phase 0 → v1.0.0

**Contains:**
- All 6 phases with timelines
- Deliverables for each phase
- Success criteria
- Decision points

**Used by:**
- User: See big picture
- AI: Understand current phase and goals
- Contributors: Know what's coming

---

### 2. GitHub Milestones - Phase Tracking

**What they are:** One milestone per phase

**Example:**
```
Milestone: Phase 0 - Technology Validation
Due date: 6 days from start
Progress: 2/5 issues complete (40%)

Issues in this milestone:
- [ ] Complete Deno prototype
- [ ] Complete Go prototype
- [x] Document comparison criteria
- [ ] Compare prototypes
- [ ] Make technology decision
```

**Benefits:**
- Visual progress (% complete)
- Clear phase boundaries
- Auto-calculated completion

---

### 3. GitHub Issues - Concrete Tasks

**What they are:** Specific, actionable work items

**Two types:**

**a) Tasks** (using task.md template)
- Concrete deliverable
- Clear acceptance criteria
- Testable completion

**b) Architecture Decision Records (ADRs)** (using decision.md template)
- Important decisions
- Options considered
- Rationale documented
- Consequences tracked

**Example Task:**
```
Issue #1: [PHASE 0] Complete Deno Prototype

Acceptance Criteria:
- [ ] CLI REPL works
- [ ] YAML loading works
- [ ] SQLite persistence works
- [ ] Subprocess integration works (or simulated)
- [ ] Findings documented

Estimated: 2-3 hours
Priority: High
Milestone: Phase 0
```

**Example ADR:**
```
Issue #2: [ADR] Choose Technology Stack (Deno vs Go)

Options:
1. Deno (TypeScript, modern, single binary)
2. Go (performance, mature, verbose)

Decision: [To be made after prototypes complete]

This ADR tracks the comparison and final decision.
```

---

### 4. GitHub Projects - Visual Board

**What it is:** Kanban board showing workflow

**Columns:**
```
Backlog → Ready → In Progress → Review → Done
```

**How it works:**
- Issues start in Backlog
- Move to Ready when prioritized
- Move to In Progress when AI/person starts work
- Move to Review when code ready
- Move to Done when merged/complete

**Auto-automation:**
- Issue closed → Moves to Done automatically
- Issue assigned → Can auto-move to In Progress

---

## How This Enables Systematic Progress

### For AI Sessions:

**Session starts:**
1. Read ROADMAP.md → Know current phase
2. Check Milestone → See phase progress
3. Look at Issues → Find next task
4. Pick highest priority task
5. Work on it following acceptance criteria
6. Close issue when complete
7. Move to next task

**This is self-directing.** AI knows exactly what to work on.

---

### For Users:

**Check progress:**
1. Go to GitHub repository
2. Click "Issues" → See all tasks
3. Click "Milestones" → See % complete per phase
4. Click "Projects" → See visual kanban

**No need to ask "what's the status?"** - Just look at GitHub.

---

### For Collaboration:

**Multiple AI sessions can work in parallel:**
- Session A: Works on Issue #5
- Session B: Works on Issue #7
- No conflicts (different issues)
- Both update progress
- User sees combined progress

---

## The ADR Pattern (What You Saw)

**ADR = Architecture Decision Record**

This is a **proven pattern** for documenting decisions:

**Structure:**
```
1. Context - What's the situation?
2. Options - What could we do?
3. Decision - What did we choose?
4. Consequences - What happens as a result?
```

**Example ADR Workflow:**
```
Day 1: Create ADR issue for "Choose database"
       List options: SQLite, PostgreSQL, etc.
       Evaluate each against criteria

Day 2: Prototype with top 2 options
       Document findings in ADR

Day 3: Make decision, document in ADR
       Close ADR issue
       Create implementation tasks
```

**This creates a decision trail** - future developers know WHY decisions were made.

---

## Phase 0 Example: Systematic Progression

**Milestone:** Phase 0 - Technology Validation

**Issues created:**
1. [ADR] Define prototype evaluation criteria
2. [TASK] Complete Deno prototype
3. [TASK] Complete Go prototype
4. [TASK] Document Deno findings
5. [TASK] Document Go findings
6. [TASK] Compare prototypes against criteria
7. [ADR] Choose technology stack
8. [TASK] Document technology decision

**AI works through these sequentially:**
```
Complete #1 → Close, move to #2
Complete #2 → Close, move to #3
...
Complete #8 → Phase 0 done! (Milestone 100%)
```

**User can see:**
- Current task: #3 (In Progress)
- Completed: #1, #2
- Remaining: #4-8
- Progress: 25% (2/8 complete)

---

## Issue Labels for Organization

**Phase Labels:**
- `phase-0`, `phase-1`, `phase-2`, etc.

**Type Labels:**
- `task` - Concrete work item
- `adr` - Architecture decision
- `bug` - Something broken
- `enhancement` - New capability
- `documentation` - Docs only

**Priority Labels:**
- `priority-high` - Do first
- `priority-medium` - Do soon
- `priority-low` - Nice to have

**Status Labels:**
- `blocked` - Can't proceed (needs decision/dependency)
- `needs-decision` - Waiting for user input
- `ready` - Ready to work on
- `in-progress` - Currently being worked on

---

## Creating the Structure

### Step 1: Create Milestones

One per phase:
```
Milestone: Phase 0 - Technology Validation
Description: Choose Deno or Go through prototyping
Due date: 6 days from now

Milestone: Phase 1 - Foundation
Description: Basic CLI working with config loading
Due date: 2 weeks after Phase 0

... (continue for all phases)
```

### Step 2: Create Phase 0 Issues

Using templates, create all Phase 0 tasks:
- Break down ROADMAP deliverables into concrete issues
- Assign to Phase 0 milestone
- Add labels
- Order by priority

### Step 3: Add to Project Board

- Create GitHub Project
- Add all issues
- Organize by status

### Step 4: Start Working

- AI picks next issue
- Works on it
- Closes when done
- Progress automatically tracked

---

## Benefits of This System

### Automation
- Progress tracking automatic (% complete)
- Status visible without asking
- Clear "what's next"

### Configurability
- Can reprioritize by moving issues
- Can adjust scope by adding/removing issues
- Can change timelines by adjusting milestones

### Modularity
- Each issue is independent
- Can work on multiple in parallel
- Clear boundaries

### Extensibility
- Easy to add new phases
- Easy to add new tasks
- Templates ensure consistency

### Integration
- Works with GitHub Actions (can auto-create issues)
- Works with multiple AI sessions
- Works with human contributors

**This embodies all Five Cornerstones in project management.**

---

## For AI Sessions: How to Use This

**Every session start:**

1. **Check Milestone:**
   ```
   What phase are we in? → Phase 0
   What's the milestone progress? → 2/8 complete (25%)
   ```

2. **Find Next Task:**
   ```
   Filter issues by:
   - Milestone: Phase 0
   - Status: Not closed
   - Priority: High first

   Pick the highest priority task not in progress
   ```

3. **Work on Task:**
   ```
   Read acceptance criteria
   Implement
   Check off criteria as you complete them
   ```

4. **Close Task:**
   ```
   When all acceptance criteria met:
   - Update issue with summary
   - Close issue
   - Commit work
   - Move to next task
   ```

**This is systematic and self-directing.**

---

## Comparison: Before vs After

**Before (no structure):**
- "What should I work on?" → Ask user
- "What's done?" → Ask user or dig through commits
- "What's left?" → Unknown
- Multiple AI sessions → Duplicate work
- Progress → Invisible

**After (with this system):**
- "What should I work on?" → Check issues
- "What's done?" → Check milestone %
- "What's left?" → See open issues
- Multiple AI sessions → Pick different issues
- Progress → Visible on GitHub

---

## Real Example: Claude Code With ADRs

What you saw was likely:

**Claude Code working through a list of ADR issues:**
```
ADR #1: Choose authentication method
ADR #2: Choose database schema design
ADR #3: Choose API architecture
...

Claude:
- Opens ADR #1
- Lists options (OAuth, JWT, Session, etc.)
- Evaluates each
- Documents decision
- Closes ADR #1
- Moves to ADR #2
- Repeats
```

**This creates:**
- Clear decision trail
- Systematic progress
- No forgotten decisions
- Context for future changes

**We can do the same for Sophie.**

---

## Next Steps to Implement This

### Immediate:
1. Create Phase 0 milestone on GitHub
2. Create Phase 0 issues using templates
3. Create GitHub Project (kanban board)
4. AI starts working through issues

### Then:
5. Create remaining phase milestones
6. Create Phase 1 issues (when Phase 0 complete)
7. Continue systematically through roadmap

---

## User's Role

**You don't need to do anything technical.**

**You can:**
- Check GitHub to see progress anytime
- Reprioritize issues if needed (drag and drop)
- Comment on issues with feedback
- Close/reopen issues
- Approve decisions in ADRs

**The system works automatically for you.**

---

**This is the "tracker" you were asking for.**

**It's how proper structured development progresses systematically.**

**Should I create the Phase 0 milestone and issues now?**
