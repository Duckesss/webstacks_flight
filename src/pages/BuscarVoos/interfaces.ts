import { ListaVoo, Aeroporto } from "../../interfaces";
export interface ViewController {
	modal: boolean;
	calendarioSaida: boolean;
	modalConfirmar: boolean;
	loading: boolean;
	calendarioVolta: boolean;
	exibePaginas: boolean;
}
interface CamposModalPesquisa {
	origem: string;
	destino: string;
	saida: string;
	numPassageiros: string;
	volta?: string;
}
interface AttrsModalPesquisa{
	dataVolta: Date;
	dataSaida: Date;
}

export interface ModalPesquisa{
	campos:CamposModalPesquisa;
	attrs: AttrsModalPesquisa;
}

export interface State{
	listaVoo: ListaVoo[];
	selectedVoo: ListaVoo;
	page: number;
	totalPages: number;
	viewController: ViewController;
	listaAeroportos: Aeroporto[];
	modalPesquisa:ModalPesquisa
}