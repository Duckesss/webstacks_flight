function moneyBR(numero : number) : string{
	const numDoisDecimais = (Math.round(numero*100)/100).toFixed(2)
	// coloca os pontos a cada 3 digitos e troca o último ponto por vírgula
	const regex = /(\d{3})(?=.*\d{3}\.)/g
	const num = numDoisDecimais.replace(regex,'$1.').replace(/\.(?!.*\.)/,',') 
		
	return `R$ ${num}`
}
export {moneyBR}