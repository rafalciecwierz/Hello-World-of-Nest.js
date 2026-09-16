# Memory — Arcjet NestJS Integration Research

Last updated: 2026-09-16 Europe/Warsaw

## What was built

No application code was changed. Investigated the connected Arcjet MCP account and the NestJS project layout.

## Decisions made

Arcjet should be integrated as a NestJS infrastructure module/service and enforced through a shared guard, rather than instantiated in controllers.

## Problems solved

Confirmed the Arcjet MCP connection is active and its default team contains one site named `New site`. No secret key was retrieved or stored.

## Current state

The project is the Nest starter application. `example.env` already documents `ARCJET_ENV`, `ARCJET_KEY`, and `ARCJET_MODE`; `package.json` has no Arcjet package.

## Next session starts with

If implementation is requested, install the Arcjet Nest SDK, add a global Arcjet infrastructure module/service, add a global/shared protection guard, configure it from the existing environment variables, and verify request decisions through Arcjet MCP.

## Open questions

Which API routes and policies should be protected first (for example rate limiting, bot protection, or shield)?
