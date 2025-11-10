# Sophie: External Knowledge Integration Design

**Date:** 2025-11-10
**Purpose:** Design for fourth memory tier supporting external AI-generated knowledge sources

---

## Executive Summary

Sophie's architecture includes a **fourth memory tier** for integrating external AI-generated knowledge (from Perplexity AI, other AI agents, research tools, etc.) while maintaining clear separation from Sophie's internal methodology and preventing context contamination.

This design enables collaborative workflows where users leverage multiple AI tools (Sophie + Claude Code + Perplexity + other agents) and bring their outputs into Sophie's context **without conflating external sources with Sophie's own knowledge**.

---

## 1. The Problem: Context Contamination

### Current Challenge

When users work with multiple AI tools:
```
User workflow:
1. Uses Perplexity AI to research "mobile checkout UX patterns"
2. Gets comprehensive, referenced research document
3. Uploads to Claude Code or AI agent
4. Agent processes the file...

❌ Problem: Agent treats external content as if it's its own knowledge
❌ Problem: User can't distinguish "what Sophie knows" vs "what Perplexity found"
❌ Problem: Conflicting information isn't surfaced
❌ Problem: No provenance tracking (where did this info come from?)
```

### Why This Matters

- **Trust:** Users need to know source of information
- **Accuracy:** Different sources have different confidence levels
- **Conflicts:** External research may contradict internal methodology
- **Verification:** Users should approve/verify external knowledge before treating as truth
- **Attribution:** Proper citation of external sources

---

## 2. Solution: Fourth Memory Tier

### Memory Architecture (Expanded)

```
SOPHIE'S MEMORY SYSTEM (4 Tiers):

┌─────────────────────────────────────────────────────────────┐
│ 1. AGENT MEMORY (Global, Internal, HIGH Confidence)         │
│    - Sophie's methodology knowledge (task guides)            │
│    - Operating procedures (how agents work)                  │
│    - Process learnings (why we decided X)                    │
│    - Source: Curated, version-controlled                     │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│ 2. PROJECT MEMORY (Per-Project, User-Generated)             │
│    - Conversation history                                    │
│    - Decisions made                                          │
│    - User-uploaded project files                             │
│    - Source: User + Sophie collaboration                     │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│ 3. EXTERNAL KNOWLEDGE (Per-Project, AI-Generated) ← NEW     │
│    - Perplexity research documents                           │
│    - Other AI agent outputs                                  │
│    - External analysis/reports                               │
│    - Source: Explicitly tagged, confidence-rated             │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│ 4. PROJECT REGISTRY (Metadata)                               │
│    - Project list                                            │
│    - Active project pointer                                  │
│    - Cross-project index                                     │
└─────────────────────────────────────────────────────────────┘
```

### Key Principle: Explicit Separation

**External knowledge is NEVER merged with internal knowledge.**

- Different database tables
- Different confidence ratings
- Different citation formats
- Explicit source attribution in all responses

---

## 3. Data Model

### Database Schema (SQLite)

