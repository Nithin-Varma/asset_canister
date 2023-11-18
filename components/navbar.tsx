// 'use client'

import {
    Box,
    Flex,
    Button,
    useColorModeValue,
    Stack,
    useColorMode
  } from "@chakra-ui/react"
  import { MoonIcon, SunIcon } from "@chakra-ui/icons"
  import { useState, useEffect } from "react"
import { AuthClient } from "@dfinity/auth-client";
import { useToast } from '@chakra-ui/react'

  
  export default function Nav() {
    const { colorMode, toggleColorMode } = useColorMode()
    const [isSignedIn, setIsSignedIn] = useState(false)

    const toast = useToast()
  
    useEffect(() => {
      const isSignedIn = localStorage.getItem('isSignedIn')
      if (isSignedIn === 'true') {
        setIsSignedIn(true)
      } else {
        setIsSignedIn(false)
      }
    }, [])

    const login = async() => {
        const authClient = await AuthClient.create();
        authClient.login({
          identityProvider:"https://identity.ic0.app",
          onSuccess: (()=> {
            console.log("connected")
            window.location.href+="/asset"
            toast({
                title: 'Logged In...',
                description: "Ready to use...",
                status: 'success',
                duration: 9000,
                isClosable: true,
              });
          })
      });
        const identity = authClient.getIdentity();
        const identityObject = JSON.stringify(identity);
        console.log(`identity: ${identityObject}`)   
         console.log(`identity.........: ${identity}`)
         console.log(JSON.stringify(identity))
      }

      const logout = async() => {
        const authClient = await AuthClient.create();
        try {
            await authClient.logout()
            toast({
                title: 'Logged Out...',
                description: "Hope to see you again",
                status: 'info',
                duration: 9000,
                isClosable: true,
              });
        } catch (error) {
            
        }
      }
    return (
      <>
        <Box bg={useColorModeValue("gray.100", "gray.900")} position="fixed" px={4} w={"100%"}>
          <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
            <Box fontSize={"28px"} fontWeight={"bold"} fontFamily={"cursive"}>Quick Buckets</Box>
  
            <Flex alignItems={"center"}>
              <Stack direction={"row"} spacing={7}>
                <Button onClick={toggleColorMode}>
                  {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
                </Button>
                {isSignedIn ? (
                  <Button
                    onClick={async () => {
                      if(window.location.href !== "/"){
                        await logout()
                        window.location.href = "/"
                      } else {
                        await logout()
                      }
                      setIsSignedIn(false)
                      localStorage.removeItem('isSignedIn')
                    }}
                  >
                    SignOut
                  </Button>
                ) : (
                  <Button
                    onClick={async () => {
                      if(window.location.href !== "/") {
                        await login()
                        
                      } else {
                        
                        await login()
                        
                       
                      }
                      setIsSignedIn(true)
                      localStorage.setItem('isSignedIn', 'true') 
                    }}
                  >
                    SignIn
                  </Button>
                )}
              </Stack>
            </Flex>
          </Flex>
        </Box>
      </>
    )
  }