
import { useEffect } from 'react';
import { Auth } from 'aws-amplify';
import { classCreate } from '../utils/utils';

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
    Flex,
    Heading
  } from '@chakra-ui/react';
  import { Link } from 'react-router-dom';
  import { useState } from 'react';
  import {Link as ReactRouterLink} from 'react-router-dom';
  import ClassGrid from '../components/ClassGrid';
<<<<<<< HEAD


function ClassPage() {
const [classData, setClassData] = useState([]);
=======
  import { Storage} from 'aws-amplify';

function ClassPage() {
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

  const handleAddClassSubmit = async () => {
    // Add the new class to classData
    const newClass = {
      Name: newClassName,
    };
    classCreate(newClass).then
    ((res) => {
      classData.push(res.data.createClass);
      console.log(res);
    });

    const file = `public/${classData.Name}.json`;
    const data = {
        className: classData.Name,
        students: classData.users,
    }

    await Storage.put(file, JSON.stringify(data))
    

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
>>>>>>> b944792e16772861370da5b2a9d946173d06f3f0

  return (
    <div className="base">
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

      <GridItem rowSpan={9} colSpan={9} >
        <ClassGrid classData={classData}>

        </ClassGrid>
      </GridItem>
      </Grid>
    </div>

    
  );
}

export default ClassPage;

    


