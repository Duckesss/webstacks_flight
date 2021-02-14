type CollapseIcon = "expand-less" | "expand-more"
export interface ListaVoo {
    _id: string;
    departure1: string;
    passengers: number;
    faresMoney: number;
    totalPassengers: number;
    destination:Aeroporto;
    origin:Aeroporto;
    collapseIcon?:CollapseIcon
}

export interface Aeroporto {
    _id: string;
	code: string;
	name: string;
	city: string;
	country: string;
	timezone: string;
}
