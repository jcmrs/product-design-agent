# Database Schema Specification

> **SQLite schema for Sophie's 4-tier memory system. This specification is required for Phase 4 implementation but should be reviewed during earlier phases.**

---

## Overview

Sophie uses **SQLite** for all persistent storage with a **4-tier memory architecture**:

1. **Agent Memory** - Built-in knowledge (files, not database)
2. **Project Memory** - Conversations and decisions per project (database)
3. **Project Registry** - Cross-project metadata and preferences (database)
4. **External Knowledge** - Research from other AIs with provenance (database)

**Database File:** `sophie.db` (in user's data directory)

---

## Tier 2: Project Memory

### Table: `projects`

Stores project metadata and settings.

```sql
CREATE TABLE projects (
  project_id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  created_at INTEGER NOT NULL,  -- Unix timestamp
  updated_at INTEGER NOT NULL,  -- Unix timestamp
  last_accessed INTEGER NOT NULL,  -- Unix timestamp
  status TEXT DEFAULT 'active',  -- active|archived|deleted
  metadata JSON  -- Flexible storage for project-specific settings
);

CREATE INDEX idx_projects_updated ON projects(updated_at DESC);
CREATE INDEX idx_projects_status ON projects(status);
```

**Example:**
```json
{
  "project_id": "mobile-app-redesign-2025",
  "name": "Mobile App Redesign",
  "description": "Complete overhaul of mobile experience for Q2 2025",
  "created_at": 1710345600,
  "updated_at": 1710432000,
  "last_accessed": 1710432000,
  "status": "active",
  "metadata": {
    "language": "en",
    "domain": "mobile-commerce",
    "team_size": 5
  }
}
```

---

### Table: `conversations`

Stores all user-Sophie conversations with full context.

```sql
CREATE TABLE conversations (
  conversation_id TEXT PRIMARY KEY,
  project_id TEXT NOT NULL,
  timestamp INTEGER NOT NULL,  -- Unix timestamp
  role TEXT NOT NULL,  -- 'user' | 'sophie' | 'system'
  content TEXT NOT NULL,
  task_id TEXT,  -- Which task was matched (if applicable)
  agent_id TEXT,  -- Which agent responded (if applicable)
  confidence REAL,  -- Task matching confidence (0-1)
  metadata JSON,  -- Flexible storage for conversation context
  FOREIGN KEY (project_id) REFERENCES projects(project_id) ON DELETE CASCADE
);

CREATE INDEX idx_conversations_project ON conversations(project_id, timestamp DESC);
CREATE INDEX idx_conversations_task ON conversations(task_id);
CREATE INDEX idx_conversations_timestamp ON conversations(timestamp DESC);
```

**Example:**
```json
{
  "conversation_id": "conv-abc123",
  "project_id": "mobile-app-redesign-2025",
  "timestamp": 1710432000,
  "role": "user",
  "content": "I need help defining our product vision",
  "task_id": null,  -- Not yet matched
  "agent_id": null,
  "confidence": null,
  "metadata": {}
}
```

```json
{
  "conversation_id": "conv-abc124",
  "project_id": "mobile-app-redesign-2025",
  "timestamp": 1710432015,
  "role": "sophie",
  "content": "Let's work through the vision framework together...",
  "task_id": "product-vision-development",
  "agent_id": "strategic-thinker",
  "confidence": 0.92,
  "metadata": {
    "knowledge_guide_loaded": "product-vision-development.md",
    "response_tokens": 347
  }
}
```

---

### Table: `decisions`

Tracks explicit design decisions made during conversations.

```sql
CREATE TABLE decisions (
  decision_id TEXT PRIMARY KEY,
  project_id TEXT NOT NULL,
  conversation_id TEXT,  -- Link to conversation where decision was made
  timestamp INTEGER NOT NULL,
  category TEXT,  -- vision|research|design|strategy|etc
  decision_text TEXT NOT NULL,
  rationale TEXT,
  alternatives_considered JSON,  -- Array of alternatives discussed
  status TEXT DEFAULT 'active',  -- active|revisited|deprecated
  tags JSON,  -- Array of tags for search
  FOREIGN KEY (project_id) REFERENCES projects(project_id) ON DELETE CASCADE,
  FOREIGN KEY (conversation_id) REFERENCES conversations(conversation_id) ON DELETE SET NULL
);

CREATE INDEX idx_decisions_project ON decisions(project_id, timestamp DESC);
CREATE INDEX idx_decisions_category ON decisions(category);
CREATE INDEX idx_decisions_status ON decisions(status);
```

**Example:**
```json
{
  "decision_id": "dec-xyz789",
  "project_id": "mobile-app-redesign-2025",
  "conversation_id": "conv-abc125",
  "timestamp": 1710432100,
  "category": "vision",
  "decision_text": "Target audience is mobile-first millennial shoppers who value sustainability",
  "rationale": "Research showed 73% of our users prioritize eco-friendly options",
  "alternatives_considered": [
    "Broader audience targeting (rejected: too unfocused)",
    "Gen-Z focus (rejected: lower purchasing power for our price point)"
  ],
  "status": "active",
  "tags": ["target-audience", "sustainability", "millennials"]
}
```

---

### Table: `project_files`

Tracks files uploaded or referenced in a project context.

```sql
CREATE TABLE project_files (
  file_id TEXT PRIMARY KEY,
  project_id TEXT NOT NULL,
  filename TEXT NOT NULL,
  file_path TEXT,  -- Local path or cloud storage URL
  file_type TEXT,  -- document|image|video|data|etc
  uploaded_at INTEGER NOT NULL,
  size_bytes INTEGER,
  description TEXT,
  metadata JSON,  -- Flexible storage for file-specific data
  FOREIGN KEY (project_id) REFERENCES projects(project_id) ON DELETE CASCADE
);

CREATE INDEX idx_project_files_project ON project_files(project_id);
CREATE INDEX idx_project_files_type ON project_files(file_type);
```

---

## Tier 3: Project Registry

### Table: `user_preferences`

Stores cross-project user preferences and settings.

```sql
CREATE TABLE user_preferences (
  preference_key TEXT PRIMARY KEY,
  preference_value TEXT NOT NULL,
  updated_at INTEGER NOT NULL,
  description TEXT
);

CREATE INDEX idx_preferences_updated ON user_preferences(updated_at DESC);
```

**Example Preferences:**
```sql
INSERT INTO user_preferences VALUES
  ('language', 'en', 1710345600, 'Preferred language (en|es)'),
  ('default_confidence_threshold', '0.7', 1710345600, 'Default task matching confidence'),
  ('last_active_project', 'mobile-app-redesign-2025', 1710432000, 'Most recently accessed project'),
  ('conversation_history_limit', '50', 1710345600, 'Number of messages to load in context'),
  ('auto_save_decisions', 'true', 1710345600, 'Automatically extract and save decisions');
```

---

### Table: `cross_project_insights`

Stores patterns and learnings that apply across multiple projects.

```sql
CREATE TABLE cross_project_insights (
  insight_id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  source_projects JSON,  -- Array of project_ids where this was learned
  created_at INTEGER NOT NULL,
  category TEXT,
  confidence REAL,  -- How confident we are in this insight (0-1)
  tags JSON
);

CREATE INDEX idx_insights_category ON cross_project_insights(category);
CREATE INDEX idx_insights_created ON cross_project_insights(created_at DESC);
```

**Example:**
```json
{
  "insight_id": "insight-001",
  "title": "User research phase always reveals unexpected pain points",
  "description": "Across 3 projects, formal user research uncovered issues not identified in stakeholder interviews",
  "source_projects": ["mobile-app-redesign-2025", "dashboard-v2", "checkout-flow-optimization"],
  "created_at": 1710500000,
  "category": "research",
  "confidence": 0.85,
  "tags": ["research", "user-insights", "process"]
}
```

---

## Tier 4: External Knowledge

### Table: `external_knowledge`

Stores research, insights, and content from external AI tools (Perplexity, etc.) with full provenance.

```sql
CREATE TABLE external_knowledge (
  knowledge_id TEXT PRIMARY KEY,
  project_id TEXT,  -- NULL if cross-project knowledge
  source TEXT NOT NULL,  -- 'perplexity'|'claude-code'|'gemini'|'manual'
  source_metadata JSON NOT NULL,  -- Source-specific details
  content_type TEXT NOT NULL,  -- 'research'|'analysis'|'code'|'reference'
  title TEXT NOT NULL,
  content TEXT NOT NULL,  -- The actual knowledge
  created_at INTEGER NOT NULL,
  verified BOOLEAN DEFAULT FALSE,  -- Has user verified this?
  verification_notes TEXT,
  tags JSON,
  metadata JSON,  -- Flexible storage
  FOREIGN KEY (project_id) REFERENCES projects(project_id) ON DELETE CASCADE
);

CREATE INDEX idx_external_knowledge_project ON external_knowledge(project_id);
CREATE INDEX idx_external_knowledge_source ON external_knowledge(source);
CREATE INDEX idx_external_knowledge_type ON external_knowledge(content_type);
CREATE INDEX idx_external_knowledge_created ON external_knowledge(created_at DESC);
```

**Example (Perplexity Research):**
```json
{
  "knowledge_id": "ext-perp-001",
  "project_id": "mobile-app-redesign-2025",
  "source": "perplexity",
  "source_metadata": {
    "search_query": "mobile commerce sustainability trends 2025",
    "search_date": "2025-11-08",
    "url": "https://perplexity.ai/search/abc123"
  },
  "content_type": "research",
  "title": "Mobile Commerce Sustainability Trends 2025",
  "content": "Research findings:\n1. 67% of mobile shoppers prioritize eco-friendly brands\n2. Carbon footprint transparency increases conversion by 23%\n...",
  "created_at": 1710400000,
  "verified": true,
  "verification_notes": "Validated against 3 additional sources, data is current",
  "tags": ["sustainability", "mobile-commerce", "trends", "2025"],
  "metadata": {
    "citation": "[Perplexity AI, 2025-11-08, ✓ verified]",
    "confidence": "high"
  }
}
```

---

### Table: `knowledge_conflicts`

Tracks when external knowledge conflicts with agent memory or other sources.

```sql
CREATE TABLE knowledge_conflicts (
  conflict_id TEXT PRIMARY KEY,
  knowledge_id TEXT NOT NULL,  -- External knowledge that conflicts
  conflict_type TEXT NOT NULL,  -- 'agent_memory'|'other_external'|'user_stated'
  conflicting_source TEXT NOT NULL,  -- Description of conflicting source
  detected_at INTEGER NOT NULL,
  resolution TEXT,  -- How conflict was resolved (if resolved)
  resolution_notes TEXT,
  status TEXT DEFAULT 'unresolved',  -- unresolved|resolved|accepted
  FOREIGN KEY (knowledge_id) REFERENCES external_knowledge(knowledge_id) ON DELETE CASCADE
);

CREATE INDEX idx_conflicts_knowledge ON knowledge_conflicts(knowledge_id);
CREATE INDEX idx_conflicts_status ON knowledge_conflicts(status);
```

**Example:**
```json
{
  "conflict_id": "conflict-001",
  "knowledge_id": "ext-perp-001",
  "conflict_type": "agent_memory",
  "conflicting_source": "Built-in knowledge suggests simple onboarding, but Perplexity research shows users want customization",
  "detected_at": 1710400100,
  "resolution": "User preference for customization confirmed",
  "resolution_notes": "External research more current and specific to our market",
  "status": "resolved"
}
```

---

## Supporting Tables

### Table: `process_memory`

Stores learnings and insights about the development process itself (pm-XXX entries).

```sql
CREATE TABLE process_memory (
  memory_id TEXT PRIMARY KEY,
  type TEXT NOT NULL,  -- 'lesson_learned'|'mental_model'|'strategic_decision'|etc
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  learning TEXT NOT NULL,
  created_at INTEGER NOT NULL,
  tags JSON,
  related_memories JSON  -- Array of related memory_ids
);

CREATE INDEX idx_process_memory_type ON process_memory(type);
CREATE INDEX idx_process_memory_created ON process_memory(created_at DESC);
```

---

### Table: `architecture_decisions`

Stores ADRs (Architecture Decision Records) from implementation.

```sql
CREATE TABLE architecture_decisions (
  adr_id TEXT PRIMARY KEY,  -- e.g., 'ADR-001'
  title TEXT NOT NULL,
  status TEXT NOT NULL,  -- 'proposed'|'accepted'|'superseded'
  context TEXT NOT NULL,
  decision TEXT NOT NULL,
  rationale TEXT NOT NULL,
  alternatives JSON,  -- Array of alternatives considered
  consequences JSON,  -- {positive: [], negative: [], neutral: []}
  created_at INTEGER NOT NULL,
  superseded_by TEXT,  -- adr_id that replaces this one
  tags JSON
);

CREATE INDEX idx_adr_status ON architecture_decisions(status);
CREATE INDEX idx_adr_created ON architecture_decisions(created_at DESC);
```

---

## Database Initialization

### Creation Script

```typescript
// src/memory/database.ts
import { DB } from "https://deno.land/x/sqlite/mod.ts";

export function initializeDatabase(dbPath: string): DB {
  const db = new DB(dbPath);

  // Enable foreign keys
  db.execute("PRAGMA foreign_keys = ON");

  // Create all tables
  db.execute(`
    -- Tier 2: Project Memory
    CREATE TABLE IF NOT EXISTS projects (...);
    CREATE TABLE IF NOT EXISTS conversations (...);
    CREATE TABLE IF NOT EXISTS decisions (...);
    CREATE TABLE IF NOT EXISTS project_files (...);

    -- Tier 3: Project Registry
    CREATE TABLE IF NOT EXISTS user_preferences (...);
    CREATE TABLE IF NOT EXISTS cross_project_insights (...);

    -- Tier 4: External Knowledge
    CREATE TABLE IF NOT EXISTS external_knowledge (...);
    CREATE TABLE IF NOT EXISTS knowledge_conflicts (...);

    -- Supporting
    CREATE TABLE IF NOT EXISTS process_memory (...);
    CREATE TABLE IF NOT EXISTS architecture_decisions (...);

    -- Create all indexes
    CREATE INDEX IF NOT EXISTS ...;
  `);

  // Insert default preferences
  db.execute(`
    INSERT OR IGNORE INTO user_preferences VALUES
      ('language', 'en', ?, 'Preferred language'),
      ('default_confidence_threshold', '0.7', ?, 'Task matching threshold')
  `, [Date.now(), Date.now()]);

  return db;
}
```

---

## Common Queries

### Get Recent Conversations for Project

```sql
SELECT * FROM conversations
WHERE project_id = ?
ORDER BY timestamp DESC
LIMIT 50;
```

### Search Conversations

```sql
SELECT * FROM conversations
WHERE project_id = ?
  AND content LIKE '%' || ? || '%'
ORDER BY timestamp DESC;
```

### Get Project Decisions

```sql
SELECT * FROM decisions
WHERE project_id = ?
  AND status = 'active'
ORDER BY timestamp DESC;
```

### Get External Knowledge with Provenance

```sql
SELECT
  ek.*,
  '[' || ek.source || ', ' ||
  datetime(ek.created_at, 'unixepoch') ||
  CASE WHEN ek.verified THEN ', ✓ verified' ELSE '' END ||
  ']' as citation
FROM external_knowledge ek
WHERE project_id = ?
ORDER BY created_at DESC;
```

### Check for Knowledge Conflicts

```sql
SELECT
  ek.title,
  ek.content,
  kc.conflicting_source,
  kc.resolution
FROM knowledge_conflicts kc
JOIN external_knowledge ek ON kc.knowledge_id = ek.knowledge_id
WHERE kc.status = 'unresolved'
  AND ek.project_id = ?;
```

---

## Migration Strategy

### Phase 4 Implementation:

1. **Create schema** - Run initialization script
2. **Test with sample data** - Insert test project, conversations
3. **Implement basic CRUD** - Create, read, update, delete operations
4. **Add search** - Full-text search on conversations and decisions
5. **Test multi-project** - Create multiple projects, switch between them

### Future Enhancements:

- **Full-text search** - SQLite FTS5 for conversation search
- **Embedding storage** - Add vector similarity search (Phase 5+)
- **Backup/Export** - JSON export of all project data
- **Analytics** - Query patterns, most-used tasks, etc.

---

## Data Privacy & Security

- Database file stored locally on user's machine
- No cloud sync (user must backup manually)
- Sensitive data (API keys, etc.) stored encrypted if needed (Phase 5+)
- Clear project deletion removes all associated data (CASCADE deletes)

---

**Last Updated:** 2025-11-14
**Required For:** Phase 4 (Memory Layer) implementation
**Review:** Before starting Phase 4, validate schema with user
