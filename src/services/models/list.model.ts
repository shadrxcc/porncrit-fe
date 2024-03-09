import { FetchStatusType } from "./shared.model";
// import { UsersModel } from "./user.model";

export type TagsType = {
    tag: string;
};

export type PerformersType = {
    performer: string
}

export type LinkVideo = {
    url: string
}



export interface LinkVideoModel {
    _id: string;
    title: string;
    rating: number; // Changed from string to number
    models: string[];
    videoId: string;
    image: string;
    duration: string;
    embedLink: string;
    views: number; // Changed from Date to number
    createdAt: string; // Changed from Date to string
    updatedAt: string; // Changed from Date to string
    reviewCount: number; // Changed from string to number
    uploader: string; // Changed from string[] to string
    tags: string[];
    __v?: number;
}

export interface UsersModel {
    accountDisabled: boolean;
    avatar: string;
    bio: string;
    createdAt: string;
    email: string;
    emailVerified: boolean;
    lastActive: string;
    performers: string[];
    role: string;
    tags: string[];
    updatedAt: string;
    username: string;
    __v: number;
    _id: string;
}

export type LinkedVideoType = {
    user?: UsersModel
    video: {
        _id: string; 
        title: string; 
        rating: number;
        models: string[]; 
        videoId: string; 
        image: string; 
        duration: string; 
        embedLink: string; 
        views: number; 
        createdAt: string; 
        updatedAt: string; 
        reviewCount: number; 
        uploader: string; 
        tags: string[]; 
        __v?: number | undefined;
    };
    status: FetchStatusType;
    page: number;
    totalData: number;
};
// "data": {
//     "title": "VIXEN Stunning beauty Olivia orgasms & squirts intensely",
//     "rating": 5,
//     "models": [
//         "maximo_garcia1",
//         "olivia-jay2"
//     ],
//     "tags": [
//         "facial",
//         "blowjob",
//         "handjob",
//         "brunette",
//         "riding",
//         "doggystyle",
//         "squirting",
//         "squirt",
//         "deepthroat",
//         "ebony",
//         "pussy-licking",
//         "reverse-cowgirl",
//         "spoon",
//         "spooning",
//         "cum-in-mouth",
//         "hairy-pussy",
//         "misisonary"
//     ],
//     "videoId": "video77240583/vixen_stunning_beauty_olivia_orgasms_and_squirts_intensely",
//     "image": "https://gcore-pic.xvideos-cdn.com/videos/thumbs169ll/35/63/94/35639434e9e88fd554aae6eaec2f3603/35639434e9e88fd554aae6eaec2f3603.30.jpg",
//     "duration": "12min, 27sec",
//     "embedLink": "https://www.xvideos.com/embedframe/77240583",
//     "views": 1,
//     "reviewCount": 1,
//     "uploader": "65dc935c59578c7ffce3e3d9",
//     "_id": "65ec553aee861dad0ea60c68",
//     "createdAt": "2024-03-09T12:25:30.059Z",
//     "updatedAt": "2024-03-09T12:25:30.059Z",
//     "__v": 0
// },