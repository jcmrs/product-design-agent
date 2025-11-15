# Implementation Roadmap: Building Sophie

> **This document provides detailed, phase-by-phase implementation guidance for building Sophie from the ground up.**

---

## Overview

Sophie will be built in **6 phases over ~10 weeks**. Each phase builds on the previous, with clear deliverables and validation gates.

**Key Principle:** Complete each phase fully before moving to the next. Don't skip ahead. Each phase validates the foundation for what follows.

---

## Technology Stack

**Recommendation: Deno + TypeScript**

Based on Phase 0 analysis (deferred to Phase 1 implementation):

```
Runtime: Deno 1.x
Language: TypeScript 5.x
Database: SQLite (better-sqlite3 for Deno)
AI Provider: Claude Code CLI (local, Windows no-WSL)
Config: YAML (yaml npm package)
CLI: Deno standard library
Testing: Deno built-in test runner
```

**Why Deno:**
- TypeScript native (no build step)
- Strong standard library
- Modern module system
- Built-in testing
- Security by default
- Single executable distribution

**Alternative: Go** - If performance becomes critical, but start with Deno for rapid development.

---

## Phase 1: Foundation (Weeks 1-2)

**Goal:** Create working CLI shell with config loading and basic conversation loop.

### Deliverables

- ✓ Project structure established
- ✓ YAML config loader (agents.yaml, tasks.yaml)
- ✓ CLI REPL shell (read-eval-print loop)
- ✓ Basic conversation loop (echo mode)
- ✓ Unit tests for config loading

### Detailed Tasks

#### Task 1.1: Project Structure (Day 1)

Create directory structure:

```
sophie/
├── deno.json              # Deno config, import maps, tasks
├── deno.lock              # Lock file
├── .gitignore
├── README.md
├── CLAUDE.md              # Already exists
│
├── src/
│   ├── main.ts            # Entry point
│   ├── cli/
│   │   ├── repl.ts        # CLI interface
│   │   └── output.ts      # Formatting utilities
│   │
│   ├── config/
│   │   ├── loader.ts      # YAML loading
│   │   ├── validator.ts   # Config validation
│   │   └── types.ts       # Config TypeScript types
│   │
│   ├── orchestration/     # (Phase 2)
│   ├── providers/         # (Phase 3)
│   ├── memory/            # (Phase 4)
│   └── utils/
│       └── logger.ts      # Logging utility
│
├── config/
│   ├── agents.yaml        # Agent definitions
│   └── tasks.yaml         # Task definitions
│
├── knowledge/
│   ├── task_guides/       # Methodology guides
│   └── materials/         # Supporting materials
│
└── tests/
    ├── config/
    └── integration/
```

**Validation:**
```bash
deno task check     # Type check
deno task test      # Run tests
```

#### Task 1.2: Config Types (Day 1)

Define TypeScript interfaces in `src/config/types.ts`:

```typescript
// Agent definition
export interface Agent {
  id: string;
  name: string;
  expertise: string[];
  description: string;
  personality: {
    tone: string;
    approach: string;
    traits: string[];
  };
  workflows: {
    preferred_tasks: string[];
    handoff_to: string[];
  };
}

// Task definition
export interface Task {
  id: string;
  name: string;
  category: string;
  keywords: string[];
  required_agent: string;
  knowledge_guide: string;  // Path to .md file
  confidence_threshold: number;
  related_tasks: string[];
}

// Config structure
export interface AgentConfig {
  agents: Agent[];
}

export interface TaskConfig {
  tasks: Task[];
}
```

**Validation:** TypeScript compiles without errors.

#### Task 1.3: YAML Config Loader (Days 2-3)

Implement `src/config/loader.ts`:

