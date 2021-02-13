export interface ViewController {
	modal: boolean;
	calendarioSaida: boolean;
	modalConfirmar: boolean;
	loading: boolean;
	calendarioVolta: boolean;
}
export interface Campos {
	origem: string;
	destino: string;
	saida: string;
	numPassageiros: string;
	volta?: string;
}