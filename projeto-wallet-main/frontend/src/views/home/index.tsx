import * as S from "./style";
import {
  Button,
  CardMoney,
  Header,
  Text,
  Toast,
  TransactionItem,
} from "../../components";
import { useNavigate } from "react-router";
import { useEffect, useState } from "react";
import { Transaction } from "../../@types/transaction";
import api from "../../api";
import { AxiosError } from "axios";
import { AuthStorage } from "../../storage/authStorage";
import { MoneyFormat } from "../../utils/moneyFormat";

export default function Home() {
  const navigate = useNavigate();
  const [transactions, setTransactions] = useState<Transaction[]>();
  const [totalEntries, setTotalEntries] = useState(0);
  const [totalExists, setTotalExists] = useState(0);
  const [balance, setBalance] = useState(0);
  const [error, setError] = useState("");

  const goAddTransaction = () => {
    navigate("/adicionarTransação");
  };

  const getAuthHeader = () => {
    const token = AuthStorage.getToken();
    return token ? { Authorization: `Bearer ${token}` } : {};
  };

  const fetchTransactions = async () => {
    try {
      const { data } = await api.get("/transactions", {
        headers: getAuthHeader(),
      });

      const transactions: Transaction[] = data.transactions;

      const entries = transactions.reduce((sum, item) => {
        if (item.transactionType === "Receita") {
          return sum + MoneyFormat.getValueFromDatabase(item.value);
        }
        return sum;
      }, 0);

      setTotalEntries(entries);

      const exists = transactions.reduce((sum, item) => {
        if (item.transactionType === "Despesa") {
          return sum + MoneyFormat.getValueFromDatabase(item.value);
        }
        return sum;
      }, 0);

      setTotalExists(exists);

      setBalance(entries - exists);

      setTransactions(transactions);
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.response) {
          setError(error.response?.data.error);
        } else {
          setError("Ocorreu um erro. Tente novamente mais tarde");
        }
      } else {
        setError("Ocorreu um erro. Tente novamente mais tarde");
      }
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  return (
    <div>
      <Header />
      <S.Container>
        <S.CardsContainer>
          <CardMoney
            label="Saldo em dinheiro"
            value={balance}
            type={balance < 0 ? "danger" : "success"}
          />
          <CardMoney
            label="Total em receitas"
            value={totalEntries}
            type="success"
          />
          <CardMoney
            label="Total em despesas"
            value={totalExists}
            type="danger"
          />
        </S.CardsContainer>
        {!!error && <Toast message={error} />}
        <S.TransactionsHeader>
          <Text size="H2" weight="REGULAR" color="GREEN_DARK">
            Suas transações
          </Text>
          <S.ButtonContainer>
            <Button text="Adicionar lançamento" onClick={goAddTransaction} />
          </S.ButtonContainer>
        </S.TransactionsHeader>
        <S.TransactionsContainer>
          {transactions?.map((item) => (
            <TransactionItem
              date={item.date}
              description={item.description}
              type={item.transactionType}
              value={item.value}
              id={item._id}
            />
          ))}
        </S.TransactionsContainer>
      </S.Container>
    </div>
  );
}
