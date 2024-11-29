import { InputError } from "./InputError";

function formatCurrency(value: number) {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value);
}

function parseCurrency(value: string) {
  const cleanedInput = value.trim();

  if (/^\d+(,\d+)?$/.test(cleanedInput)) {
    return parseFloat(cleanedInput.replace(",", "."));
  } else {
    throw new InputError(
      "Valor de transação inválido. Insira um valor númerico sem pontos, apenas com vírgulas para casa decimais."
    );
  }
}

function getValueFromDatabase(value: any) {
  return parseFloat(value.$numberDecimal);
}

export const MoneyFormat = Object.freeze({
  formatCurrency,
  parseCurrency,
  getValueFromDatabase,
});
