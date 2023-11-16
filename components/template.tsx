// // 'use client'
// import { Link, Stack, Box, Text,  Center, Heading, useColorModeValue } from "@chakra-ui/react";
// import {User} from "./types"
// import { ExternalLinkIcon } from '@chakra-ui/icons'

// export default function Template({data}: {data: User}) {

//     return (
//         <Center py={6}>
//           <Box
//             maxW={'270px'}
//             w={'full'}
//             bg={useColorModeValue('white', 'gray.800')}
//             boxShadow={'2xl'}
//             rounded={'md'}
//             overflow={'hidden'}>
//             <Box p={6}>
//               <Stack spacing={0} align={'center'} mb={5}>
//                 <Heading fontSize={'2xl'} fontWeight={500} fontFamily={'body'}>
//                    {data?.name}
//                 </Heading>
//                 <Text color={'gray.500'}>Genius Developer</Text>
//               </Stack>
//               <Stack direction={'column'} justify={'center'} spacing={6}>
//                 <Link isExternal href={data?.github_url}>Checkout my github<ExternalLinkIcon mx='2px'/></Link>
//                 <Link isExternal href={data?.linkedin_url}>Checkout my linkedin<ExternalLinkIcon mx='2px'/></Link>
//                 <Link isExternal href={data?.twitter_url}>Checkout my twitter<ExternalLinkIcon mx='2px'/></Link>
//                 <Link isExternal href={data?.medium_url}>Checkout my medium<ExternalLinkIcon mx='2px'/></Link>
//                 <Link isExternal href={data?.district_url}>Checkout my district<ExternalLinkIcon mx='2px'/></Link>
//               </Stack>
//             </Box>
//           </Box>
//         </Center>
//       );
// }

// // export default Template;