// ─────────────────────────────────────────────────────────────────────────────
//  routes/orders.js — Purchase Order API
//  SAP Equivalent: ME21N (Create PO), ME23N (Display PO), MIGO (Goods Receipt)
//
//  GET    /orders             → List all purchase orders
//  GET    /orders/:id         → Get single PO
//  POST   /orders/create      → Convert PR → PO
//  PUT    /orders/:id/receive → Receive goods (GRN) — SAP Mvt Type 101
// ─────────────────────────────────────────────────────────────────────────────

const express = require("express");
const router  = express.Router();
const store   = require("../store");

// ── GET /orders — list all purchase orders ───────────────────────────────────
router.get("/", (req, res) => {
  const orders = store.getAllPOs();
  res.json({ success: true, count: orders.length, data: orders });
});

// ── GET /orders/:id — get single PO ─────────────────────────────────────────
router.get("/:id", (req, res) => {
  const po = store.getPOById(req.params.id);
  if (!po) {
    return res.status(404).json({ success: false, message: `PO ${req.params.id} not found.` });
  }
  res.json({ success: true, data: po });
});

// ── POST /orders/create — convert PR to PO ───────────────────────────────────
router.post("/create", (req, res) => {
  const { prId, supplierName, unitPrice, deliveryDate } = req.body;

  // Validation
  if (!prId) {
    return res.status(400).json({ success: false, message: "PR ID is required." });
  }
  if (!supplierName || supplierName.trim() === "") {
    return res.status(400).json({ success: false, message: "Supplier / Vendor name is required." });
  }

  const po = store.createPO({
    prId,
    supplierName: supplierName.trim(),
    unitPrice,
    deliveryDate,
  });

  if (!po) {
    return res.status(400).json({
      success: false,
      message: `PR ${prId} not found or is not in Pending status. Only pending PRs can be converted to POs.`,
    });
  }

  res.status(201).json({ success: true, message: `PO ${po.id} issued to ${po.supplierName}.`, data: po });
});

// ── PUT /orders/:id/receive — goods receipt (GRN) ────────────────────────────
//  Simulates SAP MIGO — Movement Type 101: Goods Receipt against PO
//  Updates inventory quantity in material master on receipt
router.put("/:id/receive", (req, res) => {
  const po = store.receiveGoods(req.params.id);
  if (!po) {
    return res.status(400).json({
      success: false,
      message: `PO ${req.params.id} not found or goods already received.`,
    });
  }
  res.json({
    success: true,
    message: `Goods received for PO ${po.id}. Inventory updated (+${po.quantity} ${po.unit}).`,
    data: po,
  });
});

module.exports = router;
