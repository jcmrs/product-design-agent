# Validation Framework: Anchoring Five Cornerstones

> **Purpose:** Enforce principles through automation, checklists, and quality gates - not just documentation

---

## The Problem

Documentation (CLAUDE.md) tells us what to do. But what **forces** us to do it?

**This file provides the enforcement mechanisms.**

---

## Session Start Protocol

### For AI Assistants (MANDATORY - Do This First)

Every time you start working on Sophie, you MUST:

**Step 1: Read Foundation Files** ✓
```
1. Read CLAUDE.md (principles, methodology, Five Cornerstones)
2. Read this file (VALIDATION.md - enforcement mechanisms)
3. Read README.md (current project status)
4. Check git log -3 (what was done recently)
```

**Step 2: Verify Context** ✓
```
5. What phase are we in? (Check CLAUDE.md "Current Status")
6. What were we last working on? (Check recent commits)
7. Are there open TODOs? (Check todo list if available)
```

**Step 3: State Your Understanding** ✓
```
8. Summarize to yourself (internal thinking):
   - What is Sophie? (Independent CLI, not extension of archive)
   - What are Five Cornerstones? (List them)
   - What phase are we in? (Phase 0 / 1 / 2 etc.)
   - What was last completed?
   - What should I work on next?
```

**If you cannot complete these steps, STOP and ask the user for context.**

---

## Quality Gates: Five Cornerstones Validation

### Before Marking ANY Task Complete

Run this checklist. If ANY item fails, task is NOT complete.

#### Gate 1: Configurability ✓

- [ ] No hardcoded paths (use CONFIG or environment variables)
- [ ] No hardcoded values that should be user-controlled
- [ ] All configuration loadable from files (YAML/JSON/env)
- [ ] Bilingual support considered (or noted as future work)
- [ ] User preferences respected (if applicable)

**How to verify:** Search code for absolute paths, hardcoded strings, magic numbers

#### Gate 2: Modularity ✓

- [ ] Component has single, well-defined responsibility
- [ ] No tight coupling to other components
- [ ] Uses interfaces/abstractions where appropriate
- [ ] Can be tested independently
- [ ] Clear function/class boundaries

**How to verify:** Can you describe this component's purpose in one sentence? Can you test it without mocking 5 other things?

#### Gate 3: Extensibility ✓

