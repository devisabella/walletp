import React, { useEffect, useRef, useState } from "react";
import * as S from "./style";
import Inputmask from "inputmask";

import { Text } from "../text";

type InputProps = {
  onChange: (value: any) => void;
  placeholder: string;
  type?: "default" | "user_password" | "user_email" | "date";
  hideLeftIcon?: boolean;
  defaultValue?: string;
  label?: string;
};

export function Input({
  onChange,
  type = "default",
  hideLeftIcon,
  placeholder,
  defaultValue,
  label,
}: InputProps) {
  const [active, setIsActive] = useState(false);
  const [isShowingPassword, setIsShowingPassword] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleFocus = () => {
    setIsActive(true);
  };

  const handleBlur = () => {
    setIsActive(false);
  };

  const handleShowPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setIsShowingPassword(!isShowingPassword);
  };

  const getValue = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value);
  };

  const renderUserEmailInput = () => {
    return (
      <>
        {label && (
          <S.Label>
            <Text size="P" weight="REGULAR" color="BLACK">
              {label}
            </Text>
          </S.Label>
        )}

        <S.InputContainer
          active={active}
          onFocus={handleFocus}
          onBlur={handleBlur}
        >
          {!hideLeftIcon && <S.Icon className="ph ph-user" />}
          <S.Input type="text" placeholder={placeholder} onChange={getValue} />
        </S.InputContainer>
      </>
    );
  };

  const renderUserPasswordInput = () => {
    return (
      <>
        {label && (
          <S.Label>
            <Text size="P" weight="REGULAR" color="BLACK">
              {label}
            </Text>
          </S.Label>
        )}

        <S.InputContainer
          active={active}
          onFocus={handleFocus}
          onBlur={handleBlur}
        >
          {!hideLeftIcon && <S.Icon className="ph ph-lock-key" />}
          <S.Input
            type={isShowingPassword ? "text" : "password"}
            placeholder={placeholder}
            onChange={getValue}
          />
          <S.ShowPassowrdButton
            className={
              isShowingPassword ? "ph-fill ph-eye" : "ph-fill ph-eye-slash"
            }
            onClick={handleShowPassword}
          />
        </S.InputContainer>
      </>
    );
  };

  const renderDefaultInput = () => {
    return (
      <>
        {label && (
          <S.Label>
            <Text size="P" weight="REGULAR" color="BLACK">
              {label}
            </Text>
          </S.Label>
        )}

        <S.InputContainer
          active={active}
          onFocus={handleFocus}
          onBlur={handleBlur}
        >
          <S.Input
            type="text"
            placeholder={placeholder}
            onChange={getValue}
            defaultValue={defaultValue}
          />
        </S.InputContainer>
      </>
    );
  };

  const renderDateInput = () => {
    return (
      <>
        {label && (
          <S.Label>
            <Text size="P" weight="REGULAR" color="BLACK">
              {label}
            </Text>
          </S.Label>
        )}

        <S.InputContainer
          active={active}
          onFocus={handleFocus}
          onBlur={handleBlur}
        >
          <S.Input
            ref={inputRef} // Referência para aplicar a máscara
            type="text"
            placeholder={placeholder}
            onChange={getValue}
            defaultValue={defaultValue}
          />
        </S.InputContainer>
      </>
    );
  };

  useEffect(() => {
    if (type === "date" && inputRef.current) {
      Inputmask("99/99/9999").mask(inputRef.current); // Aplica a máscara de data
    }
  }, [type]);

  return type === "date"
    ? renderDateInput()
    : type === "user_email"
    ? renderUserEmailInput()
    : type === "user_password"
    ? renderUserPasswordInput()
    : renderDefaultInput();
}
