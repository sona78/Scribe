
import { useEffect } from 'react';
import { Auth } from 'aws-amplify';
import { classCreate, userClassCreate } from '../utils/utils';

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
  import { Storage} from 'aws-amplify';
  import { getUser } from '../utils/utils';
  import uniqueHash from 'unique-hash';

function ClassPage() {
  const [classData, setClassData] = useState([]);
  const [openIndex, setOpenIndex] = useState(null);
  const [showAddClassForm, setShowAddClassForm] = useState(false); // State for showing/hiding the add class form
  const [newClassName, setNewClassName] = useState('');
  const [user, setUser] = useState({});
  const [email, setEmail] = useState("");

  
  useEffect(() => {
    Auth.currentAuthenticatedUser()
    .then((res) => {
        getUser(uniqueHash(res.attributes.email)).then((res) => {
            console.log(res);
          setUser(res.data.getUser);
          if (res.data.getUser != null){
            console.log(res.data.getUser.Classes.items)
            setClassData(res.data.getUser.Classes.items)
          }
          
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

  const handleAddClassSubmit = async () => {
    // Add the new class to classData
    const newClass = {
      Name: newClassName,
    };
    classCreate(newClass).then
    ((res) => {
      classData.push(res.data.createClass);
      const newUserClass = {
        classId: res.data.createClass.id,
        userId: user.id,
      }
      userClassCreate(newUserClass)
      .then((res) => {
        console.log(res);
      })
      
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
        <ClassGrid classData={classData} user={user}>

        </ClassGrid>
      </GridItem>
      </Grid>
    </div>

    
  );
}

export default ClassPage;

    


