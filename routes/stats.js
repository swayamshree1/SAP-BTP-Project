// ─────────────────────────────────────────────────────────────────────────────
//  routes/stats.js — Dashboard Statistics API
//
//  GET  /api/stats   → Aggregated dashboard counts
//                      totalMaterials | lowStockCount | pendingPRs | activeOrders
// ─────────────────────────────────────────────────────────────────────────────

const express = require("express");
const router  = express.Router();
const store   = require("../store");

// ── GET /api/stats ───────────────────────────────────────────────────────────
router.get("/", (req, res) => {
  const stats = store.getStats();
  res.json({ success: true, data: stats, ...stats });
  // Spread stats at top level too so frontend can read d.totalMaterials directly
});

module.exports = router;
