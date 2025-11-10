# Product Design Agent: Feature Matrix

**Date:** 2025-11-10
**Purpose:** Comparison of current vs. desired capabilities

---

## 1. Core Capabilities Comparison

| Feature | Current (Claude Desktop/Gemini Gems) | Desired (CLI Implementation) | Status |
|---------|--------------------------------------|------------------------------|--------|
| **Natural Language Conversation** | ✓ Full support | ✓ Full support | **PRESERVE** |
| **Agent Personas (12 specialized)** | ✓ Via instructions.md | ✓ Via agents.yaml | **PRESERVE** |
| **Task Library (80+)** | ✓ Via tasks.yaml | ✓ Via tasks.yaml | **PRESERVE** |
| **Just-In-Time Knowledge Loading** | ✓ Smart loading | ✓ Enhanced with semantic search | **ENHANCE** |
| **Bilingual Support (EN/ES)** | ✓ Seamless | ✓ Seamless | **PRESERVE** |
| **Project Context Awareness** | ✓ Via uploaded files | ✓ Persistent project memory | **ENHANCE** |
| **User Preferences** | ✓ Optional file | ✓ Persistent per-project | **ENHANCE** |
| **Validation Loop** | ✓ Via prompt instructions | ✓ Programmatic + LLM | **ENHANCE** |
| **Error Handling** | ✓ Graceful degradation | ✓ Enhanced with memory | **ENHANCE** |

---

## 2. Memory & Persistence

| Feature | Current | Desired | Impact |
|---------|---------|---------|--------|
| **Conversation History** | ✗ None (resets each session) | ✓ Full persistent history | **HIGH** |
| **Process Memory** | ✗ No memory of "why" | ✓ Decision rationale tracking | **HIGH** |
| **Project Context** | △ Per-session only | ✓ Persistent across sessions | **HIGH** |
| **Multi-Project Support** | ✗ Single context only | ✓ Unlimited isolated projects | **HIGH** |
| **Project Switching** | ✗ N/A | ✓ Natural language switching | **HIGH** |
| **Searchable History** | ✗ N/A | ✓ Semantic + keyword search | **MEDIUM** |
| **Decision Tracking** | ✗ None | ✓ Decisions + rationale stored | **HIGH** |
| **File Persistence** | △ Re-upload each session | ✓ Stored per-project | **MEDIUM** |

**Impact Key:**
- **HIGH:** Fundamental improvement to user experience
- **MEDIUM:** Valuable enhancement
- **LOW:** Nice-to-have

---

## 3. Platform Independence

| Feature | Current | Desired | Benefit |
|---------|---------|---------|---------|
| **Platform Dependency** | ✗ Requires Claude Pro/Gemini Premium | ✓ Works with OAuth CLI | Independence |
| **Session Limits** | ✗ 3-4 exchanges (Claude Desktop) | ✓ No artificial limits | Continuity |
| **File Upload Limits** | ✗ 5 files max (Gemini Gems) | ✓ Unlimited | Flexibility |
| **Context Window Control** | ✗ Platform-controlled | ✓ Self-managed | Efficiency |
| **Provider Lock-in** | ✗ Tied to platform | ✓ Provider-agnostic | Flexibility |
| **Offline Capability** | ✗ None | △ Partial (memory/search) | Resilience |
| **Update Control** | ✗ Platform updates break things | ✓ Self-contained | Stability |

---

## 4. Knowledge Management

| Feature | Current | Desired | Enhancement |
|---------|---------|---------|-------------|
| **Task Matching** | ✓ Keyword-based | ✓ Keyword + semantic | Better accuracy |
| **Confidence Scoring** | ✓ Implicit | ✓ Explicit + transparent | Trust building |
| **Guide Loading** | ✓ On-demand | ✓ On-demand + caching | Performance |
| **Semantic Search** | ✗ None | ✓ Embeddings-based | Find related content |
| **Knowledge Updates** | △ Manual file updates | ✓ Version-controlled | Maintainability |
| **Custom Guides** | △ Requires fork/edit | ✓ User-extensible | Flexibility |

---

## 5. User Experience

