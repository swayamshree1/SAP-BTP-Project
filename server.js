// ─────────────────────────────────────────────────────────────────────────────
//  server.js — Express Application Entry Point
//  SAP P2P Portal | TechNova Industries | KIIT SAP Program 2026
//
//  Start:  node server.js
//  Dev:    npm run dev  (requires nodemon)
//
//  API Base URL: http://localhost:3000
//
//  Routes:
//    GET  /api/stats              → Dashboard counts
//    GET  /materials              → All materials
//    POST /materials/add          → Add material
//    GET  /prs                    → All PRs
//    POST /prs/create             → Create PR
//    PUT  /prs/:id/cancel         → Cancel PR
//    GET  /orders                 → All POs
//    POST /orders/create          → Create PO (convert from PR)
//    PUT  /orders/:id/receive     → Receive goods (GRN)
// ─────────────────────────────────────────────────────────────────────────────

const express      = require("express");
const cors         = require("cors");
const path         = require("path");
const logger       = require("./backend/middleware/logger");
const errorHandler = require("./backend/middleware/errorHandler");

const materialsRouter = require("./backend/routes/materials");
const prsRouter       = require("./backend/routes/prs");
const ordersRouter    = require("./backend/routes/orders");
const statsRouter     = require("./backend/routes/stats");

const app  = express();
const PORT = process.env.PORT || 3000;

// ── Middleware ────────────────────────────────────────────────────────────────
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(logger);

// ── Static frontend ───────────────────────────────────────────────────────────
app.use(express.static(path.join(__dirname, "frontend")));

// ── API Routes ────────────────────────────────────────────────────────────────
app.use("/api/stats",  statsRouter);
app.use("/materials",  materialsRouter);
app.use("/prs",        prsRouter);
app.use("/orders",     ordersRouter);

// ── Health check ──────────────────────────────────────────────────────────────
app.get("/api/health", (req, res) => {
  res.json({
    status:  "ok",
    app:     "SAP P2P Portal — TechNova Industries",
    version: "1.0.0",
    uptime:  `${Math.floor(process.uptime())}s`,
    time:    new Date().toISOString(),
  });
});

// ── Catch-all: serve frontend for any non-API route ──────────────────────────
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "frontend", "index.html"));
});

// ── Global error handler (must be last) ──────────────────────────────────────
app.use(errorHandler);

// ── Start server ─────────────────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log("");
  console.log("  \x1b[34m╔══════════════════════════════════════════╗\x1b[0m");
  console.log("  \x1b[34m║\x1b[0m  \x1b[1mSAP P2P Portal — TechNova Industries\x1b[0m   \x1b[34m║\x1b[0m");
  console.log("  \x1b[34m║\x1b[0m  KIIT SAP Program 2026                   \x1b[34m║\x1b[0m");
  console.log("  \x1b[34m╚══════════════════════════════════════════╝\x1b[0m");
  console.log("");
  console.log(`  \x1b[32m✓\x1b[0m  Server running at \x1b[36mhttp://localhost:${PORT}\x1b[0m`);
  console.log(`  \x1b[32m✓\x1b[0m  API health:       \x1b[36mhttp://localhost:${PORT}/api/health\x1b[0m`);
  console.log("");
  console.log("  \x1b[90mPress Ctrl+C to stop\x1b[0m");
  console.log("");
});

module.exports = app;
