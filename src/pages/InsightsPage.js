// import Sidebar from "../components/Sidebar"
import { Box, Button, Flex, Grid, GridItem, HStack, Heading, Spacer, Text } from "@chakra-ui/react"
import ReactQuill from "react-quill";
import { useState } from "react";
import 'react-quill/dist/quill.snow.css';

export default function InsightsPage() {

    const [text, setText] = useState('');
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
            <GridItem rowSpan={1} colSpan={9} bg='papayawhip' />
            <GridItem rowSpan={9} colSpan={9}>
                <ReactQuill theme="snow" value={text} onChange={setText}>
                    <Box h={"71vh"}></Box>
                </ReactQuill>
            </GridItem>
            </Grid>

        </div>
        
    )
    
}