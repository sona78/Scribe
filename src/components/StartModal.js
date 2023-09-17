import {
    Box,
    Icon,
    CloseButton,
    Text,
    Flex,
    FormControl,
    useToast,
    FormLabel,
    Input,
    Modal,
    ModalBody,
    ModalContent,
    Avatar,
    AvatarBadge,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Button,
    Center,
  } from "@chakra-ui/react";
  import React, {useEffect, useRef, useState} from "react";
  import { Container, Form } from "react-bootstrap";
  import { API, Auth } from "aws-amplify";
  import * as queries from "../graphql/queries";
  import * as mutations from "../graphql/mutations";
  import { FaDice } from "react-icons/fa";
  import { AiOutlineUserAdd } from "react-icons/ai";
  import {userCreate, userUpdate} from "../utils/utils"
  import uniqueHash from "unique-hash"
  
  function StartModal(props) {
    const [isOpen, setIsOpen] = [props.isOpen, props.setIsOpen];
  
    const [user, setUser] = [props.user, props.setUser];
    const [newUser, setNewUser] = [props.newUser, props.setNewUser];
    const toast = props.toast;
    const email = props.email
  
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
  
    const handleFirstNameChange = (e) => {
      setFirstName(e.target.value);
    };
  
    const handleLastNameChange = (e) => {
      setLastName(e.target.value);
    };

    const handleEditSubmit = async () => {
      const name = firstName + " " + lastName;
      if (firstName != "" && lastName != "") {
          if (user != null && JSON.stringify(user) !== "{}") {
            let newUser = {
              id: uniqueHash(email),
              Email: email,
              Name: name,
            };
            userUpdate(newUser).then((res) => {
              setUser(res.data.updateUser);
              setIsOpen(false);
              toast({
                title: "User Information Updated",
                status: "success",
                duration: 3000,
                isClosable: true,
              });
            });
          } else {
            let newUser = {
                id: uniqueHash(email),
                Email: email,
                Name: name,
              };
  
            userCreate(newUser).then((res) => {
              setUser(newUser);
              setNewUser(false);
              setIsOpen(false);
              toast({
                title: "User Information Updated",
                description: "Now let's get betting!",
                status: "success",
                duration: 3000,
                isClosable: true,
              });
            });
          }
      } else {
        toast({
          title: "Invalid Entry",
          description: "Please fill out all fields",
          status: "warning",
          duration: 3000,
          isClosable: true,
        });
      }
    };
  
    return (
      <Modal isOpen={isOpen}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader mb={-5}>
            <Box
              width={"100%"}
              display={"inline-flex"}
              alignItems={"center"}
              justifyContent={"space-between"}
            >
              <CloseButton
                color="#ffffff"
                size="lg"
              />
              <CloseButton
                color={"formLabelColor"}
                size="lg"
                onClick={() => setIsOpen(false)}
              />
            </Box>
          </ModalHeader>
          <Form>
            <ModalBody>
              <Box mb={4}>
                <Text color="formTitleColor" fontWeight={600} fontSize={"lg"}>
                  Account Information
                </Text>
                <Text color="formDescriptionColor" fontWeight={400}>
                  Edit your account information below
                </Text>
              </Box>
              <Box display="flex" flexDirection="column" gap={3}>
                <FormControl isRequired>
                  <Box>
                    <Text color="formLabelColor" fontWeight={500} mb={1}>
                      First Name*
                    </Text>
                    <Input
                      onChange={handleFirstNameChange}
                      value={firstName}
                      placeholder="Enter First Name"
                    />
                  </Box>
                </FormControl>
                <FormControl isRequired>
                  <Box>
                    <Text color="formLabelColor" fontWeight={500} mb={1}>
                      Last Name*
                    </Text>
                    <Input
                      onChange={handleLastNameChange}
                      value={lastName}
                      placeholder="Enter Last Name"
                    />
                  </Box>
                </FormControl>              
                </Box>
            </ModalBody>
            <ModalFooter>
              <Box width="100%" display={"flex"} flexDirection={"column"}>
                <Button
                  onClick={handleEditSubmit}
                  // colorScheme="green"
                  backgroundColor="primaryColor"
                  color="buttonTextColor"
                  boxShadow={"sm"}
                >
                  Submit
                </Button>
                <Button
                  variant="outline"
                  mt={2}
                  onClick={() => {
                    if (!newUser) {
                      setIsOpen(false);
                    }
                  }}
                  boxShadow={"sm"}
                >
                  Close
                </Button>
              </Box>
            </ModalFooter>
          </Form>
        </ModalContent>
      </Modal>
    );
  }
  
  export default StartModal;
  