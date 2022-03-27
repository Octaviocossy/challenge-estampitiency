import { Box, Container, SimpleGrid, Text } from '@chakra-ui/react';
import { useEffect, useState } from 'react';

import api from './api';
import Card from './components/Card';
import Cart from './components/Cart';
import { Product } from './types';

const App = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    (async () => {
      setProducts(await api.list());
    })();
  }, []);

  return (
    <Container maxW={'container.xl'}>
      <Box boxShadow={'base'}>
        <Box
          as={'header'}
          borderBottom={'1px'}
          borderColor={'gray.200'}
          p={'16px'}
        >
          <Text fontSize={'24px'} fontWeight={'bold'}>
            Estampitiency
          </Text>
        </Box>
        <SimpleGrid
          as={'div'}
          gap={'12px'}
          m={0}
          minChildWidth="320px"
          p={'16px'}
        >
          {products.map((product) => (
            <Card key={product.id} product={product} />
          ))}
        </SimpleGrid>
        <Cart />
      </Box>
    </Container>
  );
};

export default App;