```sql
-- External knowledge sources registry
CREATE TABLE external_sources (
  id TEXT PRIMARY KEY,              -- UUID
  project_id TEXT,
  source_name TEXT,                 -- "Perplexity AI", "Claude Sonnet 4", "GPT-4", etc.
  source_type TEXT,                 -- "research", "analysis", "brainstorm", "code_review"
  uploaded_at TEXT,                 -- ISO timestamp
  uploaded_by TEXT,                 -- "user" (future: team member)
  description TEXT,                 -- User-provided description
  original_filename TEXT,           -- Original file name
  metadata JSON,                    -- Flexible metadata (API version, query, etc.)
  FOREIGN KEY (project_id) REFERENCES projects(id)
);

-- Chunked external knowledge content
CREATE TABLE external_knowledge (
  id INTEGER PRIMARY KEY,
  source_id TEXT,                   -- Links to external_sources
  project_id TEXT,
  chunk_index INTEGER,              -- For ordered retrieval
  content TEXT,                     -- Chunked content
  content_type TEXT,                -- "text", "code", "data", "image_description"
  embedding BLOB,                   -- Optional: vector embedding for semantic search
  tags TEXT,                        -- JSON array: ["mobile", "checkout", "UX"]
  confidence TEXT,                  -- "high", "medium", "low", "unverified"
  is_verified BOOLEAN DEFAULT 0,   -- Has user reviewed/approved?
  verified_at TEXT,
  created_at TEXT,
  FOREIGN KEY (source_id) REFERENCES external_sources(id),
  FOREIGN KEY (project_id) REFERENCES projects(id)
);

-- Conflicts between external and internal knowledge
CREATE TABLE knowledge_conflicts (
  id INTEGER PRIMARY KEY,
  project_id TEXT,
  external_knowledge_id INTEGER,    -- Links to external_knowledge
  internal_source TEXT,             -- e.g., "task_guides/usability_testing.md"
  conflict_type TEXT,               -- "contradiction", "missing_context", "outdated"
  description TEXT,                 -- What's the conflict?
  resolution TEXT,                  -- "use_external", "use_internal", "merge", "user_decide"
  resolved_by TEXT,                 -- "user", "auto"
  resolved_at TEXT,
  FOREIGN KEY (project_id) REFERENCES projects(id),
  FOREIGN KEY (external_knowledge_id) REFERENCES external_knowledge(id)
);

-- User verification/annotations on external knowledge
CREATE TABLE external_annotations (
  id INTEGER PRIMARY KEY,
  external_knowledge_id INTEGER,
  annotation_type TEXT,             -- "verified", "disputed", "noted", "highlighted"
  note TEXT,                        -- User's note/correction
  created_at TEXT,
  FOREIGN KEY (external_knowledge_id) REFERENCES external_knowledge(id)
);
```

### Indexing for Performance

```sql
-- Fast lookup by project
CREATE INDEX idx_ext_knowledge_project ON external_knowledge(project_id);

-- Fast lookup by source
CREATE INDEX idx_ext_knowledge_source ON external_knowledge(source_id);

-- Fast full-text search
CREATE VIRTUAL TABLE external_knowledge_fts USING fts5(
  content,
  tags,
  content='external_knowledge',
  content_rowid='id'
);
```

---

## 4. Workflows

### 4.1 Uploading External Knowledge

**User Interaction:**
```
User: "Here's research from Perplexity on mobile checkout patterns"
      [uploads file: perplexity_mobile_checkout_research.md]

Sophie:
  [Detects external source marker or file naming pattern]

  "I'll process this as external knowledge from Perplexity AI.

   Processing... ✓

   Detected:
   - Source: Perplexity AI
   - Type: Research document
   - Topics: mobile checkout, UX patterns, cart abandonment
   - 8 case studies
   - 12 best practices
   - 5 anti-patterns

   I've stored this separately from my internal methodology.

   Would you like me to:
   1. Cross-reference with my internal checkout design guides?
   2. Flag any conflicts between this research and my methodology?
   3. Use this as the primary source for your checkout redesign?

   (You can verify/annotate this content anytime)"
```

**Processing Pipeline:**
```
1. File Upload Detection
   ├─ Parse file metadata
   ├─ Detect source (filename, content markers, user indication)
   └─ Create external_sources entry

2. Content Processing
   ├─ Chunk content (500-1000 words per chunk)
   ├─ Extract tags/topics (using LLM or keyword extraction)
   ├─ Generate embeddings (optional, for semantic search)
   ├─ Set initial confidence: "unverified"
   └─ Store in external_knowledge table

3. Conflict Detection (Automatic)
   ├─ Compare with internal methodology
   ├─ Identify contradictions
   ├─ Flag for user review
   └─ Store in knowledge_conflicts table

4. User Notification
   ├─ Summary of what was detected
   ├─ Conflict warnings (if any)
   └─ Offer next actions
```

### 4.2 Referencing External Knowledge

**In Conversation:**
```
User: "How should I design the checkout flow?"

Sophie:
  "I have guidance from two sources:

  **My Internal Methodology** (task_guides/journey_mapping.md):
  - Start with user journey mapping
  - Identify friction points
  - Prioritize guest checkout
  - Minimize form fields

  **External Research** (Perplexity AI, uploaded 2025-11-08):
  - 65% of users abandon at shipping step (8 case studies)
  - Best-in-class flows use 3 steps max
  - Apple Pay reduces abandonment by 40%
  - Guest checkout shows mixed results (depends on context)

  📌 **Potential Conflict**: My methodology recommends guest checkout,
     but your Perplexity research shows mixed results. This might depend
     on your specific user base.

  I recommend we:
  1. Map your current checkout journey
  2. Compare with the case studies from Perplexity
  3. Decide on guest checkout based on YOUR user research

  Should we proceed?"
```

