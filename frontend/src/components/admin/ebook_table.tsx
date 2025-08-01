import {
  Box,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Image,
  Link,
  Spinner,
  Center,
  Text,
  useColorModeValue,
  Tooltip,
  IconButton,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalCloseButton,
  Button,
  Input,
  Textarea,
} from "@chakra-ui/react";
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import { useEffect, useState } from "react";
import { getAllEbooks, deleteEbook, putEbook } from "../../helpers/ebook_services";
import { Ebook } from "../../helpers/model";

const EbookTable = () => {
  const [ebooks, setEbooks] = useState<Ebook[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [editingEbook, setEditingEbook] = useState<Ebook | null>(null);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editFormData, setEditFormData] = useState<Partial<Ebook & {
    image_file?: File;
    pdf_file?: File;
    epub_file?: File;
  }>>({});

  const { isOpen, onOpen, onClose } = useDisclosure();
  const bg = useColorModeValue("white", "gray.800");
  const hoverBg = useColorModeValue("gray.50", "gray.700");

  useEffect(() => {
    fetchEbooks();
  }, []);

  const fetchEbooks = async () => {
    try {
      setLoading(true);
      const data = await getAllEbooks();
      setEbooks(data);
    } catch (error) {
      console.error("Error fetching ebooks:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteClick = (id: string) => {
    setSelectedId(id);
    onOpen();
  };

  const handleConfirmDelete = async () => {
    if (!selectedId) return;
    try {
      await deleteEbook(selectedId);
      const updated = await getAllEbooks();
      setEbooks(updated);
    } catch (error) {
      console.error("Delete failed:", error);
    } finally {
      onClose();
      setSelectedId(null);
    }
  };

  const handleEditClick = (ebook: Ebook) => {
    setEditingEbook(ebook);
    setEditFormData({
      name: ebook.name,
      description: ebook.description,
    });
    setEditModalOpen(true);
  };

  const handleEditInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setEditFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target;
    if (files && files.length > 0) {
      setEditFormData((prev) => ({ ...prev, [name]: files[0] }));
    }
  };

  const handleUpdateSubmit = async () => {
    if (!editingEbook) return;
    try {
      await putEbook(editingEbook.id, {
        name: editFormData.name,
        description: editFormData.description,
        image_file: editFormData.image_file,
        pdf_file: editFormData.pdf_file,
        epub_file: editFormData.epub_file,
      });

      const updated = await getAllEbooks();
      setEbooks(updated);
      setEditModalOpen(false);
      setEditingEbook(null);
    } catch (error) {
      console.error("Update failed:", error);
    }
  };

  if (loading) {
    return (
      <Center mt={10}>
        <Spinner size="xl" />
      </Center>
    );
  }

  if (ebooks.length === 0) {
    return (
      <Center mt={10}>
        <Text fontSize="lg" fontWeight="medium">
          No ebooks available.
        </Text>
      </Center>
    );
  }

  return (
    <>
      <Box maxW="7xl" mx="auto" p={3} boxShadow="lg" borderRadius="2xl" bg={bg}>
        <Text fontSize="2xl" mb={4} fontWeight="bold">
          Ebooks
        </Text>

        <Box maxH="500px" overflowY="auto" borderRadius="lg" border="1px solid" borderColor="gray.200">
          <Table variant="striped" colorScheme="teal" size="md">
            <Thead position="sticky" top={0} bg={bg} zIndex={1}>
              <Tr>
                <Th fontSize="md">Name</Th>
                <Th fontSize="md">Description</Th>
                <Th fontSize="md">Image</Th>
                <Th fontSize="md">PDF</Th>
                <Th fontSize="md">EPUB</Th>
                <Th fontSize="md">Actions</Th>
              </Tr>
            </Thead>
            <Tbody>
              {ebooks.map((ebook) => (
                <Tr key={ebook.id} _hover={{ bg: hoverBg }}>
                  <Td fontWeight="medium">{ebook.name}</Td>
                  <Td maxW="300px" whiteSpace="nowrap" overflow="hidden" textOverflow="ellipsis">
                    <Tooltip label={ebook.description} fontSize="sm">
                      {ebook.description}
                    </Tooltip>
                  </Td>
                  <Td>
                    <Image
                      src={ebook.image_file}
                      alt={ebook.name}
                      boxSize="80px"
                      objectFit="cover"
                      borderRadius="lg"
                      boxShadow="md"
                    />
                  </Td>
                  <Td>
                    <Link href={ebook.pdf_file} isExternal color="teal.500" fontWeight="semibold">
                      View PDF
                    </Link>
                  </Td>
                  <Td>
                    {ebook.epub_file ? (
                      <Link href={ebook.epub_file} isExternal color="teal.500" fontWeight="semibold">
                        View EPUB
                      </Link>
                    ) : (
                      <Text color="gray.400">N/A</Text>
                    )}
                  </Td>
                  <Td>
                    <IconButton
                      aria-label="Edit"
                      icon={<EditIcon />}
                      colorScheme="blue"
                      mr={2}
                      onClick={() => handleEditClick(ebook)}
                    />
                    <IconButton
                      aria-label="Delete"
                      icon={<DeleteIcon />}
                      colorScheme="red"
                      onClick={() => handleDeleteClick(ebook.id)}
                    />
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </Box>
      </Box>

      {/* Delete Confirmation Modal */}
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Delete Ebook</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            This action will permanently delete the ebook and its files from the server. Are you sure?
          </ModalBody>
          <ModalFooter>
            <Button variant="ghost" onClick={onClose} mr={3}>
              Cancel
            </Button>
            <Button colorScheme="red" onClick={handleConfirmDelete}>
              Confirm Delete
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* Edit Ebook Modal */}
      <Modal isOpen={editModalOpen} onClose={() => setEditModalOpen(false)} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit Ebook</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Box display="flex" flexDirection="column" gap={4}>
              <Input
                name="name"
                value={editFormData.name || ""}
                onChange={handleEditInputChange}
                placeholder="Name"
              />
              <Textarea
                name="description"
                value={editFormData.description || ""}
                onChange={handleEditInputChange}
                placeholder="Description"
              />
              <Box>
                <Text fontWeight="medium">Update Image:</Text>
                <Input type="file" name="image_file" accept="image/*" onChange={handleFileChange} />
              </Box>
              <Box>
                <Text fontWeight="medium">Update PDF:</Text>
                <Input type="file" name="pdf_file" accept=".pdf" onChange={handleFileChange} />
              </Box>
              <Box>
                <Text fontWeight="medium">Update EPUB:</Text>
                <Input type="file" name="epub_file" accept=".epub" onChange={handleFileChange} />
              </Box>
            </Box>
          </ModalBody>
          <ModalFooter>
            <Button variant="ghost" onClick={() => setEditModalOpen(false)} mr={3}>
              Cancel
            </Button>
            <Button colorScheme="blue" onClick={handleUpdateSubmit}>
              Save Changes
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default EbookTable;
