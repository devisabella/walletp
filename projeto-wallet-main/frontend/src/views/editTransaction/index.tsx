import { useNavigate, useParams } from "react-router";
import {
  Button,
  Header,
  Input,
  RadioButton,
  Text,
  Toast,
} from "../../components";
import * as S from "./style";
import { useEffect, useState } from "react";
import { Transaction, TransactionType } from "../../@types/transaction";
import api from "../../api";
import { AxiosError } from "axios";
import { AuthStorage } from "../../storage/authStorage";
import { DateFormat } from "../../utils/dateFormat";
import { MoneyFormat } from "../../utils/moneyFormat";
import { InputError } from "../../utils/InputError";

export default function EditTransaction() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [transactionType, setTransactionType] = useState<TransactionType>();
  const [description, setDescription] = useState("");
  const [value, setValue] = useState<string>();
  const [date, setDate] = useState<Date>();
  const [defaultDate, setDefaultDate] = useState("");
  const [obs, setObs] = useState("");
  const [error, setError] = useState("");

  const goBack = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    goToHome();
  };

  const goToHome = () => {
    navigate("/home");
  };

  const handleDateChange = (value: string) => {
    const dateParse = DateFormat.parseDate(value);
    setDate(dateParse);
  };

  const getAuthHeader = () => {
    const token = AuthStorage.getToken();
    return token ? { Authorization: `Bearer ${token}` } : {};
  };

  const handleEditTransaction = async () => {
    try {
      const parseValue = MoneyFormat.parseCurrency(value!);
      await api.put(
        `/transactions/${id}`,
        {
          transactionType,
          description,
          value: parseValue,
          date,
          obs,
        },
        {
          headers: getAuthHeader(),
        }
      );
      goToHome();
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.response) {
          setError(error.response?.data.error);
        } else {
          setError("Ocorreu um erro. Tente novamente mais tarde");
        }
      } else if (error instanceof InputError) {
        setError(error.message);
      } else {
        setError("Ocorreu um erro. Tente novamente mais tarde");
      }
    }
  };

  const handleDeleteTransaction = async () => {
    try {
      await api.delete(`/transactions/${id}`, {
        headers: getAuthHeader(),
      });

      goToHome();
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

  const fetchTransaction = async () => {
    try {
      const { data } = await api.get(`/transactions/${id}`, {
        headers: getAuthHeader(),
      });
      const transaction: Transaction = data.transaction;
      setDefaultDate(DateFormat.formatDate(String(transaction.date)));
      setDescription(transaction.description);
      setObs(transaction.obs);
      setValue(
        MoneyFormat.getValueFromDatabase(transaction.value)
          .toString()
          .replace(".", ",")
      );
      setTransactionType(transaction.transactionType);
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
    fetchTransaction();
  }, []);

  return (
    <div>
      <Header />
      <S.Container>
        <S.Title>
          <S.GoBackButton
            className="ph-fill ph-arrow-circle-left"
            onClick={goBack}
          />
          <Text size="H2" weight="REGULAR" color="GREEN_DARK">
            Editar transação
          </Text>
        </S.Title>
        <Text size="P" weight="REGULAR" color="BLACK">
          Selecione o tipo de transação
        </Text>
        <RadioButton
          onChange={setTransactionType}
          defaultValue={transactionType}
        />
        <S.InputRequiredContainer>
          <S.InputDescriptionContainer>
            <Input
              onChange={setDescription}
              defaultValue={description}
              placeholder="Insira uma descrição para a sua transação."
              label="Descrição:"
            />
          </S.InputDescriptionContainer>
          <S.InputDefaultContainer>
            <Input
              onChange={setValue}
              defaultValue={value}
              placeholder="Insira o valor."
              label="Valor:"
            />
          </S.InputDefaultContainer>
          <S.InputDefaultContainer>
            <Input
              onChange={handleDateChange}
              defaultValue={defaultDate}
              placeholder="Insira a data."
              label="Data:"
              type="date"
            />
          </S.InputDefaultContainer>
        </S.InputRequiredContainer>
        <S.InputDefaultContainer>
          <Input
            onChange={setObs}
            defaultValue={obs}
            placeholder=""
            label="Observação (opcional):"
          />
        </S.InputDefaultContainer>
        <S.ButtonGroupContainer>
          <S.ButtonContainer>
            <Button
              text="Excluir lançamento"
              onClick={handleDeleteTransaction}
              type="DANGER"
            />
          </S.ButtonContainer>
          <S.ButtonContainer>
            <Button text="Salvar alterações" onClick={handleEditTransaction} />
          </S.ButtonContainer>
        </S.ButtonGroupContainer>
        {!!error && <Toast message={error} />}
      </S.Container>
    </div>
  );
}
