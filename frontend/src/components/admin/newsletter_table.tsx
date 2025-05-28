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
//   useToast,
} from "@chakra-ui/react";
import { DeleteIcon } from "@chakra-ui/icons";
import { useEffect, useState } from "react";
import { getAllNewsletters, deleteNewsletter } from "../../helpers/newsletter_service";
import { Newsletter } from "../../helpers/model";

const NewsletterTable = () => {
  const [newsletters, setNewsletters] = useState<Newsletter[]>([]);
  const [loading, setLoading] = useState(true);
//   const toast = useToast();

  const bg = useColorModeValue("white", "gray.800");
  const hoverBg = useColorModeValue("gray.50", "gray.700");

  useEffect(() => {
    fetchNewsletters();
  }, []);

  const fetchNewsletters = async () => {
    try {
      setLoading(true);
      const data = await getAllNewsletters();
      setNewsletters(data);
    } catch (error) {
      console.error("Error fetching newsletters:", error);
    } finally {
      setLoading(false);
    }
  };

const handleDelete = async (id: string) => {
  try {
    await deleteNewsletter(id);
    const updated = await getAllNewsletters();
    setNewsletters(updated); // Refresh UI after deletion
  } catch (error) {
    console.error("Delete failed:", error);
  }
};

  if (loading) {
    return (
      <Center mt={10}>
        <Spinner size="xl" />
      </Center>
    );
  }

  if (newsletters.length === 0) {
    return (
      <Center mt={10}>
        <Text fontSize="lg" fontWeight="medium">
          No newsletters available.
        </Text>
      </Center>
    );
  }

  return (
    <Box maxW="7xl" mx="auto" mt={10} p={6} boxShadow="lg" borderRadius="2xl" bg={bg}>
      <Text fontSize="2xl" mb={4} fontWeight="bold">
        Newsletters
      </Text>

      <Box maxH="500px" overflowY="auto" borderRadius="lg" border="1px solid" borderColor="gray.200">
        <Table variant="striped" colorScheme="teal" size="md">
          <Thead position="sticky" top={0} bg={bg} zIndex={1}>
            <Tr>
              <Th fontSize="md">Title</Th>
              <Th fontSize="md">Description</Th>
              <Th fontSize="md">Image</Th>
              <Th fontSize="md">PDF</Th>
              <Th fontSize="md">Actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            {newsletters.map((item) => (
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
                <Td>
                  <Link href={item.link} isExternal color="teal.500" fontWeight="semibold">
                    View PDF
                  </Link>
                </Td>
                <Td>
                  <IconButton
						aria-label="Delete"
						icon={<DeleteIcon />}
						colorScheme="red"
						onClick={() => handleDelete(item.id)} // ✅ item.id must not be undefined here
						/>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>
    </Box>
  );
};

export default NewsletterTable;