```typescript
import { parse } from "https://deno.land/std@0.208.0/yaml/mod.ts";
import { AgentConfig, TaskConfig } from "./types.ts";

export class ConfigLoader {
  private configPath: string;

  constructor(configPath = "./config") {
    this.configPath = configPath;
  }

  async loadAgents(): Promise<AgentConfig> {
    const yaml = await Deno.readTextFile(
      `${this.configPath}/agents.yaml`
    );
    return parse(yaml) as AgentConfig;
  }

  async loadTasks(): Promise<TaskConfig> {
    const yaml = await Deno.readTextFile(
      `${this.configPath}/tasks.yaml`
    );
    return parse(yaml) as TaskConfig;
  }

  // Validate configuration
  validate(config: AgentConfig | TaskConfig): ValidationResult {
    // Check required fields
    // Validate references (e.g., task.required_agent exists)
    // Check file paths exist
    return { valid: true, errors: [] };
  }
}
```

**Validation:**
- Create sample `config/agents.yaml` with 2-3 agents
- Create sample `config/tasks.yaml` with 2-3 tasks
- Write unit tests in `tests/config/loader.test.ts`
- All tests pass

#### Task 1.4: CLI REPL Shell (Days 3-4)

Implement `src/cli/repl.ts`:

```typescript
import { readLines } from "https://deno.land/std@0.208.0/io/mod.ts";

export class REPL {
  private running = false;

  async start() {
    this.running = true;
    console.log("Sophie v0.1.0");
    console.log("Type 'exit' to quit\n");

    for await (const line of readLines(Deno.stdin)) {
      if (!this.running) break;

      const input = line.trim();

      if (input === "exit" || input === "quit") {
        this.stop();
        break;
      }

      if (input === "") continue;

      // Echo mode for Phase 1
      await this.handleInput(input);
    }
  }

  private async handleInput(input: string) {
    // Phase 1: Simple echo
    console.log(`Echo: ${input}\n`);

    // Phase 2: Will call orchestration engine
    // Phase 3: Will integrate AI provider
  }

  stop() {
    this.running = false;
    console.log("\nGoodbye!");
  }
}
```

**Validation:**
- Run `deno task dev` (starts REPL)
- Type messages, see echoes
- Type "exit", REPL closes gracefully

#### Task 1.5: Main Entry Point (Day 4)

Implement `src/main.ts`:

```typescript
import { REPL } from "./cli/repl.ts";
import { ConfigLoader } from "./config/loader.ts";
import { logger } from "./utils/logger.ts";

async function main() {
  try {
    // Load configuration
    const configLoader = new ConfigLoader();
    const agents = await configLoader.loadAgents();
    const tasks = await configLoader.loadTasks();

    logger.info(`Loaded ${agents.agents.length} agents`);
    logger.info(`Loaded ${tasks.tasks.length} tasks`);

    // Validate configuration
    const validation = configLoader.validate(agents);
    if (!validation.valid) {
      logger.error("Config validation failed:", validation.errors);
      Deno.exit(1);
    }

    // Start REPL
    const repl = new REPL();
    await repl.start();
  } catch (error) {
    logger.error("Startup failed:", error);
    Deno.exit(1);
  }
}

if (import.meta.main) {
  main();
}
```

**Validation:**
- `deno run --allow-read --allow-net src/main.ts` works
- Config loads successfully
- REPL starts
- Can have echo conversations

### Phase 1 Success Criteria

- ✓ Project compiles with no TypeScript errors
- ✓ Config files load from YAML
- ✓ CLI REPL starts and accepts input
- ✓ Basic conversation loop works (echo mode)
- ✓ Unit tests pass
- ✓ Code follows Five Cornerstones (modular, configurable)

**User Validation:** Show working REPL, demonstrate config loading, confirm ready for Phase 2.

---

## Phase 2: Orchestration (Weeks 3-4)

**Goal:** Implement the "brain" - intent extraction, task matching, agent selection, knowledge loading.

### Deliverables

- ✓ Workflow Orchestrator (8-step process)
- ✓ Task Matching with confidence scoring
- ✓ Agent Selection
- ✓ Knowledge Loading (file-based)
- ✓ End-to-end flow (input → knowledge → output structure)

### Detailed Tasks

#### Task 2.1: Orchestrator Architecture (Day 1)

Create `src/orchestration/orchestrator.ts`:

