export type User = {
    id: number;
    name: string;
    email: string;
    address?: Address;
}

export type Address = {
    id: string;
    province: string;
    city: string;
    postalCode: number;
    vilage: string;
}