const mongoose = require('mongoose');

const trasanctionSchema = new mongoose.Schema({
    transactionType: {type: String, enum: ['Receita', 'Despesa'], required: true},
    description: {type: String, required: true},
    value: {type: mongoose.Schema.Types.Decimal128, required: true},
    date: {type: Date, default: Date.now, required: true},
    obs: {type: String, required: false},
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
      },
}, {timestamps: true});

module.exports = mongoose.model('Transaction', trasanctionSchema);
