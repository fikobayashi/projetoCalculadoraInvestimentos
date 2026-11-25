function convertToMonthlyReturnRate(yearlyReturnRate) {
  return yearlyReturnRate ** (1 / 12);
}

export function generateReturnsArray(
  startingAmount = 0, // Investimento inicial
  timeHorizon = 0, // Prazo - Horizonte de tempo
  timePeriod = "monthly",
  monthlyContribution = 0, // Aporte
  returnRate = 0, // taxa retorno
  returnTimeFrame = "monthly",
) {
  // Regra de negócio - trata corretamente do usuário passar as informações
  if (!timeHorizon || !startingAmount) {
    throw new Error(
      "Investimento inicial e prazo devem ser preenchidos com valores positivos.",
    );
  }
  // converte as taxas de retorno em mensal
  const finalReturnRate =
    returnTimeFrame === "monthly"
      ? 1 + returnRate / 100
      : convertToMonthlyReturnRate(1 + returnRate / 100);

  const finalTimeHorizon =
    timePeriod === "monthly" ? timeHorizon : timeHorizon * 12;

  // Objeto de referência que contém os campos do investimento inicial
  const referenceInvestmentObject = {
    investedAmount: startingAmount, // quantia investida
    interestReturns: 0, // retorno dos juros no mês
    totalInterestReturns: 0, // total de rendimentos (juros) acumulado
    month: 0,
    totalAmount: startingAmount, // total investido + total de redimentos
  };

  const returnsArray = [referenceInvestmentObject];
  for (
    let timeReference = 1;
    timeReference <= finalTimeHorizon;
    timeReference++
  ) {
    const totalAmount =
      returnsArray[timeReference - 1].totalAmount * finalReturnRate +
      monthlyContribution;
    const interestReturns = //valorMesPassado * jurosMes
      returnsArray[timeReference - 1].totalAmount * (finalReturnRate - 1);
    const investedAmount = startingAmount + monthlyContribution * timeReference; // total investido
    const totalInterestReturns = totalAmount - investedAmount; // lucro
    returnsArray.push({
      investedAmount,
      interestReturns,
      totalInterestReturns,
      month: timeReference,
      totalAmount,
    });
  }

  return returnsArray;
}
