export interface Flight {
    flight_number?:string,
    airline: string;
    origin: string;
    destination: string;
    departure_time: Date;
    arrival_time: Date;
    departure_gate: string;
    arrival_gate: string;
    status: string;
}