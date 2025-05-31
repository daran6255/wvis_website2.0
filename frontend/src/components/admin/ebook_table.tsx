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
} from "@chakra-ui/react";
import { DeleteIcon } from "@chakra-ui/icons";
import { useEffect, useState } from "react";
import { getAllEbooks, deleteEbook } from "../../helpers/ebook_services";
import { Ebook } from "../../helpers/model";

const EbookTable = () => {
  const [ebooks, setEbooks] = useState<Ebook[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedId, setSelectedId] = useState<string | null>(null);

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

      {/* Confirmation Modal */}
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
    </>
  );
};

export default EbookTable;
