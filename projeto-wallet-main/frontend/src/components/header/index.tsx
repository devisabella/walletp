import * as S from "./style";
import { Text } from "../text";
import { useNavigate } from "react-router";
import { UserStorage } from "../../storage/userStorage";
import { AuthStorage } from "../../storage/authStorage";

export function Header() {
  const navigate = useNavigate();

  const logout = () => {
    navigate("/");
    UserStorage.clearUser();
    AuthStorage.clearToken();
  };

  return (
    <S.Header>
      <Text size="P" weight="BOLD" color="WHITE">
        Olá, {UserStorage.getUser().name || "erro"}
      </Text>
      <S.LogoutButton onClick={logout}>
        <Text size="P" weight="BOLD" color="WHITE">
          Sair
        </Text>
        <i className="ph-bold ph-sign-out"></i>
      </S.LogoutButton>
    </S.Header>
  );
}
