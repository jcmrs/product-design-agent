# ADR-001: Technology Stack Choice (Deno vs Go)

**Status:** ✅ Accepted
**Date:** 2025-11-10
**Decision Makers:** Claude (AI-first development lead) + User (Product Owner)
**Phase:** Phase 0 - Technology Validation

---

## Context

Sophie requires a technology stack for CLI implementation with specific requirements derived from the Five Cornerstones and product goals:

### Requirements

**Functional:**
- Single binary distribution (no runtime installation for users)
- YAML config loading (agents.yaml, tasks.yaml)
- SQLite persistence (4-tier memory system)
- Subprocess handling (Claude Code CLI, Gemini CLI integration)
- Natural conversation UX (REPL-based CLI)
- Cross-platform support (Linux, macOS, Windows)

**Non-Functional:**
- **Configurability:** File-driven config, environment variable support
- **Modularity:** Clean component separation, testable in isolation
- **Extensibility:** Easy to add providers, agents, tasks
- **Integration:** External CLI tool collaboration
- **Automation:** Built-in testing, formatting, linting

**Strategic:**
- Long-term maintainability (5-10 year horizon)
- Easy hiring for future team growth
- Production-grade reliability
- AI-first development velocity

### Decision Question

**Should Sophie be built with Deno (TypeScript) or Go?**

---

## Options Considered

### Option 1: Deno (TypeScript)

**Description:**
Modern JavaScript/TypeScript runtime with built-in tooling, designed for web-standard APIs.

**Implementation:**
- Single-file prototype: `prototypes/deno-poc/src/main.ts`
- Dependencies: `@std/yaml`, `@db/sqlite`
- 328 lines of TypeScript
- `deno compile` for binary distribution

**Pros:**
- ✅ **Best-in-class automation** — Built-in fmt, lint, test, coverage in one tool
- ✅ **Modern API design** — `Deno.Command`, async/await natural
- ✅ **Fast prototyping** — TypeScript, no build step, concise code
- ✅ **Strong typing** — TypeScript prevents runtime errors
- ✅ **Familiar to web developers** — JavaScript/TypeScript background

**Cons:**
- ⚠️ **Larger binaries** — 40-60MB (includes V8 engine)
- ⚠️ **Smaller ecosystem** — 6 years old, fewer libraries than Go
- ⚠️ **Harder hiring** — Deno developers less common than Go
- ⚠️ **Long-term risk** — Younger technology, less enterprise adoption
- ⚠️ **Requires refactoring** — Single-file prototype needs modularization

**Score:** 78/100 ✅ Viable

**Five Cornerstones:**
- Configurability: 8/10 (YAML, env vars, good)
- Modularity: 8/10 (needs refactoring)
- Extensibility: 7/10 (smaller ecosystem)
- Integration: 9/10 ⭐ (excellent subprocess API)
- Automation: 10/10 ⭐⭐ (best in class)

**Practical:**
- Development Experience: 16/20 (fast prototyping)
- Distribution: 12/15 (larger binaries)
- Ecosystem: 8/15 ⚠️ (younger, smaller community)

---

### Option 2: Go

**Description:**
Systems programming language designed by Google for building reliable, efficient software at scale.

**Implementation:**
- Modular structure: `config/`, `memory/`, `providers/`, `orchestration/`, `cmd/sophie/`
- Dependencies: `gopkg.in/yaml.v3`, `modernc.org/sqlite`
- ~400 lines across 6 files
- `go build` for binary distribution

**Pros:**
- ✅ **Production-grade distribution** — 8-15MB binaries, seamless cross-compilation
- ✅ **Mature ecosystem** — 15 years, every protocol/library supported
- ✅ **Easy hiring** — Go developers common, gentlelearning curve
- ✅ **Long-term viability** — Google backing, backward compatibility guarantee
- ✅ **Production-ready modularity** — Package structure needs no refactoring
- ✅ **Proven at scale** — Docker, Kubernetes, Terraform, GitHub CLI

**Cons:**
- ⚠️ **More verbose** — Explicit error handling = more code
- ⚠️ **Separate tooling** — Linter (`golangci-lint`) not built-in
- ⚠️ **No async/await** — Goroutines instead (different mental model)

**Score:** 82/100 ✅ Viable

**Five Cornerstones:**
- Configurability: 9/10 ⭐ (struct tags, explicit)
- Modularity: 10/10 ⭐⭐ (production-ready from prototype)
- Extensibility: 8/10 (massive ecosystem)
- Integration: 9/10 ⭐ (proven subprocess, SQLite)
- Automation: 8/10 (go test/fmt/vet built-in)

