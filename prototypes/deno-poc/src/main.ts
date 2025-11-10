/**
 * Sophie CLI - Deno Prototype
 *
 * Purpose: Validate Deno as technology stack for Sophie
 * Scope: CLI REPL, YAML loading, Claude Code adapter, SQLite basics
 *
 * IMPORTANT: This is disposable prototype code for technology validation.
 * Production implementation will be properly modularized following Five Cornerstones.
 *
 * Version: 0.1.0 (Prototype)
 * Date: 2025-11-10
 */

import { parse } from "@std/yaml";
import { DB } from "@db/sqlite";

// ============================================================================
// Configuration (Cornerstone: Configurability)
// ============================================================================

const CONFIG = {
  // Allow override via environment variables
  agentsPath: Deno.env.get("SOPHIE_AGENTS_PATH") ||
    "../../archive/original-claude-desktop-agent/config/agents.yaml",
  tasksPath: Deno.env.get("SOPHIE_TASKS_PATH") ||
    "../../archive/original-claude-desktop-agent/config/tasks.yaml",
  dbPath: Deno.env.get("SOPHIE_DB_PATH") || "./sophie-poc.db",
  claudeCommand: Deno.env.get("SOPHIE_CLAUDE_CMD") || "claude",
};

// CLI Colors for better UX
const colors = {
  sophie: "\x1b[36m", // Cyan
  user: "\x1b[32m",   // Green
  error: "\x1b[31m",  // Red
  dim: "\x1b[2m",     // Dim
  reset: "\x1b[0m",   // Reset
};

interface Agent {
  id: string;
  name: string;
  description: string;
  focus_areas: string[];
}

interface Task {
  id: string;
  title: string;
  agent_id: string;
  keywords: string[];
}

interface Config {
  agents: Agent[];
  tasks: Task[];
}

// ============================================================================
// Configuration Loading (Cornerstone: Configurability)
// ============================================================================

/**
 * Load YAML configuration files
 *
 * Demonstrates Configurability: paths come from CONFIG object (env vars or defaults)
 * Not hardcoded, can be overridden without code changes
 */
async function loadConfig(): Promise<Config> {
  console.log(`${colors.dim}Loading configuration...${colors.reset}`);

  try {
    // Load agents (using configurable path)
    const agentsYaml = await Deno.readTextFile(CONFIG.agentsPath);
    const agentsData = parse(agentsYaml) as { agents: Agent[] };

    // Load tasks (using configurable path)
    const tasksYaml = await Deno.readTextFile(CONFIG.tasksPath);
    const tasksData = parse(tasksYaml) as { tasks: Task[] };

    console.log(`${colors.dim}✓ Loaded ${agentsData.agents.length} agents, ${tasksData.tasks.length} tasks${colors.reset}\n`);

    return {
      agents: agentsData.agents,
      tasks: tasksData.tasks,
    };
  } catch (error) {
    console.error(`${colors.error}Failed to load configuration:${colors.reset}`, error);
    Deno.exit(1);
  }
}

// ============================================================================
// Database Layer (Cornerstone: Modularity)
// ============================================================================

/**
 * Initialize SQLite database
 *
 * Demonstrates Modularity: database operations isolated in dedicated functions
 * Production will have full MemoryLayer interface
 */
function initDatabase(): DB {
  console.log(`${colors.dim}Initializing database...${colors.reset}`);

  const db = new DB(CONFIG.dbPath);  // Using configurable path

  // Create conversations table
  // Note: Production Sophie will have 4-tier memory (Agent/Project/External/Registry)
  db.execute(`
    CREATE TABLE IF NOT EXISTS conversations (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      timestamp TEXT NOT NULL,
      role TEXT NOT NULL,
      message TEXT NOT NULL,
      task_id TEXT,
      agent_id TEXT
    )
  `);

  console.log(`${colors.dim}✓ Database ready${colors.reset}\n`);

  return db;
}

/**
 * Save conversation message to database
 *
 * Demonstrates Modularity: clean interface for persistence
 * Caller doesn't need to know database details
 */
function saveMessage(
  db: DB,
  role: "user" | "assistant",
  message: string,
  taskId?: string,
  agentId?: string
): void {
  db.query(
    "INSERT INTO conversations (timestamp, role, message, task_id, agent_id) VALUES (?, ?, ?, ?, ?)",
    [new Date().toISOString(), role, message, taskId || null, agentId || null]
  );
}

// ============================================================================
// AI Provider Integration (Cornerstone: Integration)
// ============================================================================

/**
 * Call Claude Code CLI via subprocess
 *
 * Demonstrates Integration: calling external CLI tools (Claude Code)
 * Production will have AIProvider interface supporting multiple providers (Claude, Gemini)
 * with proper error handling, streaming, and provider abstraction
 */
