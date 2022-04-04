import { Box, Text } from '@chakra-ui/react';

import { useCart } from '../context';

const Cart: React.FC = () => {
  const {
    state: { total, count },
  } = useCart();

  return (
    <Box
      as="aside"
      bg={'messenger.500'}
      borderRadius={'4px'}
      bottom={7}
      lineHeight={'53px'}
      margin={'0.7rem auto 16px auto'}
      maxW={'fit-content'}
      paddingX={'16px'}
      position={'sticky'}
      shadow={'dark-lg'}
    >
      <Text color={'white'} fontSize={'18px'} fontWeight={500}>
        {count} productos (total: $ {total})
      </Text>
    </Box>
  );
};

export default Cart;
