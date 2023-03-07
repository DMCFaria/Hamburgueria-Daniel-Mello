import { UseFormRegister } from 'react-hook-form';
import { StyledTextField } from '../../../styles/form';
import { StyledParagraph } from '../../../styles/typography';
import { StyledFieldset } from './style';

interface iInput {
  name: string;
  label: string;
  type: 'text' | 'email' | 'password';
  placeholder: string;
  defaultValue?: string;
  register: UseFormRegister<any>;
  errors: any;
}

const Input = ({
  name,
  label,
  type,
  placeholder,
  defaultValue,
  errors,
  register,
}: iInput) => (
  <StyledFieldset>
    <StyledTextField
      label={label}
      type={type}
      placeholder={placeholder}
      defaultValue={defaultValue}
      {...register(name)}
    />
    {errors && <StyledParagraph fontColor='red'>{errors}</StyledParagraph>}
  </StyledFieldset>
);

export default Input;
