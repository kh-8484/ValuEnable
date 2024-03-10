import { useEffect, useState } from "react";
import Auth from "../../components/Auth";
import { getPolicyById } from "../../actions/policy";
import { useParams } from "react-router-dom";

const PolicyDetails = () => {
  const [data, setData] = useState<any>([]);
  const { policyId } = useParams();

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const res = await getPolicyById(policyId ?? "");
    if (res.success) setData(res.data);
  };
  return (
    <div>
      <h2>Policy Detail</h2>
      {data.length ? <h4>IRR :  {data[19].irr}</h4> : null}
      <table border={1}>
        <thead>
          <tr>
            <th>Policy Year</th>
            <th>Premium</th>
            <th>Sum Assured</th>
            <th>Bonus Rate</th>
            <th>Bonus Amount</th>
            <th>Total Benefit</th>
            <th>Net Cashflows</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row: any) => (
            <tr key={row.policyYear}>
              <td>{row.policyYear}</td>
              <td>{row.premium}</td>
              <td>{row.sumAssured}</td>
              <td>{row.bonusRate}%</td>
              <td>{row.bonusAmount}</td>
              <td>{row.totalBenefit}</td>
              <td>{row.netCashflows}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Auth(PolicyDetails);
