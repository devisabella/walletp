import { Text } from "../text";
import * as S from "./style";

type Props = {
  message: string;
  type?: "ERROR" | "SUCCESS";
};

export function Toast({ message, type = "ERROR" }: Props) {
  return (
    <S.Toast type={type}>
      <Text size="P" weight="BOLD" color="WHITE">
        {message}
      </Text>
    </S.Toast>
  );
}
