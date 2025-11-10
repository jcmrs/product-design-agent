# Sophie: AI-First Project Structure & Development Methodology

> **This document defines how Sophie is developed, managed, and evolved through AI-first collaboration**

---

## Core Principle: AI-First Development

**Sophie is built BY AI, FOR users, WITH AI collaboration.**

This is not traditional software development. This is:
- **AI sessions as primary developers** (not human coders with IDEs)
- **User as product owner** (guides direction, validates decisions)
- **GitHub as the workspace** (cloud-first, no local requirements)
- **Documentation as development environment** (context is king)
- **Automation as enforcement** (principles aren't optional)

**Five Cornerstones applied to the repository itself:**
1. **Configurability** - Easy to pivot, change direction, swap technologies
2. **Modularity** - Phases independent, clear separation of concerns
3. **Extensibility** - New phases/features don't require refactoring
4. **Integration** - Works with external AI tools (Perplexity, Claude, etc.)
5. **Automation** - Progress tracking, validation, enforcement automated

---

## Repository Structure

### Current State (Post-Transformation)

```
sophie/ (formerly product-design-agent)
├── README.md                      ← Project overview, current status
├── LICENSE                        ← MIT
├── CLAUDE.md                      ← Foundation: principles, methodology, decisions
├── VALIDATION.md                  ← Enforcement: quality gates, checklists
│
├── .github/
│   ├── workflows/                 ← GitHub Actions (automated validation)
│   │   ├── validate-cornerstones.yml
│   │   ├── code-quality.yml
│   │   └── README.md
│   ├── GIT_WORKFLOW.md            ← Branching strategy, PR process
│   └── AI_FIRST_STRUCTURE.md      ← This file
│
├── .claude/
│   └── tools/                     ← Validation tools, helpers
│       ├── validate-cornerstones.ts
│       ├── pre-commit-hook.sh
│       └── README.md
│
├── docs/                          ← Architecture & analysis
│   ├── SYSTEM_ANALYSIS.md         ← Original agent mapping
│   ├── BEHAVIORAL_PATTERNS.md     ← How the "soul" works
│   ├── ARCHITECTURE_DESIGN.md     ← Sophie's blueprint
│   ├── FEATURE_MATRIX.md          ← Current vs desired
│   └── EXTERNAL_KNOWLEDGE.md      ← 4th memory tier design
│
├── archive/                       ← Original Product Design Agent (preserved)
│   └── original-claude-desktop-agent/
│
├── prototypes/                    ← Phase 0: Technology validation
│   ├── PROTOTYPE_PLAN.md
│   ├── deno-poc/
│   └── go-poc/ (to be created)
│
├── config/                        ← Sophie's configuration (Phase 1+)
├── knowledge/                     ← Sophie's knowledge base (Phase 1+)
└── src/                           ← Sophie's production code (Phase 1+)
```

### What Each Directory Means

**Root Files:**
- `README.md` - First thing anyone sees. Current status, vision, how to navigate
- `CLAUDE.md` - **Foundation document**. Principles, methodology, decision log. READ THIS FIRST.
- `VALIDATION.md` - **Enforcement document**. Quality gates, checklists, automation

**`.github/`** - GitHub-specific configuration
- `workflows/` - Automated validation (runs on every push/PR)
- `GIT_WORKFLOW.md` - Branch strategy, PR requirements
- `AI_FIRST_STRUCTURE.md` - This file (project management)

**`.claude/`** - Claude-specific tools (but works for any AI)
- `tools/` - Validation scripts, helpers, automation

**`docs/`** - Architecture and design documentation
- Read these to understand WHY decisions were made
- Living documents (updated as project evolves)

**`archive/`** - Historical reference only
- Original Product Design Agent preserved
- DO NOT use for Sophie (separate AI agent)
- Reference for understanding what was learned

**`prototypes/`** - Phase 0 only (technology validation)
- Disposable code for decision-making
- NOT production-quality
- Deleted or moved after Phase 0

**`config/`, `knowledge/`, `src/`** - Production Sophie (Phase 1+)
- Currently empty (Phase 0 in progress)
- Will contain actual implementation

---

## Branch Strategy (AI-First)

### Branch Structure

```
main (Sophie stable releases)
  ↑
  └── develop (Sophie active development - PRIMARY AI WORKSPACE)
        ↑
        ├── feature/phase-0-prototypes (optional)
        ├── feature/cli-interface (Phase 1+)
        └── feature/memory-layer (Phase 1+)
```

### Branch Purposes

**`main`** - Stable releases only
- Protected (no direct commits)
- Only merge from `develop` via PR
- Tagged releases (v1.0.0, v1.1.0, etc.)
- What users would actually use

**`develop`** - Active development (DEFAULT BRANCH)
- **This is where AI sessions work**
- Protected but allows AI collaboration
- Base for all feature branches
- Should always be functional (tests pass)

**`feature/*`** - Specific phase or feature work (optional)
- Branch from `develop`
- PR back to `develop`
- Deleted after merge
- Use when work is complex or experimental

### Where AI Sessions Work

**Phase 0 (Technology Validation):**
- Work on `develop` (or `feature/phase-0-prototypes`)
- Rapid iteration, experimental
- Prototypes isolated in `prototypes/` directory

**Phase 1+ (Implementation):**
- Work on `feature/*` branches for specific features
- PR to `develop` when complete
- Merge `develop` → `main` at phase completion

### Branch Protection Rules

**`main`:**
- ✅ Require PR reviews (min 1)
- ✅ Require GitHub Actions to pass
- ✅ Require up-to-date branch before merge
- ✅ No force push
- ✅ No deletion

**`develop`:**
- ✅ Require GitHub Actions to pass
- ⚠️ Allow force push (maintainer only, emergency only)
- ✅ No deletion

**`feature/*`:**
- No protection (work freely)
- But must pass CI before PR approval

---

## AI Session Protocol

### Every Session Starts Here

**Mandatory First Steps:**

1. **Read Foundation Files** (5 min)
   ```
   - README.md (current status, what phase)
   - CLAUDE.md (principles, methodology)
   - This file (AI_FIRST_STRUCTURE.md)
   - Recent commits (git log -5)
   ```

2. **Identify Current Context** (2 min)
   ```
   - What phase are we in? (Check README)
   - What was last completed? (Check git log)
   - What's next? (Check GitHub Issues or ask user)
   ```

3. **Verify Understanding** (1 min)
   ```
   Internal checklist:
   - [ ] I know what Sophie is (independent CLI, not extension)
   - [ ] I know the Five Cornerstones (list them)
   - [ ] I know current phase and goals
   - [ ] I know where to work (which branch)
   ```

4. **Begin Work**
   ```
   - Follow IVDD methodology (Document → Validate → Implement → Validate)
   - Use Five Cornerstones quality gates
   - Update progress as you go
   ```

### Session Handoff Protocol

**When your session ends, document:**

```markdown
## Session End Summary

**Date:** YYYY-MM-DD
**Phase:** Phase X
**Branch:** branch-name

**Completed:**
- Task 1
- Task 2

**In Progress:**
- Task 3 (50% done, next: do X)

**Blocked/Issues:**
- Issue 1 (needs user decision on Y)

**Next Session Should:**
1. Continue Task 3 (files: a.ts, b.ts)
2. Then start Task 4
3. Watch out for: potential issue Z
```

**Where to document:**
- In commit messages
- In GitHub Issues comments
- In PR description
- Can create `SESSION_NOTES.md` if needed

---

## Phase Management

### How Phases Work

**Phase Structure:**
```
Phase 0: Technology Validation (2-6 days)
  ├── Milestone: "Phase 0: Technology Validation"
  ├── Issues: Deno prototype, Go prototype, Comparison doc, Decision
  └── Deliverable: Technology choice documented

Phase 1: Foundation (Weeks 1-2)
  ├── Milestone: "Phase 1: Foundation"
  ├── Issues: Project structure, CLI REPL, Config loading, etc.
  └── Deliverable: Basic CLI works, loads config

[Additional phases documented in ARCHITECTURE_DESIGN.md]
```

### Phase Completion Criteria

**Before moving to next phase:**
- [ ] All milestone issues closed
- [ ] Deliverables documented
- [ ] GitHub Actions passing
- [ ] User validation obtained
- [ ] Next phase planned

### Tracking Progress

**GitHub Projects:**
- Kanban board with columns: Backlog, In Progress, Review, Done
- Cards linked to issues
- Automated movement (issue closed → Done)

**GitHub Milestones:**
- One milestone per phase
- % complete visible
- Due dates for planning

**GitHub Issues:**
- One issue per task/deliverable
- Labels: phase-0, phase-1, documentation, bug, enhancement
- Assigned to milestone

---

## Development Workflow (AI-First)

### Standard Workflow

```
┌─────────────────────────────────────────────────┐
│ 1. Session Start Protocol                       │
│    - Read foundation files                      │
│    - Check current phase/context                │
│    - Verify understanding                       │
└──────────────────┬──────────────────────────────┘
                   ↓
┌─────────────────────────────────────────────────┐
│ 2. Pick Next Task                               │
│    - Check GitHub Issues (current milestone)    │
│    - Or ask user what to work on                │
└──────────────────┬──────────────────────────────┘
                   ↓
┌─────────────────────────────────────────────────┐
│ 3. IVDD: Document → Validate → Implement        │
│    - Document design/approach                   │
│    - Validate against Five Cornerstones         │
│    - Implement with quality gates               │
│    - Validate implementation                    │
└──────────────────┬──────────────────────────────┘
                   ↓
┌─────────────────────────────────────────────────┐
│ 4. Commit & Push                                │
│    - Run quality gates (manual or auto)         │
│    - Clear commit message                       │
│    - Push to branch                             │
│    - GitHub Actions validate                    │
└──────────────────┬──────────────────────────────┘
                   ↓
┌─────────────────────────────────────────────────┐
│ 5. Update Progress                              │
│    - Update GitHub Issue (comment progress)     │
│    - Close issue if complete                    │
│    - Document what's next for handoff           │
└──────────────────┬──────────────────────────────┘
                   ↓
                  DONE
```

### Quality Gates (From VALIDATION.md)

**Before ANY commit:**
- [ ] Five Cornerstones quality gates passed
- [ ] Code formatted (deno fmt / go fmt)
- [ ] No hardcoded paths/values
- [ ] Error handling present
- [ ] Comments explain WHY, not WHAT

**Before marking task complete:**
- [ ] GitHub Actions passing
- [ ] Integration tested
- [ ] Documentation updated
- [ ] User validated (if major)

---

## Project Management (Free GitHub Features)

### GitHub Projects (Kanban Board)

**Setup:**
1. Repository → Projects → New project
2. Template: Kanban
3. Columns: Backlog, In Progress, Review, Done

**Usage:**
- Add all issues to project
- Move cards as work progresses
- Automated: issue closed → Done column

### GitHub Milestones (Phase Tracking)

**Setup:**
1. Repository → Issues → Milestones → New milestone
2. Create one per phase
3. Set due date (optional, for planning)

**Usage:**
- Assign all phase issues to milestone
- % complete auto-calculated
- Visible progress

### GitHub Issues (Task Tracking)

**Issue Template:**
```markdown
## Task: [Name]

**Phase:** Phase X
**Priority:** High/Medium/Low
**Estimated effort:** X hours/days

**Description:**
[What needs to be done and why]

**Acceptance Criteria:**
- [ ] Criterion 1
- [ ] Criterion 2

**Five Cornerstones:**
- Configurability: [impact]
- Modularity: [impact]
- Extensibility: [impact]
- Integration: [impact]
- Automation: [impact]
```

### Labels

**Standard Labels:**
- `phase-0`, `phase-1`, `phase-2`, etc.
- `documentation`, `code`, `infrastructure`
- `bug`, `enhancement`, `question`
- `blocked`, `needs-decision`, `ready`

---

## Branch Transformation Plan

### Current State

```
Branches:
- main (old Product Design Agent, before transformation)
- claude/difficult-project-task-011CUzP9nDnwXsnBvLUQ93wc (all Sophie work)

Issues:
- GitHub shows old project on main
- All actual work on temp AI branch
- No develop branch
```

### Desired State

```
Branches:
- main (Sophie stable - currently empty, first release after Phase 1)
- develop (Sophie active - all current work, DEFAULT BRANCH)

Transformation documented:
- Archive created and preserved
- Git history intact
- Tags for safety
```

### Transformation Steps

**1. Safety First - Create Tag**
```bash
git tag -a transformation-checkpoint -m "Before branch reorganization"
git push origin transformation-checkpoint
```

**2. Update Main to Current Sophie Work**
```bash
# Fetch latest
git fetch origin

# Checkout current work branch
git checkout claude/difficult-project-task-011CUzP9nDnwXsnBvLUQ93wc
git pull origin claude/difficult-project-task-011CUzP9nDnwXsnBvLUQ93wc

# Force main to match current work (transformation is complete here)
git branch -D main 2>/dev/null || true
git checkout -b main
git push -f origin main
```

**3. Create Develop from Main**
```bash
git checkout -b develop
git push -u origin develop
```

**4. Set Default Branch on GitHub**
- Go to GitHub → Settings → Branches
- Change default branch to `develop`
- Confirm change

**5. Clean Up Old Branch (Optional)**
```bash
# After confirming everything works
git push origin --delete claude/difficult-project-task-011CUzP9nDnwXsnBvLUQ93wc
```

**6. Validate Transformation**
```bash
# Check branches exist
git branch -a

# Check main has Sophie work (not old agent)
git checkout main
ls -la  # Should see archive/, docs/, CLAUDE.md, etc.

# Check develop matches main
git checkout develop
git diff main  # Should be empty

# Check transformation tag exists
git tag -l transformation-checkpoint
```

**7. Update README**
Add to README.md:
```markdown
## Branch Structure

- **`main`** - Stable releases (currently empty, first release after Phase 1)
- **`develop`** - Active development (DEFAULT - work here)
- **`feature/*`** - Feature branches (optional)

See `.github/AI_FIRST_STRUCTURE.md` for complete git workflow.
```

---

## Cost Analysis (All Free)

**GitHub Features Used:**
- ✅ Public repository (unlimited, free)
- ✅ GitHub Actions (unlimited minutes for public repos)
- ✅ GitHub Projects (free)
- ✅ GitHub Issues/Milestones (free)
- ✅ Branch protection (free)
- ✅ Pull requests (free)
- ✅ GitHub Codespaces (60 hrs/month free for personal accounts)

**Total Cost:** $0/month

**Optional (if needed):**
- GitHub Codespaces beyond 60 hrs: $0.18/hour
- Private repository: $4/month (not needed, Sophie is open source)

---

## Common Scenarios

### "I'm a new AI session, where do I start?"

1. Read README.md (what is Sophie, what phase)
2. Read CLAUDE.md (principles, methodology)
3. Read this file (AI_FIRST_STRUCTURE.md)
4. Check `git log -5` (recent work)
5. Ask user: "What should I work on?"
6. Follow Session Start Protocol above

### "User asked me to work on Feature X"

1. Check if GitHub Issue exists for Feature X
2. If not, create issue with template above
3. Assign to current milestone (phase)
4. Branch from `develop` (optional: `feature/feature-x`)
5. Follow IVDD workflow
6. Commit, push, validate with GitHub Actions
7. Update issue with progress

### "I finished a task, what now?"

1. Validate quality gates passed
2. Commit and push
3. Close GitHub Issue (if complete)
4. Document handoff (what's next)
5. Ask user: "Task X complete. What's next?"

### "GitHub Actions failed"

1. Click "Details" in PR/commit status
2. Read error message carefully
3. Fix violation (usually Five Cornerstones or formatting)
4. Commit fix
5. Actions re-run automatically

### "User wants to change direction mid-phase"

1. This is OK (Configurability cornerstone)
2. Update or close affected GitHub Issues
3. Create new issues for new direction
4. Document why in commit message
5. Continue with new direction

---

## Maintenance

### This Document

**Update when:**
- New phase added to roadmap
- Branch strategy changes
- New tools added
- Process improvements discovered
- User feedback requires changes

**Process:**
1. Edit this file
2. Commit with clear message
3. Update CLAUDE.md if principles changed
4. Notify in README if major change

### GitHub Setup

**Periodic review:**
- Prune merged feature branches (monthly)
- Archive completed milestones (at phase end)
- Update labels if needed
- Review branch protection rules

---

## Success Metrics

**Sophie's AI-First development is successful when:**

- ✅ New AI sessions can start productive work in <10 minutes
- ✅ Context is preserved across sessions (no re-explaining)
- ✅ Progress is visible (user can check GitHub anytime)
- ✅ Quality is consistent (automation enforces principles)
- ✅ Collaboration is seamless (multiple AI tools work together)
- ✅ User is empowered (non-technical user guides technical project)

**Sophie's AI-First development has FAILED if:**

- ❌ AI sessions get lost/confused frequently
- ❌ Context is lost between sessions
- ❌ User doesn't know what's happening
- ❌ Quality is inconsistent
- ❌ Principles are violated regularly
- ❌ User feels powerless (too technical)

---

## Final Notes

**This is a living document.**

- Update as we learn
- Improve processes based on experience
- Always align with Five Cornerstones
- User needs drive changes

**Remember:**
- AI-first doesn't mean AI-only (user guides direction)
- Documentation IS the development environment
- Context preservation is critical
- Automation enforces, doesn't replace thinking
- Five Cornerstones apply to EVERYTHING (including this process)

---

**Last Updated:** 2025-11-10
**Current Phase:** Phase 0 (Technology Validation)
**Next Update:** After branch transformation complete
