import { API_URL } from '../config';

export const getUsers = async () => {
    const response = await fetch(`${API_URL}/user`);
    return await response.json();
}