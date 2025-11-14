package memory

import (
	"database/sql"
	"fmt"
	"time"

	_ "modernc.org/sqlite"
)

// DB wraps SQLite database operations
//
// Demonstrates Modularity: database operations isolated in dedicated type
// Production will have full MemoryLayer interface with 4-tier memory
type DB struct {
	conn *sql.DB
}

// InitDB initializes SQLite database
func InitDB(dbPath string) (*DB, error) {
	fmt.Printf("\033[2mInitializing database...\033[0m\n")

	// Open database (creates if doesn't exist)
	conn, err := sql.Open("sqlite", dbPath)
	if err != nil {
		return nil, fmt.Errorf("failed to open database: %w", err)
	}

	// Create conversations table
	// Note: Production Sophie will have 4-tier memory (Agent/Project/External/Registry)
	schema := `
		CREATE TABLE IF NOT EXISTS conversations (
			id INTEGER PRIMARY KEY AUTOINCREMENT,
			timestamp TEXT NOT NULL,
			role TEXT NOT NULL,
			message TEXT NOT NULL,
			task_id TEXT,
			agent_id TEXT
		)
	`

	if _, err := conn.Exec(schema); err != nil {
		return nil, fmt.Errorf("failed to create schema: %w", err)
	}

	fmt.Printf("\033[2m✓ Database ready\033[0m\n\n")

	return &DB{conn: conn}, nil
}

// SaveMessage saves a conversation message to database
//
// Demonstrates Modularity: clean interface for persistence
// Caller doesn't need to know database details
func (db *DB) SaveMessage(role, message string, taskID, agentID *string) error {
	timestamp := time.Now().Format(time.RFC3339)

	query := `
		INSERT INTO conversations (timestamp, role, message, task_id, agent_id)
		VALUES (?, ?, ?, ?, ?)
	`

	_, err := db.conn.Exec(query, timestamp, role, message, taskID, agentID)
	if err != nil {
		return fmt.Errorf("failed to save message: %w", err)
	}

	return nil
}

// Close closes the database connection
func (db *DB) Close() error {
	return db.conn.Close()
}
