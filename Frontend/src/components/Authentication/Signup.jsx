import { VStack } from '@chakra-ui/react'
import React, { useState } from 'react'
import {
  FormControl,
  FormLabel,
} from "@chakra-ui/form-control";
import { Input, InputGroup, InputRightElement } from "@chakra-ui/input";
import { Button } from "@chakra-ui/button";

const Signup = () => {
  const [show, setshow] = useState(false)
  const [userName, setName] = useState()
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [pic, setPic] = useState()

  const handleClick=() => {
    setshow(!show)
  }

  const postDetails = (pics) => {

  }

  const submitHandler = () => {
    
  }

  return (
    <VStack spacing="5px">
      <FormControl id="first-name">
        <FormLabel>User Name</FormLabel>
        <Input
          placeholder="Enter Your username"
          onChange={(e) => setName(e.target.value)}
        />
      </FormControl>
      <FormControl id="email">
        <FormLabel>Email</FormLabel>
        <Input
          placeholder="Enter Your Email"
          onChange={(e) => setEmail(e.target.value)}
        />
      </FormControl>
      <FormControl id="password">
        <FormLabel>Password</FormLabel>
        <InputGroup>
          <Input
            type={show ? "text" : "password"}
            placeholder="Enter Your Password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <InputRightElement>
            <Button onClick={handleClick}>{show ? "Hide" : "Show"}</Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>
      <FormControl id="pic">
        <FormLabel>Upload your Picture</FormLabel>
        <Input
          type='file'
          accept='image/*'
          placeholder="Enter Your Email"
          onChange={(e) => postDetails(e.target.files[0])}
        />
      </FormControl>
      <Button
        onClick={submitHandler}
      >
        Signup
      </Button>
    </VStack>
  );
}

export default Signup