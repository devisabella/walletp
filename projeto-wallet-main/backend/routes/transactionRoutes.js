const express = require("express");
const { authenticate } = require("../middlewares/authMiddleware");

const {
  createTransaction,
  getTransactions,
  editTransaction,
  deleteTransaction,
  getTransactionsById,
} = require("../controllers/transactionController");

const router = express.Router();

router.post("/", authenticate, createTransaction);
router.get("/", authenticate, getTransactions);
router.get("/:id", authenticate, getTransactionsById);
router.put("/:id", authenticate, editTransaction);
router.delete("/:id", authenticate, deleteTransaction);

module.exports = router;
