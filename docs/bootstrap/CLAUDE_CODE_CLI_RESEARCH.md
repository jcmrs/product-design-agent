# Claude Code CLI Research Guide

> **Research plan for understanding how to integrate Sophie with Claude Code CLI on Windows (no-WSL). Critical for Phase 3 implementation.**

---

## Context

Sophie needs to invoke **Claude Code CLI** (local, Windows installation) as the AI provider. Phase 3 (AI Integration) is completely blocked without understanding how to programmatically invoke the CLI.

**Your Environment:**
- Platform: Windows (no WSL)
- Runtime: Deno
- AI Provider: Claude Code CLI (local installation)

---

## Research Questions

### 1. Installation & Access

**Questions:**
- Where is Claude Code CLI installed on this system?
- What is the exact executable name? (`claude-code.exe`, `claude.exe`, `cline.exe`, other?)
- Is it in the system PATH?
- Does it require authentication on every invocation?

**How to Find:**
```powershell
# Find Claude Code CLI executable
where.exe claude-code
where.exe claude
where.exe cline

# Check PATH
$env:PATH -split ';'

# Test if accessible
claude-code --version
# OR
claude --version
```

**Document:**
- Executable path: _______________________
- Command name: _______________________
- Version: _______________________

---

### 2. Invocation Methods

**Questions:**
- Can it be invoked from command line?
- Does it have a programmatic API (REST, gRPC, etc.)?
- Does it support stdin/stdout interaction?
- Is there a Node.js/Deno SDK available?

**How to Find:**
```powershell
# Check help/docs
claude-code --help
claude-code help

# Test basic invocation
echo "Hello, Claude" | claude-code

# Check for API server mode
claude-code serve --help
claude-code api --help
```

**Possible Invocation Patterns:**

**Option A: Direct Subprocess**
```typescript
const command = new Deno.Command("claude-code", {
  args: ["--prompt", "What is 2+2?"],
  stdout: "piped"
});
const { stdout } = await command.output();
```

**Option B: Stdin/Stdout Streaming**
```typescript
const process = Deno.Command("claude-code", {
  stdin: "piped",
  stdout: "piped"
});
const child = process.spawn();
await child.stdin.write(new TextEncoder().encode("What is 2+2?"));
```

**Option C: HTTP API**
```typescript
const response = await fetch("http://localhost:PORT/api/chat", {
  method: "POST",
  body: JSON.stringify({ prompt: "What is 2+2?" })
});
```

**Option D: SDK/Library**
```typescript
import { ClaudeCode } from "claude-code-sdk";
const claude = new ClaudeCode();
const response = await claude.chat("What is 2+2?");
```

**Document:**
- Invocation method: _______________________
- Example command: _______________________

---

### 3. Prompt Format

**Questions:**
- How are prompts passed to Claude Code CLI?
- Is there a system prompt capability?
- How is conversation history maintained?
- What's the maximum prompt length?

**How to Find:**
```powershell
# Test prompt formats
claude-code "What is 2+2?"
claude-code --prompt "What is 2+2?"
claude-code prompt --text "What is 2+2?"

# Test with file input
echo "What is 2+2?" > test_prompt.txt
claude-code --file test_prompt.txt

# Check for system prompt option
claude-code --system "You are a helpful assistant" --prompt "Hello"
```

**Document:**
- Prompt argument format: _______________________
- System prompt support: Yes / No
- Max prompt length: _______________________

---

### 4. Response Format

**Questions:**
- What format does Claude Code CLI return responses in?
- Plain text? JSON? Structured format?
- Are responses streamed or returned all at once?
- How are errors communicated?

**How to Find:**
```powershell
# Test basic response
claude-code "What is 2+2?"

# Check for JSON output option
claude-code --format json "What is 2+2?"
claude-code --output json "What is 2+2?"

# Test streaming
claude-code --stream "Write a long story"
```

**Document:**
- Response format: _______________________
- Streaming support: Yes / No
- Error format: _______________________

---

### 5. Conversation Management

**Questions:**
- Does Claude Code CLI maintain conversation history automatically?
- Or must we pass full history with each request?
- Is there a session/conversation ID system?
- How to start a new conversation?

**How to Find:**
```powershell
# Test multi-turn conversation
claude-code "My name is Alice"
claude-code "What is my name?"  # Does it remember?

# Check for session management
claude-code --new-session
claude-code --session-id abc123 "Hello"
```

**Document:**
- Conversation persistence: Automatic / Manual / None
- How to pass history: _______________________

---

### 6. Configuration & Options

**Questions:**
- Can temperature, max_tokens, etc. be configured?
- Are there CLI flags for model parameters?
- Is there a config file?

**How to Find:**
```powershell
# Check available options
claude-code --help

# Look for config file
ls ~/.claude-code/
ls ~/AppData/Local/Claude/
ls ~/AppData/Roaming/Claude/

# Test parameter flags
claude-code --temperature 0.7 --max-tokens 500 "Write a poem"
```

**Document:**
- Temperature control: _______________________
- Max tokens control: _______________________
- Config file location: _______________________

---

### 7. Authentication & Rate Limits

**Questions:**
- Does every invocation require authentication?
- Is there a local authentication token?
- Are there rate limits (requests per minute)?
- Does it work offline (local model) or requires internet?

**How to Find:**
```powershell
# Check auth status
claude-code auth status
claude-code login

# Test multiple rapid requests
for ($i=1; $i -le 10; $i++) {
  claude-code "Test $i" -ErrorAction SilentlyContinue
  Start-Sleep -Milliseconds 100
}
```

**Document:**
- Auth requirement: Yes / No / Once per session
- Rate limits: _______________________
- Network requirement: Online / Offline capable

