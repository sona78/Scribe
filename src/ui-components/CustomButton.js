import React from 'react';
import { Button as ChakraButton } from '@chakra-ui/react';

const CustomButton = ({ children, ...rest }) => (
  <ChakraButton
    as="button" // Render as an HTML button element
    bgColor="green.500"
    color="white"
    borderRadius='full'
    textColor='white'
    shadow={"lg"}
    boxShadow={'lg'}
    _hover={{ bgColor: 'yellow.400' }}
    {...rest}

  >
    {children}
  </ChakraButton>
);




export default CustomButton;