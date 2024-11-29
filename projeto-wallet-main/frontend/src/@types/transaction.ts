export type TransactionType = "Receita" | "Despesa";

export type Transaction = {
  _id: string;
  transactionType: TransactionType;
  description: string;
  value: number;
  date: Date;
  obs: string;
};
