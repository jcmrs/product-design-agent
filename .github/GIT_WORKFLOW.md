# Git Workflow & Branching Strategy for Sophie

> **Best practices for repository structure, branching, and collaboration**

---

## Current Status vs. Best Practice

### ⚠️ Current Reality:

**Right now we're working on:**
- Branch: `claude/difficult-project-task-011CUzP9nDnwXsnBvLUQ93wc`
- This is a **Claude Code session branch** (temporary, AI-specific)
- Not following standard git flow

**Why this happened:**
- Early architectural/design phase
- AI-assisted development in cloud
- Focus on establishing principles first

**This is NOT how we'll work going forward.**

---

## Standard Git Workflow (Starting Phase 1)

### Branch Structure:

```
main (production/releases)
  ↑
  └── develop (integration branch)
        ↑
        ├── feature/validation-framework
        ├── feature/cli-interface
        ├── feature/memory-layer
        └── fix/bug-description
```

### Branch Purposes:

**`main`** - Production-ready code
- Only merge via PR from `develop`
- Tagged releases (v1.0.0, v1.1.0, etc.)
- Protected branch (requires reviews)
- CI/CD deploys from here

**`develop`** - Integration branch
- Active development branch
- Features merge here first
- Should always be stable (tests pass)
- Base for all feature branches

**`feature/*`** - New features
- Branch from: `develop`
- Merge to: `develop` via PR
- Naming: `feature/short-description`
- Delete after merge

**`fix/*`** - Bug fixes
- Branch from: `develop` (or `main` for hotfixes)
- Merge to: `develop` (or both `main` and `develop` for hotfixes)
- Naming: `fix/bug-description`

**`hotfix/*`** - Urgent production fixes
- Branch from: `main`
- Merge to: both `main` and `develop`
- For critical bugs in production

**`claude/*`** - Temporary AI session branches
- **Used during prototyping/exploration only**
- Not part of standard workflow
- Should be converted to feature branches before merge

---

## Workflow Steps

### For Feature Development:

```bash
# 1. Update develop branch
git checkout develop
git pull origin develop

# 2. Create feature branch
git checkout -b feature/my-feature

# 3. Work on feature (commit often)
git add .
git commit -m "feat: add feature component"
git commit -m "feat: add tests for feature"

# 4. Push feature branch
git push -u origin feature/my-feature

# 5. Create Pull Request on GitHub
# - From: feature/my-feature
# - To: develop
# - Request review
# - Wait for CI checks to pass

# 6. After approval and merge
git checkout develop
git pull origin develop
git branch -d feature/my-feature  # Delete local branch
git push origin --delete feature/my-feature  # Delete remote branch
```

### For Bug Fixes:

Same as feature, but use `fix/` prefix instead of `feature/`.

### For Hotfixes (Production):

```bash
# 1. Branch from main
git checkout main
git pull origin main
git checkout -b hotfix/critical-bug

# 2. Fix the bug
git commit -m "fix: resolve critical bug in production"

# 3. Create TWO PRs:
# PR 1: hotfix/critical-bug → main (deploy to production)
# PR 2: hotfix/critical-bug → develop (keep develop in sync)

# 4. After merge, tag release
git checkout main
git pull origin main
git tag v1.0.1
git push origin v1.0.1
```

---

## Pull Request Guidelines

### PR Requirements:

**Must have:**
- [ ] Clear, descriptive title
- [ ] Description explaining what/why
- [ ] All CI checks passing (GitHub Actions)
- [ ] Five Cornerstones validation passed
- [ ] Tests added/updated (when applicable)
- [ ] Documentation updated (if public API changed)

**PR Template:**
```markdown
## What does this PR do?
[Brief description]

## Why is this needed?
[Rationale]

## Five Cornerstones Impact:
- Configurability: [impact or N/A]
- Modularity: [impact or N/A]
- Extensibility: [impact or N/A]
- Integration: [impact or N/A]
- Automation: [impact or N/A]

## Testing:
[How was this tested?]

## Screenshots (if UI changes):
[Optional]

## Checklist:
- [ ] Tests pass locally
- [ ] Documentation updated
- [ ] No hardcoded values (Configurability)
- [ ] Components are modular
- [ ] Code is extensible
```

### Review Process:

1. **Author creates PR**
2. **GitHub Actions run** (automatic)
3. **Reviewer(s) assigned**
4. **Code review** (comments, suggestions)
5. **Author addresses feedback**
6. **Approval** (at least 1 reviewer)
7. **Merge** (squash and merge preferred)
8. **Branch deleted** (automatic)

---

## Commit Message Standards

### Format:

```
<type>(<scope>): <short summary>

<body - optional>

<footer - optional>
```

### Types:

- `feat:` - New feature
- `fix:` - Bug fix
- `docs:` - Documentation only
- `style:` - Formatting, missing semicolons, etc. (no code change)
- `refactor:` - Code change that neither fixes bug nor adds feature
- `perf:` - Performance improvement
- `test:` - Adding or updating tests
- `chore:` - Maintenance tasks, dependency updates

