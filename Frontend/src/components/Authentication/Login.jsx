import { VStack } from "@chakra-ui/react";
import React, { useState } from "react";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { Input, InputGroup, InputRightElement } from "@chakra-ui/input";
import { Button } from "@chakra-ui/button";

const Login = () => {
    const [show, setshow] = useState(false);
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
  
    const handleClick = () => {
      setshow(!show);
    };

    const submitHandler = () => {
      
  };
  
  return (
    <VStack spacing="5px">
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

      <Button onClick={submitHandler}>Login</Button>
      <Button onClick={() => { 
        setEmail("guest@example.com");
        setPassword("123456");
      }}>
        Get User Credentials</Button>
    </VStack>
  );
};

export default Login;
