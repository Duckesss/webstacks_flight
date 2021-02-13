import api from "../services/index"
import { format,parseISO } from "date-fns";
function moneyBR(numero : number) : string{
	const numDoisDecimais = (Math.round(numero*100)/100).toFixed(2)
	// coloca os pontos a cada 3 digitos e troca o último ponto por vírgula
	const regex = /(\d)(?=(\d{3})+\.)/g
	const num = numDoisDecimais
		.replace(regex,'$1.')
		.replace(/\.(?!.*\.)/,',')
	return `R$ ${num}`
}

function formatISO(date : string,formato: string){
	return format(parseISO(date), formato)
}


function pad(value: number) {
	return value > 9 ? value : "0" + value;
}

function formataData(data : string) : string{
	const[dia,mes,ano] = data.split('/')
	return `${ano}/${mes}/${dia}`
}
async function getAeroportos() {
	try {
		const response = await api.get("/locations");
		return response.data;
	} catch (err) {
		return [];
	}
}
class Utils{
	moneyBR = moneyBR;
	pad = pad;
	formataData = formataData;
	getAeroportos = getAeroportos;
	formatISO = formatISO;
	constructor(){}
}
export default new Utils()