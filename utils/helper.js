import { irr as irrFinance } from "node-irr";

const bonusRates = [
  2.5, 3, 3.5, 3.5, 3.5, 3.5, 3, 3, 3, 3, 3, 2.5, 3, 3, 2.5, 5, 4, 4.5, 4, 25,
];
export const calculatePolicy = (data) => {
  let bonusSum = 0,
    irr = [];
  const res = Array.from({ length: 20 }, (_, index) => {
    const bonusAmount = (data.sum_assured * bonusRates[index]) / 100;
    const premium = index + 1 < data.ppt ? data.premium * -1 : 0;
    bonusSum += bonusAmount;
    irr.push(premium);
    return {
      policyYear: index + 1,
      premium: index + 1 <= data.ppt ? data.premium : 0,
      sumAssured: index + 1 == data.pt ? data.sum_assured : 0,
      bonusRate: bonusRates[index],
      bonusAmount,
      totalBenefit: 0,
      netCashflows: premium,
      irr: 0,
    };
  });
  const totalBenefit = (bonusSum + data.sum_assured).toFixed(2);
  irr[data.pt - 1] = Number(totalBenefit);
  res[data.pt - 1].totalBenefit = totalBenefit;
  res[data.pt - 1].netCashflows = totalBenefit;
  res[19].irr = (irrFinance(irr) * 100).toFixed(2);

  return res;
};
