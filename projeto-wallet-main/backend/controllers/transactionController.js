const Transaction = require("../models/transactionModel");

const createTransaction = async (req, res) => {
  try {
    const { description, value, transactionType, date, obs } = req.body;
    const userId = req.user._id;

    if (!description || !value || !transactionType || !date) {
      return res.status(400).json({ error: "Preencha os campos obrigatórios" });
    }

    const transaction = new Transaction({
      description,
      value,
      transactionType,
      date,
      obs,
      userId,
    });

    await transaction.save();
    res.status(201).json({ message: "Transação criada com sucesso" });
  } catch (error) {
    res.status(500).json({ error: "Erro ao criar transação." });
  }
};

const getTransactions = async (req, res) => {
  try {
    const userId = req.user._id;

    const transactions = await Transaction.find({ userId }).sort({ date: -1 });

    res.status(200).json({ transactions });
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar transações." });
  }
};

const getTransactionsById = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user._id;

    const transaction = await Transaction.findOne({ _id: id, userId });

    if (!transaction) {
      return res.status(404).json({
        error: "Transação não encontrada ou não pertence ao usuário.",
      });
    }

    res.status(200).json({ transaction });
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar transações." });
  }
};

const editTransaction = async (req, res) => {
  try {
    const { id } = req.params;
    const { description, value, transactionType, date, obs } = req.body;
    const userId = req.user._id;

    const transaction = await Transaction.findOne({ _id: id, userId });

    if (!transaction) {
      return res.status(404).json({
        error: "Transação não encontrada ou não pertence ao usuário.",
      });
    }

    transaction.description = description || transaction.description;
    transaction.value = value || transaction.value;
    transaction.transactionType =
      transactionType || transaction.transactionType;
    transaction.date = date || transaction.date;
    transaction.obs = obs || transaction.obs;

    await transaction.save();

    res
      .status(200)
      .json({ message: "Transação editada com sucesso!", transaction });
  } catch (error) {
    res.status(500).json({ error: "Erro ao editar transação." });
  }
};

const deleteTransaction = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user._id;

    const transaction = await Transaction.findOneAndDelete({ _id: id, userId });

    if (!transaction) {
      return res.status(404).json({
        error: "Transação não encontrada ou não pertence ao usuário.",
      });
    }

    res.status(200).json({ message: "Transação deletada com sucesso!" });
  } catch (error) {
    res.status(500).json({ error: "Erro ao deletar transação." });
  }
};

module.exports = {
  createTransaction,
  getTransactions,
  editTransaction,
  deleteTransaction,
  getTransactionsById,
};
