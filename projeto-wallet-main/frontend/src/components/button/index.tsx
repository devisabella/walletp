import { ButtonType } from "./style";
import * as S from "./style";
import { Text } from "../text";

type ButtonProps = {
  onClick: () => void;
  text: string;
  type?: ButtonType;
};

export function Button({ text, type = "SOLID", onClick }: ButtonProps) {
  const renderSolidButton = () => {
    return (
      <S.Button buttonType={type} onClick={onClick}>
        <Text size="P" weight="BOLD" color="WHITE">
          {text}
        </Text>
      </S.Button>
    );
  };

  const renderOutlineButton = () => {
    return (
      <S.Button buttonType={type} onClick={onClick}>
        <Text size="P" weight="BOLD" color="BLUE_DARK">
          {text}
        </Text>
      </S.Button>
    );
  };

  const renderDangerButton = () => {
    return (
      <S.Button buttonType={type} onClick={onClick}>
        <Text size="P" weight="BOLD" color="RED_DARK">
          {text}
        </Text>
      </S.Button>
    );
  };

  return type === "SOLID"
    ? renderSolidButton()
    : type === "OUTLINE"
    ? renderOutlineButton()
    : renderDangerButton();
}
