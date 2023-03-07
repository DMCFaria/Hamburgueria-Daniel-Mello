import { useContext } from 'react';
import { StyledProductCard } from './style';
import { StyledButton } from '../../../styles/button';
import { StyledParagraph, StyledTitle } from '../../../styles/typography';
import { CartContext } from '../../../providers/CartContext';

const ProductCard = () => {
  const { toAdd, searchList } = useContext(CartContext);

  return (
    <>
      {searchList.map((item: any) => {
        const { id, name, category, img, price } = item;

        return (
          <StyledProductCard key={id}>
            <div className='imageBox'>
              <img src={img} alt={name} />
            </div>
            <div className='content'>
              <StyledTitle tag='h3' $fontSize='three'>
                {name}
              </StyledTitle>
              <StyledParagraph className='category'>{category}</StyledParagraph>
              <StyledParagraph className='price'>
                R$ {price.toFixed(2)}
              </StyledParagraph>
              <StyledButton
                $buttonSize='medium'
                $buttonStyle='green'
                onClick={() => toAdd(item)}
              >
                Adicionar
              </StyledButton>
            </div>
          </StyledProductCard>
        );
      })}
    </>
  );
};

export default ProductCard;
