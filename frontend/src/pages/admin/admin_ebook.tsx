// Imports remain the same
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  FormHelperText,
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
  Flex,
} from "@chakra-ui/react";
import { useState } from "react";
import { postEbook } from "../../helpers/ebook_services";
import { EbookPostData } from "../../helpers/model";
import useCustomToast from "../../hooks/useCustomToast";
import DB_Navbar from "../../components/common/DB_Navbar";
import EbookTable from "../../components/admin/ebook_table";

const MAX_FILE_SIZE_MB = 100;

const AdminEbookForm = () => {
  const showToast = useCustomToast();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [formData, setFormData] = useState<EbookPostData>({
    name: "",
    description: "",
    image_file: undefined,
    pdf_file: undefined,
    epub_file: undefined,
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
    if (!files || files.length === 0) return;

    const file = files[0];
    const maxSizeBytes = MAX_FILE_SIZE_MB * 1024 * 1024;

    if (file.size > maxSizeBytes) {
      showToast(
        "File too large",
        `File size must be less than ${MAX_FILE_SIZE_MB} MB.`,
        "error"
      );
      return;
    }

    setFormData((prev) => ({ ...prev, [name]: file }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.description || !formData.pdf_file || !formData.image_file) {
      showToast("Missing fields", "Please fill in all required fields.", "error");
      return;
    }

    setLoading(true);
    try {
      await postEbook(formData);
      showToast("Success", "Ebook uploaded successfully!", "success");
      setFormData({
        name: "",
        description: "",
        image_file: undefined,
        pdf_file: undefined,
        epub_file: undefined,
      });
      onClose();
    } catch (error) {
      const errMsg = error instanceof Error ? error.message : "Unknown error";
      showToast("Error", `Failed to upload ebook. ${errMsg}`, "error");
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
            Add Ebook
          </Button>
        </Flex>

        <Modal isOpen={isOpen} onClose={onClose} size="lg">
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Create Ebook</ModalHeader>
            <ModalCloseButton />
            <form onSubmit={handleSubmit}>
              <ModalBody>
                <VStack spacing={4} align="stretch">
                  <FormControl isRequired>
                    <FormLabel>Name</FormLabel>
                    <Input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Enter ebook name"
                    />
                  </FormControl>

                  <FormControl isRequired>
                    <FormLabel>Description</FormLabel>
                    <Textarea
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      placeholder="Enter ebook description"
                    />
                  </FormControl>

                  <FormControl isRequired>
                    <FormLabel>Upload Cover Image</FormLabel>
                    <Input
                      type="file"
                      name="image_file"
                      accept="image/*"
                      onChange={handleFileChange}
                    />
                    <FormHelperText>Accepts JPG, PNG (max 10MB)</FormHelperText>
                  </FormControl>

                  <FormControl isRequired>
                    <FormLabel>Upload PDF</FormLabel>
                    <Input
                      type="file"
                      name="pdf_file"
                      accept=".pdf"
                      onChange={handleFileChange}
                    />
                    <FormHelperText>PDF file size limit: 10MB</FormHelperText>
                  </FormControl>

                  <FormControl>
                    <FormLabel>Upload EPUB (optional)</FormLabel>
                    <Input
                      type="file"
                      name="epub_file"
                      accept=".epub"
                      onChange={handleFileChange}
                    />
                    <FormHelperText>EPUB file size limit: 10MB</FormHelperText>
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

      <EbookTable />
    </>
  );
};

export default AdminEbookForm;
