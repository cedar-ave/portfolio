# Paligo Pal

A skill and MCP server for interacting with the Paligo REST API from Claude.

Paligo uses HTTP Basic Auth with a pre-encoded Base64 token. No OAuth flow or browser authorization is required — credentials are stored in a `.env` file and loaded automatically by the MCP server at startup.

# Directory structure

| Concern | Where it lives |
|---|---|
| Plugin manifest | `plugins/content-dev/.claude-plugin/plugin.json` |
| Skill instructions | `skills/paligo-pal/SKILL.md` |
| MCP server code | `mcp/paligo/paligo_mcp.py` |
| MCP server config | `skills/.claude/mcp.json` |
| MCP server opt-in | `skills/.claude/settings.local.json` |
| Credentials | `skills/paligo-pal/.env` (gitignored) |

# Paligo MCP

`mcp/paligo/` provides tools for every Paligo REST API v2 resource — documents, folders, forks, images, productions, imports, translations, taxonomies, variables, groups, users, and assignments.

- Script — `paligo_mcp.py`
- Credentials — `skills/paligo-pal/.env` (gitignored), loaded automatically at startup

## Credentials setup

Create `skills/paligo-pal/.env` with the following values:

```env
PALIGO_INSTANCE="{instance}.paligoapp.com"
PALIGO_API_TOKEN="<base64-encoded username:apikey>"
```

`PALIGO_API_TOKEN` is a Base64-encoded string of `username:apikey`. To generate it:

```bash
echo -n "your-email@example.com:YOUR_API_KEY" | base64
```

To generate an API key in Paligo: go to **Settings → API** and create a new key. Only admin users can create API keys.

## MCP server registration

The `paligo` server is registered in `skills/.claude/mcp.json` and opted into via `skills/.claude/settings.local.json`.

**`skills/.claude/mcp.json`**
```json
{
  "paligo": {
    "command": "/usr/local/bin/python3",
    "args": [
      "../../mcp/paligo/paligo_mcp.py"
    ]
  }
}
```

**`skills/.claude/settings.local.json`**
```json
{
  "enabledMcpjsonServers": ["paligo"]
}
```

Claude Code picks up `mcp.json` from the project's `.claude/` directory. `enabledMcpjsonServers` opts the project into that server. No global settings changes are needed.

## Dependencies

The MCP server requires these Python packages, all installable via the system Python at `/usr/local/bin/python3`:

```bash
pip3 install requests python-dotenv mcp
```

## Invoke the skill

Invoke it with `/paligo-pal` or describe a Paligo task and Claude will trigger the skill automatically.

# Add a new skill

1. Create a skill folder: `skills/<skill-name>/SKILL.md`
2. Add reference docs if needed: `skills/<skill-name>/references/`
3. Skills are delivered via the plugin — no symlinks or extra registration needed.
4. If the skill needs Paligo, reference the existing `paligo` MCP tools in `SKILL.md` — no changes to the MCP server needed.
5. If the skill needs a new MCP server (a different service), create `mcp/<service>/` and add an entry to `skills/.claude/mcp.json`.

# Update a skill

Edit `SKILL.md` directly. Changes are picked up immediately in the current session. To deliver changes to others, bump the version and push — see **Version management** below.

## Testing changes locally

After editing skill files, reload the plugin without pushing to GitHub:

1. `/plugin marketplace update company` — re-reads `marketplace.json` from disk (only needed if you bumped the version in `plugin.json`)
2. `/plugin install content-dev@company` — copies updated skill files into the cache
3. `/reload-plugins` — activates the new version in the current session

If you only edited `SKILL.md` without bumping the version, skip step 1.

### Is the skill using my local changes?

The skill runs from the **plugin cache**, not your working directory. If you edited skill files but haven't pushed and updated the cache, the running version is stale.

To verify, check whether the cached version matches your local edits:

```bash
diff ~/.claude/plugins/cache/company/content-dev/$(cat plugins/content-dev/.claude-plugin/plugin.json | python3 -c "import sys,json; print(json.load(sys.stdin)['version'])")/skills/paligo-pal/SKILL.md \
  plugins/content-dev/skills/paligo-pal/SKILL.md
```

If the diff is non-empty, your local changes are not yet live. To publish them:

1. Bump the version in `plugins/content-dev/.claude-plugin/plugin.json`
2. Commit and push
3. `/plugin marketplace update company`
4. `/reload-plugins`

# Version management

The plugin version is stored in `plugins/content-dev/.claude-plugin/plugin.json`. Bump the version before committing any changes so users with `autoUpdate: true` receive the update on next Claude Code restart.

```json
{
  "version": "1.3.0"
}
```

Bump rules: PATCH for fixes/content updates, MINOR for new skills, MAJOR for breaking changes.

# Gitignore rules

Add a `.gitignore` to `mcp/paligo/` to exclude cache files:

```
__pycache__/
```

The `.env` file at `skills/paligo-pal/.env` is gitignored via the root `.gitignore`. Never commit credentials.
