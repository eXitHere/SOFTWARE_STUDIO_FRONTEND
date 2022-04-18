import axios from './apiClient';
import { URL } from './constance';

async function listBlog() {
    try {
        const result = await axios(`${URL}/api/Blog/list`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            // withCredentials: true,
        });

        return result.data;
    } catch (error) {
        console.log(error);
        return [];
    }
}

export { listBlog };
