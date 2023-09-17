import React from 'react';
import { Button as ChakraButton } from '@chakra-ui/react';

const CustomButton = ({ children, ...rest }) => (
  <ChakraButton
    as="button" // Render as an HTML button element
    bgColor="purple.400"
    color="white"
    borderRadius='full'
    _hover={{ bgColor: 'purple.500' }}
    {...rest}

  >
    {children}
  </ChakraButton>
);




export default CustomButton;