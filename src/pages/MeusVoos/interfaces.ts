import { ListaVoo } from "../../interfaces";

export interface MyFlights{
	voosRepetidos: {
		[key:string]:number;
	};
	voos: ListaVoo[];
}

export interface State {
    listaVoo: MyFlights;
    loading: boolean;
    getListaVoo: boolean;
}