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
  import { Link } from 'react-router-dom';
  import { useState } from 'react';
  import { classCreate, userClassCreate } from '../utils/utils';
  
export default function ClassGrid({classData, user}) {
  const [openIndex, setOpenIndex] = useState(null);
  const [showAddClassForm, setShowAddClassForm] = useState(false); // State for showing/hiding the add class form
  const [newClassName, setNewClassName] = useState('');

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

    classData.push(newClass);
    console.log(classData);

    classCreate(newClass).then
    ((res) => {
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
    </div>
  )
}
