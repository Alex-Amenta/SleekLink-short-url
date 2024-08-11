import axios from "axios";

export const isValidUrl = async (originalUrl) => {
    try {
        const response = await axios.head(originalUrl);

        return response.status

    } catch (error) {
        return false;
    }
}