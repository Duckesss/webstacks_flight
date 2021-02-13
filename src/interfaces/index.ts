export interface ListaVoo {
    _id: string;
    departure1: string;
    passengers: number;
    faresMoney: number;
    totalPassengers: number;
    destination: {
        city: string;
        _id: string;
    }
}

export interface Aeroporto {
	code: string;
	name: string;
	city: string;
	country: string;
	timezone: string;
}