**Citation Format:**
```
Internal: [task_guides/journey_mapping.md]
External: [Perplexity AI, 2025-11-08, unverified]
External: [Perplexity AI, 2025-11-08, ✓ verified by user]
```

### 4.3 Verifying External Knowledge

**User Interaction:**
```
User: "That Perplexity stat about 65% abandonment looks accurate,
       I've seen similar in our analytics"

Sophie:
  [Updates external_knowledge: is_verified = true]

  "✓ Marked as verified. I'll now treat this with higher confidence
   when making recommendations for your checkout flow.

   Updated confidence: MEDIUM → HIGH

   Would you like me to find other unverified external knowledge
   in this project for you to review?"
```

### 4.4 Conflict Resolution

**Automatic Detection:**
```
Sophie (during response generation):
  [Queries internal_knowledge for "guest checkout"]
  [Queries external_knowledge for "guest checkout"]
  [Compares recommendations]
  [Detects contradiction]
  [Creates knowledge_conflicts entry]
  [Surfaces to user]
```

**User-Driven Resolution:**
```
User: "Show me conflicts between your guides and the Perplexity research"

Sophie:
  "Found 3 conflicts:

  1. **Guest Checkout**
     - My guide: Recommend always
     - Perplexity: Mixed results, context-dependent
     - Resolution: ?

  2. **Number of Steps**
     - My guide: 4-5 steps acceptable
     - Perplexity: 3 steps max (best-in-class)
     - Resolution: ?

  3. **Form Field Count**
     - My guide: Minimize to essential
     - Perplexity: 7 fields max (data from case studies)
     - Resolution: ?

  How would you like to resolve these?
  a) Trust Perplexity (external research)
  b) Trust my methodology (internal)
  c) Case-by-case (you decide for each)
  d) Merge (combine both perspectives)"
```

### 4.5 Cross-Project Learning (Optional)

**Searching Across External Knowledge:**
```
User: "Did I research checkout patterns in any other project?"

Sophie:
  [Searches external_knowledge across ALL projects]

  "Yes, in 'E-commerce Redesign' project (3 months ago),
   you uploaded Perplexity research on checkout optimization.

   Key findings from that research:
   - Mobile checkout requires different flow than desktop
   - Autofill increases completion by 30%
   - Progress indicators reduce abandonment

   Should I reference that research for your current 'Mobile Checkout'
   project?"
```

---

## 5. Integration with Existing Architecture

### 5.1 Orchestration Engine Integration

**Updated Workflow Step 1: Context Awareness**

```
Step 1: Context Awareness (Enhanced)
├─ Load active project from Project Registry
├─ Retrieve project files from Project Memory
├─ Retrieve external knowledge from External Knowledge tier ← NEW
│  ├─ Check for uploaded external sources
│  ├─ Load verified external knowledge (high priority)
│  ├─ Load unverified external knowledge (lower priority)
│  └─ Flag conflicts if any
└─ Extract goals, constraints, terminology
```

**Context Window Prioritization:**
```
Priority for LLM Context:
1. Current user message (always)
2. Project context (uploaded project files) (high)
3. Agent persona + operating procedures (high)
4. Task methodology (internal) (high)
5. Verified external knowledge (medium-high)
6. Recent conversation (medium)
7. Unverified external knowledge (medium-low)
8. Historical conversation (low, on-demand)
```

### 5.2 Knowledge Base Service Integration

