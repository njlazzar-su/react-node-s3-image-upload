import { Box, Button, Input, Text } from '@chakra-ui/react';
import { useState } from 'react';
import useMutation from '../hooks/useMutation';

const validFileTypes = ['video/mp4'];
const URL = '/videos';

const ErrorText = ({ children, ...props }) => {
  <Text color="red.500" {...props}>
    {children}
  </Text>;
};

const Posts = () => {
  const {
    mutate: uploadVideo,
    isLoading: uploading,
    error: uploadError,
  } = useMutation({ url: URL });

  const [error, setError] = useState('');
  const handleUpload = async e => {
    console.log(e);
    const file = e.target.files[0];
    console.log(file);

    if (!validFileTypes.find(type => type === file.type)) {
      setError('Invalid file type');
      return;
    }

    const form = new FormData();
    form.append('video', file);

    await uploadVideo(form);
  };

  return (
    <Box mt={6}>
      <Input id="videoInput" type="file" hidden onChange={handleUpload} />
      <Button
        as="label"
        htmlFor="videoInput"
        colorScheme="blue"
        variant="outline"
        mb={4}
        cursor="pointer"
        isLoading={uploading}
      >
        Upload
      </Button>
      {error && <ErrorText>{error}</ErrorText>}
      {uploadError && <ErrorText>{uploadError}</ErrorText>}
      <Text textAlign="left" mb={4}>
        Posts
      </Text>
    </Box>
  );
};
export default Posts;
