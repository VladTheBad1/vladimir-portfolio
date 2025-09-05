# MCP Server Configuration Guide

## Overview
This project is configured with Model Context Protocol (MCP) servers for Supabase and Vercel, enabling Claude Code to interact directly with these services through natural language.

## Prerequisites

### 1. Supabase Setup
1. Go to your [Supabase Dashboard](https://supabase.com/dashboard)
2. Navigate to Settings → API
3. Copy:
   - Project URL → `NEXT_PUBLIC_SUPABASE_URL`
   - Anon/Public Key → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - Service Role Key → `SUPABASE_SERVICE_ROLE_KEY` (keep this secret!)

### 2. Vercel Token
1. Go to [Vercel Account Tokens](https://vercel.com/account/tokens)
2. Create a new token with appropriate scope
3. Copy the token → `VERCEL_TOKEN`

## Configuration Steps

### 1. Environment Variables
Copy `.env.local.example` to `.env.local` and fill in your credentials:

```bash
cp .env.local.example .env.local
```

### 2. MCP Configuration
The `.mcp.json` file is already configured with:
- **Supabase MCP Server**: Read-only mode for safety
- **Vercel MCP Server**: Full deployment management

### 3. Using with Claude Code

After configuration, restart Claude Code. You can then use natural language commands:

#### Supabase Commands
- "Show me all tables in my Supabase database"
- "Query the users table"
- "Create a new migration for adding a posts table"
- "Check Supabase logs for errors"

#### Vercel Commands
- "Deploy to production"
- "Show recent deployments"
- "Check deployment logs"
- "List environment variables in Vercel"

## Security Notes

1. **Never commit `.env.local`** - It contains sensitive keys
2. **Service Role Key** - This has full database access, keep it secure
3. **Read-only Mode** - Supabase MCP is configured as read-only by default for safety
4. **Token Rotation** - Regularly rotate your Vercel and Supabase tokens

## Troubleshooting

### MCP Servers Not Connecting
1. Ensure all environment variables are set correctly
2. Restart Claude Code after configuration changes
3. Check that npm packages are installed:
   ```bash
   npm list @supabase/mcp-server-supabase @vercel/mcp-adapter
   ```

### Permission Errors
- Verify your Supabase service role key has appropriate permissions
- Check that your Vercel token has the necessary scopes

## Additional Resources
- [Supabase MCP Documentation](https://supabase.com/docs/guides/getting-started/mcp)
- [Vercel MCP Integration](https://vercel.com/docs/workflow-collaboration/mcp)
- [Claude Code MCP Guide](https://docs.anthropic.com/en/docs/claude-code/mcp)