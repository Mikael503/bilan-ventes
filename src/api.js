import { ApiError, HttpError, timeoutError, NetworkError } from './errors.js';
    try {
const API_URL = 'https://dummyjson.com';
async function fetchJson(path) {
    const response = await fetch(`${API_URL}${path}`);
    if (!response.ok) {
        throw new HttpError('Failed to fetch JSON', response.status);
    }
    return response.json();
}

return await response.json();
    } catch (error) {
        if (error instanceof ApiError){
            throw error;
        }
        if (error.name === 'AbortError') {
            throw new timeoutError('Request timed out');
        }
       if (error instanceof TypeError) {
            throw new NetworkError('Network error occurred');
        }
        throw error;
}
export async function getCarts() {
    return fetchJson('carts?limit=0');
};
export const getProducts = async () => {
    return fetchJson('products?limit=0');
};
export const getUsers = async () => {
    return fetchJson('users?limit=0');
}
