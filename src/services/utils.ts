import dotenv from "dotenv";

dotenv.config();

export const API_URL: string =
    process.env.NEXT_PUBLIC_API_URL as string;

export const formatTimestamp = (timestamp: string | number | Date): string => {
    const now = new Date();
    const inputDate = new Date(timestamp);
    const diffInSeconds = Math.floor((now.getTime() - inputDate.getTime()) / 1000);

    const timeUnits: { [key: string]: number } = {
        year: 31536000,
        month: 2592000,
        day: 86400,
        hour: 3600,
        minute: 60,
        second: 1,
    };

    let largestUnit = 'second';
    for (const unit in timeUnits) {
        if (diffInSeconds >= timeUnits[unit]) {
            largestUnit = unit;
            break;
        }
    }

    const value = Math.floor(diffInSeconds / timeUnits[largestUnit]);
    let unitLabel = largestUnit;

    if (value === 1) {
        unitLabel = largestUnit;
    } else if (value > 1) {
        unitLabel += 's';
    }

    return `${value} ${unitLabel} ago`;
};

// export const shortenText = ({ text, maxLength }: { text: string | undefined; maxLength: number }) => {
//     if (text?.length > maxLength) {
//         return `${text?.slice(0, maxLength)}...`;
//     }
//     return text;
// };