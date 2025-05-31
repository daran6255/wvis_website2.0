import axios, { AxiosError } from 'axios';
import {  
    LoginResponse, 
    SignupData, 
    SignupResponse, 
    LogoutResponse, 
    VerifyTokenResponse 
} from './model';

const API_BASE_URL =
    import.meta.env.MODE === 'development'
        // ? 'http://localhost:5173'
        ? 'https://winvinaya.com'
        : ''; // Empty string works with Nginx in production

// Axios instance for default configurations
const axiosInstance = axios.create({
    baseURL: `${API_BASE_URL}`,
    withCredentials: true, // Include cookies in requests
});

// Utility function to handle errors
const handleError = (error: AxiosError): never => {
    if (error.response) {
        console.error('API Error:', error.response.data);
        if (error.response.status === 404) {
            // Log or alert for 404 errors specifically
            alert('Resource not found: ' + error.response.data);
        }
        throw error.response?.data || { message: 'An unexpected error occurred' };
    } else if (error.request) {
        console.error('No response received:', error.request);
        throw { message: 'No response received from the server' };
    } else {
        console.error('Error setting up request:', error.message);
        throw { message: 'An error occurred while setting up the request' };
    }
};


// Authentication Services

/**
 * Login API call
 * @param email - User email
 * @param password - User password
 * @returns LoginResponse
 */
export const login = async (email: string, password: string): Promise<LoginResponse> => {
    try {
        const response = await axiosInstance.post<LoginResponse>('/auth/login', { email, password });
        
        // Store the token after login
        if (response.data.token) {
            localStorage.setItem('access_token', response.data.token); // Store token in localStorage
        }
        
        return response.data;
    } catch (error) {
        return handleError(error as AxiosError);
    }
};


/**
 * Signup API call
 * @param userData - User signup data
 * @returns SignupResponse
 */
export const signup = async (userData: SignupData): Promise<SignupResponse> => {
    try {
        const response = await axiosInstance.post<SignupResponse>('/auth/signup', userData);
		console.log('Signup Response:', response);
        return response.data;
    } catch (error) {
		console.error('Error during signup:', error);
        return handleError(error as AxiosError); // Just rely on handleError here
    }
};

/**
 * Logout API call
 * @returns LogoutResponse
 */
export const logout = async (): Promise<LogoutResponse> => {
    try {
        const response = await axiosInstance.post<LogoutResponse>('/auth/logout');
        return response.data;
    } catch (error) {
        return handleError(error as AxiosError);
    }
};

/**
 * Verify Token API call
 * @returns VerifyTokenResponse
 */
export const verifyToken = async (): Promise<VerifyTokenResponse> => {
    try {
        const token = localStorage.getItem('access_token');
        if (!token) {
            throw new Error('No token found');
        }

        const response = await axiosInstance.get<VerifyTokenResponse>('/auth/verify-token', {
            headers: { Authorization: `Bearer ${token}` },
        });

        return response.data;
    } catch (error) {
        console.error('Error during token verification:', error);
        handleError(error as AxiosError);
        throw error;  // Optional, depending on how you want to handle it in the UI
    }
};
