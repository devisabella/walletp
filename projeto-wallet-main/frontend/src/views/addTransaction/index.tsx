import { useNavigate } from "react-router";
import {
  Button,
  Header,
  Input,
  RadioButton,
  Text,
  Toast,
} from "../../components";
import * as S from "./style";
import { useState } from "react";
import { TransactionType } from "../../@types/transaction";
import api from "../../api";
import { AxiosError } from "axios";
import { AuthStorage } from "../../storage/authStorage";
import { DateFormat } from "../../utils/dateFormat";
import { MoneyFormat } from "../../utils/moneyFormat";
import { InputError } from "../../utils/InputError";

export default function AddTransaction() {
  const navigate = useNavigate();

  const [transactionType, setTransactionType] = useState<TransactionType>();
  const [description, setDescription] = useState("");
  const [value, setValue] = useState<number>();
  const [date, setDate] = useState<Date>();
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

  const handleAddTransaction = async () => {
    try {
      const parseValue = MoneyFormat.parseCurrency(String(value));
      await api.post(
        "/transactions",
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
            Adicionar transação
          </Text>
        </S.Title>
        <Text size="P" weight="REGULAR" color="BLACK">
          Selecione o tipo de transação
        </Text>
        <RadioButton onChange={setTransactionType} />
        <S.InputRequiredContainer>
          <S.InputDescriptionContainer>
            <Input
              onChange={setDescription}
              placeholder="Insira uma descrição para a sua transação."
              label="Descrição:"
            />
          </S.InputDescriptionContainer>
          <S.InputDefaultContainer>
            <Input
              onChange={setValue}
              placeholder="Insira o valor."
              label="Valor:"
            />
          </S.InputDefaultContainer>
          <S.InputDefaultContainer>
            <Input
              onChange={handleDateChange}
              placeholder="Insira a data."
              label="Data:"
              type="date"
            />
          </S.InputDefaultContainer>
        </S.InputRequiredContainer>
        <S.InputDefaultContainer>
          <Input
            onChange={setObs}
            placeholder=""
            label="Observação (opcional):"
          />
        </S.InputDefaultContainer>
        <S.ButtonContainer>
          <Button text="Adicionar" onClick={handleAddTransaction} />
        </S.ButtonContainer>
        {!!error && <Toast message={error} />}
      </S.Container>
    </div>
  );
}