**Enhanced API:**
```typescript
class KnowledgeBase {
  // Existing methods
  loadGuide(filename: string): string;
  loadMaterial(filename: string): string;
  semanticSearch(query: string, topK: number): SearchResult[];

  // New methods for external knowledge
  loadExternalKnowledge(projectId: string): ExternalSource[];
  searchExternalKnowledge(projectId: string, query: string): ExternalKnowledge[];
  detectConflicts(
    projectId: string,
    internalSource: string,
    externalQuery: string
  ): Conflict[];
  verifyExternalKnowledge(knowledgeId: number): void;
  annotateExternalKnowledge(knowledgeId: number, annotation: Annotation): void;
}

interface ExternalSource {
  id: string;
  sourceName: string;
  sourceType: string;
  uploadedAt: string;
  description: string;
  chunks: ExternalKnowledge[];
}

interface ExternalKnowledge {
  id: number;
  content: string;
  tags: string[];
  confidence: 'high' | 'medium' | 'low' | 'unverified';
  isVerified: boolean;
  source: ExternalSource;
}

interface Conflict {
  externalKnowledge: ExternalKnowledge;
  internalSource: string;
  conflictType: 'contradiction' | 'missing_context' | 'outdated';
  description: string;
}
```

### 5.3 Response Synthesis Enhancement

**Updated Step 6: Response Generation**

```
Step 6: Contextualized Response Synthesis (Enhanced)
├─ Construct LLM prompt:
│  ├─ System: Agent persona + operating procedures + instructions
│  ├─ Context:
│  │   ├─ Project files (user-uploaded)
│  │   ├─ Task methodology (internal)
│  │   ├─ External knowledge (with source attribution) ← NEW
│  │   ├─ Conversation history
│  │   └─ User preferences
│  └─ User: Current message
│
├─ Include citation requirements in system prompt:
│  "When referencing external knowledge, ALWAYS cite:
│   [Source Name, Date, Verified/Unverified]
│
│   When conflicts exist between internal and external, ALWAYS:
│   - Present both perspectives
│   - Note the conflict
│   - Ask user preference or provide recommendation with reasoning"
│
└─ Call AI Provider with enhanced context
```

**Example Prompt Injection:**
```
System: You are Sophie, a Strategy Analyst...

External Knowledge Available:
- [Perplexity AI, 2025-11-08, VERIFIED] Research on mobile checkout patterns
  Contains: 8 case studies, 12 best practices, cart abandonment data

- [Claude Sonnet 4, 2025-11-05, UNVERIFIED] Brainstorm on checkout optimization
  Contains: 15 potential features, 5 quick wins

IMPORTANT: When citing external knowledge, use format:
[Source, Date, Verification Status]

CONFLICT DETECTED:
- Internal guide recommends guest checkout always
- Perplexity research shows mixed results
→ Present both, ask user or provide nuanced recommendation

User: How should I design the checkout flow?
```

---

## 6. User Experience Patterns

### 6.1 Transparency in Sources

**Good Response Pattern:**
```
Sophie: "For your checkout redesign, I have guidance from multiple sources:

**My Methodology** [task_guides/journey_mapping.md]:
→ Always prioritize guest checkout
→ Minimize form fields to essentials
→ Use progressive disclosure

**Perplexity Research** [2025-11-08, ✓ verified]:
→ Guest checkout shows mixed results (context-dependent)
→ Best performers use ≤3 steps
→ 65% abandon at shipping step

**Recommendation**:
Let's map YOUR user journey first, then decide on guest checkout
based on your specific users (B2B vs B2C, repeat vs one-time, etc.).

The Perplexity data suggests context matters more than blanket rules."
```

**Bad Response Pattern:**
```
❌ "Guest checkout reduces abandonment by 30%."
   [Unclear: Is this from Sophie's methodology or external source?]

❌ "Research shows 3 steps is optimal."
   [Unclear: Which research? When? Verified?]
```

### 6.2 Conflict Communication

**Pattern: Surface, Explain, Offer Resolution**
```
Sophie: "⚠️ I found a conflict:

**Question**: Should we include guest checkout?

**My Methodology says**: Yes, always offer guest checkout
- Reduces friction
- Improves conversion
- Standard best practice

**Your Perplexity Research says**: It depends
- Works well for B2C retail (40% improvement)
- Works poorly for B2B (users expect accounts)
- Mixed for subscription services

**For your project** (B2B SaaS checkout):
I'd lean toward the Perplexity research here. Your users likely
expect accounts for billing history, subscription management, etc.

**Recommendation**: Skip guest checkout, but streamline account creation
(social login, minimal fields, progress indicator).

Does this make sense for your context?"
```

