import React from 'react';
import { Box, Heading, Text } from '@chakra-ui/react';
import DB_Navbar from '../components/common/DB_Navbar';

const Dashboard: React.FC = () => {
    return (
        <>
            <DB_Navbar />
            
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
                Welcome to the Dashboard!
            </Heading>
            <Text fontSize="lg" textAlign="center">
                This is your dashboard where you can manage your account and settings.
            </Text>
        </Box>
        </>
        
    );
};

export default Dashboard;
