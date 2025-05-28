import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  VStack,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Flex
} from "@chakra-ui/react";
import { useState } from "react";
import { postNewsletter } from "../../helpers/newsletter_service";
import { NewsletterPostData } from "../../helpers/model";
import useCustomToast from "../../hooks/useCustomToast";
import DB_Navbar from "../../components/common/DB_Navbar";
import NewsletterTable from "../../components/admin/newsletter_table";

const AdminNewsletterForm = () => {
  const showToast = useCustomToast();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [formData, setFormData] = useState<NewsletterPostData>({
    title: "",
    description: "",
    image: undefined,
    pdf: undefined,
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
    if (!formData.title || !formData.description || !formData.image || !formData.pdf) {
      showToast("Missing fields", "Please fill in all required fields.", "error");
      return;
    }

    setLoading(true);
    try {
      await postNewsletter(formData);
      showToast("Success", "Newsletter created successfully!", "success");
      setFormData({
        title: "",
        description: "",
        image: undefined,
        pdf: undefined,
      });
      onClose();
    } catch (error) {
      showToast("Error", "Failed to create newsletter.", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <DB_Navbar />

      <Box maxW="6xl" mx="auto" mt={10} p={6}>
        <Flex justify="flex-end">
          <Button colorScheme="teal" onClick={onOpen}>
            Add Newsletter
          </Button>
        </Flex>

        <Modal isOpen={isOpen} onClose={onClose} size="lg">
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Create Newsletter</ModalHeader>
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
                      placeholder="Enter newsletter title"
                    />
                  </FormControl>

                  <FormControl isRequired>
                    <FormLabel>Description</FormLabel>
                    <Textarea
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      placeholder="Enter newsletter description"
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

                  <FormControl isRequired>
                    <FormLabel>Upload PDF</FormLabel>
                    <Input
                      type="file"
                      name="pdf"
                      accept=".pdf"
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
	  <NewsletterTable />
    </>
  );
};

export default AdminNewsletterForm;