### 6.3 Verification Prompts

**Pattern: Gradual Verification**
```
Sophie: "I noticed you uploaded Perplexity research 3 days ago
but haven't verified it yet.

Based on our conversations, you've referenced the '65% abandonment'
stat multiple times, which suggests you trust it.

Should I mark that specific finding as verified?
(This helps me prioritize it in future recommendations)"
```

---

## 7. Advanced Features

### 7.1 Source Confidence Scoring

**Automatic Confidence Assignment:**
```
Source Type → Initial Confidence
- Perplexity AI → MEDIUM (AI-generated, needs verification)
- Claude/GPT output → MEDIUM
- Academic paper → HIGH (if user uploads)
- Industry report → MEDIUM-HIGH
- Blog post → LOW
- User's own research → HIGH (user-generated = trusted)
```

**Confidence Upgrade Path:**
```
UNVERIFIED → (user marks verified) → VERIFIED
MEDIUM → (user validates) → HIGH
LOW → (user annotates as accurate) → MEDIUM
```

### 7.2 Conflict Auto-Resolution

**Simple Conflicts (Auto-Resolve):**
```
If external knowledge is:
  - More recent than internal guide, AND
  - Verified by user, AND
  - Not contradicting core methodology

→ Auto-prioritize external
→ Log the decision
→ Notify user
```

**Complex Conflicts (User Resolution Required):**
```
If:
  - Direct contradiction, OR
  - Unverified external source, OR
  - Core methodology conflict

→ Surface to user
→ Present both sides
→ Ask for resolution
→ Store decision for future
```

### 7.3 External Knowledge Expiry

**Optional: Time-Based Confidence Decay**
```sql
-- Add to external_knowledge table
ALTER TABLE external_knowledge ADD COLUMN expires_at TEXT;
ALTER TABLE external_knowledge ADD COLUMN last_validated TEXT;

-- Decay logic
IF external_knowledge.confidence = 'HIGH' AND
   (current_date - last_validated) > 180 days
THEN
  confidence = 'MEDIUM'
  notify_user("External knowledge may be outdated, please review")
END IF
```

---

## 8. Implementation Phases

### Phase 1: Foundation (Must-Have)
- ✓ Database schema (external_sources, external_knowledge tables)
- ✓ File upload detection
- ✓ Content chunking
- ✓ Basic storage and retrieval
- ✓ Simple citation in responses

### Phase 2: Intelligence (Should-Have)
- ✓ Conflict detection (automatic)
- ✓ Verification workflow
- ✓ Confidence scoring
- ✓ Source attribution in all responses
- ✓ User annotation system

### Phase 3: Advanced (Nice-to-Have)
- ✓ Semantic search (embeddings)
- ✓ Cross-project external knowledge search
- ✓ Auto-resolution of simple conflicts
- ✓ Time-based confidence decay
- ✓ Source trust levels (per source type)
- ✓ Bulk verification UI

---

## 9. Five Cornerstones Alignment

| Cornerstone | How External Knowledge Supports It |
|-------------|-------------------------------------|
| **Configurability** | Users configure trust levels per source, verification requirements, auto-resolution rules |
| **Modularity** | Clean separation: external knowledge tier is isolated from internal methodology |
| **Extensibility** | Easy to add new source types (GPT-4, Gemini research, academic papers, custom tools) |
| **Integration** | Seamlessly integrates with existing memory architecture, no disruption to core workflows |
| **Automation** | Auto-detection of sources, auto-tagging, automatic conflict detection, provenance tracking |

---

## 10. Example Workflow (End-to-End)

```
DAY 1:
User: "I'm researching mobile checkout patterns"
      [Uses Perplexity AI externally]
      [Gets comprehensive research doc]

User: "Here's what I found" [uploads to Sophie]

Sophie: ✓ Processed as external knowledge from Perplexity
        - 8 case studies stored
        - 3 conflicts detected with my guides
        - Ready to reference

DAY 2:
User: "How should I design the checkout?"

Sophie: [Presents internal + external perspectives]
        [Surfaces conflicts]
        [Makes contextual recommendation]

User: "That 65% stat looks right based on our data"

Sophie: ✓ Marked as verified
        ✓ Upgraded confidence: MEDIUM → HIGH

DAY 5:
User: "What were the key findings from that research again?"

Sophie: [Retrieves from external_knowledge]
        [Shows verified vs unverified items]

DAY 30:
User: [Starts new project: "Desktop Checkout Redesign"]

User: "Did I research checkout before?"

Sophie: Yes! In "Mobile Checkout" project, you have:
        - Perplexity research (✓ verified, 8 case studies)
        - Would you like to reference it for desktop?
```

