import { Box, Button, Flex, Grid, GridItem, HStack, Heading, Spacer, Text, Center, Link } from "@chakra-ui/react"
import { useState } from "react";
import { Input } from '@chakra-ui/react'
import {Link as ReactRouterLink} from 'react-router-dom';

import Carousel from "../components/CardCarousel";
export default function InsightPage() {
    const [text, setText] = useState('');

    const CardData = [
        {
          text: "Card 1"
        },
        {
            text: "Card 2"
        },
        {
            text: "Card 3"
        },
        {
            text: "Card 4"
        },
        {
            text: "Card 5"
        },
    ];

    return(
        <div className="home">
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
                        <Text>email@gmail.com</Text>
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
            <GridItem rowSpan={1} colSpan={9} bg='papayawhip'>
                <Flex as="nav" alignItems="center">

                    <Text fontSize="20px">Insights</Text>
                    <Spacer/>
                    <Text fontSize="30px">Class</Text>
                    <Spacer/>
                    <HStack spacing="5px">
                        <Text fontSize="20px">Streak:</Text>
                        <Text fontSize="20px">12</Text>
                    </HStack>
                </Flex>
                
            </GridItem>
            <GridItem rowSpan={1} colSpan={9}>
                <Center>
                    <Input 
                        variant = 'outline' 
                        placeholder='Search' 
                        value={text}
                        onChange={setText}
                        size='md'
                        width='60%'
                    />
                </Center>
            </GridItem>
            <GridItem rowSpan={4} colSpan={4} bg="orange">
                <Carousel cards={CardData} />
            </GridItem>
            <GridItem rowSpan={4} colSpan={4} bg="orange">
                <Carousel cards={CardData} />
            </GridItem>
            <GridItem rowSpan={2} colSpan={8} marginTop={3} bg="gray.100">
                <Center >
                    <Text as="block" fontSize="30px">Topics</Text>  
                </Center>
                <Center >
                    <Text as="block" fontSize="15px">Links</Text>  
                </Center>
                
            </GridItem>
            </Grid>

        </div>
    )
}
