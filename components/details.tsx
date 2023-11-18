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
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  HStack
} from "@chakra-ui/react"
import { useState } from "react"
import { useToast, Spinner } from "@chakra-ui/react";

import { User } from "./types"
import { AssetManager } from "@dfinity/assets"
import { HttpAgent } from "@dfinity/agent"

const Details = () => {
  // const [agentt, setAgent] = useState<HttpAgent>();
  const {
    isOpen: isUploadOpen,
    onOpen: onUploadOpen,
    onClose: onUploadClose
  } = useDisclosure()
  const [isUploading, setIsUploading] = useState(false);

  const {
    isOpen: isGetOpen,
    onOpen: onGetOpen,
    onClose: onGetClose
  } = useDisclosure()

  const [user, setUser] = useState<User>({
    asset: null,
    filename: ""
  })
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const url = `https://jg3in-zaaaa-aaaap-abriq-cai.icp0.io/${user.filename}`
  const toast = useToast();


  const getAssetManager = () => {
    return new AssetManager({
      // canisterId: "jb2oz-uyaaa-aaaap-abria-cai", //this is mainnet frontend assets
      canisterId: "jg3in-zaaaa-aaaap-abriq-cai", // empty mainnet asset canister
      agent: new HttpAgent({
        host: "https://ic0.app"
      })
    })
  }

  const handleUpload = async () => {
    if (selectedFile) {
      setIsUploading(true);
      try {
        console.log("got the file, now submitting.......");
        await getAssetManager().store(selectedFile);
        console.log(`submitted succesfully this file....${selectedFile}`);
        setUser({
          ...user,
          asset: selectedFile
        });
        toast({
          title: "File uploaded.",
          description: "Your file has been successfully uploaded.",
          status: "success",
          duration: 9000,
          isClosable: true,
        });
      } catch (error) {
        console.error(error);
        toast({
          title: "File upload failed.",
          description: "There was an error uploading your file.",
          status: "error",
          duration: 9000,
          isClosable: true,
        });
      } finally {
        setIsUploading(false);
      }
    }
   };
   

  const openFile = async () => {
    window.open(url, "_blank")
  }

  return (
    <>
      <Flex
        minH={"100vh"}
        align={"center"}
        justify={"center"}
        bg={useColorModeValue("gray.50", "gray.800")}
      >
        <HStack spacing={16}>
          <Button
            onClick={onUploadOpen}
            bg={"green.400"}
            color={"white"}
            w="full"
            size={"lg"}
            _hover={{ bg: "green.500" }}
          >
            Upload File
          </Button>
          <Button
            onClick={onGetOpen}
            bg={"green.400"}
            color={"white"}
            w="full"
            size={"lg"}
            _hover={{ bg: "green.500" }}
          >
            Get File
          </Button>
        </HStack>
      </Flex>

      <Modal isOpen={isUploadOpen} onClose={onUploadClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Upload Your File</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Stack
              spacing={4}
              w={"full"}
              maxW={"md"}
              bg={useColorModeValue("white", "gray.700")}
              rounded={"xl"}
              boxShadow={"lg"}
            >
              <InputGroup id="asset">
                <Input
                  placeholder="UserName"
                  _placeholder={{ color: "gray.500" }}
                  type={"file"}
                  onChange={e => {
                    const file = e.target.files ? e.target.files[0] : null;
                    setSelectedFile(file);
                  }}
                />
              </InputGroup>
            </Stack>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleUpload} disabled={!selectedFile}>
            {isUploading ? <Spinner /> : "Submit"}
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <Modal isOpen={isGetOpen} onClose={onGetClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Modal Title</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl>
              <FormLabel>get file with path</FormLabel>
              <Input
                placeholder="paste file name with extension"
                type="text"
                value={user.filename}
                onChange={e => {
                  setUser({
                    ...user,
                    filename: e.target.value
                  })
                }}
              />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={openFile}>Get File</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default Details
