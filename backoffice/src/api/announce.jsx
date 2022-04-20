import axios from './apiClient';
import { URL } from './constance';

async function createAnnounce(content) {
    try {
        const result = await axios(`${URL}/api/Admin/manage/announce/create`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            data: JSON.stringify({
                content: JSON.stringify(content),
            }),
        });

        // console.log(result.data);

        return result.data;
    } catch (error) {
        console.log(error);
        return null;
    }
}

async function getAnnounce() {
    try {
        const result = await axios(`${URL}/api/Announce`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        // console.log(result.data);

        return result.data;
    } catch (error) {
        console.log(error);
        return null;
    }
}

export { createAnnounce, getAnnounce };