- [ ] Adding similar features won't require refactoring this
- [ ] Uses composition over inheritance where possible
- [ ] Plugin points identified (or noted if not needed)
- [ ] Future enhancements considered in design
- [ ] Not over-engineered (extensible doesn't mean complex)

**How to verify:** Imagine adding a new [agent/task/provider] - do you need to change this code?

#### Gate 4: Integration ✓

- [ ] External tool integration clean (if applicable)
- [ ] Error handling for external dependencies
- [ ] Timeouts and retries considered
- [ ] Can work with multiple tools (or abstracted for future)
- [ ] Data import/export considered

**How to verify:** If Claude Code is replaced with Gemini CLI, what breaks?

#### Gate 5: Automation ✓

- [ ] No manual steps that could be automated
- [ ] Intent/language/task detection automatic (no manual selection)
- [ ] CI/CD friendly (tests can run automatically)
- [ ] Logging/observability for debugging
- [ ] Deployment automated (single binary, simple install)

**How to verify:** What does the user have to do manually? Can it be automated?

---

## Code Validation Checklist

### Before ANY Commit

- [ ] Code follows language conventions (deno fmt / go fmt)
- [ ] Comments explain WHY, not WHAT
- [ ] Non-obvious decisions documented
- [ ] Five Cornerstones validation passed (above)
- [ ] No TODOs or FIXMEs without GitHub issues
- [ ] Tests written (or marked as prototype/poc if N/A)
- [ ] Documentation updated (if public API changed)

### Before Marking Feature Complete

- [ ] Quality gates passed (Five Cornerstones)
- [ ] Integration tested with rest of system
- [ ] Error cases handled gracefully
- [ ] User-facing messages are clear and helpful
- [ ] Performance acceptable (no obvious bottlenecks)
- [ ] Memory leaks checked (if long-running)
- [ ] Security considered (no command injection, etc.)

---

## Holistic System Thinking Checklist

### Before Implementing ANY Feature

Ask these questions and document answers:

**1. Ripple Analysis:**
```
What components does this touch?
- Component A: [impact]
- Component B: [impact]
- Component C: [impact]

What components DON'T it touch (but maybe should)?
- [list]
```

**2. Five Cornerstones Impact:**
```
Configurability: [how does this feature affect it?]
Modularity: [does this introduce coupling?]
Extensibility: [will similar features need refactoring?]
Integration: [does this affect external tool collaboration?]
Automation: [can we automate more here?]
```

**3. Alternative Approaches:**
```
Approach 1 (chosen): [pros/cons]
Approach 2 (rejected): [why rejected?]
Approach 3 (rejected): [why rejected?]
```

**4. Future Implications:**
```
If we add multi-project support, does this still work?
If we add external knowledge tier, does this still work?
If we add new AI provider, does this still work?
If we scale to 1000 projects, does this still work?
```

---

## Development Methodology Enforcement

### Iterative Validation-Driven Development (IVDD)

Each task must follow this flow:

```
┌─────────────────────────────────────────────┐
│ 1. DOCUMENT (Design doc or inline comments)│
│    - What are we building?                  │
│    - Why this approach?                     │
│    - Five Cornerstones alignment?           │
└──────────────────┬──────────────────────────┘
                   │
                   ▼
┌─────────────────────────────────────────────┐
│ 2. VALIDATE DESIGN                          │
│    - Run Holistic System Thinking checklist │
│    - Review ripple effects                  │
│    - Get user approval if major             │
└──────────────────┬──────────────────────────┘
                   │
                   ▼
┌─────────────────────────────────────────────┐
│ 3. IMPLEMENT                                │
│    - Write tests first (if not prototype)   │
│    - Implement minimal viable component     │
│    - Follow code conventions                │
└──────────────────┬──────────────────────────┘
                   │
                   ▼
┌─────────────────────────────────────────────┐
│ 4. VALIDATE IMPLEMENTATION                  │
│    - Run Five Cornerstones validation       │
│    - Run code validation checklist          │
│    - Test integration points                │
└──────────────────┬──────────────────────────┘
                   │
                   ▼
┌─────────────────────────────────────────────┐
│ 5. COMMIT (Only if validation passed)       │
│    - Clear commit message                   │
│    - Reference issue/task if applicable     │
└──────────────────┬──────────────────────────┘
                   │
                   ▼
                  DONE
```

**If validation fails at any step, GO BACK and fix.**

---

## Automated Validation Tools

### 1. Five Cornerstones Validator (To Be Built)

Location: `.claude/tools/validate-cornerstones.ts` (or .sh)

**What it checks:**
- Hardcoded paths (fails Configurability)
- High coupling metrics (fails Modularity)
- Hardcoded provider names (fails Extensibility/Integration)
- Manual steps in docs (fails Automation)

**Usage:**
```bash
deno run --allow-read .claude/tools/validate-cornerstones.ts src/
# Exits 0 if pass, 1 if fail with specific violations
```

### 2. Pre-commit Hook

Location: `.git/hooks/pre-commit`

**What it runs:**
- Code formatter (deno fmt / go fmt)
- Linter (deno lint)
- Five Cornerstones validator
- Tests (when test framework exists)

**Usage:** Automatic on `git commit`

### 3. Task Completion Validator

Location: `.claude/tools/validate-task-completion.ts`

**What it checks:**
- All checklist items in this file marked complete
- Tests exist (or prototype exception documented)
- Documentation updated (CLAUDE.md if principles changed)
- No TODOs without issues

**Usage:**
```bash
deno run .claude/tools/validate-task-completion.ts
# Interactive checklist
```

---

## Templates (Enforce Structure)

### Feature Implementation Template

Location: `.claude/templates/FEATURE_TEMPLATE.md`

**Usage:** Copy this template for every new feature

```markdown
# Feature: [Name]

## Objective
[What are we building and why?]

## Five Cornerstones Alignment
- **Configurability:** [how does this feature support it?]
- **Modularity:** [which component owns this?]
- **Extensibility:** [how can this be extended?]
- **Integration:** [does this integrate with external tools?]
- **Automation:** [what's automated?]

## Holistic System Thinking
### Components Affected:
- [Component]: [impact]

### Ripple Effects:
- [downstream impact]

### Alternative Approaches:
- [rejected approach and why]

## Implementation Plan
1. [Step 1]
2. [Step 2]
...

## Validation Criteria
- [ ] Quality gates passed
- [ ] Integration tested
- [ ] Documentation updated

## Testing
- [ ] Unit tests
- [ ] Integration tests
- [ ] Manual testing completed
```

### Commit Message Template

```
<type>(<scope>): <short summary>

<body explaining WHY, not WHAT>

Five Cornerstones Impact:
- Configurability: [impact or N/A]
- Modularity: [impact or N/A]
- Extensibility: [impact or N/A]
- Integration: [impact or N/A]
- Automation: [impact or N/A]

Testing: [what was tested]
```

---

## How This Prevents Context Loss

### Problem: AI forgets principles between sessions

**Solution:**
1. **Session Start Protocol** forces re-reading CLAUDE.md and VALIDATION.md
2. **Mandatory checklist** before first code line
3. **Quality gates** catch violations automatically

### Problem: No enforcement, just documentation

**Solution:**
1. **Automated validators** run on every commit
2. **Pre-commit hooks** block bad code
3. **CI/CD integration** (future) fails builds on violations

### Problem: Easy to skip validation under time pressure

**Solution:**
1. **Git hooks** force validation (can't commit without it)
2. **Task completion validator** won't pass without checklist
3. **User learns to ask:** "Did you run validation checklist?"

### Problem: Principles are vague and subjective

**Solution:**
1. **Concrete checklists** with yes/no questions
2. **Automated tools** check objective criteria (hardcoded paths, etc.)
3. **Examples** of pass/fail for each cornerstone

---

## Integration with Development Workflow

### Daily Workflow (For AI Assistant)

```
Morning:
  1. Run Session Start Protocol (read foundation files)
  2. Check what was done yesterday (git log)
  3. Review validation framework (this file)

During Development:
  4. For each task: Document → Validate Design → Implement → Validate Implementation
  5. Before commit: Run quality gates checklist
  6. Commit with proper template

Before Marking Task Complete:
  7. Run task completion validator
  8. Ensure all checklists passed
  9. Update todo list
  10. Document learnings if applicable

End of Session:
  11. Commit all work
  12. Document what's in-progress for next session
```

### User's Role in Enforcement

**User should periodically ask:**
- "Did you run the validation checklist?"
- "Does this follow Five Cornerstones?"
- "Show me the Holistic System Thinking analysis"
- "What ripple effects does this have?"

**If AI can't answer immediately, context was lost.**

---

## Continuous Improvement

This validation framework itself should evolve:

**When to update this file:**
- New cornerstone or principle added
- Validation catches a gap (add new check)
- Automated tool finds a pattern to check
- User identifies a recurring issue

**Process:**
1. Identify gap in validation
2. Add checklist item or automated check
3. Update CLAUDE.md if principles changed
4. Communicate to user what was added

---

## Quick Reference Card

### Before Starting Work
- [ ] Read CLAUDE.md
- [ ] Read VALIDATION.md
- [ ] Check git log -3
- [ ] Understand current phase

### Before Implementing
- [ ] Run Holistic System Thinking checklist
- [ ] Document design decision
- [ ] Get user approval if major

### Before Committing
- [ ] Five Cornerstones quality gates passed
- [ ] Code validation checklist passed
- [ ] Run deno fmt / go fmt
- [ ] Tests written (or prototype exception)

### Before Marking Complete
- [ ] Task completion validator passed
- [ ] Integration tested
- [ ] Documentation updated
- [ ] Todo list updated

---

## Anchoring Mechanisms Summary

| Problem | Anchor | How It Works |
|---------|--------|--------------|
| AI forgets context | Session Start Protocol | MUST read foundation files first |
| No enforcement | Quality Gates | Checklist before any commit |
| Subjective principles | Automated Validator | Objective checks (hardcoded paths, etc.) |
| Skip validation | Git Pre-commit Hook | Can't commit without passing |
| Vague methodology | IVDD Workflow | Document → Validate → Implement → Validate |
| Principles ignored | Five Cornerstones Checklist | Must answer for each cornerstone |
| System thinking skipped | Ripple Analysis Checklist | Must trace impacts before implementing |
| Context lost between tasks | Task Templates | Pre-structured format enforces framework |

---

**This is the anchor.** Documentation tells us what. Validation enforces how.

**Without this file, principles are aspirational. With this file, they're mandatory.**

---

**Last Updated:** 2025-11-10
**Status:** Initial version (validation tools to be implemented)
**Next:** Build automated validators in `.claude/tools/`
