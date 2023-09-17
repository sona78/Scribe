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
import Sidebar from "../components/Sidebar";




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
            .catch((err) => {
                setNewUser(true);
                setEditIsOpen(true);
            });
            setEmail(res.attributes.email);
            console.log(res.attributes.email);
        })
    },[])

    const [text, setText] = useState("");
    const [editIsOpen, setEditIsOpen] = useState(false);
    const [user, setUser] = useState({});
    const [userClasses, setUserClasses] = useState([])
    const [newUser, setNewUser] = useState(false);
    const [email, setEmail] = useState("");
    const [fileName, setFileName] = useState("");
    const toast = useToast();
    const [activeClass, setActiveClass] = useState("");
    const [fileDisplay, setFileDisplay] = useState([]);
  

    const [classes, setClasses] = useState([]);

    useEffect(() => {
        Storage.list(`public/${user.Email}/${activeClass}`) // for listing ALL files without prefix, pass '' instead
        .then(({ results }) => setFileDisplay(results))
        .catch((err) => console.log(err));
    },[activeClass])
    

    const saveNote = async () => {
        const file = fileName + ".json";
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
            <GridItem rowSpan={1} colSpan={10} bg='purple.400' color="white" boxShadow={"xl"}> 
                <Flex as="nav" alignItems="center" justify-content="center">
                    <Heading as="h1" ml="15px">Scribe</Heading>
                    <Spacer/>
                    <HStack spacing="20px">
                        <Link onClick={() => setEditIsOpen(true)}>{email}</Link>
                        <Button bg="white">Logout</Button>
                    </HStack>
                </Flex>
            </GridItem>
            <GridItem rowSpan={9} colSpan={1} bg='white' boxShadow={'lg'} borderRadius={"5"}>
                <Sidebar activeRoute={"N"}/>
            </GridItem>
            <GridItem rowSpan={1} colSpan={9} bg='papayawhip'>
                <HStack spacing="20px">
                    <Button>Save</Button>
                    <Button>Export</Button>
                    <Button>Share</Button>
                </HStack>
            </GridItem>
            <GridItem rowSpan={9} colSpan={9}>                    
                <Box display="flex">
                <Select style={{color:"#000000"}} value={activeClass} onChange={(e) => {
                    setActiveClass(e.target.value)
                    }} placeholder='Choose Class' >
                    {userClasses.map((cls) => (
                         <option value={cls.class.id}>{cls.class.Name}</option>
                    ))}
                </Select>
                    <Input placeholder="Title" value={fileName} onChange={(e) =>{setFileName(e.target.value)}}/>
                    <Button rightIcon={<AiFillSave/>} onClick={saveNote}>Save</Button></Box><br/>
                <ReactQuill theme="snow" value={text} onChange={setText}>
                    
                </ReactQuill>
            </GridItem>
            </Grid>

        </div>
        </>
        
    )
    
}

export default withAuthenticator(EditorPage);