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

  
  // FormData format when sending POST request with files
  export interface NewsletterPostData {
    title: string;
    description: string;
    image?: File; // image file (optional during edit)
    pdf?: File;   // pdf file (optional during edit)
  }
  
  // Response from GET /api/newsletters/getall
  export type NewsletterListResponse = Newsletter[];
  
  // Response from POST /api/newsletters/postnewsletter
  export interface NewsletterPostResponse {
    message: string;
  }
  
// ---------------------------------------
// Blog Interfaces
// ---------------------------------------

export interface Blog {
  id: string;
  title: string;
  image: string;     // URL to image
  tags: string[];     // List of tags
  description: string; // Markdown or plain text content
  author: string;
  created_at: string; // ISO date string
}

// FormData format when sending POST request with image file
export interface BlogPostData {
  title: string;
  description: string;
  tags: string[];      // array of tags
  author: string;
  image?: File;        // Optional image file (for create/edit)
}

// Response from GET /api/blogs
export type BlogListResponse = Blog[];

// Response from POST /api/blogs
export interface BlogPostResponse {
  message: string;
  blog: {
    id: string;
    title: string;
    description: string;
    author: string;
    tags: string[];
    image: string; // This will be a full URL like https://winvinaya.com/static/images/...
    created_at: string;
  };
}