### Examples:

**Good:**
```
feat(cli): add conversation history command

Allows users to view past conversations with 'sophie history'
Implements search and filtering by date/task
```

**Good:**
```
fix(memory): resolve SQLite connection leak

Connections were not being closed after queries,
causing "too many connections" error after ~100 queries.
```

**Bad:**
```
update stuff
```

**Bad:**
```
WIP
```

---

## Branch Protection Rules

### For `main` branch:

- ✅ Require pull request reviews (min 1)
- ✅ Require status checks to pass (GitHub Actions)
- ✅ Require branches to be up to date before merging
- ✅ Require linear history (squash merge)
- ✅ Do not allow force push
- ✅ Do not allow deletion

### For `develop` branch:

- ✅ Require status checks to pass
- ✅ Require branches to be up to date before merging
- ⚠️ Allow force push (only for maintainers, emergency only)
- ✅ Do not allow deletion

### For feature branches:

- No protection (work freely)
- But must pass CI before PR approval

---

## Transitioning from Current State

### Step 1: Create Standard Branches

```bash
# Create develop branch from current work
git checkout claude/difficult-project-task-011CUzP9nDnwXsnBvLUQ93wc
git checkout -b develop
git push -u origin develop

# Optionally create main from stable point
# (or wait until Phase 1 completion for first stable release)
```

### Step 2: Set Branch Protection

On GitHub:
1. Settings → Branches → Add rule
2. Apply rules to `main` and `develop`
3. Configure protection as described above

### Step 3: Future Work

All future features:
- Branch from `develop`
- Use `feature/` or `fix/` prefix
- PR to `develop`
- Standard workflow

### Step 4: First Release

When Phase 1 complete:
- Merge `develop` → `main`
- Tag as `v1.0.0`
- Celebrate! 🎉

---

## For AI-Assisted Development

### Claude Code Sessions:

**Current approach (Phase 0):**
- Session creates `claude/*` branches
- Acceptable for exploration/prototyping

**Going forward (Phase 1+):**
- Sessions should work on feature branches
- Use standard branch names: `feature/memory-layer`
- Still get AI assistance, but follow git flow

**Example:**
```bash
# In Claude Code session
git checkout develop
git pull origin develop
git checkout -b feature/cli-repl

# AI works on this feature branch
# Commits as normal
# Creates PR to develop when done
```

---

## Release Strategy

### Versioning: Semantic Versioning (SemVer)

**Format:** `MAJOR.MINOR.PATCH`

- `MAJOR` - Breaking changes (v1.0.0 → v2.0.0)
- `MINOR` - New features, backward compatible (v1.0.0 → v1.1.0)
- `PATCH` - Bug fixes, backward compatible (v1.0.0 → v1.0.1)

### Release Process:

```bash
# 1. Merge develop → main via PR
# 2. Checkout main
git checkout main
git pull origin main

# 3. Tag release
git tag -a v1.0.0 -m "Release v1.0.0: Initial stable release"

# 4. Push tag
git push origin v1.0.0

# 5. Create GitHub Release
# - Go to GitHub → Releases → Create new release
# - Select tag v1.0.0
# - Write release notes
# - Attach binaries (if applicable)
```

### Pre-releases:

For testing before stable:
- `v1.0.0-alpha.1` - Early testing
- `v1.0.0-beta.1` - Feature complete, testing
- `v1.0.0-rc.1` - Release candidate

---

## FAQ

### Q: Why not just work on main?

**A:** Separation of concerns:
- `main` is always stable/deployable
- `develop` allows integration testing
- Feature branches allow parallel work without conflicts

### Q: Can I push directly to develop?

**A:** No. Always use PRs.
- Ensures code review
- Ensures CI passes
- Maintains quality

### Q: What if I need to work on multiple features?

**A:** Create multiple feature branches:
```bash
git checkout develop
git checkout -b feature/feature-1
# work on feature 1

git checkout develop
git checkout -b feature/feature-2
# work on feature 2
```

### Q: How do I keep my feature branch up to date?

**A:**
```bash
git checkout feature/my-feature
git fetch origin
git rebase origin/develop
# or
git merge origin/develop
```

Prefer rebase for cleaner history.

### Q: My PR conflicts with develop. What do I do?

**A:**
```bash
git checkout feature/my-feature
git fetch origin
git rebase origin/develop
# resolve conflicts
git add .
git rebase --continue
git push --force-with-lease origin feature/my-feature
```

---

## Current Action Items

### Immediate (To Fix Current State):

1. **Create `develop` branch** from current work
2. **Document this transition** in commit message
3. **Set branch protection rules** on GitHub

### Phase 1 Start:

1. **All features use feature branches** from develop
2. **All PRs go to develop** (not main)
3. **Main remains empty** until first stable release

### First Stable Release:

1. **Merge develop → main** via PR
2. **Tag v1.0.0**
3. **Create GitHub Release**
4. **From then on**: develop → main only for releases

---

**This is the industry standard. We should have documented this from day 1.**

**Starting now: proper git flow for professional development.**
