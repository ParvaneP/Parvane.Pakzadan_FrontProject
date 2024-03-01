export type User = {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    phone: string;
    role: string;
}

export type Participant = {
    id: number;
    first_name: string;
    last_name: string;
    birth_date: Date | string | number;
}

export type Class = {
    id: number;
    name: string;
    type: string;
    organizer: User;
    participant: Array<Participant>
}