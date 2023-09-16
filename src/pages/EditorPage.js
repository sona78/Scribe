// import Sidebar from "../components/Sidebar"
import { Box, Button, useToast, Flex, Grid, GridItem, HStack, Heading, Link, Spacer, Text, Input } from "@chakra-ui/react"
import ReactQuill from "react-quill";
import { useState, useEffect } from "react";
import { withAuthenticator } from '@aws-amplify/ui-react';
import {Auth} from "aws-amplify";
import { Storage } from "aws-amplify";
import StartModal from "../components/StartModal";
import {AiFillSave} from "react-icons/ai";
import 'react-quill/dist/quill.snow.css';
import '@aws-amplify/ui-react/styles.css';

function EditorPage() {

    useEffect(() => {
        Auth.currentAuthenticatedUser()
        .then((res) => {
            setEmail(res.attributes.email);
            setNewUser(false);
            console.log(res.attributes.email);
        })
    },[])

    const [text, setText] = useState("");
    const [editIsOpen, setEditIsOpen] = useState(true);
    const [user, setUser] = useState({});
    const [newUser, setNewUser] = useState(false);
    const [email, setEmail] = useState("");
    const toast = useToast();


    const saveNote = async () => {
        const file = `${email}/${Date.now()}.json`;
        const data = {
            content: text
        }
        await Storage.put(file, JSON.stringify(data));
    }
    return(
        <>
        <StartModal
            isOpen={editIsOpen}
            setIsOpen={setEditIsOpen}
            user={user}
            setUser={setUser}
            newUser={newUser}
            setNewUser={setNewUser}
            toast={toast}
        />
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
                        <Link onClick={() => setEditIsOpen(true)}>{email}</Link>
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
            <GridItem rowSpan={9} colSpan={9} margin={5}>
                <Box display="flex"><Input placeholder="Title" /><Button onClick={saveNote} rightIcon={<AiFillSave/>}>Save</Button></Box><br/>
                <ReactQuill theme="snow" value={text} onChange={setText}>
                    
                </ReactQuill>
            </GridItem>
            </Grid>

        </div>
        </>
        
    )
    
}

export default withAuthenticator(EditorPage);