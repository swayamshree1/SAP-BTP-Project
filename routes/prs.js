// ─────────────────────────────────────────────────────────────────────────────
//  routes/prs.js — Purchase Requisition API
//  SAP Equivalent: ME51N (Create PR), ME52N (Change PR), ME53N (Display PR)
//
//  GET    /prs               → List all PRs
//  GET    /prs/:id           → Get single PR
//  POST   /prs/create        → Create new PR
//  PUT    /prs/:id/cancel    → Cancel a pending PR
// ─────────────────────────────────────────────────────────────────────────────

const express = require("express");
const router  = express.Router();
const store   = require("../store");

// ── GET /prs — list all purchase requisitions ────────────────────────────────
router.get("/", (req, res) => {
  const prs = store.getAllPRs();
  res.json({ success: true, count: prs.length, data: prs });
});

// ── GET /prs/:id — get single PR ─────────────────────────────────────────────
router.get("/:id", (req, res) => {
  const pr = store.getPRById(req.params.id);
  if (!pr) {
    return res.status(404).json({ success: false, message: `PR ${req.params.id} not found.` });
  }
  res.json({ success: true, data: pr });
});

// ── POST /prs/create — create new purchase requisition ───────────────────────
router.post("/create", (req, res) => {
  const { materialId, quantity, remarks } = req.body;

  // Validation
  if (!materialId) {
    return res.status(400).json({ success: false, message: "Material ID is required." });
  }
  if (!quantity || isNaN(parseInt(quantity)) || parseInt(quantity) < 1) {
    return res.status(400).json({ success: false, message: "Valid quantity (>= 1) is required." });
  }

  const pr = store.createPR({ materialId, quantity, remarks });
  if (!pr) {
    return res.status(404).json({ success: false, message: `Material ${materialId} not found in master.` });
  }

  res.status(201).json({ success: true, message: "Purchase Requisition created.", data: pr });
});

// ── PUT /prs/:id/cancel — cancel a pending PR ────────────────────────────────
router.put("/:id/cancel", (req, res) => {
  const pr = store.cancelPR(req.params.id);
  if (!pr) {
    return res.status(400).json({
      success: false,
      message: `PR ${req.params.id} not found or is not in Pending status.`,
    });
  }
  res.json({ success: true, message: `PR ${pr.id} cancelled.`, data: pr });
});

module.exports = router;
