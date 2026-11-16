import { ApiError, HttpError, timeoutError, NetworkError } from './errors.js';

const API_URL = 'https://dummyjson.com/';
async function fetchJson(path) {

    // try {
        const response = await fetch(`${API_URL}${path}`);
       
        if (!response.ok) {
            throw new HttpError('Failed to fetch JSON', response.status);
        }

        return response.json();

    // } catch (error) {

    //     if (error instanceof ApiError) {
    //         throw error;

    //     }
    //     if (error.name === 'AbortError') {
    //         throw new timeoutError('Request timed out');
    //     }
    //     if (error instanceof TypeError) {
    //         throw new NetworkError('Network error occurred');
    //     }
    //     throw error;
    // }
}


export async function getCarts() {
    return await fetchJson('carts?limit=0');
};
export const getProducts = async () => {
    return await fetchJson('products?limit=0');
};
export const getUsers = async () => {
    return await fetchJson('users?limit=0');
}

// let users = await getUsers();
// let products = await getProducts();

// let carts = await getCarts();


// console.log(users, carts, products)