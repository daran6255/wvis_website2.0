import {
  Box,
  Container,
  Heading,
  Text,
  Image,
  SimpleGrid,
  Button,
  useColorModeValue,
  Flex,
  Select,
  FormControl,
  FormLabel,
  useToast,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Badge,
  Tooltip,
  VStack,
  Icon,
  useBreakpointValue,
  Divider,
} from "@chakra-ui/react";
import { FaDownload, FaStar, FaRegStar } from "react-icons/fa";
import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer";
import { useEffect, useState } from "react";
import { getAllEbooks } from "../helpers/ebook_services";
import { Ebook } from "../helpers/model";

type EbookWithCounts = Ebook & {
  pdfDownloads: number;
  epubDownloads: number;
  rating: number;
  reviewCount: number;
};

const EbookPage = () => {
  const [ebooks, setEbooks] = useState<EbookWithCounts[]>([]);
  const [reviewInputs, setReviewInputs] = useState<{ [id: string]: { rating: number; comment: string } }>({});
  const [selectedEbook, setSelectedEbook] = useState<EbookWithCounts | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const toast = useToast();
  const cardBg = useColorModeValue("white", "gray.800");
  const textColor = useColorModeValue("gray.700", "gray.200");

  const localStorageKey = "ebook_downloads_reviews";

  const loadLocalData = () => {
    const stored = localStorage.getItem(localStorageKey);
    return stored ? JSON.parse(stored) : {};
  };

  const saveLocalData = (data: EbookLocalData) => {
    localStorage.setItem(localStorageKey, JSON.stringify(data));
  };
  const fetchEbooks = async () => {
    try {
      const data = await getAllEbooks();
      const localData = loadLocalData();

      const ebooksWithCounts = data.map((ebook: Ebook) => {
        const saved = localData[ebook.id] || {
          pdfDownloads: 0,
          epubDownloads: 0,
          rating: Math.floor(Math.random() * 5) + 1,
          reviewCount: Math.floor(Math.random() * 100) + 1,
        };
        return { ...ebook, ...saved };
      });

      setEbooks(ebooksWithCounts);
    } catch (error) {
      console.error("Error fetching ebooks:", error);
      toast({ title: "Failed to fetch ebooks", status: "error", duration: 3000 });
    }
  };

  useEffect(() => {
    fetchEbooks();
  }, []);

  const handleDownload = (id: string, type: "pdf" | "epub") => {
    setEbooks((prev) => {
      const updated = prev.map((ebook) =>
        ebook.id === id
          ? {
              ...ebook,
              pdfDownloads: type === "pdf" ? ebook.pdfDownloads + 1 : ebook.pdfDownloads,
              epubDownloads: type === "epub" ? ebook.epubDownloads + 1 : ebook.epubDownloads,
            }
          : ebook
      );
      persistEbookData(updated);
      return updated;
    });
  };

  const handleReviewChange = (id: string, field: "rating", value: number) => {
    setReviewInputs((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        [field]: value,
        comment: "",
      },
    }));
  };

  const submitReview = (ebookId: string) => {
    const { rating } = reviewInputs[ebookId] || {};
    if (!rating) {
      toast({ title: "Please select a rating", status: "warning", duration: 3000 });
      return;
    }

    setEbooks((prev) => {
      const updated = prev.map((ebook) =>
        ebook.id === ebookId
          ? {
              ...ebook,
              reviewCount: ebook.reviewCount + 1,
              rating: Math.min(
                5,
                Math.round((ebook.rating * ebook.reviewCount + rating) / (ebook.reviewCount + 1))
              ),
            }
          : ebook
      );
      persistEbookData(updated);
      return updated;
    });

    setReviewInputs((prev) => ({ ...prev, [ebookId]: { rating: 0, comment: "" } }));
    toast({ title: "Thank you for your rating!", status: "success", duration: 3000 });
  };
  
  type EbookLocalData = {
  [id: string]: {
    pdfDownloads: number;
    epubDownloads: number;
    rating: number;
    reviewCount: number;
  };
};
  const persistEbookData = (updatedEbooks: EbookWithCounts[]) => {
    const saveObj: EbookLocalData = {};
    updatedEbooks.forEach((ebook) => {
      saveObj[ebook.id] = {
        pdfDownloads: ebook.pdfDownloads,
        epubDownloads: ebook.epubDownloads,
        rating: ebook.rating,
        reviewCount: ebook.reviewCount,
      };
    });
    saveLocalData(saveObj);
  };

  const gridCols = useBreakpointValue({ base: 1, sm: 2, md: 3, lg: 4 });

  return (
    <>
      <Navbar />

      <Box
        as="section"
        bgImage="url('/assets/13108.jpg')"
        bgSize="cover"
        bgPosition="center"
        position="relative"
        height="300px"
        display="flex"
        alignItems="center"
        justifyContent="center"
        mt={{ base: 20, md: 20 }}
        role="banner"
        aria-label="eBook header section"
      >
        <Box bgGradient="linear(to-r, blackAlpha.800, transparent)" position="absolute" inset={0} />
        <Container maxW="6xl" zIndex={1} textAlign="center">
          <Heading
            as="h1"
            fontSize={{ base: "3xl", md: "5xl" }}
            bgGradient="linear(to-r, teal.300, blue.500)"
            bgClip="text"
          >
            Explore Our eBooks
          </Heading>
          <Text as="p" color="gray.200" fontSize={{ base: "md", md: "xl" }}>
            Discover inclusive knowledge, available in accessible formats.
          </Text>
        </Container>
      </Box>

      <Container maxW="7xl" py={10}>
        <Flex justify="space-between" align="center" mb={6}>
          <Heading as="h2" size="lg" color={textColor}>
            eBook Library
          </Heading>
          <Button
            onClick={fetchEbooks}
            colorScheme="teal"
            leftIcon={<FaDownload />}
            aria-label="Refresh eBook list"
          >
            Refresh
          </Button>
        </Flex>

        {ebooks.length === 0 ? (
          <Text fontSize="lg" color="gray.500">
            No eBooks available at the moment.
          </Text>
        ) : (
          <SimpleGrid columns={gridCols} spacing={8}>
            {ebooks.map((ebook) => {
              const totalDownloads = ebook.pdfDownloads + ebook.epubDownloads;
              return (
                <Box
                  key={ebook.id}
                  bg={cardBg}
                  rounded="2xl"
                  boxShadow="lg"
                  transition="all 0.3s"
                  _hover={{ transform: "scale(1.02)", boxShadow: "xl" }}
                  role="region"
                  aria-labelledby={`ebook-title-${ebook.id}`}
                >
                  <Box position="relative">
                    <Image
                      src={ebook.image_file}
                      alt={`Cover image of ${ebook.name}`}
                      w="100%"
                      h="180px"
                      objectFit="cover"
                    />
                    <Badge position="absolute" top={2} left={2} colorScheme="teal" aria-label="Free eBook">
                      Free
                    </Badge>
                    {totalDownloads > 100 && (
                      <Badge position="absolute" top={2} right={2} colorScheme="red" aria-label="Trending eBook">
                        Trending
                      </Badge>
                    )}
                  </Box>

                  <VStack spacing={3} align="start" p={4}>
                    <Heading as="h3" id={`ebook-title-${ebook.id}`} size="sm" color={textColor}>
                      {ebook.name}
                    </Heading>
                    <Text fontSize="sm" noOfLines={2} color="gray.600">
                      {ebook.description}
                    </Text>

                    <Divider />

                    <Flex justify="space-between" w="full">
                      <Tooltip label="Download PDF version of this eBook">
                        <Button
                          size="xs"
                          leftIcon={<FaDownload />}
                          onClick={() => handleDownload(ebook.id, "pdf")}
                          as="a"
                          href={ebook.pdf_file}
                          target="_blank"
                          rel="noopener noreferrer"
                          colorScheme="teal"
                          aria-label={`Download PDF of ${ebook.name}`}
                        >
                          PDF
                        </Button>
                      </Tooltip>
                      {ebook.epub_file && (
                        <Tooltip label="Download EPUB version of this eBook">
                          <Button
                            size="xs"
                            leftIcon={<FaDownload />}
                            onClick={() => handleDownload(ebook.id, "epub")}
                            as="a"
                            href={ebook.epub_file}
                            target="_blank"
                            rel="noopener noreferrer"
                            colorScheme="blue"
                            aria-label={`Download EPUB of ${ebook.name}`}
                          >
                            EPUB
                          </Button>
                        </Tooltip>
                      )}
                    </Flex>

                    <Flex align="center" gap={3} flexWrap="wrap" justifyContent="space-between" mt={2} mb={2}>
                      <Tooltip
                        label={`${ebook.rating.toFixed(1)} average rating from ${ebook.reviewCount} reviews`}
                        fontSize="sm"
                        openDelay={300}
                      >
                        <Flex
                          as="span"
                          role="img"
                          aria-label={`Rating: ${ebook.rating.toFixed(1)} out of 5 from ${ebook.reviewCount} reviews`}
                          align="center"
                          gap={1}
                        >
                          {[...Array(5)].map((_, i) => (
                            <Icon
                              key={i}
                              as={i < Math.round(ebook.rating) ? FaStar : FaRegStar}
                              color={i < Math.round(ebook.rating) ? "yellow.400" : "gray.300"}
                              boxSize={5}
                              aria-hidden="true"
                            />
                          ))}
                          <Text fontSize="sm" color="gray.600" ml={1}>
                            ({ebook.reviewCount})
                          </Text>
                        </Flex>
                      </Tooltip>

                      <Flex align="center" gap={2} flexWrap="wrap">
                        <Badge
                          colorScheme="purple"
                          variant="subtle"
                          fontWeight="medium"
                          px={2}
                          py={1}
                          borderRadius="md"
                          title="Total downloads"
                          aria-label={`${totalDownloads} total downloads`}
                        >
                          📥 {totalDownloads} Downloads
                        </Badge>
                        <Badge
                          colorScheme="teal"
                          variant="outline"
                          fontWeight="medium"
                          px={2}
                          py={1}
                          borderRadius="md"
                          title="PDF downloads"
                          aria-label={`${ebook.pdfDownloads} PDF downloads`}
                        >
                          PDF: {ebook.pdfDownloads}
                        </Badge>
                        {ebook.epub_file && (
                          <Badge
                            colorScheme="blue"
                            variant="outline"
                            fontWeight="medium"
                            px={2}
                            py={1}
                            borderRadius="md"
                            title="EPUB downloads"
                            aria-label={`${ebook.epubDownloads} EPUB downloads`}
                          >
                            EPUB: {ebook.epubDownloads}
                          </Badge>
                        )}
                      </Flex>
                    </Flex>

                    <Button
                      size="sm"
                      colorScheme="yellow"
                      w="full"
                      onClick={() => {
                        setSelectedEbook(ebook);
                        setIsModalOpen(true);
                      }}
                      aria-label={`Rate the book ${ebook.name}`}
                    >
                      Rate This Book
                    </Button>
                  </VStack>
                </Box>
              );
            })}
          </SimpleGrid>
        )}
      </Container>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        scrollBehavior="inside"
        isCentered
        motionPreset="slideInBottom"
        aria-labelledby="review-modal-title"
        aria-describedby="review-modal-desc"
      >
        <ModalOverlay />
        <ModalContent maxH="80vh">
          <ModalHeader id="review-modal-title">Rate "{selectedEbook?.name}"</ModalHeader>
          <ModalCloseButton />
          <ModalBody id="review-modal-desc">
            <FormControl>
              <FormLabel htmlFor="rating-select">Rating</FormLabel>
              <Select
                id="rating-select"
                value={selectedEbook ? reviewInputs[selectedEbook.id]?.rating || "" : ""}
                onChange={(e) => {
                  if (selectedEbook) handleReviewChange(selectedEbook.id, "rating", parseInt(e.target.value));
                }}
                placeholder="Select rating"
              >
                {[1, 2, 3, 4, 5].map((num) => (
                  <option key={num} value={num}>
                    {num} Star{num > 1 ? "s" : ""}
                  </option>
                ))}
              </Select>
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button
              colorScheme="green"
              mr={3}
              onClick={() => {
                if (selectedEbook) {
                  submitReview(selectedEbook.id);
                  setIsModalOpen(false);
                }
              }}
              aria-label="Submit rating"
            >
              Submit
            </Button>
            <Button onClick={() => setIsModalOpen(false)} aria-label="Cancel rating modal">
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <Footer />
    </>
  );
};

export default EbookPage;
