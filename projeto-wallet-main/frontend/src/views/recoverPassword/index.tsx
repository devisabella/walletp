import * as S from "./style";
import pigImage from "../../assets/pig.png";
import logoImage from "../../assets/logo.png";
import { Button, Input, Text, Toast } from "../../components";
import { useNavigate } from "react-router";
import { useState } from "react";
import api from "../../api";
import { AxiosError } from "axios";

export default function ResetPassword() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const goBack = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    navigate("/", { replace: true });
  };

  const handleSendEmail = async () => {
    try {
      const response = await api.post("/auth/forgot-password", {
        email,
      });
      setSuccess(response.data.message);
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
          <Text size="H1" weight="BOLD" color="GREEN_DARK">
            Recuperar senha
          </Text>
          <S.InfoTextContainer>
            <Text size="P" weight="REGULAR" color="BLACK">
              Enviaremos um email para você com as instruções de recuperação de
              senha.
            </Text>
          </S.InfoTextContainer>
          <S.InputContainer>
            <Input
              placeholder="Insira seu email."
              onChange={setEmail}
              hideLeftIcon
            />
          </S.InputContainer>
          <S.ButtonContainer>
            <Button text="Enviar" onClick={handleSendEmail} />
          </S.ButtonContainer>
          {!!error && <Toast message={error} />}
          {!!success && <Toast message={success} type="SUCCESS" />}
        </S.FormContainer>
      </S.ContentContainer>
    </S.Container>
  );
}
