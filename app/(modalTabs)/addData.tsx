export interface ShareMeals {
    user_id: string;
    title: string;
    description: string;
    quantity: string;
    instructions: string;
    location: LocationData;
    latitude: number;
    longitude: number;
    photoUrl: string;
}
export interface DiscountedMeals {
    user_id: string;
    title: string;
    description: string;
    quantity: string;
    price: string;
    instructions: string;
    location: LocationData;
    latitude: number;
    longitude: number;
    photoUrl: string;
}
export interface LocationData {
    Block: string;
    Road: string;
    PostalCode: string;
    UnitNumber: string | "";
}