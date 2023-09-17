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
import CustomButton from "../ui-components/CustomButton";




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
    const [activeNote, setActiveNote] = useState("");
    const [activeClassNotes, setActiveClassNotes] = useState([]);
  

    const [classes, setClasses] = useState([]);

    useEffect(() => {
        Storage.list('') // for listing ALL files without prefix, pass '' instead
        .then(({ results }) => {
        console.log(results);
        let userNotes = [];
        for (let i = 0; i < results.length; i++) {
            const sections = results[i].key.split('/');
            console.log(sections);
            if (sections[0] === String(user.Email)) {
                userNotes.push(results[i]);
            }
        }
        console.log(userNotes);
        let notes = [];
        for (let i = 0; i < userNotes.length; i++) {
            const sections = userNotes[i].key.split('/');
            console.log(sections);
            if (sections[1] === String(activeClass)) {
                notes.push(userNotes[i]);
            }
        }
        setActiveClassNotes(notes);
        console.log(notes)
        })
        .catch((err) => console.log(err));
    },[activeClass])
    
    const activateNote = async (note) => {
        setActiveNote(note);
        const response = await Storage.get(note);

        const jsonDataResponse = await fetch(response);
        // const data = JSON.parse(response);
        console.log(jsonDataResponse)
        if (jsonDataResponse.ok) {
            // Parse the JSON data
            const data = await jsonDataResponse.json();
            setText(data.content);
        }
    }

    const fetchJsonData = async () => {
        try {
          // Replace 'your-json-file-key' with the actual key of your JSON file in AWS S3.
          const jsonKey = 'your-json-file-key';
  
          // Fetch the JSON file from AWS S3 using Amplify Storage
          const response = await Storage.get(jsonKey);
        
          
          // Parse the JSON data
          const data = JSON.parse(response);
  
          // Set the JSON data in the state variable
        } catch (error) {
          console.error('Error fetching JSON data:', error);
        }
      };

    const saveNote = async () => {
        const file = `${user.Email}/${activeClass}/${fileName}.json`;
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
                templateColumns='repeat(11, 1fr)'
                gap={3}
            >
            <GridItem rowSpan={1} colSpan={11} bg='purple.400' color="white" boxShadow={"lg"}>
                <Flex as="nav" alignItems="center">
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
            <GridItem rowSpan={9} colSpan={1} bg='white' boxShadow={'lg'} borderRadius={"5"} align="center">
                <Text variant="textLarge" as="b" color="purple.500">All Notes</Text>
               {activeClassNotes.map((note) => (
                     <Button margin={2} key={note.key} onClick={() => activateNote(note.key)}>{note.key.split("/")[2]}</Button>
               ))}
            </GridItem>
            <GridItem rowSpan={1} colSpan={9} bg='papayawhip'>
                <HStack spacing="20px">
                    <CustomButton>Save</CustomButton>
                    <CustomButton>Export</CustomButton>
                    <CustomButton>Share</CustomButton>
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
                    <CustomButton size = 'lg'p='20px' rightIcon={<AiFillSave/>} onClick={saveNote}>Save</CustomButton></Box><br/>
                <ReactQuill theme="snow" value={text} onChange={setText}>
                    
                </ReactQuill>
            </GridItem>
            </Grid>

        </div>
        </>
        
    )
    
}

export default withAuthenticator(EditorPage);