```typescript
import { TaskMatcher } from "./task_matcher.ts";
import { AgentSelector } from "./agent_selector.ts";
import { KnowledgeLoader } from "./knowledge_loader.ts";

export class WorkflowOrchestrator {
  constructor(
    private taskMatcher: TaskMatcher,
    private agentSelector: AgentSelector,
    private knowledgeLoader: KnowledgeLoader
  ) {}

  async process(userInput: string, context: ConversationContext): Promise<OrchestrationResult> {
    // Step 1: Extract intent
    const intent = this.extractIntent(userInput);

    // Step 2: Match task with confidence
    const taskMatch = await this.taskMatcher.match(intent, context);

    if (taskMatch.confidence < 0.5) {
      return this.handleLowConfidence(userInput, taskMatch);
    }

    // Step 3: Select agent
    const agent = this.agentSelector.select(taskMatch.task);

    // Step 4: Load knowledge
    const knowledge = await this.knowledgeLoader.load(taskMatch.task);

    // Step 5: Return orchestration result
    return {
      task: taskMatch.task,
      agent: agent,
      knowledge: knowledge,
      confidence: taskMatch.confidence,
      intent: intent
    };
  }

  private extractIntent(input: string): Intent {
    // Simple keyword extraction for Phase 2
    // Phase 5: Can use embeddings/semantic search
    return {
      action: this.detectAction(input),
      domain: this.detectDomain(input),
      keywords: this.extractKeywords(input)
    };
  }
}
```

#### Task 2.2: Task Matching (Days 2-3)

Implement `src/orchestration/task_matcher.ts`:

```typescript
export class TaskMatcher {
  constructor(private tasks: Task[]) {}

  async match(intent: Intent, context: ConversationContext): Promise<TaskMatch> {
    const scores = this.tasks.map(task => ({
      task,
      score: this.calculateScore(task, intent, context)
    }));

    // Sort by score descending
    scores.sort((a, b) => b.score - a.score);

    const best = scores[0];

    return {
      task: best.task,
      confidence: best.score,
      alternatives: scores.slice(1, 3).map(s => s.task)
    };
  }

  private calculateScore(task: Task, intent: Intent, context: ConversationContext): number {
    let score = 0;

    // Keyword matching (primary signal)
    const keywordMatches = task.keywords.filter(kw =>
      intent.keywords.some(k => k.toLowerCase().includes(kw.toLowerCase()))
    );
    score += keywordMatches.length * 0.3;

    // Domain matching
    if (task.category === intent.domain) {
      score += 0.2;
    }

    // Context boost (if previously used this task)
    if (context.recentTasks.includes(task.id)) {
      score += 0.1;
    }

    return Math.min(score, 1.0);
  }
}
```

**Validation:**
- Write tests with sample intents and tasks
- Verify confidence scores are reasonable
- Test with ambiguous intents (multiple high-scoring tasks)

#### Task 2.3: Knowledge Loading (Days 3-4)

Implement `src/orchestration/knowledge_loader.ts`:

```typescript
export class KnowledgeLoader {
  constructor(private knowledgePath = "./knowledge") {}

  async load(task: Task): Promise<KnowledgeContent> {
    // Load task guide
    const guidePath = `${this.knowledgePath}/task_guides/${task.knowledge_guide}`;
    const guide = await Deno.readTextFile(guidePath);

    // Parse structure (12 sections)
    const sections = this.parseGuide(guide);

    // Load cross-referenced materials
    const materials = await this.loadMaterials(sections);

    return {
      guide: guide,
      sections: sections,
      materials: materials,
      task_id: task.id
    };
  }

  private parseGuide(markdown: string): Section[] {
    // Parse markdown headers to identify 12 sections
    // Return structured sections
    const sections: Section[] = [];

    // Simple regex-based parsing for Phase 2
    // Phase 5: Can use markdown parser library

    return sections;
  }

  private async loadMaterials(sections: Section[]): Promise<Material[]> {
    // Find cross-references like "See: materials/user-research-methods.md"
    // Load referenced files
    return [];
  }
}
```

**Validation:**
- Create 2-3 sample task guides in `knowledge/task_guides/`
- Test loading and parsing
- Verify cross-references work