**Practical:**
- Development Experience: 17/20 (excellent debugging)
- Distribution: 15/15 ⭐⭐ (small binaries, easy cross-compile)
- Ecosystem: 15/15 ⭐⭐ (mature, widespread adoption)

---

## Decision

### ✅ **Chosen Option: Go**

**Confidence Level:** High

### Rationale

1. **Production Excellence** (Critical for CLI tool)
   - Binary size: 8-15MB vs 40-60MB (3-5x smaller)
   - Seamless cross-compilation: `GOOS=linux go build`
   - Proven at scale: Docker, Kubernetes, GitHub CLI

2. **Long-term Maintainability** (Critical for 5-10 year horizon)
   - Mature ecosystem (15 years)
   - Easy hiring (Go developers common)
   - Backward compatibility guarantee (Go 1 promise)
   - Lower risk for future features

3. **Modularity from Day One** (Saves Phase 1 time)
   - Package structure is production-ready from prototype
   - No refactoring needed
   - Compiler-enforced clean architecture

4. **Objective Score Advantage**
   - 82/100 vs 78/100 (+4 points)
   - Advantages in high-weight categories:
     - Distribution: 15/15 vs 12/15
     - Ecosystem: 15/15 vs 8/15
     - Modularity: 10/10 vs 8/10

5. **Alignment with Five Cornerstones**
   - Go prototype demonstrates production-grade modularity
   - Package structure follows Sophie's architectural principles
   - Extensibility through mature ecosystem
   - Integration proven at scale

### Why Not Deno?

Deno is **viable** (78/100) and has significant advantages:
- Best-in-class automation tooling
- Faster initial development velocity
- Modern API design

**But:**
- Binary size matters for CLI distribution
- Long-term maintenance risk higher (smaller community, younger tech)
- Would require refactoring for production modularity
- Hiring Deno developers is harder

**Trade-off:** Development velocity (Deno advantage) vs Production quality (Go advantage)

**For Sophie:** Production quality wins due to 5-10 year horizon

---

## Consequences

### Positive

1. **Smaller Binaries**
   - Users download 8-15MB instead of 40-60MB
   - Faster distribution
   - Lower bandwidth costs

2. **Easier Hiring**
   - Go developers are common
   - Gentle learning curve for new team members
   - Lower onboarding time

3. **Lower Long-term Risk**
   - Proven at scale
   - Backward compatibility guarantee
   - Widespread enterprise adoption
   - Mature ecosystem for future features

4. **Production-Ready Structure**
   - No Phase 1 refactoring needed
   - Can start building features immediately
   - Package structure follows best practices

5. **Better Debugging**
   - `delve` debugger is excellent
   - Race detector built-in
   - Production profiling with `pprof`

### Negative

1. **Slightly Slower Initial Development**
   - More verbose code (explicit error handling)
   - No built-in linter (need `golangci-lint`)
   - Learning curve if team is TypeScript-focused

2. **Less "Modern" Syntax**
   - No async/await (goroutines instead)
   - Less "elegant" than TypeScript
   - Different concurrency model

3. **Tooling Less Integrated**
   - Separate commands: `go fmt`, `go vet`, `golangci-lint`
   - Not as convenient as `deno fmt/lint/test` in one

### Mitigations

1. **Development Velocity**
   - AI-first methodology reduces impact of verbosity
   - Claude Code can generate Go code efficiently
   - Fast compilation compensates for more code

2. **Tooling**
   - Set up `golangci-lint` in CI/CD
   - Create Makefile for common tasks
   - Document Go idioms for AI sessions

3. **Learning Curve**
   - Go is simpler than TypeScript (fewer features)
   - Excellent documentation (golang.org, gobyexample.com)
   - AI sessions can learn Go patterns quickly

---

## Implementation

### Phase 1 (Weeks 1-2): Foundation

- [ ] Use `prototypes/go-poc/` structure as foundation
- [ ] Minimal refactoring needed (already modular)
- [ ] Add provider interface abstraction
- [ ] Implement `AIProvider` for Claude Code CLI
- [ ] Implement basic memory layer interfaces

### Technology Setup

- [ ] Document Go idioms for AI sessions (`.github/GO_DEVELOPMENT.md`)
- [ ] Set up `golangci-lint` in GitHub Actions
- [ ] Create Makefile for common tasks:
  - `make build` — Compile binary
  - `make test` — Run tests
  - `make lint` — Run linter
  - `make cross-compile` — Build for all platforms
- [ ] Configure VSCode Go extension (`.vscode/settings.json`)

### Binary Distribution Strategy

- [ ] CI/CD matrix build (Linux x64, macOS x64/arm64, Windows x64)
- [ ] GitHub Releases with all platform binaries
- [ ] Binary optimization: `go build -ldflags="-s -w"` (strip symbols)
- [ ] Target size: 5-8MB (stripped) per platform

