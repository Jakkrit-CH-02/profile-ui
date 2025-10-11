import axios, { AxiosError } from 'axios';
import env from './env';

export const http = axios.create({
    baseURL: env.API_ENDPOINT,
    headers: {
        'Content-Type': 'application/json'
    },
    timeout: 5000
});

// Add request interceptor
// http.interceptors.request.use(
//     (config) => {
//         const token = localStorage.getItem('token');
//         if (token) {
//             config.headers.Authorization = `Bearer ${token}`;
//         }
//         return config;
//     },
//     (error) => {
//         return Promise.reject(error);
//     }
// );

// Add response interceptor
// http.interceptors.response.use(
//     (response) => response,
//     async (error: AxiosError) => {
//         const { response } = error;
        
//         if (response) {
//             switch (response.status) {
//                 case 400:
//                     console.error('Bad Request:', response.data);
//                     break;
//                 case 401:
//                     // Handle unauthorized access
//                     localStorage.removeItem('token');
//                     window.location.href = '/login';
//                     break;
//                 case 403:
//                     console.error('Forbidden - ไม่มีสิทธิ์เข้าถึง');
//                     break;
//                 case 404:
//                     console.error('Not Found - ไม่พบข้อมูล');
//                     break;
//                 case 422:
//                     console.error('Validation Error:', response.data);
//                     break;
//                 case 500:
//                     console.error('Server Error - เซิร์ฟเวอร์มีปัญหา');
//                     break;
//                 default:
//                     console.error('API Error:', response.status, response.data);
//             }
//         } else if (error.request) {
//             // Network error
//             console.error('Network Error - ไม่สามารถเชื่อมต่อเซิร์ฟเวอร์ได้');
//         } else {
//             console.error('Request Error:', error.message);
//         }
        
//         return Promise.reject(error);
//     }
// );