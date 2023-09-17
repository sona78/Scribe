import { Box,Card, CardBody, Button, Flex, Grid, GridItem, HStack, Heading, Spacer, Text, Center, Link } from "@chakra-ui/react"
import { useState } from "react";
import { Input } from '@chakra-ui/react'
import Sidebar from "../components/Sidebar";

import Carousel from "../components/CardCarousel";

import OpenAI from "openai"




export default function InsightPage() {
    const [text, setText] = useState("");
    const CardData = [
        {
          text: "Cardasdf 1"
        },
    ];

      const openai = new OpenAI({
        apiKey: "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",
        dangerouslyAllowBrowser: true // defaults to process.env["OPENAI_API_KEY"]
      });

    const [output, setOutput] = useState("");
    const [activeText , setActiveText] = useState("");

    const handleSearch = async (prompt) => {
        const completion = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [{ role: 'user', content: prompt }],
            temperature: 0.0
          })
          .then((res) => {
                setOutput(res.choices[0].message.content);
          })
    }

    return(
        <div className="home">
            <Grid
                h='calc(100vh)'
                templateRows='repeat(10, 1fr)'
                templateColumns='repeat(10, 1fr)'
                gap={4}
            >
            <GridItem rowSpan={1} colSpan={10} bg='purple.400' color="white" boxShadow={"lg"}>
                <Flex as="nav" alignItems="center">
                    <Heading as="h1" ml="15px">Scribe</Heading>
                    <Spacer/>
                    <HStack spacing="20px">
                        <Text></Text>
                        <Button bg="white">Logout</Button>
                    </HStack>
                </Flex>
            </GridItem>
            <GridItem rowSpan={9} colSpan={1} boxShadow={'lg'} borderRadius={"5"}>
                <Sidebar activeRoute={"I"} />
            </GridItem>
            <GridItem rowSpan={1} colSpan={9} bg='papayawhip'>
                <Flex as="nav" alignItems="center">

                    <Text fontSize="20px" >Insights</Text>
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
                        onChange={(e) => setText(e.target.value)}
                        size='md'
                        width='60%'
                    />
                    <Button onClick={() => {
                        handleSearch(text)
                        }}>Search</Button>
                </Center>
                <br/>
                    <Text>{output}</Text>
            </GridItem>
            <GridItem rowSpan={4} colSpan={4} bg="white">
            <Card h={300} >
                <CardBody>
                    <Text>{output}</Text>
                </CardBody>
                <Button onClick={() => handleSearch(`Create a summary about ${text}`)}>Create Flashcard</Button>
            </Card>
            </GridItem>
            <GridItem rowSpan={4} colSpan={4} bg="white">
                <Card h={300}>
            <CardBody>
                    <Text>{output}</Text>
                </CardBody>
                <Button onClick={() => handleSearch(`Create a question about ${text} to quiz the user about their understanding`)}>Create Flashcard</Button>
            </Card>
            </GridItem>
            <GridItem rowSpan={2} colSpan={8} marginTop={10} bg="gray.100">
                <Center >
                    <Text as="block" fontSize="30px" onClick={() => handleSearch(`Find educational resources about the subject of ${text} and put their links`)}>Topics</Text>  
                </Center>
                <Center >
                    <Text as="block" fontSize="15px">{output}</Text>  
                    <br/>
                </Center>
                
            </GridItem>
            </Grid>

        </div>
    )
}