### Documentation

- [ ] Update `README.md` with "Built with Go"
- [ ] Create `docs/GO_DEVELOPMENT.md` for Go-specific practices
- [ ] Document package structure and conventions
- [ ] Add Go installation to setup docs

---

## Validation

### Success Criteria

**Phase 1 (by Week 2):**
- ✅ CLI REPL works
- ✅ YAML config loading works
- ✅ SQLite persistence works
- ✅ Claude Code CLI integration works
- ✅ Binary compiles for Linux, macOS, Windows
- ✅ Binary size < 15MB (unstripped), < 10MB (stripped)
- ✅ Tests pass: `go test ./...`
- ✅ Linter passes: `golangci-lint run`

**Phase 6 (by Week 10):**
- ✅ v1.0.0 release with Go implementation
- ✅ Production binary distributed
- ✅ Users successfully run Sophie CLI
- ✅ No major refactoring needed from prototype

### Review Date

**Phase 1 Completion (Week 2):**
Review if Go choice is working well. If major issues, document and assess.

**Expected Outcome:**
Go will prove to be the right choice based on evaluation criteria.

---

## Alternatives Considered and Rejected

### Rust

**Why Considered:**
- Smallest binaries
- Memory safety
- Performance

**Why Rejected:**
- Steep learning curve
- Longer compilation times
- Ecosystem less mature for rapid development
- AI-first development would be slower

### Node.js (JavaScript/TypeScript)

**Why Considered:**
- Familiar to many developers
- Massive npm ecosystem
- TypeScript available

**Why Rejected:**
- Poor single binary story (pkg, nexe have limitations)
- Node.js runtime dependency
- Not designed for CLI tools
- Deno is superior in every way if TypeScript is desired

### Python

**Why Considered:**
- Popular for CLI tools
- Rich ecosystem

**Why Rejected:**
- Python runtime dependency
- Poor single binary story (PyInstaller limitations)
- Slow startup time
- Not suitable for Sophie's requirements

---

## References

**Evaluation Documents:**
- [PROTOTYPE_EVALUATION.md](PROTOTYPE_EVALUATION.md) — Scoring criteria
- [prototypes/deno-poc/FINDINGS.md](../prototypes/deno-poc/FINDINGS.md) — Deno evaluation (78/100)
- [prototypes/go-poc/FINDINGS.md](../prototypes/go-poc/FINDINGS.md) — Go evaluation (82/100)
- [PROTOTYPE_COMPARISON.md](PROTOTYPE_COMPARISON.md) — Side-by-side comparison

**Prototype Code:**
- [prototypes/deno-poc/](../prototypes/deno-poc/) — Deno implementation
- [prototypes/go-poc/](../prototypes/go-poc/) — Go implementation

**Related Decisions:**
- [CLAUDE.md](../CLAUDE.md) — Five Cornerstones framework
- [ARCHITECTURE_DESIGN.md](ARCHITECTURE_DESIGN.md) — Sophie's blueprint
- [ROADMAP.md](../ROADMAP.md) — Development plan

---

## Decision Log

**2025-11-10:**
- Phase 0 prototypes completed (Deno and Go)
- Evaluation criteria defined and applied
- Comprehensive comparison performed
- **Decision:** Go chosen for Sophie implementation
- **Next:** Begin Phase 1 with Go

---

**ADR Status:** ✅ Accepted
**Implementation Status:** Ready to begin Phase 1
**User Validation:** Pending (awaiting user approval before Phase 1 start)

---

## Appendix: Score Summary

| Category | Deno | Go | Winner |
|----------|------|-----|--------|
| **Five Cornerstones** | 42/50 | 44/50 | Go (+2) |
| - Configurability | 8/10 | 9/10 | Go |
| - Modularity | 8/10 | 10/10 | Go |
| - Extensibility | 7/10 | 8/10 | Go |
| - Integration | 9/10 | 9/10 | Tie |
| - Automation | 10/10 | 8/10 | Deno |
| | | | |
| **Practical Criteria** | 36/50 | 38/50 | Go (+2) |
| - Development Experience | 16/20 | 17/20 | Go |
| - Distribution & Deployment | 12/15 | 15/15 | Go |
| - Ecosystem & Support | 8/15 | 15/15 | Go |
| | | | |
| **TOTAL** | **78/100** | **82/100** | **Go (+4)** |
| **Viability** | ✅ Viable | ✅ Viable | Both viable |
| **Recommendation** | Alternative | **Recommended** | Go |

---

**Document Version:** 1.0
**Last Updated:** 2025-11-10
**Next Review:** Phase 1 completion (Week 2)
