import { useEffect, useState } from "react";
import * as S from "./style";
import { TransactionType } from "../../@types/transaction";

type Props = {
  onChange: (type: TransactionType) => void;
  defaultValue?: TransactionType;
};

export function RadioButton({ onChange, defaultValue }: Props) {
  const [selectedValue, setSelectedValue] = useState<string | null>(null);

  const handleChange = (value: string) => {
    onChange(value as TransactionType);
    setSelectedValue(value);
  };

  useEffect(() => {
    if (defaultValue) {
      setSelectedValue(defaultValue);
    }
  }, [defaultValue]);

  return (
    <S.RadioGroup>
      {["Receita", "Despesa"].map((option) => (
        <S.RadioContainer
          key={option}
          selected={selectedValue === option}
          onClick={() => handleChange(option)}
        >
          <S.HiddenRadio
            name="radio"
            value={option}
            checked={selectedValue === option}
            onChange={() => handleChange(option)}
          />
          <S.CustomRadio selected={selectedValue === option} />
          <S.Label>{option}</S.Label>
        </S.RadioContainer>
      ))}
    </S.RadioGroup>
  );
}
