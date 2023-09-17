// src/ClassPage.js

import { classCreate } from '../utils/utils';
import { Box, Button, useToast, Flex, Grid, GridItem, HStack, Heading, Link, Spacer, Text, Input } from "@chakra-ui/react"
import ReactQuill from "react-quill";
import { useState, useEffect } from "react";
import { withAuthenticator } from '@aws-amplify/ui-react';
import {Auth} from "aws-amplify";
import { Storage } from "aws-amplify";
import StartModal from "../components/StartModal";
import 'react-quill/dist/quill.snow.css';
import '@aws-amplify/ui-react/styles.css';
import {Link as ReactRouterLink} from 'react-router-dom';
import { VStack, Card, CardBody, Collapse, FormControl } from '@chakra-ui/react';

import ClassGrid from '../components/ClassGrid';

function ClassPage() {
  
  return (
    <div className="base">
      <Grid
          h='calc(100vh)'
          templateRows='repeat(10, 1fr)'
          templateColumns='repeat(10, 1fr)'
          gap={4}
      >
      <GridItem rowSpan={1} colSpan={10} bg='tomato'>
          <Flex as="nav" alignItems="center">
              <Heading as="h1">Scribe</Heading>
              <Spacer/>
              <HStack spacing="20px">
                  <Button bg="white">Logout</Button>
              </HStack>
          </Flex>
      </GridItem>
      <GridItem rowSpan={9} colSpan={1} bg='tomato'>
          <Box borderWidth='1px' borderColor='black' p="20px" bg="orange">
              <Button>
                  <Link as={ReactRouterLink} to="/">Notes</Link>
              </Button>
          </Box>
          <Box borderWidth='1px' borderColor='black' p="20px" bg="orange">
              <Button>
                  <Link as={ReactRouterLink}  to="/classes">Classes</Link>
              </Button>
          </Box>
          <Box borderWidth='1px' borderColor='black' p="20px" bg="orange">
          <   Button>
                  <Link as={ReactRouterLink}  to="/insights">Insights</Link>
              </Button>
          </Box>
      </GridItem>

      <GridItem rowSpan={9} colSpan={9} >
        <ClassGrid >

        </ClassGrid>
      </GridItem>
      </Grid>
    </div>

    
  );
}

export default ClassPage;

    


