import React from "react";
import * as S from "./style";

type TextComponentProps = S.TextProps & {
  children: React.ReactNode;
};

export function Text({ children, size, weight, color }: TextComponentProps) {
  return (
    <S.Text size={size} weight={weight} color={color}>
      {children}
    </S.Text>
  );
}
