// ─────────────────────────────────────────────────────────────────────────────
//  routes/materials.js — Material Master API
//  SAP Equivalent: MM01 (Create), MMBE (Stock Overview), MM60 (Reporting)
//
//  GET    /materials          → List all materials
//  GET    /materials/:id      → Get single material
//  POST   /materials/add      → Add new material
// ─────────────────────────────────────────────────────────────────────────────

const express = require("express");
const router  = express.Router();
const store   = require("../store");

// ── GET /materials — list all materials ──────────────────────────────────────
router.get("/", (req, res) => {
  const materials = store.getAllMaterials();
  res.json({ success: true, count: materials.length, data: materials });
});

// ── GET /materials/:id — get single material ─────────────────────────────────
router.get("/:id", (req, res) => {
  const mat = store.getMaterialById(req.params.id);
  if (!mat) {
    return res.status(404).json({ success: false, message: `Material ${req.params.id} not found.` });
  }
  res.json({ success: true, data: mat });
});

// ── POST /materials/add — add new material ────────────────────────────────────
router.post("/add", (req, res) => {
  const { name, quantity, unit, threshold } = req.body;

  // Validation
  if (!name || name.trim() === "") {
    return res.status(400).json({ success: false, message: "Material name is required." });
  }
  if (quantity === undefined || isNaN(parseInt(quantity)) || parseInt(quantity) < 0) {
    return res.status(400).json({ success: false, message: "Valid quantity (>= 0) is required." });
  }
  if (!threshold || isNaN(parseInt(threshold)) || parseInt(threshold) < 1) {
    return res.status(400).json({ success: false, message: "Valid reorder threshold (>= 1) is required." });
  }
  if (!unit || unit.trim() === "") {
    return res.status(400).json({ success: false, message: "Unit of measure is required." });
  }

  const material = store.addMaterial({ name: name.trim(), quantity, unit, threshold });
  res.status(201).json({ success: true, message: "Material added to master.", data: material });
});

module.exports = router;