| Feature | Current | Desired | Improvement |
|---------|---------|---------|-------------|
| **Conversation Style** | ✓ Natural, collaborative | ✓ Natural, collaborative | **PRESERVE** |
| **Proactive Guidance** | ✓ Via error handling | ✓ Enhanced with memory | Smarter redirection |
| **Transparency** | ✓ Limitations noted | ✓ Enhanced with confidence | More trust |
| **Personalization** | △ Per-session only | ✓ Persistent preferences | Better fit |
| **Context Switching** | ✗ Manual re-explanation | ✓ Automatic project recall | Less friction |
| **Response Time** | △ Varies by platform | △ Depends on provider | Similar |
| **Interruption Handling** | △ Limited | ✓ Can cancel/interrupt | Better control |
| **Session Continuity** | ✗ Resets | ✓ Resumes where left off | Major improvement |

---

## 6. Extensibility & Maintenance

| Feature | Current | Desired | Advantage |
|---------|---------|---------|-----------|
| **Add New Task** | ✓ Edit YAML + add guide | ✓ Same, but auto-indexed | Easy |
| **Add New Agent** | ✓ Edit agents.yaml | ✓ Same | Easy |
| **Add New Provider** | ✗ Not possible | ✓ Implement interface | Future-proof |
| **Custom Knowledge** | △ Fork repo | ✓ Plugin system (future) | User empowerment |
| **Version Control** | ✓ Files in git | ✓ Files in git | **PRESERVE** |
| **Collaboration** | △ Share via repo | ✓ Export/import projects | Team usage |
| **Backup** | ✗ Manual file saves | ✓ Single DB file | Simple |
| **Testing** | △ Manual only | ✓ Automated tests | Quality |

---

## 7. Technical Architecture

| Aspect | Current | Desired | Technical Benefit |
|--------|---------|---------|-------------------|
| **Deployment** | ✗ Platform-dependent | ✓ Single binary | Easy distribution |
| **Dependencies** | ✗ Platform-managed | ✓ Self-contained | No dependency hell |
| **Storage** | ✗ Platform ephemeral | ✓ SQLite embedded | Data ownership |
| **AI Access** | ✗ Platform API | ✓ OAuth CLI | No API keys |
| **Context Management** | △ Platform-controlled | ✓ Self-managed | Efficiency |
| **Streaming** | ✓ Platform-provided | ✓ subprocess stdout | Similar UX |
| **Security** | △ Platform-handled | ✓ Permission-based | Controlled |
| **Performance** | △ Platform-dependent | ✓ Optimized | Faster startup |

---

## 8. Feature Priority Matrix

### Must-Have (Phase 1)
**These are critical for minimum viable transformation:**
- ✓ Natural language conversation (preserve soul)
- ✓ Agent persona system (preserve expertise)
- ✓ Task matching (preserve intelligence)
- ✓ Basic project memory (add persistence)
- ✓ Claude Code CLI integration (OAuth provider)
- ✓ Single project support (foundation)

### Should-Have (Phase 2)
**Important for full functionality:**
- ✓ Multi-project support
- ✓ Conversation history & search
- ✓ Decision tracking (process memory)
- ✓ Gemini CLI integration
- ✓ Project switching
- ✓ File persistence

### Nice-to-Have (Phase 3)
**Enhancements for polish:**
- ✓ Semantic search (embeddings)
- ✓ Cross-project learning
- ✓ Advanced context optimization
- ✓ Web UI foundation
- ✓ Voice interface prep
- ✓ Plugin system

---

## 9. Migration Path

### What Transfers Directly
**No changes needed:**
- `config/agents.yaml` - 12 agent definitions
- `config/tasks.yaml` - 80+ task definitions
- `knowledge/task_guides/` - 64 methodology guides
- `knowledge/materials/` - 11 template/data files
- Core behavioral patterns (validation, error handling, etc.)

### What Needs Transformation
**Requires implementation:**
- `assets/instructions.md` → Orchestration Engine (code)
- Context awareness → Memory Layer (SQLite)
- LLM access → Provider Adapter (CLI subprocess)
- Conversation flow → Workflow Orchestrator (code)
- Validation loop → Programmatic checks + LLM

### What Gets Added
**New capabilities:**
- Project Registry (new)
- Conversation storage (new)
- Decision tracking (new)
- Multi-project management (new)
- Semantic search index (new, optional)
- Provider abstraction (new)

