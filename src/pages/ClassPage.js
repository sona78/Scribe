// src/ClassPage.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Box,
  Text,
  Button,
  Collapse,
  VStack,
  HStack,
  Spacer,
  Grid,
  GridItem,
  FormControl,
  Input,
  Card,
  CardBody,
} from '@chakra-ui/react';
import { useEffect } from 'react';
import { Auth } from 'aws-amplify';
import { classCreate } from '../utils/utils';
import { getUser, userClassCreate } from '../utils/utils';
import uniqueHash from 'unique-hash';

function ClassPage() {
  const [classData, setClassData] = useState([]);
  const [openIndex, setOpenIndex] = useState(null);
  const [showAddClassForm, setShowAddClassForm] = useState(false); // State for showing/hiding the add class form
  const [newClassName, setNewClassName] = useState('');

  const [email, setEmail] = useState("");
  const [user, setUser] = useState({});

  useEffect(() => {
    Auth.currentAuthenticatedUser()
    .then((res) => {
        getUser(uniqueHash(res.attributes.email)).then((res) => {
          setUser(res.data.getUser);
          console.log(res.data.getUser);
        })
        setEmail(res.attributes.email);
        console.log(res.attributes.email);
    })
  },[])

  const toggleCollapse = (index) => {
    if (openIndex === index) {
      setOpenIndex(null);
    } else {
      setOpenIndex(index);
    }
  };

  const handleAddClassClick = () => {
    setShowAddClassForm(true);
  };

  const handleAddClassSubmit = () => {
    // Add the new class to classData
    const newClass = {
      Name: newClassName,
    };
    console.log(user);
    classCreate(newClass).then((res) => {
      console.log(res);
      classData.push(res.data.createClass);
      let newUserClass = {
        classId: res.data.createClass.id,
        userId: user.id,
      }
      userClassCreate(newUserClass).then((res) => {
        console.log(res);
      })
      console.log(res);
    });
    
    // Reset the form and hide it
    setNewClassName('');
    setShowAddClassForm(false);
  };

  const handleDeleteClass = (index) => {
    const updatedClassData = [...classData];
    updatedClassData.splice(index, 1);

    // Update the state with the modified array
    setClassData(updatedClassData);
  }

  return (
    <VStack spacing={4}>
      <Grid templateColumns="repeat(4, 1fr)" gap={4}>
        {classData.map((cls, index) => (
          <GridItem key={cls.id}>
            <Card>
                <CardBody>
                    <Box
                        p={4}
                        borderWidth="1px"
                        borderRadius="lg"
                        cursor="pointer"
                        width="400" height="200px"
                        >
                        <HStack>
                            <Text 
                                fontSize="lg"
                                fontWeight="bold">{cls.name}
                                
                            </Text>
                            <Spacer />
                            <Link to={`/notes/${cls.id}`}> 
                            {/* put proper link here */}
                            <Button size="sm">Take Notes</Button>
                            </Link>

                            {/* button to add users */}
                            <Button
                                size="sm"
                                onClick={() => toggleCollapse(index)}
                            >
                            Toggle Users
                            </Button>
                            {/* button to delete class */}
                            <Button
                                size="sm"
                                onClick={() => handleDeleteClass(index)}
                            >
                            Delete Class
                            </Button>
                        </HStack>
                        <Collapse in={openIndex === index}>
                            <VStack mt={2}>
                            {cls.users.map((user, userIndex) => (
                                <Text key={userIndex}>{user}</Text>
                            ))}
                            </VStack>
                        </Collapse>
                    </Box>
                </CardBody>
            </Card>
            
          </GridItem>
        ))}
      </Grid>
      {showAddClassForm ? (
        <FormControl>
          <Input
            type="text"
            placeholder="Enter class name"
            value={newClassName}
            onChange={(e) => setNewClassName(e.target.value)}
          />
          
          <Button mt={2} colorScheme="teal" onClick={handleAddClassSubmit}>
            Add Class
          </Button>
        </FormControl>
      ) : (
        <Button mt={2} colorScheme="blue" onClick={handleAddClassClick}>
          Add Class
        </Button>
      )}
    </VStack>
  );
}

export default ClassPage;
