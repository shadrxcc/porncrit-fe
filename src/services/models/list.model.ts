import { FetchStatusType } from "./shared.model";
// import { UsersModel } from "./user.model";

export type TagsType = {
    tag: string;
};

export type VideoType = {
    title: string;
    image: string;
    id: string;
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
    likes: string[];
    likesCount: number
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
        likes: string[];
        likesCount: number
    };
    status: FetchStatusType;
    page: number;
    totalData: number;
};

export type ListType = {
    lists: ListData[]
    list: ListData
    allLists: ListData[]
    listvideos: LinkVideoModel[]
    status: FetchStatusType;
    page: number;
    totalData: number;
};

export interface UpdateVideo {
    videoId: string;
    tags: string[];
    model: string[];
}

export interface SearchVideo {
    _id: string,
    title: string,
    rating: number,
    models: string[],
    tags: string[],
    videoId: string,
    image: string,
    duration: string,
    embedLink: string,
    views: number,
    reviewCount: number,
    uploader: string,
    createdAt: string,
    updatedAt: string,
    __v: number
}

export interface CreateList {
    title: string;
    description: string;
    tags: string[],
    videos: string[]
}

export interface EditList {
    title: string;
    description: string;
    tags: string[],
    videos: string[];
    listId: string;
}

export interface ListData {
    _id: string;
    description: string;
    title: string;
    tags: string[];
    uploader: string
    videos: Partial<LinkVideoModel[]>;
    user: Partial<UsersModel>;
}




// "data": [
//     {
//         "_id": "65f05a693c5895a4a5225d6c",
//         "description": "SOAPY O'CLOCK",
//         "title": "Soapy",
//         "tags": [
//             "ebony",
//             "huge ass",
//             "creampies"
//         ],
//         "uploader": "65dc935c59578c7ffce3e3d9",
//         "videos": [
//             {
//                 "_id": "65eefa96b3ead7003a20981c",
//                 "title": "Black stepsis gets what she wants - ebony porn",
//                 "rating": 5,
//                 "models": [
//                     "mena-carlisle1"
//                 ],
//                 "tags": [],
//                 "videoId": "video71601483/black_stepsis_gets_what_she_wants_-_ebony_porn",
//                 "image": "https://cdn77-pic.xvideos-cdn.com/videos/thumbs169ll/f7/e1/5d/f7e15db77f92a77fcf837a5d5e64bb4a/f7e15db77f92a77fcf837a5d5e64bb4a.30.jpg",
//                 "duration": "5min, 0sec",
//                 "embedLink": "https://www.xvideos.com/embedframe/uuuldube73e",
//                 "views": 1,
//                 "reviewCount": 1,
//                 "uploader": "65dc935c59578c7ffce3e3d9",
//                 "createdAt": "2024-03-11T12:35:34.007Z",
//                 "updatedAt": "2024-03-11T12:37:06.730Z",
//                 "__v": 0
//             },
//             {
//                 "_id": "65eefcc4b3ead7003a209859",
//                 "title": "Horny black step daughter gets fucked by her stepdad's huge black dick",
//                 "rating": 5,
//                 "models": [
//                     "johnathan-jordan-xxx1",
//                     "zoey-sinn"
//                 ],
//                 "tags": [
//                     "black",
//                     "boobs",
//                     "ebony",
//                     "huge-tits",
//                     "reality",
//                     "big-tits",
//                     "bbc",
//                     "step-dad",
//                     "black-porn",
//                     "ebony-porn",
//                     "reality-porn",
//                     "free-black-porn",
//                     "step-daughter",
//                     "step-father"
//                 ],
//                 "videoId": "video80003507/horny_black_step_daughter_gets_fucked_by_her_stepdad_s_huge_black_dick",
//                 "image": "https://cdn77-pic.xvideos-cdn.com/videos/thumbs169ll/47/0b/ed/470bedf36b0a9578a0b8725a7150a06d/470bedf36b0a9578a0b8725a7150a06d.30.jpg",
//                 "duration": "5min, 0sec",
//                 "embedLink": "https://www.xvideos.com/embedframe/ucuchbk3aba",
//                 "views": 1,
//                 "reviewCount": 1,
//                 "uploader": "65dc935c59578c7ffce3e3d9",
//                 "createdAt": "2024-03-11T12:44:52.493Z",
//                 "updatedAt": "2024-03-11T12:44:52.493Z",
//                 "__v": 0
//             }
//         ],
//         "views": 1,
//         "rating": 5,
//         "createdAt": "2024-03-12T13:36:41.017Z",
//         "updatedAt": "2024-03-12T13:36:41.017Z",
//         "__v": 0
//     }
// ],
// "success": true
// }