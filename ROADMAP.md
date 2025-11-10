# Sophie Development Roadmap

> **Clear path from current state to production-ready Sophie**

---

## Current Status

**📍 We Are Here: Phase 0**

✅ **Foundation Complete:**
- Repository transformed (archive created, branches structured)
- AI-first development methodology documented
- Five Cornerstones framework established
- Validation framework with GitHub Actions
- Branch protection and git workflow defined
- Cost: $0/month

⏳ **Phase 0 In Progress:**
- Deno prototype started (incomplete)
- Go prototype not started
- Technology decision pending

---

## Phase 0: Technology Validation (2-6 days)

**Goal:** Choose technology stack (Deno vs Go)

**Deliverables:**
- [ ] Working Deno prototype (CLI, YAML, SQLite, subprocess)
- [ ] Working Go prototype (same scope)
- [ ] Comparison document (Five Cornerstones scores)
- [ ] Technology decision documented

**Timeline:** 2-6 days maximum (don't overthink, just validate)

**Success Criteria:**
- Both prototypes demonstrate core capabilities
- Clear winner based on Five Cornerstones evaluation
- Decision documented with rationale

---

## Phase 1: Foundation (Weeks 1-2)

**Goal:** Basic CLI works, loads config, accepts input

**Deliverables:**
- [ ] Project structure in chosen technology
- [ ] YAML config loader (agents.yaml, tasks.yaml)
- [ ] CLI REPL (read input, display output)
- [ ] Basic conversation loop
- [ ] Test with simple echoing

**Technologies:**
- Chosen tech from Phase 0 (Deno or Go)
- SQLite (embedded)
- YAML parsing library

**Success Criteria:**
- `sophie` command runs
- Loads configs successfully
- Accepts user input
- Displays responses
- No crashes on basic usage

---

## Phase 2: Orchestration (Weeks 3-4)

**Goal:** Task matching works, knowledge loading works

**Deliverables:**
- [ ] Workflow Orchestrator (8-step process)
- [ ] Task Matching with keyword search
- [ ] Confidence scoring (HIGH/MEDIUM/LOW)
- [ ] Agent Selection based on task
- [ ] Knowledge Loading (just-in-time from Markdown files)
- [ ] End-to-end test with single task

**Key Components:**
- Intent extraction
- Task matcher
- Knowledge file loader
- Agent persona loader

**Success Criteria:**
- User says "I need to plan a usability test"
- System matches task correctly
- Loads relevant knowledge guide
- Selects appropriate agent
- Provides contextual response

---

## Phase 3: AI Integration (Week 5)

**Goal:** Actual AI responses, not hardcoded

**Deliverables:**
- [ ] Claude Code CLI Adapter
- [ ] Gemini CLI Adapter (via OAuth)
- [ ] Provider abstraction interface
- [ ] Response generation with context
- [ ] Streaming support (if possible)

**Technologies:**
- Claude Code CLI (subprocess)
- Gemini CLI (subprocess)
- Provider interface pattern

**Success Criteria:**
- Can swap between Claude and Gemini
- Responses are actually from LLM
- Context properly injected
- No API keys needed (OAuth only)

---

## Phase 4: Memory Layer (Weeks 6-7)

**Goal:** Conversations persist, multi-project works

**Deliverables:**
- [ ] SQLite database schema
- [ ] Project Registry (multi-project support)
- [ ] Project Memory (conversations, context)
- [ ] Agent Memory (in-session state)
- [ ] Project creation/switching
- [ ] Conversation history retrieval

**Schema:**
```sql
-- Projects
CREATE TABLE projects (
  id TEXT PRIMARY KEY,
  name TEXT,
  description TEXT,
  created_at TEXT,
  last_accessed TEXT
);

-- Conversations
CREATE TABLE conversations (
  id INTEGER PRIMARY KEY,
  project_id TEXT,
  timestamp TEXT,
  role TEXT,  -- 'user' or 'assistant'
  message TEXT,
  task_id TEXT,
  agent_id TEXT,
  FOREIGN KEY (project_id) REFERENCES projects(id)
);

-- User preferences
CREATE TABLE user_preferences (
  key TEXT PRIMARY KEY,
  value TEXT
);
```

**Success Criteria:**
- Create multiple projects
- Switch between projects
- Each project has isolated conversations
- History persists across sessions
- Can search past conversations

---

## Phase 5: Enhanced Features (Weeks 8-9)

**Goal:** Polish, validation, search, external knowledge

**Deliverables:**
- [ ] Conversation search (keyword, date range)
- [ ] Validation loop (10-point checklist)
- [ ] Error handling patterns
- [ ] External knowledge tier (4th tier)
- [ ] Embeddings for semantic search (optional)
- [ ] Context window management

**Key Features:**
- Full-text search in conversations
- Sophie validates its own responses before delivery
- External AI research integration (Perplexity, etc.)
- Smart context pruning

**Success Criteria:**
- Can find past conversations by keyword
- Sophie catches its own mistakes
- Can import Perplexity research
- Handles long conversations gracefully

---

## Phase 6: Polish & Distribution (Week 10)

**Goal:** Production-ready, distributable

**Deliverables:**
- [ ] User testing with real projects
- [ ] Performance optimization
- [ ] Error messages improved
- [ ] Complete documentation
- [ ] Build & distribution setup
- [ ] Installation instructions
- [ ] First stable release (v1.0.0)

**Distribution:**
- Single binary compilation
- Simple installation process
- Cross-platform (Linux, macOS, Windows)
- GitHub releases

**Success Criteria:**
- Non-technical user can install
- Performance acceptable (< 2s response time)
- No crashes in normal usage
- Documentation complete
- v1.0.0 tagged and released

---

## Beyond v1.0.0 (Future)

**Potential Enhancements:**
- Web UI (streaming chat, file management, voice)
- Plugin system (extensibility)
- Team collaboration features
- More AI providers (Anthropic API, OpenAI, local models)
- Advanced analytics
- Export/import capabilities

**Not in initial scope** - these come after v1.0.0 is stable and adopted

---

## Timeline Summary

```
Phase 0:  2-6 days    (Technology validation)
Phase 1:  2 weeks     (Foundation)
Phase 2:  2 weeks     (Orchestration)
Phase 3:  1 week      (AI integration)
Phase 4:  2 weeks     (Memory layer)
Phase 5:  2 weeks     (Enhancements)
Phase 6:  1 week      (Polish & release)

Total:    ~10 weeks from start to v1.0.0
```

**Actual timeline will vary** based on:
- Technology chosen (Deno likely faster)
- Issues discovered
- User feedback iterations
- Scope adjustments

---

## Decision Points

**Phase 0 → Phase 1:**
- Technology chosen (Deno or Go)
- Prototype validated

**Phase 1 → Phase 2:**
- Basic CLI working
- Config loading validated

**Phase 2 → Phase 3:**
- Task matching working
- Knowledge loading validated

**Phase 3 → Phase 4:**
- AI integration working
- Both providers functional

**Phase 4 → Phase 5:**
- Multi-project working
- Memory persistence validated

**Phase 5 → Phase 6:**
- All features working
- User testing complete

**Phase 6 → v1.0.0:**
- No critical bugs
- Documentation complete
- Distribution tested

---

## Success Metrics

**Phase 0 Success:**
- Technology decision made with confidence
- Prototypes demonstrate feasibility

**v1.0.0 Success:**
1. **Soul Preserved:**
   - Conversation feels natural
   - Agent proactively guides
   - Trust and transparency maintained

2. **Memory Works:**
   - Remembers past decisions
   - Multi-project support
   - Search works

3. **Independence Achieved:**
   - No platform lock-in
   - OAuth only (no API keys)
   - Single binary distribution

4. **User Experience:**
   - Non-technical user can use it
   - Feels like talking to a mentor
   - No manual steps

---

## Current Next Steps

**Immediate (This Session or Next):**
1. Complete Deno prototype
2. Test Deno prototype works
3. Document Deno findings

**Then:**
4. Build Go prototype
5. Compare both
6. Make technology decision
7. Proceed to Phase 1

**Priority:** Finish Phase 0, don't start Phase 1 until decision made.

---

## How to Track Progress

**GitHub:**
- Create Milestone for each phase
- Create Issues for each deliverable
- Move issues through kanban board
- Update README with current phase

**Documentation:**
- Update this file as phases complete
- Mark checkboxes ✓ as deliverables finish
- Document decisions and learnings

**Communication:**
- User can check GitHub to see progress
- README shows current phase
- Milestones show % complete

---

**This roadmap is a living document** - update as we learn and adapt.

**Last Updated:** 2025-11-10
**Current Phase:** Phase 0 (Technology Validation)
**Next Milestone:** Technology decision
