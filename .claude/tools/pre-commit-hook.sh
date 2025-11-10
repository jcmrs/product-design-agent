#!/bin/bash
#
# Pre-commit hook for Sophie
# Enforces Five Cornerstones validation before allowing commits
#
# Installation:
#   cp .claude/tools/pre-commit-hook.sh .git/hooks/pre-commit
#   chmod +x .git/hooks/pre-commit
#
# To bypass (emergencies only):
#   git commit --no-verify
#

echo "🔍 Running Five Cornerstones validation..."
echo ""

# Run the validator on staged files
STAGED_FILES=$(git diff --cached --name-only --diff-filter=ACM | grep -E '\.(ts|js|go)$')

if [ -z "$STAGED_FILES" ]; then
  echo "✅ No source files to validate"
  exit 0
fi

# Check if Deno is available
if ! command -v deno &> /dev/null; then
  echo "⚠️  Deno not found - skipping validation"
  echo "   Install Deno to enable automated validation"
  exit 0
fi

# Run validator on staged files
for FILE in $STAGED_FILES; do
  deno run --allow-read .claude/tools/validate-cornerstones.ts "$FILE"

  if [ $? -ne 0 ]; then
    echo ""
    echo "❌ Validation failed for $FILE"
    echo "   Fix violations or use 'git commit --no-verify' to bypass (not recommended)"
    exit 1
  fi
done

echo ""
echo "✅ Five Cornerstones validation passed!"
echo ""

exit 0
