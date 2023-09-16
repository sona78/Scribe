// import Sidebar from "../components/Sidebar"
import { Box, Button, Flex, Grid, GridItem, HStack, Heading, Spacer, Text } from "@chakra-ui/react"

export default function EditorPage() {
    return(
        <div className="home">
            {/* <Sidebar></Sidebar> */}
            <div className="home">
                <p>HOME PAGE</p>
            </div>
            <Grid
                h='calc(100vh)'
                templateRows='repeat(10, 1fr)'
                templateColumns='repeat(10, 1fr)'
                gap={4}
            >
            <GridItem rowSpan={10} colSpan={1} bg='tomato'>
                <Flex>
                    <Heading as="h1">Scribe</Heading>
                    <Spacer/>
                    <HStack spacing="20px">
                        <Text>email@gmail.com</Text>
                        <Button bg="tomato"></Button>
                    </HStack>
                </Flex>
            </GridItem>
            <GridItem rowSpan={1} colSpan={9} bg='papayawhip' />
            <GridItem rowSpan={10} colSpan={9} bg='papayawhip' />
            </Grid>

        </div>
        
    )
    
}