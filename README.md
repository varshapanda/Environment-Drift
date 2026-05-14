# env-drift-lab

A Node.js Express API that demonstrates environment drift between local development and Docker-based production environments.

---

## What This Repository Does

This repository is a hands-on demonstration of **environment drift** — the subtle but dangerous divergence that accumulates when an application is developed locally under one set of assumptions and deployed inside a container under different (or missing) configuration. It is the companion repository for **Lesson 1.9 — Fixing Environment Drift Across Dev and Production**.

The application itself is a minimal Express API. It starts, it responds, and it looks fine. The problems are in the configuration layer — and finding them is the assignment.

---

## Prerequisites

- **Node.js 20+** — [nodejs.org](https://nodejs.org)
- **Docker** — [docs.docker.com/get-docker](https://docs.docker.com/get-docker/)
- **Git** — [git-scm.com](https://git-scm.com)

---

## Quick Start — Local

```bash
# 1. Clone the repository
git clone https://github.com/kalviumcommunity/Environment-Drift.git
cd Environment-Drift

# 2. Copy the example environment file
cp .env.example .env

# 3. Open .env and fill in real values (at minimum, set JWT_SECRET)
# DATABASE_URL, JWT_SECRET, PORT, NODE_ENV

# 4. Install dependencies
npm ci

# 5. Start the server
node server.js

# 6. Verify the health endpoint
curl http://localhost:3000/health
```

---

## Running in Docker

### Build the image

```bash
docker build -t env-drift-lab .
```

### Run without environment variables (observe the failure)

```bash
docker run -p 3000:3000 env-drift-lab
```

> The container will start, but hit `/auth-check` — observe what happens when environment variables are not injected.

### Run with environment variables (the fix)

```bash
docker run -p 3000:3000 --env-file .env env-drift-lab
```

### Or with Docker Compose

```bash
docker compose up
```

---

## Known Issues (Intentional)

This repository contains **four sources of environment drift** that students must identify and fix as part of the Lesson 1.9 assignment. They are listed here by name — the investigation is yours.

| # | Issue | Location |
|---|-------|----------|
| 1 | **Hardcoded port** | `server.js` |
| 2 | **Missing environment variable injection** | `docker-compose.yml` |
| 3 | **Node.js runtime version mismatch** | `Dockerfile` |
| 4 | **JWT secret silent fallback** | `config.js` |

---

## Environment Variables Reference

| Variable | Required | Description | Example Value |
|----------|----------|-------------|---------------|
| `DATABASE_URL` | Yes | PostgreSQL connection string | `postgres://user:password@localhost:5432/driftlab` |
| `JWT_SECRET` | Yes | Secret key for signing tokens | `a-long-random-string` |
| `PORT` | No | Port the server listens on | `3000` |
| `NODE_ENV` | No | Runtime environment label | `development` |

---

## Health Endpoints

### `GET /health`

Returns the current Node.js runtime version and a timestamp.

```json
{
  "status": "ok",
  "node_version": "v20.11.0",
  "timestamp": "2025-01-15T10:30:00.000Z"
}
```

### `GET /auth-check`

Returns whether `JWT_SECRET` is set and non-empty in the current environment.

```json
{ "secret_configured": true }
```

```json
{ "secret_configured": false }
```

---

---

This repository is part of **Lesson 1.9 — Fixing Environment Drift**. Fork it, investigate the drift, apply the fixes.
