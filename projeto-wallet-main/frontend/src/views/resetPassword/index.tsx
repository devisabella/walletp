import * as S from "./style";
import pigImage from "../../assets/pig.png";
import logoImage from "../../assets/logo.png";
import { Button, Input, Text, Toast } from "../../components";
import { useNavigate, useParams } from "react-router";
import { useState } from "react";
import api from "../../api";
import { AxiosError } from "axios";

export default function RecoverPassword() {
  const navigate = useNavigate();
  const { token } = useParams();

  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const goBack = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    navigate("/", { replace: true });
  };

  const handleResetPassword = async () => {
    try {
      const response = await api.post(`/auth/reset-password/${token}`, {
        newPassword: password,
        confirmNewPassword: passwordConfirmation,
      });
      setError("");
      setSuccess(response.data.message);
    } catch (error) {
      if (error instanceof AxiosError) {
        setSuccess("");
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

  return (
    <S.Container>
      <img src={pigImage} />
      <S.ContentContainer>
        <S.GoBackButton
          className="ph-fill ph-arrow-circle-left"
          onClick={goBack}
        />
        <S.Logo>
          <img src={logoImage} width={73} height={79} />
          <Text size="H3" weight="BOLD" color="GREEN_DARK">
            WalletWise
          </Text>
        </S.Logo>
        <S.FormContainer>
          <S.Title>
            <Text size="H1" weight="BOLD" color="GREEN_DARK">
              Resetar senha
            </Text>
          </S.Title>
          <S.InputContainer>
            <Input
              placeholder="Insira sua senha."
              onChange={(value) => {
                setPassword(value);
              }}
              type="user_password"
              label="Senha"
              hideLeftIcon
            />
          </S.InputContainer>
          <S.InputContainer>
            <Input
              placeholder="Confirme sua senha."
              onChange={(value) => {
                setPasswordConfirmation(value);
              }}
              type="user_password"
              label="Confirmação da senha"
              hideLeftIcon
            />
          </S.InputContainer>
          <S.ButtonContainer>
            <Button text="Enviar" onClick={handleResetPassword} />
          </S.ButtonContainer>
          {!!error && <Toast message={error} />}
          {!!success && <Toast message={success} type="SUCCESS" />}
        </S.FormContainer>
      </S.ContentContainer>
    </S.Container>
  );
}
