import React from 'react'
import { Container, Link, Tabs } from "@chakra-ui/react";
import Login from '../components/Authentication/Login';
import Signup from "../components/Authentication/Signup";
import { useNavigate } from "react-router-dom";
import { useEffect } from 'react';

const HomePage = () => {
     const navigate = useNavigate();

     useEffect(() => {
       const userInfo = JSON.parse(localStorage.getItem("userInfo"));
       
       if (!userInfo) navigate("/");
       
     }, []);
  

  return (
    <Container>
      <div>
        <div>Me Chat</div>
        <div>
          <Tabs.Root defaultValue="members">
            <Tabs.List>
              <Tabs.Trigger value="members" asChild>
                <Link unstyled href="#members">
                  Login
                </Link>
              </Tabs.Trigger>
              <Tabs.Trigger value="projects" asChild>
                <Link unstyled href="#projects">
                  Signup
                </Link>
              </Tabs.Trigger>
            </Tabs.List>
            <Tabs.Content value="members"><Login /></Tabs.Content>
            <Tabs.Content value="projects"><Signup /></Tabs.Content>
          </Tabs.Root>
        </div>
      </div>
    </Container>
  );
}

export default HomePage