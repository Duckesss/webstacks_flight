import { ListaVoo, Aeroporto } from "../../interfaces";
export interface ViewController {
	modal: boolean;
	calendarioSaida: boolean;
	modalConfirmar: boolean;
	loading: boolean;
	calendarioVolta: boolean;
	exibePaginas: boolean;
}
export interface Campos {
	origem: string;
	destino: string;
	saida: string;
	numPassageiros: string;
	volta?: string;
}

export interface State{
	listaVoo: ListaVoo[];
	selectedVoo: ListaVoo;
	page: number;
	totalPages: number;
	viewController: ViewController;
	listaAeroportos: Aeroporto[];
}