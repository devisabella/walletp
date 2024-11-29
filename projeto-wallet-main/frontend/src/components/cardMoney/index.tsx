import * as S from "./style";
import { Text } from "../text";
import { MoneyFormat } from "../../utils/moneyFormat";

type Props = {
  label: string;
  value: number;
} & S.CardMoneyProps;

export function CardMoney({ type, label, value }: Props) {
  return (
    <S.Card type={type}>
      <Text size="H4" weight="REGULAR" color="WHITE">
        {label}
      </Text>
      <S.ValueContainer>
        <Text size="H2" weight="REGULAR" color="WHITE">
          {MoneyFormat.formatCurrency(value)}
        </Text>
      </S.ValueContainer>
    </S.Card>
  );
}
