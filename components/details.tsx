// 'use client'

import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  Stack,
  useColorModeValue,
} from '@chakra-ui/react'
import { useState } from "react";
// import { initJuno } from "@junobuild/core-peer";
// import { v4 as uuidv4 } from 'uuid';
// import { signIn, signOut, authSubscribe } from "@junobuild/core-peer";
import {User} from "./types"
import { AssetManager } from "@dfinity/assets";
// import { AuthClient } from "@dfinity/auth-client";
import { HttpAgent } from "@dfinity/agent";
// import { Asset } from '@junobuild/core-peer';
// import { Principal } from '@dfinity/principal';
// import { uploadFile } from "@junobuild/core-peer";

// type Record = {
//   asset : File
// };




const Details = () => {
  // const [agentt, setAgent] = useState<HttpAgent>();
    const [user, setUser] = useState<User>({
      asset: null,
      filename: ""
    });
    // const [fileContent, setFileContent] = useState<Asset | null | undefined>(null);
    const url = `https://jg3in-zaaaa-aaaap-abriq-cai.icp0.io/${user.filename}`

  //   const login = async() => {
  //     const authClient = await AuthClient.create();
  //     authClient.login({
  //       identityProvider:"https://identity.ic0.app",
  //       onSuccess: (()=> {
  //         console.log("jksldjflksdjf")
  //       })
  //   });
  //     const identity = authClient.getIdentity();
  //     const identityObject = JSON.stringify(identity);
  //     console.log(`identity: ${identityObject}`)  

  //     const _agent = new HttpAgent({
  //       host:"https://ic0.app"
  //     })
  //     console.log(`agent: ${JSON.stringify(_agent, null, 2)}`) 
  //     setAgent(_agent) 
  //      console.log(`identity.........: ${identity}`)
  //      console.log(JSON.stringify(identity))
  //      console.log(`agent.........: ${_agent}`)
  //   }

  const getAssetManager = () => {
    return new AssetManager({
      // canisterId: "jb2oz-uyaaa-aaaap-abria-cai", //this is mainnet frontend assets
      canisterId: "jg3in-zaaaa-aaaap-abriq-cai", // empty mainnet asset canister
      // canisterId:"jg3in-zaaaa-aaaap-abriq-cai",
      // canisterId: "a4tbr-q4aaa-aaaaa-qaafq-cai",
      // canisterId:"xqne3-5aaaa-aaaal-adcpq-cai", //juno
      // canisterId:"asrmz-lmaaa-aaaaa-qaaeq-cai",
      agent: new HttpAgent({
        host:"https://ic0.app"
      })
    })


  }

  // function download(dataurl:string, filename:string) {
  //   const link = document.createElement("a");
  //   link.href = dataurl;
  //   link.download = filename;
  //   link.click();
  // }
  function download(url:string, filename:string) {
   
      getAssetManager().get(filename)
      .then(async blob => {
        const link = document.createElement("a");
        link.href = URL.createObjectURL(await(blob.toBlob()));
        link.download = filename;
        link.click();
    })
    .catch(console.error);
  }

  const openFile = async() => {
   window.open(url,"_blank");
  }

  return (
   <>
    <Flex
      minH={'100vh'}
      align={'center'}
      justify={'center'}
      bg={useColorModeValue('gray.50', 'gray.800')}>
      <Stack
        spacing={4}
        w={'full'}
        maxW={'md'}
        bg={useColorModeValue('white', 'gray.700')}
        rounded={'xl'}
        boxShadow={'lg'}
        p={6}
        my={12}>
        <InputGroup id="asset">
          <Input
            placeholder="UserName"
            _placeholder={{ color: 'gray.500' }}
            type={'file'}
            onChange={async(e) => {
              console.log("wait getting file")
              const file = e.target.files? e.target.files[0]:null;
              if(file){
                console.log("got the file, now submitting.......")
                await getAssetManager().store(file);
                console.log(`submitted succesfully this file....${file}`)
              }
              setUser({
                ...user,
                asset: file
              })
            }}
          />
        </InputGroup>
        <Stack spacing={6} direction={['column', 'row']}>
          <Button
            bg={'red.400'}
            color={'white'}
            w="full"
            _hover={{
              bg: 'red.500',
            }}
            >
            Cancel
          </Button>
          <Button
            bg={'blue.400'}
            color={'white'}
            w="full"
            _hover={{
              bg: 'blue.500',
            }}
            >
            Submit
          </Button>
        </Stack>
        <FormControl>
            <FormLabel>get file with path</FormLabel>
            <Input 
             placeholder='paste file name with extension'
             type='text'
             value={user.filename}
             onChange={(e) => {
              setUser({
                ...user,
                filename: e.target.value
              })
             }}
             />
          </FormControl>
          <Button onClick={openFile}>Get File</Button>
          <Button onClick={ () => {
            download(url, `${user.filename}`)
          }}>Download File</Button>

      </Stack>
    </Flex>
    </>
  )
}

export default Details;