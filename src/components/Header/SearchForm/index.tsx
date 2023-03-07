import { MdSearch } from 'react-icons/md';
import { useContext } from 'react';
import { StyledSearchForm } from './style';
import { StyledButton } from '../../../styles/button';
import { CartContext } from '../../../providers/CartContext';

const SearchForm = () => {
  const { searchCart } = useContext(CartContext);

  return (
    <StyledSearchForm>
      <input type='text' placeholder='Digitar pesquisa' onChange={searchCart} />
      <StyledButton type='submit' $buttonSize='medium' $buttonStyle='green'>
        <MdSearch />
      </StyledButton>
    </StyledSearchForm>
  );
};

export default SearchForm;
