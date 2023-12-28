import { Box, Image, Text, VStack } from '@chakra-ui/react';
import Posts from './Posts';

const Profile = () => {
  return (
    <Box>
      <VStack p={7} m="auto" width="fit-content" borderRadius={6} bg="gray.700">
        <Image borderRadius="full" boxSize="80px" src="" alt="Profile" />
        <Text>Placeholder</Text>
        <Text fontSize="lg" color="gray.400">
          Software Engineer
        </Text>
      </VStack>

      <Posts />
    </Box>
  );
};
export default Profile;
