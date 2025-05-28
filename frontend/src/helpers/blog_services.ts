import axios from "axios";
import {
  Blog,
  BlogPostData,
  BlogListResponse,
  BlogPostResponse,
} from "./model";

// Base API path for blogs
const API_BASE_URL =
    import.meta.env.MODE === 'development'
        ? 'https://winvinaya.com'
        : ''; // Empty string works with Nginx in production

// const API_BASE = `${API_BASE_URL}/api/newsletters`;
const API_BASE = `${API_BASE_URL}/api/blogs`;

/**
 * Fetch all blogs
 */
export const getAllBlogs = async (): Promise<Blog[]> => {
  const response = await axios.get<BlogListResponse>(`${API_BASE}/getall`);
  return response.data;
};

/**
 * Get blog by ID
 */
export const getBlogById = async (blogId: string): Promise<Blog> => {
  const response = await axios.get<Blog>(`${API_BASE}/get/${blogId}`);
  return response.data;
};

/**
 * Post a new blog (with FormData for file upload)
 */
export const postBlog = async (data: BlogPostData): Promise<BlogPostResponse> => {
  const formData = new FormData();
  formData.append("title", data.title);
  formData.append("description", data.description);
  formData.append("author", data.author);
  formData.append("tags", data.tags.join(",")); // Pass as comma-separated string

  if (data.image) {
    formData.append("image", data.image);
  }

  const response = await axios.post<BlogPostResponse>(
    `${API_BASE}/postblog`, // Updated to match Flask route
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return response.data;
};

/**
 * Delete a blog by UUID
 */
export const deleteBlog = async (blogId: string): Promise<{ message: string }> => {
  const response = await axios.delete<{ message: string }>(`${API_BASE}/${blogId}`);
  return response.data;
};
