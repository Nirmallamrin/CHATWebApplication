import { VStack } from "@chakra-ui/react";
import React, { useState } from "react";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { Input, InputGroup, InputRightElement } from "@chakra-ui/input";
import { Button } from "@chakra-ui/button";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
    const [show, setshow] = useState(false);
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleClick = () => {
      setshow(!show);
    };

const submitHandler = async () => {
  setLoading(true);
  if (!email || !password) {
    alert("Please Fill all the Feilds");
    setLoading(false);
    return;
  }
  console.log(email, password)
  try {
    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };
  
    const { data } = await axios.post(
      "http://localhost:5000/user/login",
      {       
        email,
        password,       
      },
      config
    );
    
    alert("Login Successfull");
    localStorage.setItem("userInfo", JSON.stringify(data));
    setLoading(false);
    navigate("/chats");
  } catch (error) {
    setLoading(false);
    alert("Error Occured");    
  }
};
  
  return (
    <VStack spacing="5px">
      <FormControl id="email-login">
        <FormLabel>Email</FormLabel>
        <Input
          placeholder="Enter Your Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </FormControl>
      <FormControl id="password-login">
        <FormLabel>Password</FormLabel>
        <InputGroup>
          <Input
            type={show ? "text" : "password"}
            placeholder="Enter Your Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <InputRightElement>
            <Button onClick={handleClick}>{show ? "Hide" : "Show"}</Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>

      <Button onClick={submitHandler} isLoading={loading}>
        Login
      </Button>
      <Button
        onClick={() => {
          setEmail("guest@example.com");
          setPassword("123456");
        }}
      >
        Get User Credentials
      </Button>
    </VStack>
  );
};

export default Login;
