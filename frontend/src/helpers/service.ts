import axios, { AxiosError } from 'axios';
import {  
    LoginResponse, 
    SignupData, 
    SignupResponse, 
    LogoutResponse, 
    VerifyTokenResponse 
} from './model';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const axiosInstance = axios.create({
    baseURL: API_BASE_URL,
    withCredentials: true,
});

const handleError = (error: AxiosError): never => {
    if (error.response) {
        console.error('API Error:', error.response.data);
        if (error.response.status === 404) {
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

export const login = async (email: string, password: string): Promise<LoginResponse> => {
    try {
        const response = await axiosInstance.post<LoginResponse>('/auth/login', { email, password });
        if (response.data.token) {
            localStorage.setItem('access_token', response.data.token);
        }
        return response.data;
    } catch (error) {
        return handleError(error as AxiosError);
    }
};

export const signup = async (userData: SignupData): Promise<SignupResponse> => {
    try {
        const response = await axiosInstance.post<SignupResponse>('/auth/signup', userData);
        console.log('Signup Response:', response);
        return response.data;
    } catch (error) {
        console.error('Error during signup:', error);
        return handleError(error as AxiosError);
    }
};

export const logout = async (): Promise<LogoutResponse> => {
    try {
        const response = await axiosInstance.post<LogoutResponse>('/auth/logout');
        return response.data;
    } catch (error) {
        return handleError(error as AxiosError);
    }
};

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
        throw error;
    }
};
