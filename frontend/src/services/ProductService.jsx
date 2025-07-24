import axios from 'axios';

const API = import.meta.env.VITE_API_BASE_URL;

export const getAllProducts = () => axios.get(`${API}/Products`);
export const addProduct = (product) => axios.post(`${API}/Products`, product);
export const updateProduct = (id, product) => axios.put(`${API}/Products/${id}`, product);
export const deleteProductByName = (name) => axios.delete(`${API}/Products/name/${name}`);