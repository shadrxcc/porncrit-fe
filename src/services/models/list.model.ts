import { FetchStatusType } from "./shared.model";
// import { UsersModel } from "./user.model";

export type TagsType = {
    tag: string;
};

export interface TagsModel {
    _id: string,
    title: string,
}

export type GetTagsType = {
    tags: TagsModel[];
    status: FetchStatusType
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

export type LikesModel = {
    createdAt: string | number | Date;
    _id: string;
    type: string;
    liker: string;
    updatedAt: string
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

export interface VideoModel {
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
    reviews: ReviewsModel[];
    lists: ListData[]
    likes: LikesModel[]
}


export interface ReviewsModel {
    createdAt: string | number | Date;
    _id: string;
    note: string;
    videoId: string;
    reviewer: string;
    comments: [];
    likes: [];
    likesCount: number;
    rating: number;
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


export type ListType = {
    lists: ListData[]
    list: ListData
    allLists: ListData[]
    popular: ListData[]
    listvideos: LinkVideoModel[]
    status: FetchStatusType;
    page: number;
    totalData: number;
};

export interface Reviews {
    reviews: ReviewsModel[];
    user: UsersModel
}


export type ReviewsType = {
    myreview: Reviews;
    review:ReviewsModel
    allreviews: GetReviews[];
    popular: GetReviews[]
    status: FetchStatusType;
    page: number;
    totalData: number;
};
export interface ReeviewsModel {
    _id: string;
    note: string;
    videoId: string;
    reviewer: string;
    comments: [];
    likes: [];
    likesCount: number;
    rating: number;
}

export interface GetReviews {
    createdAt: string | number | Date;
    _id: string;
    note: string;
    videoId: string;
    reviewer: string;
    comments: [];
    likes: [];
    likesCount: number;
    rating: number;
    video: LinkVideoModel;
    user: UsersModel;
}

export type GetVideoType = {
    video: VideoModel
    videos: LinkVideoModel[]
    status: FetchStatusType;
    // page: number;
    // totalData: number;
};

export interface UpdateVideo {
    videoId: string;
    tags: string[];
    model: string[];
}

export interface ReviewVideo {
    videoId: string;
    note: string;
    rating: number;
}

export interface UpdateReview {
    reviewId: string;
    note: string;
    rating: number;
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

export interface CommentsProp {
    createdAt: string | number | Date;
    _id: string;
    comment: string;
    type: string;
    commenter: {
        username: string;
        avatar: string;
        _id: string;
    },
    likes: string[],
    subjectId: string;
    likesCount: number
}

export interface ListData {
    createdAt: string | number | Date;
    _id: string;
    description: string;
    title: string;
    tags: string[];
    uploader: Partial<UsersModel>
    videos: Partial<LinkVideoModel[]>;
    user: Partial<UsersModel>;
    likes: LikesModel[];
    likesCount: number;
    comments: CommentsProp[]
    updatedAt: string;
}

export interface ListComment {
    listId: string;
    comment: string
}

export interface TagsModel {
    _id: string;
    title: string;
}

export interface SearchResults {
    tags: TagsModel[];
    videos: LinkVideoModel[];
    reviews: ReviewsModel[];
    users: UsersModel[]
    lists: ListData[]
}

export interface SearchType {
    results: SearchResults;
    status: FetchStatusType;
}

