import { Box, Button, Flex, Grid, GridItem, HStack, Heading, Spacer, Text, Center } from "@chakra-ui/react"
import { useState } from "react";
import { Input } from '@chakra-ui/react'

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
                    <Button>Notes</Button>
                </Box>
                <Box borderWidth='1px' borderColor='black' p="20px" bg="orange">
                    <Button>Classes</Button>
                </Box>
                <Box borderWidth='1px' borderColor='black' p="20px" bg="orange">
                <Button>Insights</Button>
                </Box>
            </GridItem>
            <GridItem rowSpan={1} colSpan={9} bg='papayawhip'>
                <Flex as="nav" alignItems="center">
                    <Text fontSize="30px">Insights</Text>
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
            <GridItem rowSpan={7} colSpan={9}>
                <Carousel cards={CardData} />
            </GridItem>
            </Grid>

        </div>
    )
}
