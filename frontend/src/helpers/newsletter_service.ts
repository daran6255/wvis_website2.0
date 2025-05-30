import axios from "axios";
import {
  Newsletter,
  NewsletterPostData,
  NewsletterListResponse,
  NewsletterPostResponse,
} from "./model";

const API_BASE_URL =
    import.meta.env.MODE === 'development'
        // ? 'http://localhost:5173'
        ? 'https://winvinaya.com'
        : ''; // Empty string works with Nginx in production

const API_BASE = `${API_BASE_URL}/api/newsletters`;

/**
 * Fetch all newsletters
 */
export const getAllNewsletters = async (): Promise<Newsletter[]> => {
  const response = await axios.get<NewsletterListResponse>(`${API_BASE}/getall`);
  return response.data;
};

/**
 * Post a new newsletter (with FormData for file upload)
 */
export const postNewsletter = async (data: NewsletterPostData): Promise<NewsletterPostResponse> => {
  const formData = new FormData();
  formData.append("title", data.title);
  formData.append("description", data.description);
  if (data.image) formData.append("image", data.image);
  if (data.pdf) formData.append("pdf", data.pdf);

  const response = await axios.post<NewsletterPostResponse>(
    `${API_BASE}/postnewsletter`,
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
 * Delete a newsletter by UUID
 */
export const deleteNewsletter = async (newsletterId: string): Promise<{ message: string }> => {
  const response = await axios.delete<{ message: string }>(`${API_BASE}/delete/${newsletterId}`);
  return response.data;
};
