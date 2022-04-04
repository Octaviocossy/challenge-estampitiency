import React from 'react';
import { render } from 'react-dom';
import { ChakraProvider } from '@chakra-ui/react';

import App from './App';
import { Provider } from './context';

render(
  <React.StrictMode>
    <ChakraProvider>
      <Provider>
        <App />
      </Provider>
    </ChakraProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
