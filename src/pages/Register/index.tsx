import { useState } from "react";
import { register } from "../../actions/login";
import { Link, useNavigate } from "react-router-dom";
import "../../App.css";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState<any>({});

  const [loading, setLoading] = useState<boolean>(false);

  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (loading) return;

    const validationErrors = validateForm();

    if (Object.keys(validationErrors).length) {
      setErrors(validationErrors);
    }

    setLoading(true);

    const res = await register(formData);

    if (res) navigate("/");
    else setErrors({ message: "Not able to Register!!" });

    setLoading(false);
  };

  const validateForm = () => {
    let validationErrors: any = {};

    if (!formData.name.trim()) {
      validationErrors.name = "Name is required";
    }

    if (!formData.mobile.trim()) {
      validationErrors.mobile = "Mobile number is required";
    } else if (!/^\d{10}$/g.test(formData.mobile.trim())) {
      validationErrors.mobile = "Invalid mobile number";
    }

    if (!formData.email.trim()) {
      validationErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/g.test(formData.email.trim())) {
      validationErrors.email = "Invalid email address";
    }

    if (!formData.password.trim()) {
      validationErrors.password = "Password is required";
    } else if (formData.password.trim().length < 6) {
      validationErrors.password = "Password must be at least 6 characters long";
    }

    return validationErrors;
  };

  return (
    <div className="container">
      <h2>Register</h2>
      <form onSubmit={handleSubmit} className="form-container">
        <div>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
          {errors.name && <p>{errors.name}</p>}
        </div>

        <div>
          <label htmlFor="mobile">Mobile:</label>
          <input
            type="text"
            id="mobile"
            name="mobile"
            value={formData.mobile}
            onChange={handleChange}
          />
          {errors.mobile && <p>{errors.mobile}</p>}
        </div>

        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
          {errors.email && <p>{errors.email}</p>}
        </div>

        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
          {errors.password && <p>{errors.password}</p>}
        </div>

        {errors.message && <div>{errors.message}</div>}

        <button type="submit">Register</button>
      </form>
      <Link to={"/login"}>Login</Link>
    </div>
  );
};

export default Register;
