import { VStack } from "@chakra-ui/react";
import React, { useState } from "react";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { Input, InputGroup, InputRightElement } from "@chakra-ui/input";
import { Button } from "@chakra-ui/button";
import { Toaster, toaster } from "@/components/ui/toaster";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { LoginSocialGoogle} from "reactjs-social-login"

const Signup = () => {
  const [show, setShow] = useState(false);
  const [userName, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [pic, setPic] = useState();
  const [loading, setLoading] = useState(false);
  
  const navigate = useNavigate();
  const handleClick = () => setShow(!show);

  const postDetails = (pics) => {
    setLoading(true);
    if (pics === undefined) {
      alert("Please Select an Image");
      setLoading(false);
      return;
    }
    if (pics.type === "image/jpeg" || pics.type === "image/png") {
      const data = new FormData();
      data.append("file", pics);
      data.append("upload_preset", "ChatAppMERN");
      data.append("cloud_name", "dfp1zzp9f");
      fetch("https://api.cloudinary.com/v1_1/dfp1zzp9f/image/upload", {
        method: "post",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          setPic(data.url.toString());
          console.log(data.url.toString());
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
        });
    }
  };

  const submitHandler = async () => {
    setLoading(true);
    if (!userName || !email || !password ) {
      alert("Please Fill all the Feilds");
      setLoading(false);
      return;
    }

    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      const { data } = await axios.post(
        "http://localhost:5000/user/signup",
        {
          userName,
          email,
          password,
          pic,
        },
        config
      );
      alert("Registration Successfull");
      localStorage.setItem("userInfo", JSON.stringify(data));
      setLoading(false);
      navigate("/chats");
    } catch (error) {
      alert("Error Occured")
      setLoading(false);
    }
  };

  return (
    <VStack spacing="5px">
      <FormControl id="first-name">
        <FormLabel>User Name</FormLabel>
        <Input
          placeholder="Enter Your username"
          onChange={(e) => setName(e.target.value)}
        />
      </FormControl>
      <FormControl id="email-signup">
        <FormLabel>Email</FormLabel>
        <Input
          placeholder="Enter Your Email"
          onChange={(e) => setEmail(e.target.value)}
        />
      </FormControl>
      <FormControl id="password-signup">
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
          type="file"
          accept="image/*"
          placeholder="Enter Your Email"
          onChange={(e) => postDetails(e.target.files[0])}
        />
      </FormControl>
      <Button onClick={submitHandler} isLoading={loading}>
        Signup
      </Button>
      <Button>
        <LoginSocialGoogle
          client_id="562640248559-hbvoqgqahu7bfb0dc1mea3gnprggehbv.apps.googleusercontent.com"
          access_type="offline"
          onResolve={({ provider, data }) => {
            console.log("Google Login Success:", data);
            // Handle user data here (e.g., send token to backend or store it)
            localStorage.setItem("userInfo", JSON.stringify(data));
            navigate("/chats"); // Redirect after successful login
          }}
          onReject={(err) => {
            console.error("Google Login Error:", err);
            alert("Google Login Failed");
          }}
        >
          Log in with Google
        </LoginSocialGoogle>
        Log in with Google
      </Button>
    </VStack>
  );
};

export default Signup;
