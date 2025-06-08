import axios from "axios";
import {
  Ebook,
  EbookPostData,
  EbookListResponse,
  EbookPostResponse,
} from "./model";

// ✅ Read base URL from .env
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const API_BASE = `${API_BASE_URL}/api/ebooks`;

/**
 * Fetch all ebooks
 */
export const getAllEbooks = async (): Promise<Ebook[]> => {
  const response = await axios.get<EbookListResponse>(`${API_BASE}/getall`);
  return response.data;
};

/**
 * Get ebook by ID
 */
export const getEbookById = async (ebookId: string): Promise<Ebook> => {
  const response = await axios.get<Ebook>(`${API_BASE}/get/${ebookId}`);
  return response.data;
};

/**
 * Post a new ebook (with FormData for file upload)
 */
export const postEbook = async (
  data: EbookPostData
): Promise<EbookPostResponse> => {
  const formData = new FormData();
  formData.append("name", data.name);
  formData.append("description", data.description);

  if (data.image_file) {
    formData.append("image_file", data.image_file);
  }

  if (data.pdf_file) {
    formData.append("pdf_file", data.pdf_file);
  }

  if (data.epub_file) {
    formData.append("epub_file", data.epub_file);
  }

  const response = await axios.post<EbookPostResponse>(
    `${API_BASE}/upload`,
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
 * Delete an ebook by UUID
 */
export const deleteEbook = async (
  ebookId: string
): Promise<{ message: string }> => {
  const response = await axios.delete<{ message: string }>(
    `${API_BASE}/delete/${ebookId}`
  );
  return response.data;
};

export const incrementDownloadCount = async (id: string, type: "pdf" | "epub") => {
  await axios.post(`/api/ebooks/${id}/increment_download`, { type });
};