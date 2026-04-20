# SAP-BTP-Project

### TechNova Industries | KIIT SAP Program 2026

![SAP MM](https://img.shields.io/badge/SAP-MM%20Module-0070f3?style=flat-square&logo=sap)
![HTML](https://img.shields.io/badge/Frontend-HTML%2FCSS%2FJS-e34c26?style=flat-square)

A fully functional, browser-based simulation of the **SAP MM Procure-to-Pay (P2P)** process cycle — built as a capstone project for the KIIT SAP Program 2026.

---

## 🔄 P2P Process Flow

```
Material Master → Purchase Requisition → Purchase Order → Goods Receipt (GRN)
```

This portal simulates all four stages of the procurement cycle as practised in SAP MM:

| Stage | SAP Equivalent | T-Code |
|-------|---------------|--------|
| Material Master | MM01 / MMBE | MM60 |
| Purchase Requisition | ME51N | ME52N |
| Purchase Order | ME21N | ME23N |
| Goods Receipt (GRN) | MIGO | MB52 |

---

## ✨ Features

- **Dashboard** — Real-time stats: total materials, low-stock alerts, pending PRs, active POs
- **Material Master** — Add and manage inventory with reorder thresholds and stock-level bars
- **Purchase Requisitions** — Create PRs from material master, approve or cancel
- **Purchase Orders** — Convert pending PRs to POs with supplier, unit price, and delivery date
- **Goods Receipt (GRN)** — Receive goods against PO; inventory auto-updated on receipt
- **Low Stock Alerts** — Automatic detection and one-click PR creation from dashboard
- **Toast Notifications** — Real-time feedback on every action

---

## 🗂️ Project Structure

```
sap-p2p-portal/
├── frontend/
│   └── index.html          # Single-file application (HTML + CSS + JS)
├── docs/
│   └── TechNova_SAP_P2P_Project.pdf   # Project documentation
├── screenshots/
│   └── (add screenshots here before submission)
├── README.md
├── .gitignore
└── LICENSE
```

---

## 🚀 How to Run

No installation required. This is a pure frontend application.

```bash
# Option 1 — Open directly in browser
open frontend/index.html

# Option 2 — Serve locally with Python
cd frontend
python -m http.server 8080
# Then open http://localhost:8080
```

---

## 🧪 Sample Workflow to Test

1. Open `frontend/index.html` in any browser
2. Go to **Inventory** → The app loads with 5 seed materials
3. Note that **MAT-1002** (Cisco Switch) and **MAT-1004** (Cat6 Cable) are below threshold
4. Go to **Dashboard** → Low Stock Alerts are highlighted
5. Click **Create PR** on a low-stock item → Fill in quantity → Submit
6. Go to **Purchase Requisitions** → PR is listed as `Pending`
7. Click **→ PO** → Enter supplier name + unit price + delivery date → Issue PO
8. Go to **Purchase Orders** → PO is listed as `Ordered`
9. Click **Receive GRN** → Status changes to `Goods Received`, inventory updates

---

## 📋 SAP MM Concepts Demonstrated

| Concept | Implementation |
|---------|---------------|
| Material Master | Materials table with ID, name, qty, unit, threshold |
| Reorder Point Planning | Automatic low-stock detection vs threshold |
| Purchase Requisition | PR with material, qty, remarks, status lifecycle |
| PR → PO Conversion | Direct conversion with supplier and pricing |
| Goods Receipt (MIGO) | GRN button updates inventory quantity |
| 3-Way Match (simulated) | PO qty matched against GRN before stock update |
| Document Numbering | Auto-generated MAT-XXXX, PR-XXXX, PO-XXXX series |

---

## 🏢 Company Details

| Field | Value |
|-------|-------|
| Company | TechNova Industries Pvt. Ltd. |
| Industry | IT / Technology |
| Company Code | TN01 |
| Plant | TN01 — Hyderabad |
| Purchase Org | TN-PORG |
| Storage Location | WH01 |

---

## 🛠️ Tech Stack

- **Frontend:** Vanilla HTML5, CSS3, JavaScript (ES6+)
- **Fonts:** IBM Plex Mono, IBM Plex Sans (Google Fonts)
- **Data:** In-memory JavaScript store (no backend/database required)
- **Deployment:** Static file — runs directly in browser

---

## 📄 License

MIT License — free to use for educational purposes.

---

*Capstone Project | KIIT SAP Program 2026*
