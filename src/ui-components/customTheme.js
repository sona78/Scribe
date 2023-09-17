
import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
  components: {
    Button: {
      baseStyle: {
        borderRadius: 'md',
      },
      sizes: {
        lg: {
          fontSize: 'xl',
          padding: '12px 24px',
        },
      },
      variants: {
        primary: {
          bgGradient: 'linear(to-r, teal.200, teal.500)',
          color: 'white',
          _hover: {
            bgGradient: 'linear(to-r, teal.300, teal.600)',
          },
        },
      },
    },
  },
});

export default theme;
