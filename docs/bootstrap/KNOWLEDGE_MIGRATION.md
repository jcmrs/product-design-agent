# Knowledge Migration Plan

> **Systematic plan to migrate 70 knowledge files (15,793 lines) from the original Product Design Agent to Sophie's structure.**

---

## Overview

**Source:** `archive/original-claude-desktop-agent/knowledge/`
**Destination:** `knowledge/` (Sophie's structure)
**Total Files:** 70 markdown files
**Total Lines:** ~15,793 lines
**Structure:** 64 task guides + 6 supporting materials

---

## Migration Priorities

### Phase 1 Needs (Foundation): NONE
- Phase 1 only tests config loading with sample configs
- No knowledge files needed yet

### Phase 2 Needs (Orchestration): 3-5 Task Guides
**Purpose:** Test knowledge loading and orchestration with real content

**Priority 1 (Must Have for Phase 2):**
1. `product_vision.md` → `knowledge/task_guides/product-vision-development.md`
2. `user_research_planning.md` → `knowledge/task_guides/user-research-planning.md`
3. `stakeholder_mapping.md` → `knowledge/task_guides/stakeholder-mapping.md`

**Priority 2 (Nice to Have for Phase 2):**
4. `competitive_analysis.md` → `knowledge/task_guides/competitive-analysis.md`
5. `design_critique.md` → `knowledge/task_guides/design-critique.md`

### Phase 3 Needs (AI Integration): 10-15 Task Guides
**Purpose:** Test end-to-end conversations across different task types

**Add (by category):**
- Strategy: `okr_definition.md`, `business_model.md`
- Research: `usability_testing.md`, `persona_development.md`
- Design: `wireframing.md`, `prototyping.md`
- Collaboration: `meeting_facilitation.md`, `executive_presentation.md`

### Phase 4+ Needs (Memory & Beyond): All Remaining
**Purpose:** Full feature set with all 80+ methodologies

**Migrate:** All remaining 55-60 task guides + 6 materials

---

## Migration Process

### For Each Task Guide:

#### Step 1: Locate Original File
```bash
# Find in archive
find archive/original-claude-desktop-agent/knowledge/task_guides/ -name "*vision*.md"
```

#### Step 2: Read and Analyze
- Identify the 12-section structure (see below)
- Note any cross-references to materials
- Check bilingual content (EN/ES sections)

#### Step 3: Convert to Sophie Format
**Filename Convention:**
- Original: `product_vision.md`
- Sophie: `product-vision-development.md` (kebab-case, descriptive)

**Content Structure:** Preserve 12 sections
1. Understanding the Challenge
2. When to Use This Approach
3. Core Concepts
4. Step-by-Step Process
5. Key Questions
6. Best Practices
7. Common Pitfalls
8. Tools & Techniques
9. Success Metrics
10. Real-World Examples
11. Integration Points
12. Resources

**Preserve:**
- Bilingual content (EN first, ES after with "---" separator)
- Cross-references (update paths if needed)
- All methodology content
- Examples and templates

#### Step 4: Update Cross-References
```markdown
# Original
See: materials/user-research-methods.md

# Sophie (if path changed)
See: knowledge/materials/user-research-methods.md
```

#### Step 5: Validate
- [ ] All 12 sections present
- [ ] Cross-references work
- [ ] Bilingual content preserved (if present)
- [ ] Markdown formatting valid
- [ ] No broken links

#### Step 6: Update Task YAML
Add entry to `config/tasks.yaml`:
```yaml
- id: "product-vision-development"
  name: "Product Vision Development"
  knowledge_guide: "product-vision-development.md"  # Points to migrated file
  # ... rest of task config
```

---

## File Inventory

### Task Guides (64 files)

```
knowledge/task_guides/
├── affinity-diagramming.md
├── agent-onboarding-guide.md
├── agile-lean-ux-frameworks.md
├── b2b-design.md
├── boost-ux-culture.md
├── brainstorming.md
├── business-model-canvas.md
├── cognitive-biases.md
├── component-documentation.md
├── competitive-analysis.md
├── content-audit.md
├── content-inventory.md
├── content-testing.md
├── contextual-inquiry.md
├── creating-design-teams.md
├── creating-icons.md
├── critical-path.md
├── data-information-knowledge.md
├── define-product-assumptions.md
├── design-critique.md
├── design-kpis.md
├── design-operations.md
├── design-principles.md
├── design-sprints.md
├── design-systems.md
├── diary-studies.md
├── ecosystem-mapping.md
├── empathy-maps.md
├── executive-presentation.md
├── experience-mapping.md
├── heuristic-evaluation.md
├── information-architecture.md
├── interaction-design.md
├── interview-guide-development.md
├── jobs-to-be-done.md
├── journey-mapping.md
├── meeting-facilitation.md
├── miro-boards.md
├── motion-design.md
├── okr-definition.md
├── onboarding-designers.md
├── onboarding-design-leads.md
├── persona-development.md
├── prioritization-frameworks.md
├── problem-framing.md
├── product-vision-development.md
├── prototyping.md
├── research-synthesis.md
├── roadmapping.md
├── service-blueprint.md
├── stakeholder-mapping.md
├── strategic-frameworks.md
├── style-guides.md
├── survey-design.md
├── system-thinking.md
├── task-analysis.md
├── typography.md
├── usability-testing.md
├── user-flows.md
├── user-research-planning.md
├── user-stories.md
├── value-proposition.md
├── visual-design.md
├── wireframing.md
└── writing-prompts.md
```

### Materials (6 files)

```
knowledge/materials/
├── agent-task-catalog.md
├── design-process-overview.md
├── onboarding-triggers.md
├── research-methods-overview.md
├── strategic-frameworks-overview.md
└── tool-recommendations.md
```

---

## Migration Tracking

### Checklist Template

```markdown
## Phase 2 Migration (3-5 guides)

- [ ] product-vision-development.md
  - [ ] File copied and renamed
  - [ ] 12 sections validated
  - [ ] Cross-references updated
  - [ ] Added to tasks.yaml
  - [ ] Tested in knowledge loader

- [ ] user-research-planning.md
  - [ ] File copied and renamed
  - [ ] 12 sections validated
  - [ ] Cross-references updated
  - [ ] Added to tasks.yaml
  - [ ] Tested in knowledge loader

- [ ] stakeholder-mapping.md
  - [ ] File copied and renamed
  - [ ] 12 sections validated
  - [ ] Cross-references updated
  - [ ] Added to tasks.yaml
  - [ ] Tested in knowledge loader
```

---

## Automation Opportunities

### Script: Batch Migrate (Phase 4+)

```typescript
// migrate-knowledge.ts
// Run this during Phase 4 to migrate all remaining guides

import { walk } from "https://deno.land/std/fs/mod.ts";

async function migrateKnowledge() {
  const sourceDir = "archive/original-claude-desktop-agent/knowledge/task_guides/";
  const destDir = "knowledge/task_guides/";

  for await (const entry of walk(sourceDir, { exts: [".md"] })) {
    if (entry.isFile) {
      // Read original
      const content = await Deno.readTextFile(entry.path);

      // Convert filename (snake_case → kebab-case)
      const newFilename = entry.name
        .replace(/_/g, "-")
        .toLowerCase();

      // Validate structure (check for 12 sections)
      const sections = extractSections(content);
      if (sections.length !== 12) {
        console.warn(`⚠️  ${entry.name}: Only ${sections.length}/12 sections found`);
      }

      // Write to destination
      await Deno.writeTextFile(`${destDir}${newFilename}`, content);

      console.log(`✓ Migrated: ${entry.name} → ${newFilename}`);
    }
  }
}

function extractSections(markdown: string): string[] {
  // Parse H2 headers to identify sections
  const sections = markdown.match(/^## .+$/gm) || [];
  return sections;
}

// Run
if (import.meta.main) {
  migrateKnowledge();
}
```

---

## Validation After Migration

### Per-File Validation

```bash
# Check file exists
test -f knowledge/task_guides/product-vision-development.md && echo "✓ File exists"

# Check has content
[ $(wc -l < knowledge/task_guides/product-vision-development.md) -gt 50 ] && echo "✓ Has content"

# Check for 12 sections (H2 headers)
SECTIONS=$(grep -c "^## " knowledge/task_guides/product-vision-development.md)
[ $SECTIONS -eq 12 ] && echo "✓ Has 12 sections" || echo "⚠️  Only $SECTIONS sections"
```

### Cross-Reference Validation

```bash
# Find all cross-references
grep -r "See: " knowledge/task_guides/ | while read line; do
  # Extract referenced file
  REF=$(echo "$line" | sed -n 's/.*See: \([^)]*\).*/\1/p')

  # Check if file exists
  if [ -f "$REF" ]; then
    echo "✓ $REF exists"
  else
    echo "⚠️  $REF NOT FOUND"
  fi
done
```

---

## Special Cases

### Bilingual Content

Original files may have EN/ES sections:

```markdown
# Product Vision Development

Understanding the Challenge in English...

---

## Desarrollo de Visión del Producto

Understanding the Challenge en Español...
```

**Sophie Format:** Preserve as-is. Language detection will handle which section to load.

### Cross-References

Original:
```markdown
See also: [User Research Methods](../materials/research-methods-overview.md)
```

Sophie (update path if needed):
```markdown
See also: [User Research Methods](knowledge/materials/research-methods-overview.md)
```

### Agent-Specific Content

Some guides reference specific agents (e.g., "Strategic Thinker helps with...").

**Preserve as-is** - agent names carry over to Sophie.

---

## Timeline

| Phase | Knowledge Needed | Migration Effort | When |
|-------|------------------|------------------|------|
| Phase 1 | None | 0 hours | N/A |
| Phase 2 | 3-5 guides | 2-3 hours | Before Phase 2 testing |
| Phase 3 | 10-15 guides | 4-6 hours | Before Phase 3 testing |
| Phase 4+ | All remaining (50+) | 8-12 hours | During Phase 4-5 |

**Total Migration Effort:** ~15-20 hours across all phases

---

## Success Criteria

Migration is successful when:

- ✓ All 70 files migrated to `knowledge/`
- ✓ All files have 12-section structure validated
- ✓ All cross-references updated and working
- ✓ All files added to `tasks.yaml` with correct paths
- ✓ Knowledge loader can load all guides without errors
- ✓ Bilingual content preserved where present
- ✓ No broken links or missing references

---

## Quick Start: Phase 2 Migration

```bash
# 1. Create directories
mkdir -p knowledge/task_guides
mkdir -p knowledge/materials

# 2. Copy Priority 1 guides
cp archive/original-claude-desktop-agent/knowledge/task_guides/product_vision.md \
   knowledge/task_guides/product-vision-development.md

cp archive/original-claude-desktop-agent/knowledge/task_guides/user_research_planning.md \
   knowledge/task_guides/user-research-planning.md

cp archive/original-claude-desktop-agent/knowledge/task_guides/stakeholder_mapping.md \
   knowledge/task_guides/stakeholder-mapping.md

# 3. Validate structure
for file in knowledge/task_guides/*.md; do
  sections=$(grep -c "^## " "$file")
  echo "$file: $sections sections"
done

# 4. Update tasks.yaml with knowledge_guide paths

# 5. Test with knowledge loader (Phase 2)
```

---

**Last Updated:** 2025-11-14
**Purpose:** Systematic migration of original agent's knowledge base
**Next Action:** Complete Priority 1 migration before Phase 2 testing
