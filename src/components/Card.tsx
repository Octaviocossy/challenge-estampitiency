import { Box, Button, Image, Text } from '@chakra-ui/react';

import { useCart } from '../context';
import { CartItem, Product } from '../types';

interface Props {
  product: Product;
}

const Card: React.FC<Props> = ({ product }) => {
  const {
    actions: { handleAdd, handleDecrement, handleIncrement },
    state: { cart },
  } = useCart();
  const cartItem = cart.get(product.id) as CartItem;

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
      {cartItem ? (
        <Box
          alignItems={'center'}
          display={'flex'}
          justifyContent={'space-between'}
          maxH={'3rem'}
        >
          <Button
            colorScheme={'messenger'}
            p={'1.5rem 2rem'}
            onClick={() => handleDecrement(product.id)}
          >
            -
          </Button>
          <Text fontSize={'20px'}>{cartItem.count}</Text>
          <Button
            colorScheme={'messenger'}
            p={'1.5rem 2rem'}
            onClick={() => handleIncrement(product.id)}
          >
            +
          </Button>
        </Box>
      ) : (
        <Button
          colorScheme={'messenger'}
          p={'1.5rem'}
          onClick={() => handleAdd(product)}
        >
          Agregar
        </Button>
      )}
    </Box>
  );
};

export default Card;
