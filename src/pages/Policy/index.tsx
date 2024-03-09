import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { validatePolicyInputs } from "../../utils/helper";
import { createPolicy } from "../../actions/policy";
import Auth from "../../components/Auth";
import "../../App.css";

const Policy = () => {
  const [policyDetails, setPolicyDetails] = useState({
    dob: "1996-03-06",
    gender: "M",
    sumAssured: 1,
    modalPremium: 10000,
    premiumFrequency: "Yearly",
    pt: 10,
    ppt: 5,
  });

  const [validationErrors, setValidationErrors] = useState<any>({});
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleInputChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    if (name == "pt" && (Number(value) > 20 || Number(value) <= 0)) return;
    if ((name == "ppt" && Number(value) > 10) || Number(value) <= 0) return;
    if ((name == "modalPremium" && Number(value) > 80000) || Number(value) < 0)
      return;

    setPolicyDetails({
      ...policyDetails,
      [name]: value,
    });
  };

  const handleSave = async () => {
    if (loading) return;

    const errors = validatePolicyInputs(policyDetails);

    if (Object.keys(errors).length) {
      setValidationErrors(errors);
    }

    setLoading(true);

    const res = await createPolicy(policyDetails);
    setLoading(false);

    if (res) {
      navigate(`/policy/${res.data._id}`);
    }
  };

  return (
    <div className="container">
      <h1>Policy Detail Page</h1>
      <div>
        <label>Date of Birth:</label>
        <input
          type="date"
          name="dob"
          value={policyDetails.dob}
          onChange={handleInputChange}
        />
        <span style={{ color: "red" }}>{validationErrors.dob}</span>
      </div>

      <div>
        <label>Gender:</label>
        <select
          name="gender"
          value={policyDetails.gender}
          onChange={handleInputChange}
        >
          <option value="M">Male</option>
          <option value="F">Female</option>
        </select>
      </div>

      <div>
        <label>Premium Frequency:</label>
        <select
          name="premiumFrequency"
          value={policyDetails.gender}
          onChange={handleInputChange}
        >
          <option value="Yearly">Yearly</option>
          <option value="Half-Yearly">Half-Yearly</option>
          <option value="Monthly">Monthly</option>
        </select>
      </div>

      <div>
        <label>Sum Assured:</label>
        <input
          type="number"
          name="sumAssured"
          value={policyDetails.sumAssured}
          onChange={handleInputChange}
        />
        <span style={{ color: "red" }}>{validationErrors.sumAssured}</span>
      </div>

      <div>
        <label>Modal Premium:</label>
        <input
          type="number"
          name="modalPremium"
          value={policyDetails.modalPremium}
          onChange={handleInputChange}
        />
        <span style={{ color: "red" }}>{validationErrors.modalPremium}</span>
      </div>

      <div>
        <label>PT:</label>
        <input
          type="number"
          name="pt"
          value={policyDetails.pt}
          onChange={handleInputChange}
        />
        <span style={{ color: "red" }}>{validationErrors.pt}</span>
      </div>

      <div>
        <label>PPT:</label>
        <input
          type="number"
          name="ppt"
          value={policyDetails.ppt}
          onChange={handleInputChange}
        />
        <span style={{ color: "red" }}>{validationErrors.ppt}</span>
      </div>

      <button onClick={handleSave}>Save</button>
    </div>
  );
};

export default Auth(Policy);
