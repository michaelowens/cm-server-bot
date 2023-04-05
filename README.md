# cm-server-bot

Manage Asseto Corsa (Content Manager) servers through discord.

## Commands

The following commands are available from every server the bot is in:

- `/aclist` lists the available presets
- `/acstart <preset>` starts the server with a preset
- `/acstop` stops the server

## Running

Copy `.env.example` to `.env` and enter the discord bot token. If Assetto Corsa isn't installed in the default location adjust the server path.

```
deno run -A mod.ts
```
