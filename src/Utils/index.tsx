function moneyBR(numero : number) : string{
	const numDoisDecimais = (Math.round(numero*100)/100).toFixed(2)
	// coloca os pontos a cada 3 digitos e troca o último ponto por vírgula
	const regex = /(\d)(?=(\d{3})+\.)/g
	const num = numDoisDecimais
		.replace(regex,'$1.')
		.replace(/\.(?!.*\.)/,',')
	return `R$ ${num}`
}


function pad(value: number) {
	return value > 9 ? value : "0" + value;
}
function formataData(data : string) : string{
	const[dia,mes,ano] = data.split('/')
	return `${ano}/${mes}/${dia}`
}

class Utils{
	moneyBR;
	pad;
	formataData;
	constructor(){
		this.moneyBR = moneyBR
		this.pad = pad
		this.formataData = formataData
	}
}
export default new Utils()
export {moneyBR,pad,formataData}