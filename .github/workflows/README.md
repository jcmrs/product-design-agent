# GitHub Actions Workflows for Sophie

> **Automated enforcement of Sophie's Five Cornerstones and code quality standards**

---

## Why GitHub Actions?

**Perfect for cloud-first, AI-assisted development:**
- ✅ No local setup required
- ✅ Runs automatically on every push/PR
- ✅ Enforces principles for all contributors
- ✅ Cannot be bypassed
- ✅ Free for public repositories
- ✅ Results visible in GitHub UI

**This is the primary enforcement mechanism for Sophie's principles.**

---

## Available Workflows

### 1. Five Cornerstones Validation

**File:** `validate-cornerstones.yml`

**Triggers:**
- Every push to any branch
- Every pull request to main

**What it does:**
- Runs `.claude/tools/validate-cornerstones.ts` on source code
- Checks for violations of Sophie's Five Cornerstones:
  1. **Configurability** - No hardcoded paths, URLs, API keys
  2. **Modularity** - Function length, coupling, separation of concerns
  3. **Extensibility** - No hardcoded providers, plugin-friendly design
  4. **Integration** - Error handling for external tools, timeouts
  5. **Automation** - No TODOs without issues, minimal manual steps

**Result:**
- ✅ Pass: All principles followed
- ❌ Fail: Violations found, blocks PR merge

---

### 2. Code Quality

**File:** `code-quality.yml`

**Triggers:**
- Every push to any branch
- Every pull request to main

**What it does:**
- **Format Check:** Ensures code is formatted with `deno fmt`
- **Linting:** Runs `deno lint` on TypeScript files
- **Tests:** Runs test suite (when tests exist)

**Result:**
- ✅ Pass: Code meets quality standards
- ❌ Fail: Formatting/linting issues or test failures

---

## Viewing Results

### On GitHub Web:

1. Go to repository on GitHub
2. Click **"Actions"** tab at top
3. See all workflow runs with status:
   - 🟢 Green checkmark = Passed
   - 🔴 Red X = Failed
   - 🟡 Yellow dot = Running

### On Commits:

Each commit shows status badges:
- Click to see detailed results
- Failures show exact line numbers and violations

### On Pull Requests:

- Status checks appear at bottom of PR
- **"Merge"** button blocked if checks fail
- Click **"Details"** to see what failed

---

## What Happens on Failure?

### Five Cornerstones Validation Failure:

```
❌ Configurability violation
   File: src/config.ts:42
   Issue: Hardcoded absolute path: "/usr/local/data"
   Fix: Use CONFIG object with environment variable
```

**Action required:**
1. Fix the violation in your code
2. Push the fix
3. Workflow runs again automatically
4. PR unblocked when checks pass

### Code Quality Failure:

```
❌ Formatting check failed
   File: src/main.ts
   Issue: Code not formatted with deno fmt

Run: deno fmt src/main.ts
```

**Action required:**
1. Run `deno fmt` on the file (or entire project)
2. Commit formatted code
3. Push
4. Checks re-run automatically

---

## For Contributors

### Working with GitHub Actions:

**You don't need to do anything special:**
- Just commit and push as normal
- Actions run automatically
- Fix any failures reported

**View your workflow results:**
```
1. Push your code
2. Go to GitHub → Your branch
3. See status next to commit
4. Click for details if failed
```

**Best practice:**
- Check Actions tab after pushing
- Don't create PRs until checks pass
- Read failure messages carefully - they tell you exactly what to fix

---

## Local Development (Optional)

**Don't want to wait for GitHub Actions?**

Run validation locally before pushing:

```bash
# Install Deno
curl -fsSL https://deno.land/install.sh | sh

# Run validator
deno run --allow-read .claude/tools/validate-cornerstones.ts src/

# Run formatter
deno fmt

# Run linter
deno lint
```

**But remember:** GitHub Actions is the final authority. Even if local checks pass, Actions may find issues.

---

## Workflow Configuration

### Updating Workflows:

To modify what gets validated:

1. Edit `.github/workflows/*.yml` files
2. Commit changes
3. Workflows use new configuration on next run

### Adding New Checks:

Create new workflow file:
```yaml
name: My Custom Check
on: [push, pull_request]
jobs:
  check:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Run my check
        run: echo "checking..."
```

---

## Cost & Limits

**GitHub Actions for public repos:**
- ✅ Free unlimited minutes
- ✅ Free unlimited storage
- ✅ No credit card required

**GitHub Actions for private repos:**
- 2,000 minutes/month free
- Then $0.008 per minute

**Our workflows:**
- ~2-3 minutes per run
- Very cost-effective even for private repos

---

## Troubleshooting

### Workflow stuck on "Running..."

**Solution:** Check Actions tab for details. May be queued if many workflows running.

### Workflow failed but code looks correct

**Solution:**
1. Click "Details" to see exact error
2. Validator may catch things humans miss
3. Read suggestion in error message
4. If truly a false positive, ask in PR discussion

### Want to skip validation (emergency)

**Not recommended, but possible:**

Add to commit message:
```
[skip ci]
```

This skips ALL checks. Use only for documentation-only changes.

---

## Maintenance

### Workflow files are code too:

- Follow same principles (Configurability, etc.)
- Document changes
- Test workflow changes in branches first

### Regular updates:

- Keep Deno version up to date in workflows
- Update actions (like `checkout@v4`) when new versions available
- Add new validators as project evolves

---

**GitHub Actions is the foundation of Sophie's quality assurance.**

**It ensures principles are enforced automatically, for everyone, everywhere.**

No local setup. No manual steps. Just push and let automation do its job.
