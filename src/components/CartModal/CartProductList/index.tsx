import { useContext } from 'react';
import CartProductCard from './CartProductCard';
import { StyledCartProductList } from './style';
import { StyledButton } from '../../../styles/button';
import { StyledParagraph } from '../../../styles/typography';
import { CartContext } from '../../../providers/CartContext';

const CartProductList = () => {
  const { carts, remove } = useContext(CartContext);
  const total = carts.reduce((totalMoney, cart) => {
    return totalMoney + Number(cart.price);
  }, 0);

  return (
    <StyledCartProductList>
      <ul>
        <CartProductCard />
      </ul>

      <div className='totalBox'>
        <StyledParagraph>
          <strong>Total</strong>
        </StyledParagraph>
        <StyledParagraph className='total'>{total.toFixed(2)}</StyledParagraph>
      </div>
      <StyledButton $buttonSize='default' $buttonStyle='gray' onClick={remove}>
        Remover todos
      </StyledButton>
    </StyledCartProductList>
  );
};

export default CartProductList;
