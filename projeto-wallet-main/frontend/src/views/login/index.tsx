import * as S from "./style";
import pigImage from "../../assets/pig.png";
import logoImage from "../../assets/logo.png";
import { Button, Input, Text, Toast } from "../../components";
import { useNavigate } from "react-router";
import { useState } from "react";
import api from "../../api";
import { AxiosError } from "axios";
import { AuthStorage } from "../../storage/authStorage";
import { UserStorage } from "../../storage/userStorage";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const goToRegister = () => {
    navigate("/cadastro");
  };

  const goToRecoverPassword = () => {
    navigate("/recuperarSenha");
  };

  const goToHome = () => {
    navigate("/home");
  };

  const handleLogin = async () => {
    try {
      const response = await api.post("/auth/login", {
        email,
        password,
      });
      UserStorage.saveUser(response.data.user);
      AuthStorage.saveToken(response.data.token);
      goToHome();
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
        <S.Welcome>
          <img src={logoImage} />
          <Text size="H1" weight="BOLD" color="GREEN_DARK">
            WalletWise
          </Text>
          <Text size="H3" weight="BOLD" color="GREEN_DARK">
            Dinheiro Sob Controle
          </Text>
        </S.Welcome>
        <S.Form>
          <Input
            placeholder="Insira seu email."
            onChange={(value) => {
              setEmail(value);
            }}
            type="user_email"
          />
          <Input
            placeholder="Insira sua senha."
            onChange={(value) => {
              setPassword(value);
            }}
            type="user_password"
          />
          <S.ForgotPasswordButton onClick={goToRecoverPassword}>
            Esqueceu sua senha?
          </S.ForgotPasswordButton>
        </S.Form>
        <S.ButtonContainer>
          <Button text="Entrar" onClick={handleLogin} />
        </S.ButtonContainer>
        {!!error && <Toast message={error} />}
        <S.RegisterTextContainer>
          <Text size="P" weight="BOLD" color="BLACK">
            Não possui uma conta?
          </Text>
        </S.RegisterTextContainer>
        <S.ButtonContainer>
          <Button text="Cadastrar" onClick={goToRegister} type="OUTLINE" />
        </S.ButtonContainer>
      </S.ContentContainer>
    </S.Container>
  );
}
