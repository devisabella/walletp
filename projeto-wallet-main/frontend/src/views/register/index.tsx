import * as S from "./style";
import pigImage from "../../assets/pig.png";
import logoImage from "../../assets/logo.png";
import { Button, Input, Text, Toast } from "../../components";
import { useNavigate } from "react-router";
import { useEffect, useState } from "react";
import api from "../../api";
import { AxiosError } from "axios";

export default function Register() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [error, setError] = useState("");

  const goBack = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    navigate("/");
  };

  const handleRegister = async () => {
    try {
      await api.post("/auth/register", {
        name,
        email,
        password,
        passwordConfirmation,
      });
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
    setError("");
  }, []);

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
        <Text size="H1" weight="BOLD" color="GREEN_DARK">
          Criar conta
        </Text>
        <S.Form>
          <S.InputContainer>
            <Input
              placeholder="Insira seu nome."
              onChange={(value) => {
                setName(value);
              }}
              label="Nome"
            />
          </S.InputContainer>
          <S.InputContainer>
            <Input
              placeholder="Insira seu email."
              onChange={(value) => {
                setEmail(value);
              }}
              label="Email"
            />
          </S.InputContainer>
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
        </S.Form>
        <S.ButtonContainer>
          <Button text="Cadastrar" onClick={() => handleRegister()} />
        </S.ButtonContainer>
        {!!error && <Toast message={error} />}
      </S.ContentContainer>
    </S.Container>
  );
}