---

## 10. Risk Assessment

### Low Risk (Preserve Existing)
| Feature | Risk | Mitigation |
|---------|------|------------|
| Agent personas | Configuration remains unchanged | Direct YAML loading |
| Task definitions | Configuration remains unchanged | Direct YAML loading |
| Knowledge guides | Files remain unchanged | Direct file reading |
| Bilingual support | LLM capability | System prompts preserve behavior |
| Natural conversation | LLM capability | Prompt engineering maintains tone |

### Medium Risk (Enhance Existing)
| Feature | Risk | Mitigation |
|---------|------|------------|
| Task matching | Semantic search may not improve accuracy | Fallback to keyword matching |
| Context management | Window optimization may be complex | Start simple, iterate |
| Validation loop | Programmatic checks may miss nuances | Hybrid approach (code + LLM) |
| Provider abstraction | CLI changes break adapter | Versioning, error handling |

### High Risk (New Capabilities)
| Feature | Risk | Mitigation |
|---------|------|------------|
| Memory architecture | Complexity, potential bugs | Thorough testing, incremental rollout |
| Multi-project | State management complexity | Clear boundaries, automated tests |
| Provider reliability | CLI subprocess failures | Retry logic, graceful degradation |
| Performance | Slow startup/response | Profiling, optimization, caching |

---

## 11. Success Metrics

### Quantitative
- **Session continuity:** 100% of conversations resume after restart
- **Memory accuracy:** 95%+ decision recall accuracy
- **Response time:** <2s for task matching + context loading
- **Uptime:** 99%+ successful LLM provider calls
- **Data integrity:** Zero data loss in SQLite operations

### Qualitative
- **"Feels the same":** Users report conversational UX unchanged
- **"Remembers me":** Users report agent recalls past decisions
- **"More reliable":** Users report fewer session limit issues
- **"Easier to use":** Users prefer CLI over web platform
- **"Trustworthy":** Users report confidence in memory accuracy

### User Feedback Criteria
**We've succeeded when users say:**
- "It feels just like talking to the old agent"
- "It remembers our conversation from last week!"
- "I don't have to re-explain my project every time"
- "Switching between projects is seamless"
- "I trust it with my project context"

---

## 12. Open Questions & Future Considerations

### Short-Term (Pre-Implementation)
- [ ] Exact Deno SQLite library to use?
- [ ] Embedding model selection (if implementing)?
- [ ] Claude Code CLI command format verification?
- [ ] Gemini CLI command format verification?
- [ ] Max conversation history to keep in context?

### Medium-Term (During Implementation)
- [ ] How much personality difference between agent personas?
- [ ] Proactive suggestions frequency?
- [ ] Cross-project learning scope?
- [ ] Conversation threading (linear vs. branching)?
- [ ] Export/import format for projects?

### Long-Term (Post-Launch)
- [ ] Web UI architecture decisions
- [ ] Real-time collaboration (multi-user)?
- [ ] Voice interface design
- [ ] Additional AI provider support (OpenAI, local models)?
- [ ] Plugin system design
- [ ] Marketplace for custom tasks/guides?

---

## 13. Comparison Summary

### Current Strengths (Preserve)
✓ Natural, collaborative conversation
✓ 12 specialized agent personas
✓ 80+ task methodologies with 15K+ lines of knowledge
✓ Smart just-in-time knowledge loading
✓ Bilingual support (EN/ES)
✓ Validation-driven quality control
✓ Graceful error handling
✓ Project context awareness (within session)

### Current Weaknesses (Fix)
✗ No persistent memory (conversation/decisions)
✗ No multi-project support
✗ Platform-dependent (Claude Desktop/Gemini Gems)
✗ Session limits (3-4 exchanges)
✗ File upload constraints
✗ No conversation continuity
✗ Context resets every session

### Desired Future State (Achieve)
**Same soul + Better memory + More independence**
- ✓ Preserve all current strengths
- ✓ Add three-tier memory architecture
- ✓ Enable multi-project workflows
- ✓ Run via OAuth CLI (no API keys)
- ✓ No platform constraints
- ✓ Conversation continuity
- ✓ Semantic search enhancements
- ✓ Foundation for Web UI future

---

*End of Feature Matrix Document*