---

## Experiments to Run

### Experiment 1: Basic Invocation

```powershell
# Test if Claude Code CLI works from PowerShell
claude-code "Hello, can you hear me?"

# Expected: Some response from Claude
# If error: Document the error message
```

### Experiment 2: Programmatic Invocation from Deno

```typescript
// test-claude-invocation.ts
const command = new Deno.Command("claude-code", {
  args: ["Hello from Deno!"],
  stdout: "piped",
  stderr: "piped"
});

const { code, stdout, stderr } = await command.output();

console.log("Exit code:", code);
console.log("Output:", new TextDecoder().decode(stdout));
console.log("Errors:", new TextDecoder().decode(stderr));
```

```powershell
deno run --allow-run test-claude-invocation.ts
```

### Experiment 3: Streaming Test

```typescript
// test-streaming.ts
const command = new Deno.Command("claude-code", {
  args: ["Write a 500-word story"],
  stdout: "piped"
});

const process = command.spawn();

// Read stdout as it arrives
const reader = process.stdout.getReader();
while (true) {
  const { done, value } = await reader.read();
  if (done) break;

  const chunk = new TextDecoder().decode(value);
  console.log("Chunk:", chunk);
}
```

### Experiment 4: Conversation History

```typescript
// test-conversation.ts
// Test if history is maintained automatically

const msg1 = await invokeClaudeCLI("My name is Sophie");
console.log("Response 1:", msg1);

const msg2 = await invokeClaudeCLI("What is my name?");
console.log("Response 2:", msg2);

// Does msg2 correctly identify "Sophie"?
```

---

## Decision Tree

Based on research findings, choose implementation approach:

```
Can invoke from command line?
├─ Yes
│  ├─ Supports streaming?
│  │  ├─ Yes → Implement streaming provider
│  │  └─ No → Implement batch provider
│  │
│  └─ HTTP API available?
│     ├─ Yes → Use HTTP (more reliable)
│     └─ No → Use subprocess
│
└─ No
   ├─ SDK available?
   │  └─ Yes → Use SDK
   │
   └─ No → Ask user for guidance
```

---

## Implementation Templates

### Template A: Subprocess Invocation

```typescript
// src/providers/claude_code_cli.ts
export class ClaudeCodeCLIProvider implements AIProvider {
  name = "claude-code-cli";

  async call(prompt: string, options?: CallOptions): Promise<string> {
    const args = [
      // Based on research findings:
      "--prompt", prompt,
      "--temperature", String(options?.temperature ?? 0.7),
      "--max-tokens", String(options?.max_tokens ?? 2000)
    ];

    if (options?.system) {
      args.push("--system", options.system);
    }

    const command = new Deno.Command("claude-code", {
      args,
      stdout: "piped",
      stderr: "piped"
    });

    const { code, stdout, stderr } = await command.output();

    if (code !== 0) {
      const error = new TextDecoder().decode(stderr);
      throw new Error(`Claude Code CLI failed: ${error}`);
    }

    return new TextDecoder().decode(stdout);
  }
}
```

### Template B: HTTP API

```typescript
export class ClaudeCodeCLIProvider implements AIProvider {
  name = "claude-code-cli";
  private apiUrl: string;

  constructor(apiUrl = "http://localhost:8080") {
    this.apiUrl = apiUrl;
  }

  async call(prompt: string, options?: CallOptions): Promise<string> {
    const response = await fetch(`${this.apiUrl}/api/chat`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        prompt,
        temperature: options?.temperature ?? 0.7,
        max_tokens: options?.max_tokens ?? 2000,
        system: options?.system
      })
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.statusText}`);
    }

    const data = await response.json();
    return data.response;
  }
}
```

### Template C: SDK

```typescript
import { ClaudeCode } from "claude-code-sdk";  // If SDK exists

export class ClaudeCodeCLIProvider implements AIProvider {
  name = "claude-code-cli";
  private client: ClaudeCode;

  constructor() {
    this.client = new ClaudeCode();
  }

  async call(prompt: string, options?: CallOptions): Promise<string> {
    return await this.client.chat({
      prompt,
      temperature: options?.temperature,
      max_tokens: options?.max_tokens,
      system: options?.system
    });
  }
}
```

---

## Fallback Plan

**If programmatic invocation is not possible:**

### Option 1: User as Intermediary
```
Sophie CLI → Display prompt → User copies to Claude Code Desktop → User pastes response back
```

(Not ideal, but workable for testing)

### Option 2: Wait for API Support
```
Document limitations, implement stub provider, wait for Claude Code CLI to add API support
```

### Option 3: Alternative AI Provider
```
Use Anthropic API directly (requires API key)
Use Gemini CLI instead (if has better programmatic access)
```

---

## Documentation Template

After completing research, document findings:

```markdown
# Claude Code CLI Integration Findings

## Summary
[Brief description of how Claude Code CLI works]

## Invocation Method
[Chosen method: subprocess/HTTP/SDK]

## Implementation
[Code snippets showing actual working integration]

## Limitations
[Any limitations discovered]

## Configuration
[How to configure for user's system]

## Testing
[How to test the integration]
```

---

## Next Steps After Research

1. **Document findings** in ADR-XXX
2. **Implement AIProvider** based on findings
3. **Test with simple prompts** (Phase 3 Task 3.2)
4. **Implement streaming** if supported (Phase 3 Task 3.4)
5. **Update user** with integration approach

---

**Last Updated:** 2025-11-14
**Required For:** Phase 3 (AI Integration)
**Blocking:** Cannot implement Phase 3 without these answers
**Timeline:** Complete research before starting Phase 3 (Week 5)
