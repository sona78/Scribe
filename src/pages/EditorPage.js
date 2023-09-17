// import Sidebar from "../components/Sidebar"
import { Select, Box, Button, useToast, Flex, Grid, GridItem, HStack, Heading, Link, Spacer, Text, Input } from "@chakra-ui/react"
import ReactQuill from "react-quill";
import { useState, useEffect } from "react";
import { withAuthenticator } from '@aws-amplify/ui-react';
import {Auth} from "aws-amplify";
import { Storage } from "aws-amplify";
import StartModal from "../components/StartModal";
import uniqueHash from "unique-hash";
import {AiFillSave} from "react-icons/ai";
import { getUser } from "../utils/utils";
import 'react-quill/dist/quill.snow.css';
import '@aws-amplify/ui-react/styles.css';
import {Link as ReactRouterLink} from 'react-router-dom';


function EditorPage() {

    useEffect(() => {
        Auth.currentAuthenticatedUser()
        .then((res) => {
            getUser(uniqueHash(res.attributes.email)).then((res) => {
                console.log(res);
              setUser(res.data.getUser);
              if (res.data.getUser != null){
                console.log(res.data.getUser.Classes.items)
                setUserClasses(res.data.getUser.Classes.items)
              }
              
            })
            setNewUser(false);
            setEmail(res.attributes.email);
            console.log(res.attributes.email);
        })
    },[])

    const [text, setText] = useState("");
    const [editIsOpen, setEditIsOpen] = useState(true);
    const [user, setUser] = useState({});
    const [userClasses, setUserClasses] = useState([])
    const [newUser, setNewUser] = useState(false);
    const [email, setEmail] = useState("");
    const [fileName, setFileName] = useState("");
    const [activeClass, setActiveClass] = useState("")
    const toast = useToast();


    const saveNote = async () => {
        const file = `${email}/${Date.now()}.json`;
        const data = {
            content: text
        }
        await Storage.put(file, JSON.stringify(data))
        .then((res) => {
            console.log(res);
            toast({
                title: "File Saved",
                status: "success",
                duration: 3000,
                isClosable: true,
              });
        })
    }
    return(
        <>
        <StartModal
            isOpen={editIsOpen}
            setIsOpen={setEditIsOpen}
            email={email}
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
                <HStack spacing="20px">
                    <Button>Save</Button>
                    <Button>Export</Button>
                    <Button>Share</Button>
                </HStack>
            </GridItem>
            <GridItem rowSpan={9} colSpan={9}>
                <Select style={{color:"#000000"}}  placeholder='Choose Class' >
                    {userClasses.map((cls) => (
                         <option value={cls.class.id}>{cls.class.Name}</option>
                    ))}
                </Select>
                    
                <Box display="flex"><Input placeholder="Title" value={fileName} onChange={(e) =>{setFileName(e.target.value)}}/><Button rightIcon={<AiFillSave/>} onClick={saveNote}>Save</Button></Box><br/>
                <ReactQuill theme="snow" value={text} onChange={setText}>
                    
                </ReactQuill>
            </GridItem>
            </Grid>

        </div>
        </>
        
    )
    
}

export default withAuthenticator(EditorPage);