#### Task 2.4: Integration (Day 4)

Update `src/cli/repl.ts` to use orchestrator:

```typescript
private async handleInput(input: string) {
  // Get orchestration result
  const result = await this.orchestrator.process(input, this.context);

  // For Phase 2, just display what we matched
  console.log(`\nMatched Task: ${result.task.name}`);
  console.log(`Confidence: ${(result.confidence * 100).toFixed(0)}%`);
  console.log(`Agent: ${result.agent.name}`);
  console.log(`Loaded knowledge: ${result.knowledge.guide.length} chars`);
  console.log(`\nIntent: ${JSON.stringify(result.intent, null, 2)}\n`);

  // Phase 3: Will pass to AI provider for response generation
}
```

### Phase 2 Success Criteria

- ✓ Intent extraction works for sample inputs
- ✓ Task matching returns correct tasks with confidence scores
- ✓ Knowledge loading reads task guides
- ✓ End-to-end orchestration flow works
- ✓ Tests cover main scenarios

**User Validation:** Demonstrate task matching with various inputs, show confidence scores, confirm orchestration logic.

---

## Phase 3: AI Integration (Week 5)

**Goal:** Connect Claude Code CLI as AI provider and generate actual responses.

### Deliverables

- ✓ AI Provider abstraction layer
- ✓ Claude Code CLI adapter
- ✓ Prompt engineering for Sophie's personality
- ✓ Response generation and streaming
- ✓ End-to-end conversation working

### Detailed Tasks

#### Task 3.1: Provider Abstraction (Day 1)

Create `src/providers/base.ts`:

```typescript
export interface AIProvider {
  name: string;

  // Synchronous call (wait for complete response)
  call(prompt: string, options?: CallOptions): Promise<string>;

  // Streaming call (iterate over chunks)
  stream(prompt: string, options?: CallOptions): AsyncIterator<string>;
}

export interface CallOptions {
  temperature?: number;
  max_tokens?: number;
  system?: string;
  stop_sequences?: string[];
}
```

#### Task 3.2: Claude Code CLI Adapter (Days 2-3)

Create `src/providers/claude_code_cli.ts`:

```typescript
export class ClaudeCodeCLIProvider implements AIProvider {
  name = "claude-code-cli";

  async call(prompt: string, options?: CallOptions): Promise<string> {
    // Invoke Claude Code CLI via subprocess
    // Windows-specific (no WSL)

    const command = new Deno.Command("claude-code", {
      args: ["--prompt", prompt],
      stdout: "piped",
      stderr: "piped"
    });

    const { code, stdout, stderr } = await command.output();

    if (code !== 0) {
      throw new Error(`Claude Code CLI failed: ${new TextDecoder().decode(stderr)}`);
    }

    return new TextDecoder().decode(stdout);
  }

  async *stream(prompt: string, options?: CallOptions): AsyncIterator<string> {
    // Streaming implementation
    // May require different CLI invocation or API

    // For Phase 3, can fall back to call() and yield whole response
    const response = await this.call(prompt, options);
    yield response;
  }
}
```

**Note:** Actual Claude Code CLI integration depends on how it's invoked on Windows. May need to:
- Use API directly (if available)
- Invoke via subprocess
- Use SDK if provided

**Research needed:** How does Claude Code CLI work on Windows (no-WSL)?

#### Task 3.3: Prompt Engineering (Days 3-4)

Create `src/orchestration/prompt_builder.ts`:

```typescript
export class PromptBuilder {
  buildPrompt(
    userInput: string,
    orchestrationResult: OrchestrationResult,
    conversationHistory: Message[]
  ): string {
    const { task, agent, knowledge } = orchestrationResult;

    // Build system prompt
    const systemPrompt = this.buildSystemPrompt(agent, task);

    // Build context from conversation history
    const context = this.buildContext(conversationHistory);

    // Inject knowledge guide
    const knowledgeSection = this.injectKnowledge(knowledge);

    // Combine into final prompt
    return `${systemPrompt}

${context}

${knowledgeSection}

User: ${userInput}