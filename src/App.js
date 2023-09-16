import React from 'react';
import {
  ChakraProvider,
  Box,
  Text,
  Link,
  VStack,
  Code,
  Grid,
  theme,
} from '@chakra-ui/react';

import {BrowserRouter, Routes, Route} from "react-router-dom";

// import c
import EditorPage from './pages/EditorPage';
function App() {
  return (
    <div className="app">
      
      <ChakraProvider theme={theme}>
      <BrowserRouter>
          <main>
            <Routes>
              <Route path="/" element={<EditorPage/>} />
              {/* <Route path="/signup" element={<SignUp/>}/> */}
            </Routes>
          </main>
        </BrowserRouter>
          {/* <Box textAlign="center" fontSize="xl">
            <Grid minH="100vh" p={3}>
              <ColorModeSwitcher justifySelf="flex-end" />
              <VStack spacing={8}>
                <Logo h="40vmin" pointerEvents="none" />
                <Text>
                  Edit <Code fontSize="xl">src/App.js</Code> and save to reload.
                </Text>
                <Link
                  color="teal.500"
                  href="https://chakra-ui.com"
                  fontSize="2xl"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Learn Chakra
                </Link>
              </VStack>
            </Grid>
          </Box> */}
        </ChakraProvider>
        
    </div>
    
  );
}

export default App;

