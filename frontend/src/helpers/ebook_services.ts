import axios from "axios";
import {
  Ebook,
  EbookPostData,
  EbookPutData,
  EbookListResponse,
  EbookPostResponse,
  EbookPutResponse,
  SubmitRatingResponse,
  RateEbookResponse,
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
 * Update an existing ebook (PUT with FormData for optional file updates)
 */
export const putEbook = async (
  ebookId: string,
  data: EbookPutData
): Promise<EbookPutResponse> => {
  const formData = new FormData();

  if (data.name) formData.append("name", data.name);
  if (data.description) formData.append("description", data.description);
  if (data.image_file) formData.append("image_file", data.image_file);
  if (data.pdf_file) formData.append("pdf_file", data.pdf_file);
  if (data.epub_file) formData.append("epub_file", data.epub_file);

  const response = await axios.put<EbookPutResponse>(
    `${API_BASE}/update/${ebookId}`,
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

/**
 * Increment PDF/EPUB download count
 */
export const incrementDownloadCount = async (
  ebookId: string,
  type: "pdf" | "epub"
): Promise<void> => {
  await axios.post(`${API_BASE}/increment_download/${ebookId}?type=${type}`);
};

/**
 * Submit rating for an ebook
 */
export const submitRating = async (
  ebookId: string,
  rating: number
): Promise<SubmitRatingResponse> => {
  const response = await axios.post<SubmitRatingResponse>(
    `${API_BASE}/submit_rating/${ebookId}`,
    { rating }
  );
  return response.data;
};

export const rateEbook = async (
  ebookId: string,
  rating: number
): Promise<RateEbookResponse> => {
  const response = await axios.post(`${API_BASE}/${ebookId}/rate`, { rating });
  return response.data;
};
