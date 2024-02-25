// import { FetchStatusType } from "./shared.model";
// import { UsersModel } from "./user.model";

// // 
// export interface TourRequest {
//     _id: string;
//     user: string; // Assuming it's a user ID
//     preferredDates: Date;
//     customMessage?: string;
// }

// export enum TenureOption {
//     PerAnnum = 'per annum',
//     PerMonth = 'per month',
//     PerQuarter = 'per quarter',
//     PerHalfYear = 'per half-year',
// }

// export type ListingData = {
//     _id?: string;
//     users?: UsersModel[];
//     title: string;
//     images: Array<{ url: string; description?: string }>;
//     description: string;
//     price?: {
//         amount?: number;
//         tenure?: TenureOption;
//     };
//     location?: string;
//     agreement: number;
//     apartmentType: ApartmentTypeOption;
//     apartmentFeatures: AmenityOptions[];
//     apartmentServices: ApartmentServices[];
//     bedrooms: number;
//     bathrooms: number;
//     toilets: number;
//     condition: ConditionOption;
//     furnishing: FurnishingOption;
//     tourRequests?: TourRequest[];
//     favoritesCount?: number;
//     verified?: boolean;
//     isLiked?: boolean;
//     invoice?: string;
//     paymentStatus?: string;
//     status?: string;
//     address?: {
//         googlePlaceData?: Record<string, string>;
//         street: string;
//         address?: string;
//         city?: string;
//         state?: string;
//         zipCode?: string;
//     };
//     coordinates?: {
//         lng: number,
//         lat: number
//     },
//     tourAvailabilityDates?: Date[];
// };

// export type ListingType = {
//     status: FetchStatusType;
//     listings: ListingData[];
//     featured: Partial<ListingData[]>;
//     page: number,
//     totalData: number,
//     favorites: ListingData[];
//     listing: ListingData
// };

// export enum ApartmentServices {
//     Cleaning = 'Cleaning Services',
//     Security = 'Security Services',
//     Maintenance = 'Maintenance and Repairs',
//     Utilities = ' Utilities Management'
// }

// export enum FurnishingOption {
//     FURNISHED = 'Furnished',
//     SEMI_FURNISHED = 'Semi-Furnished',
//     UNFURNISHED = 'Unfurnished',
// }

// export enum ConditionOption {
//     FAIRLY_USED = 'Fairly-Used',
//     NEWLY_BUILT = 'Newly Built',
//     RENOVATED = 'Renovated',
//     OLD = 'Old',
// }

// export enum ApartmentTypeOption {
//     APARTMENT = 'Apartment',
//     BEDSITTER = 'Bedsitter',
//     BLOCK_OF_FLATS = 'Block of Flats',
//     BUNGALOW = 'Bungalow',
//     CHALET = 'Chalet',
//     CONDO = 'Condo',
//     DUPLEX = 'Duplex',
//     FARM_HOUSE = 'Farm House',
//     HOUSE = 'House',
//     MAISONETTE = 'Maisonette',
//     MANSION = 'Mansion',
//     MINIFLAT = 'Miniflat',
//     PAINTHOUSE = 'Painthouse',
//     ROOM_AND_PARLOR = 'Room and Parlor',
//     SHARED_APARTMENT = 'Shared Apartment',
//     STUDIO_APARTMENT = 'Studio Apartment',
//     TOWNHOUSE_TERRACE = 'Townhouse Terrace',
//     VILLA = 'Villa',
// }

// export enum AmenityOptions {
//     Electricity24Hours = "24-Hour Electricity",
//     AirConditioning = "Air Conditioning",
//     Apartment = "Apartment",
//     Balcony = "Balcony",
//     Chandelier = "Chandelier",
//     DiningArea = "Dining Area",
//     Dishwasher = "Dishwasher",
//     HotWater = "Hot Water",
//     KitchenCabinet = "Kitchen Cabinet",
//     KitchenShelf = "Kitchen Shelf",
//     Microwave = "Microwave",
//     POPCeiling = "POP Ceiling",
//     PrePaidMeter = "Pre-Paid Meter",
//     Refrigerator = "Refrigerator",
//     TiledFloor = "Tiled Floor",
//     TV = "TV",
//     Wardrobe = "Wardrobe",
//     WiFi = "WI-FI",
// }

// export enum StateName {
//     Abia = "Abia",
//     Adamawa = "Adamawa",
//     AkwaIbom = "Akwa Ibom",
//     Anambra = "Anambra",
//     Bauchi = "Bauchi",
//     Bayelsa = "Bayelsa",
//     Benue = "Benue",
//     Borno = "Borno",
//     CrossRiver = "Cross River",
//     Delta = "Delta",
//     Ebonyi = "Ebonyi",
//     Edo = "Edo",
//     Ekiti = "Ekiti",
//     Enugu = "Enugu",
//     Gombe = "Gombe",
//     Imo = "Imo",
//     Jigawa = "Jigawa",
//     Kaduna = "Kaduna",
//     Kano = "Kano",
//     Katsina = "Katsina",
//     Kebbi = "Kebbi",
//     Kogi = "Kogi",
//     Kwara = "Kwara",
//     Lagos = "Lagos",
//     Nasarawa = "Nasarawa",
//     Niger = "Niger",
//     Ogun = "Ogun",
//     Ondo = "Ondo",
//     Osun = "Osun",
//     Oyo = "Oyo",
//     Plateau = "Plateau",
//     Rivers = "Rivers",
//     Sokoto = "Sokoto",
//     Taraba = "Taraba",
//     Yobe = "Yobe",
//     Zamfara = "Zamfara",
//     FCT = "Federal Capital Territory (FCT)",
// }
