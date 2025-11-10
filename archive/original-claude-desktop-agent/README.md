# Original Product Design Agent (Archived)

This directory contains the original implementation of the Product Design Agent, designed for Claude Desktop and Gemini Gems platforms.

## What This Was

The original Product Design Agent was a sophisticated file-based AI mentorship system that:
- Operated within Claude Projects (Claude Desktop) or Gemini Gems
- Used uploaded files as knowledge context
- Provided 80+ design task methodologies
- Featured 12 specialized agent personas
- Supported bilingual operation (EN/ES)

## Why It Was Archived

This implementation had fundamental constraints:
- Platform-dependent (required Claude Pro or Google One AI Premium)
- No persistent memory (sessions reset)
- Limited by platform session constraints
- No multi-project support
- Token usage constraints

## The Evolution to Sophie

This project evolved into **Sophie** - an independent CLI-based system that:
- Preserves all the knowledge and expertise (same tasks, same agents)
- Adds persistent memory across sessions
- Enables multi-project workflows
- Runs independently via OAuth CLI (Claude Code, Gemini CLI)
- Integrates external knowledge sources

**See the main repository README for Sophie's current implementation.**

## Original Files Preserved Here

- `assets/instructions.md` - Original orchestration instructions
- `CLAUDE_INSTALLATION.md` - Installation guide for Claude Desktop
- `GEMINI_INSTALLATION.md` - Installation guide for Gemini Gems
- `CONTRIBUTING.md` - Original contribution guidelines
- `product-map.md` - Original architecture documentation
- `product-future.md` - Vision document (led to Sophie)
- `README-ORIGINAL.md` - Original repository README

## Knowledge & Configuration

The knowledge base and configuration files are **NOT archived** - they continue to be used by Sophie:
- `/knowledge/` - Task guides and materials (Sophie uses these)
- `/config/` - Agent and task definitions (Sophie uses these)

Sophie builds on this foundation rather than replacing it.

## For Historical Reference

If you want to use the original Claude Desktop/Gemini Gems implementation:
1. Follow the installation guides in this directory
2. Upload the files from `/knowledge/` and `/config/` to your Claude Project or Gemini Gem
3. Use `assets/instructions.md` as your custom instructions

## Questions?

See the main repository README or visit the discussions/issues.

---

*This implementation served as the foundation for Sophie's evolution.*
*Archived: November 2025*
