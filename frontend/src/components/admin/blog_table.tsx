import {
  Box,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Image,
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
import { getAllBlogs, deleteBlog } from "../../helpers/blog_services";
import { Blog } from "../../helpers/model";

const BlogTable = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const { isOpen, onOpen, onClose } = useDisclosure();

  const bg = useColorModeValue("white", "gray.800");
  const hoverBg = useColorModeValue("gray.50", "gray.700");

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      setLoading(true);
      const data = await getAllBlogs();
      setBlogs(data);
    } catch (error) {
      console.error("Error fetching blogs:", error);
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
      await deleteBlog(selectedId);
      const updated = await getAllBlogs();
      setBlogs(updated);
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

  if (blogs.length === 0) {
    return (
      <Center mt={10}>
        <Text fontSize="lg" fontWeight="medium">
          No blog posts available.
        </Text>
      </Center>
    );
  }

  return (
    <>
      <Box maxW="7xl" mx="auto" p={3} boxShadow="lg" borderRadius="2xl" bg={bg}>
        <Text fontSize="2xl" mb={4} fontWeight="bold">
          Blog Posts
        </Text>

        <Box maxH="500px" overflowY="auto" borderRadius="lg" border="1px solid" borderColor="gray.200">
          <Table variant="striped" colorScheme="teal" size="md">
            <Thead position="sticky" top={0} bg={bg} zIndex={1}>
              <Tr>
                <Th fontSize="md">Title</Th>
                <Th fontSize="md">Description</Th>
                <Th fontSize="md">Image</Th>
                <Th fontSize="md">Author</Th>
                <Th fontSize="md">Tags</Th>
                <Th fontSize="md">Date</Th>
                <Th fontSize="md">Actions</Th>
              </Tr>
            </Thead>
            <Tbody>
              {blogs.map((item) => (
                <Tr key={item.id} _hover={{ bg: hoverBg }}>
                  <Td fontWeight="medium">{item.title}</Td>
                  <Td maxW="300px" whiteSpace="nowrap" overflow="hidden" textOverflow="ellipsis">
                    <Tooltip label={item.description} fontSize="sm">
                      {item.description}
                    </Tooltip>
                  </Td>
                  <Td>
                    <Image
                      src={item.image}
                      alt={item.title}
                      boxSize="80px"
                      objectFit="cover"
                      borderRadius="lg"
                      boxShadow="md"
                    />
                  </Td>
                  <Td>{item.author}</Td>
                  <Td>{item.tags}</Td>
                  <Td>{item.created_at}</Td>
                  <Td>
                    <IconButton
                      aria-label="Delete"
                      icon={<DeleteIcon />}
                      colorScheme="red"
                      onClick={() => handleDeleteClick(item.id)}
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
          <ModalHeader>Delete Blog Post</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            This will permanently delete the blog post from the server and affect production. Are you sure?
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

export default BlogTable;
