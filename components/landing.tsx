'use client'
import {
  Box,
  Heading,
  Container,
  Text,
  Stack,
} from '@chakra-ui/react'

export default function Landing() {

  return (
    <>
      <Container maxW={'3xl'}>
        <Stack
          as={Box}
          textAlign={'center'}
          spacing={{ base: 8, md: 14 }} 
          py={{ base: 20, md: 36 }}>
          <Heading
            fontWeight={600}
            fontSize={{ base: '2xl', sm: '4xl', md: '6xl' }}
            lineHeight={'110%'}>
            Store your assets with <br />
            <Text as={'span'} color={'green.400'}>
              ICP
            </Text>
          </Heading>
          <Text color={'gray.500'}>
            Our Vision: To create a storage buckets inside a asset canisters and once the canister is out of storage,
            then it creates a new canister and more storage buckets... therefore unlimited storage capacity, unlimited files.
          </Text>
          <Stack
            direction={'column'}
            spacing={3}
            align={'center'}
            alignSelf={'center'}
            position={'relative'}>
            <Text
              colorScheme={'green'}
              bg={'green.400'}
              p={4}>
              Login and get Started
            </Text>
          </Stack>
        </Stack>
      </Container>
    </>
  )
}