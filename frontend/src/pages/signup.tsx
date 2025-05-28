import React, { useState } from 'react';
import {
    Box,
    Button,
    FormControl,
    FormLabel,
    Input,
    VStack,
    Heading,
    Text,
} from '@chakra-ui/react';
import { signup } from '../helpers/service'; // Signup service
import { SignupData } from '../helpers/model'; // Updated model
import useCustomToast from '../hooks/useCustomToast'; // Toast hook

const Signup: React.FC = () => {
    const [formData, setFormData] = useState<SignupData>({
        email: '',
        password: '',
    });
    const [isLoading, setIsLoading] = useState(false);
    const showToast = useCustomToast();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
    
        try {
            const response = await signup(formData);
            showToast('Signup Successful', response.message || 'Account created!', 'success');
            setFormData({ email: '', password: '' });
        } catch (error) {
            const err = error as Error;
            showToast('Signup Failed', err.message || 'Something went wrong.', 'error');
        } finally {
            setIsLoading(false);
        }
    };
        
    return (
        <Box
            maxW="md"
            mx="auto"
            mt={8}
            p={6}
            borderWidth={1}
            borderRadius="lg"
            boxShadow="lg"
        >
            <Heading as="h1" size="lg" mb={6} textAlign="center">
                Create an Account
            </Heading>
            <form onSubmit={handleSubmit}>
                <VStack spacing={4}>
                    <FormControl isRequired>
                        <FormLabel>Email</FormLabel>
                        <Input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Enter your email"
                        />
                    </FormControl>
                    <FormControl isRequired>
                        <FormLabel>Password</FormLabel>
                        <Input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="Enter your password"
                        />
                    </FormControl>
                    <Button
                        type="submit"
                        colorScheme="teal"
                        width="full"
                        isLoading={isLoading}
                    >
                        Sign Up
                    </Button>
                </VStack>
            </form>
            <Text mt={4} textAlign="center">
                Already have an account? <a href="/login" style={{ color: 'teal' }}>Log in</a>
            </Text>
        </Box>
    );
};

export default Signup;