async function callClaudeCode(prompt: string): Promise<string> {
  try {
    const command = new Deno.Command(CONFIG.claudeCommand, {  // Using configurable command
      args: ["--no-interactive", "--prompt", prompt],
      stdout: "piped",
      stderr: "piped",
    });

    const { code, stdout, stderr } = await command.output();

    if (code !== 0) {
      const errorText = new TextDecoder().decode(stderr);
      throw new Error(`Claude Code CLI failed: ${errorText}`);
    }

    return new TextDecoder().decode(stdout);
  } catch (error) {
    // Graceful fallback for prototype testing without Claude CLI
    console.log(`${colors.dim}Note: Claude Code CLI not available - using simulation mode${colors.reset}`);
    return `[Simulated response to: "${prompt.slice(0, 50)}..."]`;
  }
}

// ============================================================================
// Task Matching & Orchestration (Cornerstone: Automation)
// ============================================================================

/**
 * Simple task matching based on keywords
 *
 * Demonstrates Automation: automatic task detection from natural language
 * Production will use confidence scoring, intent extraction, and contextual matching
 */
function matchTask(userMessage: string, tasks: Task[]): Task | null {
  const messageLower = userMessage.toLowerCase();

  // Simple keyword matching (production will be more sophisticated)
  for (const task of tasks) {
    for (const keyword of task.keywords) {
      if (messageLower.includes(keyword.toLowerCase())) {
        return task;
      }
    }
  }

  return null;
}

/**
 * Find agent by ID
 *
 * Production will include agent persona loading, capability matching
 */
function findAgent(agentId: string, agents: Agent[]): Agent | undefined {
  return agents.find(a => a.id === agentId);
}

// ============================================================================
// CLI Interface (All Five Cornerstones in Action)
// ============================================================================

/**
 * Main CLI REPL
 *
 * Brings together all cornerstones:
 * - Configurability: loads from config files
 * - Modularity: uses dedicated functions for each concern
 * - Extensibility: task/agent matching can be enhanced without changing CLI
 * - Integration: calls external Claude Code CLI
 * - Automation: automatic task detection, no manual commands needed
 */
async function runCLI(config: Config, db: DB): Promise<void> {
  console.log(`${colors.sophie}╔═══════════════════════════════════════════════════════╗${colors.reset}`);
  console.log(`${colors.sophie}║                                                       ║${colors.reset}`);
  console.log(`${colors.sophie}║                 Sophie (Deno Prototype)               ║${colors.reset}`);
  console.log(`${colors.sophie}║                                                       ║${colors.reset}`);
  console.log(`${colors.sophie}║   AI-powered product design mentor                    ║${colors.reset}`);
  console.log(`${colors.sophie}║   Type 'exit' to quit, 'help' for commands           ║${colors.reset}`);
  console.log(`${colors.sophie}║                                                       ║${colors.reset}`);
  console.log(`${colors.sophie}╚═══════════════════════════════════════════════════════╝${colors.reset}\n`);

  // REPL loop
  while (true) {
    // Prompt user
    const userInput = prompt(`${colors.user}You:${colors.reset} `);

    if (!userInput || userInput.trim() === "") {
      continue;
    }

    const message = userInput.trim();

    // Handle commands
    if (message === "exit") {
      console.log(`\n${colors.sophie}Sophie:${colors.reset} Goodbye!\n`);
      break;
    }

    if (message === "help") {
      console.log(`\n${colors.sophie}Sophie:${colors.reset} This is a prototype demonstrating:`);
      console.log(`  - Natural language conversation (you're experiencing it now)`);
      console.log(`  - Task matching from YAML configuration`);
      console.log(`  - Agent selection based on tasks`);
      console.log(`  - SQLite conversation storage`);
      console.log(`  - Claude Code CLI integration (simulated)\n`);
      continue;
    }

    // Save user message
    saveMessage(db, "user", message);

    // Match task
    const matchedTask = matchTask(message, config.tasks);

    if (matchedTask) {
      const agent = findAgent(matchedTask.agent_id, config.agents);

      console.log(`${colors.dim}[Task matched: ${matchedTask.title}]${colors.reset}`);
      if (agent) {
        console.log(`${colors.dim}[Agent: ${agent.name}]${colors.reset}`);
      }

      // Simulate calling Claude Code with context
      const prompt = `You are ${agent?.name || "Sophie"}, an AI product design mentor.
User request: ${message}
Task: ${matchedTask.title}
Respond helpfully and naturally.`;

      const response = await callClaudeCode(prompt);

      console.log(`\n${colors.sophie}Sophie:${colors.reset} ${response}\n`);

      // Save assistant response
      saveMessage(db, "assistant", response, matchedTask.id, agent?.id);
    } else {
      // No task matched - general conversation
      console.log(`${colors.dim}[No specific task matched - general conversation]${colors.reset}`);

      const response = await callClaudeCode(`Respond naturally to: ${message}`);
      console.log(`\n${colors.sophie}Sophie:${colors.reset} ${response}\n`);

      saveMessage(db, "assistant", response);
    }
  }
}

/**
 * Entry point
 */
async function main(): Promise<void> {
  try {
    // Load configuration
    const config = await loadConfig();

    // Initialize database
    const db = initDatabase();

    // Run CLI
    await runCLI(config, db);

    // Cleanup
    db.close();
  } catch (error) {
    console.error(`${colors.error}Fatal error:${colors.reset}`, error);
    Deno.exit(1);
  }
}

// Run
if (import.meta.main) {
  main();
}
