import dotenv from "dotenv";

dotenv.config();

export const API_URL: string =
    process.env.NEXT_PUBLIC_API_URL as string;

export const formatTimestamp = (timestamp: string | number | Date) => {
    const date = new Date(timestamp);
    const options: Intl.DateTimeFormatOptions = {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
    };
    return date.toLocaleDateString("en-US", options);
};
