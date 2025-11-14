package providers

import (
	"fmt"
	"os"
	"os/exec"
)

// ClaudeProvider calls Claude Code CLI via subprocess
//
// Demonstrates Integration: calling external CLI tools (Claude Code)
// Production will have AIProvider interface supporting multiple providers (Claude, Gemini)
// with proper error handling, streaming, and provider abstraction
type ClaudeProvider struct {
	command string
}

// NewClaudeProvider creates a new Claude Code CLI provider
func NewClaudeProvider() *ClaudeProvider {
	// Get command from environment or use default (Configurability)
	command := os.Getenv("SOPHIE_CLAUDE_CMD")
	if command == "" {
		command = "claude"
	}

	return &ClaudeProvider{
		command: command,
	}
}

// Call invokes Claude Code CLI with a prompt
func (p *ClaudeProvider) Call(prompt string) (string, error) {
	// Try to call Claude Code CLI
	cmd := exec.Command(p.command, "--no-interactive", "--prompt", prompt)

	output, err := cmd.CombinedOutput()

	if err != nil {
		// Graceful fallback for prototype testing without Claude CLI
		fmt.Printf("\033[2mNote: Claude Code CLI not available - using simulation mode\033[0m\n")
		return fmt.Sprintf("[Simulated response to: \"%s...\"]", truncate(prompt, 50)), nil
	}

	return string(output), nil
}

// truncate helper for simulation
func truncate(s string, maxLen int) string {
	if len(s) <= maxLen {
		return s
	}
	return s[:maxLen]
}
