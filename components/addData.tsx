export type ShareMeals ={
    user_id: string;
    title: string;
    description: string;
    quantity: string;
    instructions: string;
    location: LocationData;
    latitude: number;
    longitude: number;
    photoUrl: string;
    rating: number;
}

export type  DiscountedMeals = {
    user_id: string;
    title: string;
    description: string;
    quantity: string;
    instructions: string;
    location: LocationData;
    latitude: number;
    longitude: number;
    photoUrl: string;
    rating: number;
    price: string;
}

export interface LocationData {
    Block: string;
    Road: string;
    PostalCode: string;
    UnitNumber: string | "";
}