---

## 11. Technical Considerations

### Storage Efficiency

**Chunking Strategy:**
```
Chunk Size: 500-1000 words
Overlap: 100 words (for context continuity)
Max Chunks per Source: 1000 (for very large docs)

Estimate:
- Typical Perplexity research: 3000 words → ~4 chunks
- Storage per chunk: ~2KB text + ~1KB embeddings = 3KB
- Total: ~12KB per source
- 100 sources = ~1.2MB (very manageable)
```

### Query Performance

**Indexes:**
```sql
-- Fast project lookup: O(log n)
CREATE INDEX idx_ext_knowledge_project ON external_knowledge(project_id);

-- Fast source lookup: O(log n)
CREATE INDEX idx_ext_knowledge_source ON external_knowledge(source_id);

-- Full-text search: O(log n) with FTS5
CREATE VIRTUAL TABLE external_knowledge_fts...

Expected query time for typical project: <10ms
```

### Embedding Generation (Optional)

**If implementing semantic search:**
```
Option 1: Provider API
- Use Claude/Gemini API for embeddings
- Pro: High quality
- Con: API dependency (but OAuth, so acceptable)

Option 2: Local model (sentence-transformers)
- Use lightweight BERT model
- Pro: Offline, fast, no API
- Con: Requires ~500MB model file

Recommendation: Start without embeddings (keyword + FTS5),
                add if semantic search proves valuable
```

---

## 12. Security & Privacy

### Data Ownership

**Principle**: User owns all external knowledge.

**Implementation:**
```
- External knowledge stored locally (SQLite)
- Never synced to cloud without explicit user consent
- Export capability (JSON, Markdown)
- Delete capability (per-source or all)
- Clear provenance tracking
```

### Source Authentication

**Future Enhancement:**
```
Track HOW external knowledge was generated:
- Perplexity query used
- Date/time generated
- API version
- User who uploaded

This prevents:
- Misattribution
- Confusion about currency
- Trust issues
```

---

## 13. Open Questions

**For Implementation:**
1. Should embeddings be MVP or Phase 2?
2. How aggressive should conflict detection be?
3. Should we auto-verify from trusted sources (e.g., academic papers)?
4. What's the UX for bulk verification? (verify all from source X)
5. Cross-project external knowledge: opt-in or default?

**For User Experience:**
1. How prominently should conflicts be surfaced?
2. Should Sophie proactively suggest verifying external knowledge?
3. Should verification be per-chunk or per-source?
4. How to handle partially correct external knowledge?

---

## 14. Success Metrics

**We'll know this works when:**

**Quantitative:**
- ✓ 100% of external knowledge has source attribution
- ✓ Conflicts detected with >90% accuracy
- ✓ User verification rate >50% for referenced external knowledge
- ✓ Zero instances of conflating internal vs external sources

**Qualitative:**
- ✓ Users report clarity on "what Sophie knows" vs "what research says"
- ✓ Users trust Sophie more because of transparency
- ✓ Users actively leverage multi-AI workflows (Sophie + Perplexity + etc.)
- ✓ Conflicts lead to better decisions (users appreciate both perspectives)

---

## 15. Conclusion

The External Knowledge tier transforms Sophie from a solo expert into a **collaborative research partner** that can:

✓ Integrate knowledge from multiple AI tools
✓ Maintain clear source attribution
✓ Surface conflicts transparently
✓ Adapt recommendations based on verified external research
✓ Support sophisticated multi-AI workflows

This aligns perfectly with the user's real-world collaboration pattern:
**User + Sophie + Claude Code + Perplexity AI + other agents = Synergy**

**Implementation Priority:** Phase 2-3 (after core CLI is stable, before Web UI)

---

*End of External Knowledge Integration Design*
