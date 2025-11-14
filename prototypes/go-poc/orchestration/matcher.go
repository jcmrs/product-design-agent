package orchestration

import (
	"strings"

	"github.com/jcmrs/sophie-go-poc/config"
)

// MatchTask performs simple task matching based on keywords
//
// Demonstrates Automation: automatic task detection from natural language
// Production will use confidence scoring, intent extraction, and contextual matching
func MatchTask(userMessage string, tasks []config.Task) *config.Task {
	messageLower := strings.ToLower(userMessage)

	// Simple keyword matching (production will be more sophisticated)
	for i := range tasks {
		for _, keyword := range tasks[i].Keywords {
			if strings.Contains(messageLower, strings.ToLower(keyword)) {
				return &tasks[i]
			}
		}
	}

	return nil
}
