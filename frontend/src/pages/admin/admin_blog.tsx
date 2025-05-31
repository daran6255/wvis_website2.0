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
  FormHelperText,
  Flex,
  Text,Tooltip ,
} from "@chakra-ui/react";
import {
  AiOutlineBold,
  AiOutlineItalic,
  AiOutlineUnderline,
  AiOutlineOrderedList,
  AiOutlineUnorderedList,
  AiOutlineFontSize,
} from "react-icons/ai";
import { MdLooksOne, MdLooksTwo, MdFormatColorReset } from "react-icons/md";
import { useState } from "react";
import { postBlog } from "../../helpers/blog_services";
import { BlogPostData, BlogPostResponse } from "../../helpers/model";
import useCustomToast from "../../hooks/useCustomToast";
import DB_Navbar from "../../components/common/DB_Navbar";
import BlogTable from "../../components/admin/blog_table";

// TipTap imports
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import TextStyle from "@tiptap/extension-text-style";
import Color from "@tiptap/extension-color";
import { Editor } from "@tiptap/core";

const MAX_DESCRIPTION_LENGTH = 4000;

const MenuBar = ({ editor }: { editor: Editor | null }) => {
  if (!editor) return null;

  return (
    <Flex gap={2} mb={2} flexWrap="wrap" alignItems="center">
      <Tooltip label="Bold" placement="top" openDelay={500}>
        <Button
          size="sm"
          onClick={() => editor.chain().focus().toggleBold().run()}
          isActive={editor.isActive("bold")}
          aria-label="Bold"
        >
          <AiOutlineBold />
        </Button>
      </Tooltip>

      <Tooltip label="Italic" placement="top" openDelay={500}>
        <Button
          size="sm"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          isActive={editor.isActive("italic")}
          aria-label="Italic"
        >
          <AiOutlineItalic />
        </Button>
      </Tooltip>

      <Tooltip label="Underline" placement="top" openDelay={500}>
        <Button
          size="sm"
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          isActive={editor.isActive("underline")}
          aria-label="Underline"
        >
          <AiOutlineUnderline />
        </Button>
      </Tooltip>

      <Tooltip label="Bullet List" placement="top" openDelay={500}>
        <Button
          size="sm"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          isActive={editor.isActive("bulletList")}
          aria-label="Bullet List"
        >
          <AiOutlineUnorderedList />
        </Button>
      </Tooltip>

      <Tooltip label="Numbered List" placement="top" openDelay={500}>
        <Button
          size="sm"
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          isActive={editor.isActive("orderedList")}
          aria-label="Numbered List"
        >
          <AiOutlineOrderedList />
        </Button>
      </Tooltip>

      <Tooltip label="Paragraph" placement="top" openDelay={500}>
        <Button
          size="sm"
          onClick={() => editor.chain().focus().setParagraph().run()}
          aria-label="Paragraph"
        >
          <AiOutlineFontSize />
        </Button>
      </Tooltip>

      <Tooltip label="Heading 1" placement="top" openDelay={500}>
        <Button
          size="sm"
          onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
          isActive={editor.isActive("heading", { level: 1 })}
          aria-label="Heading 1"
        >
          <MdLooksOne />
        </Button>
      </Tooltip>

      <Tooltip label="Heading 2" placement="top" openDelay={500}>
        <Button
          size="sm"
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          isActive={editor.isActive("heading", { level: 2 })}
          aria-label="Heading 2"
        >
          <MdLooksTwo />
        </Button>
      </Tooltip>

      {/* Font Color Picker */}
      <Tooltip label="Font Color" placement="top" openDelay={500}>
        <input
          type="color"
          title="Font Color"
          onChange={(e) => editor.chain().focus().setColor(e.target.value).run()}
          style={{ width: 32, height: 32, border: "none", cursor: "pointer", padding: 0 }}
          aria-label="Font Color Picker"
        />
      </Tooltip>

      <Tooltip label="Reset Color" placement="top" openDelay={500}>
        <Button
          size="sm"
          onClick={() => editor.chain().focus().unsetColor().run()}
          aria-label="Reset Color"
        >
          <MdFormatColorReset />
        </Button>
      </Tooltip>
    </Flex>
  );
};

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

    if (description.length > MAX_DESCRIPTION_LENGTH) {
      showToast(
        "Description too long",
        `Description cannot exceed ${MAX_DESCRIPTION_LENGTH} characters.`,
        "error"
      );
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
    extensions: [StarterKit, Underline, TextStyle, Color],
    content: formData.description,
    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      const textContent = editor.state.doc.textBetween(0, editor.state.doc.content.size, " ");
      if (textContent.length <= MAX_DESCRIPTION_LENGTH) {
        setFormData((prev) => ({
          ...prev,
          description: html,
        }));
      } else {
        // Prevent further typing if max length reached
        editor.commands.undo();
      }
    },
  });

  // Count plain text length for character count
  const plainTextLength = editor
    ? editor.state.doc.textBetween(0, editor.state.doc.content.size, " ").length
    : 0;

  return (
    <>
      <DB_Navbar />

      <Box maxW="6xl" mx="auto" mt={10} p={6}>
        <Flex justify="flex-end" mb={4}>
          <Button colorScheme="teal" onClick={onOpen}>
            Add Blog
          </Button>
        </Flex>

        <Modal isOpen={isOpen} onClose={onClose} size="lg" scrollBehavior="inside">
          <ModalOverlay />
          <ModalContent
            maxH="80vh"
            overflow="hidden"
            display="flex"
            flexDirection="column"
          >
            <ModalHeader>Create Blog</ModalHeader>
            <ModalCloseButton />
            <form
              onSubmit={handleSubmit}
              style={{ display: "flex", flexDirection: "column", flexGrow: 1, overflow: "hidden" }}
            >
              <ModalBody
                flexGrow={1}
                overflowY="auto"
                pb={4}
                sx={{
                  "&::-webkit-scrollbar": {
                    width: "8px",
                  },
                  "&::-webkit-scrollbar-thumb": {
                    background: "#CBD5E0",
                    borderRadius: "24px",
                  },
                }}
              >
                <VStack spacing={4} align="stretch">
                  <FormControl isRequired>
                    <FormLabel>Title</FormLabel>
                    <Input
                      type="text"
                      name="title"
                      value={formData.title}
                      onChange={handleInputChange}
                      placeholder="Enter blog title"
                      autoComplete="off"
                    />
                  </FormControl>

                  <FormControl isRequired>
                    <FormLabel>Description</FormLabel>
                    <Box
                      border="1px solid"
                      borderColor="gray.300"
                      borderRadius="md"
                      p={3}
                      bg="white"
                      minH="200px"
                      maxH="300px"
                      overflowY="auto"
                      boxShadow="sm"
                    >
                      <MenuBar editor={editor} />
                      <EditorContent editor={editor} />
                    </Box>
                    <Text mt={1} textAlign="right" fontSize="sm" color={plainTextLength > MAX_DESCRIPTION_LENGTH ? "red.500" : "gray.600"}>
                      {plainTextLength} / {MAX_DESCRIPTION_LENGTH} characters
                    </Text>
                  </FormControl>

                  <FormControl isRequired>
                    <FormLabel>Author</FormLabel>
                    <Input
                      type="text"
                      name="author"
                      value={formData.author}
                      onChange={handleInputChange}
                      placeholder="Enter author name"
                      autoComplete="off"
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
                      autoComplete="off"
                    />
                  </FormControl>

                  <FormControl isRequired>
                    <FormLabel>Upload Image</FormLabel>
                    <Input
                      type="file"
                      name="image"
                      accept=".jpg,.jpeg,.png"
                      onChange={handleFileChange}
                    />
                    <FormHelperText>Accepted types: .jpg, .jpeg, .png</FormHelperText>
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
