package main

import (
	"bufio"
	"fmt"
	"os"
	"strings"

	"github.com/jcmrs/sophie-go-poc/config"
	"github.com/jcmrs/sophie-go-poc/memory"
	"github.com/jcmrs/sophie-go-poc/orchestration"
	"github.com/jcmrs/sophie-go-poc/providers"
)

/**
 * Sophie CLI - Go Prototype
 *
 * Purpose: Validate Go as technology stack for Sophie
 * Scope: CLI REPL, YAML loading, Claude Code adapter, SQLite basics
 *
 * IMPORTANT: This is disposable prototype code for technology validation.
 * Production implementation will be properly modularized following Five Cornerstones.
 *
 * Version: 0.1.0 (Prototype)
 * Date: 2025-11-10
 */

// ANSI color codes for better UX
const (
	colorSophie = "\033[36m" // Cyan
	colorUser   = "\033[32m" // Green
	colorError  = "\033[31m" // Red
	colorDim    = "\033[2m"  // Dim
	colorReset  = "\033[0m"  // Reset
)

func main() {
	if err := run(); err != nil {
		fmt.Fprintf(os.Stderr, "%sFatal error:%s %v\n", colorError, colorReset, err)
		os.Exit(1)
	}
}

// run is the main application logic
//
// Brings together all cornerstones:
// - Configurability: loads from config files
// - Modularity: uses dedicated packages for each concern
// - Extensibility: task/agent matching can be enhanced without changing main
// - Integration: calls external Claude Code CLI
// - Automation: automatic task detection, no manual commands needed
func run() error {
	// Load configuration (Cornerstone: Configurability)
	cfg, err := config.LoadConfig()
	if err != nil {
		return fmt.Errorf("configuration loading failed: %w", err)
	}

	// Initialize database (Cornerstone: Modularity)
	dbPath := os.Getenv("SOPHIE_DB_PATH")
	if dbPath == "" {
		dbPath = "./sophie-poc.db"
	}

	db, err := memory.InitDB(dbPath)
	if err != nil {
		return fmt.Errorf("database initialization failed: %w", err)
	}
	defer db.Close()

	// Initialize AI provider (Cornerstone: Integration)
	provider := providers.NewClaudeProvider()

	// Run CLI REPL
	runCLI(cfg, db, provider)

	return nil
}

// runCLI runs the interactive REPL loop
func runCLI(cfg *config.Config, db *memory.DB, provider *providers.ClaudeProvider) {
	// Print banner
	fmt.Printf("%s╔═══════════════════════════════════════════════════════╗%s\n", colorSophie, colorReset)
	fmt.Printf("%s║                                                       ║%s\n", colorSophie, colorReset)
	fmt.Printf("%s║                  Sophie (Go Prototype)                ║%s\n", colorSophie, colorReset)
	fmt.Printf("%s║                                                       ║%s\n", colorSophie, colorReset)
	fmt.Printf("%s║   AI-powered product design mentor                    ║%s\n", colorSophie, colorReset)
	fmt.Printf("%s║   Type 'exit' to quit, 'help' for commands           ║%s\n", colorSophie, colorReset)
	fmt.Printf("%s║                                                       ║%s\n", colorSophie, colorReset)
	fmt.Printf("%s╚═══════════════════════════════════════════════════════╝%s\n\n", colorSophie, colorReset)

	// Create scanner for reading user input
	scanner := bufio.NewScanner(os.Stdin)

	// REPL loop
	for {
		// Prompt user
		fmt.Printf("%sYou:%s ", colorUser, colorReset)

		if !scanner.Scan() {
			break // EOF or error
		}

		message := strings.TrimSpace(scanner.Text())

		if message == "" {
			continue
		}

		// Handle commands
		if message == "exit" {
			fmt.Printf("\n%sSophie:%s Goodbye!\n\n", colorSophie, colorReset)
			break
		}

		if message == "help" {
			fmt.Printf("\n%sSophie:%s This is a prototype demonstrating:\n", colorSophie, colorReset)
			fmt.Println("  - Natural language conversation (you're experiencing it now)")
			fmt.Println("  - Task matching from YAML configuration")
			fmt.Println("  - Agent selection based on tasks")
			fmt.Println("  - SQLite conversation storage")
			fmt.Println("  - Claude Code CLI integration (simulated)\n")
			continue
		}

		// Save user message
		db.SaveMessage("user", message, nil, nil)

		// Match task (Cornerstone: Automation)
		matchedTask := orchestration.MatchTask(message, cfg.Tasks)

		if matchedTask != nil {
			agent := cfg.FindAgent(matchedTask.AgentID)

			fmt.Printf("%s[Task matched: %s]%s\n", colorDim, matchedTask.Title, colorReset)
			if agent != nil {
				fmt.Printf("%s[Agent: %s]%s\n", colorDim, agent.Name, colorReset)
			}

			// Build prompt for AI
			agentName := "Sophie"
			if agent != nil {
				agentName = agent.Name
			}

			prompt := fmt.Sprintf(
				"You are %s, an AI product design mentor.\nUser request: %s\nTask: %s\nRespond helpfully and naturally.",
				agentName,
				message,
				matchedTask.Title,
			)

			// Call AI provider (Cornerstone: Integration)
			response, err := provider.Call(prompt)
			if err != nil {
				fmt.Printf("%sError calling AI provider:%s %v\n", colorError, colorReset, err)
				continue
			}

			fmt.Printf("\n%sSophie:%s %s\n\n", colorSophie, colorReset, response)

			// Save assistant response with task/agent context
			db.SaveMessage("assistant", response, &matchedTask.ID, &agent.ID)
		} else {
			// No task matched - general conversation
			fmt.Printf("%s[No specific task matched - general conversation]%s\n", colorDim, colorReset)

			prompt := fmt.Sprintf("Respond naturally to: %s", message)
			response, err := provider.Call(prompt)
			if err != nil {
				fmt.Printf("%sError calling AI provider:%s %v\n", colorError, colorReset, err)
				continue
			}

			fmt.Printf("\n%sSophie:%s %s\n\n", colorSophie, colorReset, response)

			// Save assistant response without task/agent context
			db.SaveMessage("assistant", response, nil, nil)
		}
	}

	if err := scanner.Err(); err != nil {
		fmt.Fprintf(os.Stderr, "%sError reading input:%s %v\n", colorError, colorReset, err)
	}
}
