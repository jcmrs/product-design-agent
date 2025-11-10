package config

import (
	"fmt"
	"os"

	"gopkg.in/yaml.v3"
)

// Agent represents a Sophie agent persona
type Agent struct {
	ID          string   `yaml:"id"`
	Name        string   `yaml:"name"`
	Description string   `yaml:"description"`
	FocusAreas  []string `yaml:"focus_areas"`
}

// Task represents a Sophie task methodology
type Task struct {
	ID       string   `yaml:"id"`
	Title    string   `yaml:"title"`
	AgentID  string   `yaml:"agent_id"`
	Keywords []string `yaml:"keywords"`
}

// Config holds agents and tasks configuration
type Config struct {
	Agents []Agent
	Tasks  []Task
}

// AgentsFile represents the structure of agents.yaml
type AgentsFile struct {
	Agents []Agent `yaml:"agents"`
}

// TasksFile represents the structure of tasks.yaml
type TasksFile struct {
	Tasks []Task `yaml:"tasks"`
}

// LoadConfig loads YAML configuration from files
//
// Demonstrates Configurability: paths come from environment variables or defaults
// Not hardcoded, can be overridden without code changes
func LoadConfig() (*Config, error) {
	// Get paths from environment or use defaults (Configurability)
	agentsPath := os.Getenv("SOPHIE_AGENTS_PATH")
	if agentsPath == "" {
		agentsPath = "../../archive/original-claude-desktop-agent/config/agents.yaml"
	}

	tasksPath := os.Getenv("SOPHIE_TASKS_PATH")
	if tasksPath == "" {
		tasksPath = "../../archive/original-claude-desktop-agent/config/tasks.yaml"
	}

	fmt.Printf("\033[2mLoading configuration...\033[0m\n")

	// Load agents
	agentsData, err := os.ReadFile(agentsPath)
	if err != nil {
		return nil, fmt.Errorf("failed to read agents file: %w", err)
	}

	var agentsFile AgentsFile
	if err := yaml.Unmarshal(agentsData, &agentsFile); err != nil {
		return nil, fmt.Errorf("failed to parse agents YAML: %w", err)
	}

	// Load tasks
	tasksData, err := os.ReadFile(tasksPath)
	if err != nil {
		return nil, fmt.Errorf("failed to read tasks file: %w", err)
	}

	var tasksFile TasksFile
	if err := yaml.Unmarshal(tasksData, &tasksFile); err != nil {
		return nil, fmt.Errorf("failed to parse tasks YAML: %w", err)
	}

	fmt.Printf("\033[2m✓ Loaded %d agents, %d tasks\033[0m\n\n", len(agentsFile.Agents), len(tasksFile.Tasks))

	return &Config{
		Agents: agentsFile.Agents,
		Tasks:  tasksFile.Tasks,
	}, nil
}

// FindAgent finds an agent by ID
func (c *Config) FindAgent(id string) *Agent {
	for i := range c.Agents {
		if c.Agents[i].ID == id {
			return &c.Agents[i]
		}
	}
	return nil
}
