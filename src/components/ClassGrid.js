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
  
export default function ClassGrid() {
  const [classData, setClassData] = useState([]);
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
      name: newClassName,
      users: [],
    };

    classData.push(newClass);
    console.log(classData);

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
            <GridItem key={cls.id} colSpan={2}>
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
    </div>
  )
}
