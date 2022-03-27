import { Box, Button, Image, Text } from '@chakra-ui/react';
import { useContext } from 'react';

import { CartContext } from '../context';
import { Product } from '../types';

interface Props {
  product: Product;
}

const Card: React.FC<Props> = ({ product }) => {
  const { addProduct, handleButtons, removeProduct, quantityPerProduct } =
    useContext(CartContext);

  return (
    <Box display={'flex'} flexDirection={'column'} gap={'16px'}>
      <Image alt={product.title} src={product.image} w={'100%'} />
      <Box
        display={'flex'}
        flexDirection={'column'}
        gap={'6px'}
        height={'100%'}
        m={0}
      >
        <Text fontSize={'20px'} fontWeight={500}>
          {product.title}
        </Text>
        <Text color={'gray'}>{product.description}</Text>
      </Box>
      {handleButtons(product.id) ? (
        <Box
          alignItems={'center'}
          display={'flex'}
          justifyContent={'space-between'}
          maxH={'3rem'}
        >
          <Button
            colorScheme={'messenger'}
            p={'1.5rem 2rem'}
            onClick={() => removeProduct(product.id)}
          >
            -
          </Button>
          <Text fontSize={'20px'}>{quantityPerProduct(product.id)}</Text>
          <Button
            colorScheme={'messenger'}
            p={'1.5rem 2rem'}
            onClick={() => addProduct(product)}
          >
            +
          </Button>
        </Box>
      ) : (
        <Button
          colorScheme={'messenger'}
          p={'1.5rem'}
          onClick={() => addProduct(product)}
        >
          Agregar
        </Button>
      )}
    </Box>
  );
};

export default Card;
