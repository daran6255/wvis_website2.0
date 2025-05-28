import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  VStack,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Flex,
} from "@chakra-ui/react";
import { useState } from "react";
import { postBlog } from "../../helpers/blog_services";
import { BlogPostData, BlogPostResponse } from "../../helpers/model";
import useCustomToast from "../../hooks/useCustomToast";
import DB_Navbar from "../../components/common/DB_Navbar";
import BlogTable from "../../components/admin/blog_table";

// Tiptap imports
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

const AdminBlogForm = () => {
  const showToast = useCustomToast();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [formData, setFormData] = useState<{
    title: string;
    description: string;
    image?: File;
    author: string;
    tags: string;
  }>({
    title: "",
    description: "",
    image: undefined,
    author: "",
    tags: "",
  });

  const [loading, setLoading] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target;
    if (files && files.length > 0) {
      setFormData((prev) => ({ ...prev, [name]: files[0] }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const { title, description, image, author, tags } = formData;
    if (!title || !description || !image || !author || !tags) {
      showToast("Missing fields", "Please fill in all required fields.", "error");
      return;
    }

    const blogData: BlogPostData = {
      title,
      description,
      author,
      image,
      tags: tags
        .split(",")
        .map((tag) => tag.trim())
        .filter((tag) => tag.length > 0),
    };

    setLoading(true);
    try {
      const response: BlogPostResponse = await postBlog(blogData);
      const createdBlog = response.blog;

      showToast("Success", "Blog created successfully!", "success");

      console.log("Created Blog:", createdBlog);

      setFormData({
        title: "",
        description: "",
        image: undefined,
        author: "",
        tags: "",
      });
      onClose();
    } catch {
      showToast("Error", "Failed to create blog.", "error");
    } finally {
      setLoading(false);
    }
  };

  const editor = useEditor({
    extensions: [StarterKit],
    content: formData.description,
    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      setFormData((prev) => ({
        ...prev,
        description: html,
      }));
    },
  });

  return (
    <>
      <DB_Navbar />

      <Box maxW="6xl" mx="auto" mt={10} p={6}>
        <Flex justify="flex-end">
          <Button colorScheme="teal" onClick={onOpen}>
            Add Blog
          </Button>
        </Flex>

        <Modal isOpen={isOpen} onClose={onClose} size="lg">
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Create Blog</ModalHeader>
            <ModalCloseButton />
            <form onSubmit={handleSubmit}>
              <ModalBody>
                <VStack spacing={4} align="stretch">
                  <FormControl isRequired>
                    <FormLabel>Title</FormLabel>
                    <Input
                      type="text"
                      name="title"
                      value={formData.title}
                      onChange={handleInputChange}
                      placeholder="Enter blog title"
                    />
                  </FormControl>

                  <FormControl isRequired>
                    <FormLabel>Description</FormLabel>
                    <Box border="1px solid #CBD5E0" borderRadius="md" p={2} bg="white" minH="200px">
                      <EditorContent editor={editor} />
                    </Box>
                  </FormControl>

                  <FormControl isRequired>
                    <FormLabel>Author</FormLabel>
                    <Input
                      type="text"
                      name="author"
                      value={formData.author}
                      onChange={handleInputChange}
                      placeholder="Enter author name"
                    />
                  </FormControl>

                  <FormControl isRequired>
                    <FormLabel>Tags (comma separated)</FormLabel>
                    <Input
                      type="text"
                      name="tags"
                      value={formData.tags}
                      onChange={handleInputChange}
                      placeholder="e.g., technology, innovation"
                    />
                  </FormControl>

                  <FormControl isRequired>
                    <FormLabel>Upload Image</FormLabel>
                    <Input
                      type="file"
                      name="image"
                      accept="image/*"
                      onChange={handleFileChange}
                    />
                  </FormControl>
                </VStack>
              </ModalBody>

              <ModalFooter>
                <Button variant="ghost" mr={3} onClick={onClose}>
                  Cancel
                </Button>
                <Button
                  colorScheme="teal"
                  type="submit"
                  isLoading={loading}
                  loadingText="Submitting"
                >
                  Submit
                </Button>
              </ModalFooter>
            </form>
          </ModalContent>
        </Modal>
      </Box>

      <BlogTable />
    </>
  );
};

export default AdminBlogForm;