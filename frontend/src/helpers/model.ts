// ---------------------------------------
// User Interface (from backend structure)
// ---------------------------------------
export interface User {
  id: string;
  email: string;
}

// ---------------------------------------
// Signup / Login
// ---------------------------------------
export interface SignupData {
  email: string;
  password: string;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface LoginResponse {
  status: string;
  token: string;
  result: {
    id: string;
    email: string;
  };
}

export interface SignupResponse {
  status: string;
  result?: {
    id: string;
    email: string;
  };
  message?: string;
}

export interface LogoutResponse {
  msg: string;
}

export interface VerifyTokenResponse {
  status: string;
  message: string;
  result: {
    id: string;
    email: string;
  } | null;
}

// ---------------------------------------
// Newsletter Interfaces
// ---------------------------------------
export interface Newsletter {
  id: string;
  title: string;
  image: string;
  link: string;
  description: string;
}

export interface NewsletterPostData {
  title: string;
  description: string;
  image?: File;
  pdf?: File;
}

export type NewsletterListResponse = Newsletter[];

export interface NewsletterPostResponse {
  message: string;
}

// ---------------------------------------
// Blog Interfaces
// ---------------------------------------
export interface Blog {
  id: string;
  title: string;
  image: string;
  tags: string[];
  description: string;
  author: string;
  created_at: string;
}

export interface BlogPostData {
  title: string;
  description: string;
  tags: string[];
  author: string;
  image?: File;
}

export type BlogListResponse = Blog[];

export interface BlogPostResponse {
  message: string;
  blog: {
    id: string;
    title: string;
    description: string;
    author: string;
    tags: string[];
    image: string;
    created_at: string;
  };
}

// ---------------------------------------
// Ebook Interfaces
// ---------------------------------------

export interface Ebook {
  id: string;
  name: string;
  description: string;
  image_file: string;   // URL to image
  pdf_file: string;     // URL to PDF
  epub_file: string;    // URL to EPUB
  page_count: number;
  created_at: string;
  pdf_downloads?: number;
  epub_downloads?: number;
  rating?: number;
  review_count?: number;
}

// Used for POST (create)
export interface EbookPostData {
  name: string;
  description: string;
  image_file: File;
  pdf_file: File;
  epub_file: File;
}

// Used for PUT (update, all fields optional)
export interface EbookPutData {
  name?: string;
  description?: string;
  image_file?: File;
  pdf_file?: File;
  epub_file?: File;
}

export interface EbookPostResponse {
  message: string;
  ebook: Ebook;
}

export interface EbookPutResponse {
  message: string;
  ebook: Ebook;
}

export type EbookListResponse = Ebook[];

export interface SubmitRatingResponse {
  message: string;
  ebook_id: string;
  rating: number;
}

export interface RateEbookResponse {
  message: string;
  rating: number;
  review_count: number;
}
