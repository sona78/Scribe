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
    Modal, 
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
  } from '@chakra-ui/react';
  import { Link } from 'react-router-dom';
  import { useEffect, useState } from 'react';
  import { classCreate, userClassCreate } from '../utils/utils';
  import { useDisclosure } from '@chakra-ui/react';
  import CustomInputField from '../ui-components/CustomInputField';
import { Form } from 'react-bootstrap';
import { Auth } from 'aws-amplify';
import { Storage} from 'aws-amplify';
import { getUser } from '../utils/utils';
import uniqueHash from 'unique-hash';

export default function ClassGrid({user, setUser}) {
  const [openIndex, setOpenIndex] = useState(null);
  const [showAddClassForm, setShowAddClassForm] = useState(false); // State for showing/hiding the add class form
  const [newClassName, setNewClassName] = useState('');
  const {isOpen, onOpen, onClose} = useDisclosure();
  const [classData, setClassData] = useState([])

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


    classCreate(newClass).then
    ((res) => {
      classData.push({class:res.data.createClass});
      console.log(classData)
      const newUserClass = {
        classId: res.data.createClass.id,
        userId: user.id,
      }
      userClassCreate(newUserClass)
      .then((res) => {
        console.log(res);
      })
      
    });

    // Reset the form and hide it
    setNewClassName('');
    setShowAddClassForm(false);

  };

  const handleDeleteClass = (index) => {
    const updatedClassData = [...classData];
    updatedClassData.splice(index, 1);

    // Update the state with the modified array
    //setClassData(updatedClassData);
  }
  
  const handleBoth = (e) => {
    handleAddClassSubmit();
    handleAddClassClick();
    onClose();
    e.preventDefault();
  }

  useEffect(() => {
    Auth.currentAuthenticatedUser()
    .then((res) => {
      console.log(res)
        getUser(uniqueHash(res.attributes.email)).then((res) => {
            console.log(res);
          setUser(res.data.getUser);
          if (res.data.getUser != null){
            console.log(res.data.getUser.Classes.items)
            setClassData(res.data.getUser.Classes.items)
          }
          
        })
        console.log(res.attributes.email);
      })
  },[])

  useEffect(() => {
    console.log("CHANGEd")
  }, [classData])
  
  return (
    <div className='classgrid'>
        <Grid templateColumns="repeat(4, 1fr)" gap={4}>
          {classData.length !== 0 && classData.map((cls, index) => (
            <GridItem key={cls.class.id} colSpan={2}>
              <Card>
                  <CardBody>
                      <Box
                          p={4}
                          borderWidth="1px"
                          borderRadius="lg"
                          cursor="pointer"
                        >
                        <HStack>
                            <Text 
                                fontSize="lg"
                                fontWeight="bold">{cls.class.Name}
                            </Text>
                            <Spacer />
                            <Link to={`/notes/${cls.class.id}`}> 
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
                            {cls.class.users && cls.class.users.map((user, userIndex) => (
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

        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
            <ModalContent>
              <Form onSubmit={(e) => {handleBoth(e)}}>
                <Input 
                type="text"
                placeholder="Enter class name"
                value={newClassName}
                onChange={(e) => setNewClassName(e.target.value)}>
              </Input>
              </Form>
            </ModalContent>
        </Modal>

        
        <Button mt={2} color='white' bg="green.500" _hover={{bgColor: 'yellow.400'}} onClick={onOpen}>
          Add Class
        </Button>


    </div>
  )
}
