import { useNavigate } from "react-router";
import { DateFormat } from "../../utils/dateFormat";
import { MoneyFormat } from "../../utils/moneyFormat";
import { Text } from "../text";
import * as S from "./style";

type Props = {
  id: string;
  description: string;
  date: Date;
  value: number;
} & S.ItemProps;

export function TransactionItem({ id, date, description, value, type }: Props) {
  const navigate = useNavigate();

  const goToTransactionDetail = () => {
    navigate(`/editarTransação/${id}`);
  };

  return (
    <S.Item>
      <S.Icon
        className={type == "Receita" ? "ph ph-arrow-up" : "ph ph-arrow-down"}
        type={type}
      />
      <S.TextContainer>
        <Text size="H5" weight="REGULAR" color="BLACK">
          {description}
        </Text>
      </S.TextContainer>
      <S.TextContainer>
        <Text size="H5" weight="REGULAR" color="BLACK">
          {MoneyFormat.formatCurrency(MoneyFormat.getValueFromDatabase(value))}
        </Text>
      </S.TextContainer>
      <S.TextContainer>
        <Text size="H5" weight="REGULAR" color="BLACK">
          {DateFormat.formatDate(String(date))}
        </Text>
      </S.TextContainer>
      <S.TransactionDetailButton onClick={goToTransactionDetail}>
        <Text size="H5" weight="REGULAR" color="BLUE_DARK">
          Detalhar
        </Text>
      </S.TransactionDetailButton>
    </S.Item>
  );
}
