import React, { useState } from "react";
import {
  Container,
  Row,
  Col,
  Form,
  FormGroup,
  Label,
  Input,
  Button,
  Spinner
} from "reactstrap";
import { useDispatch } from "react-redux";
import { signupUser, loginUser } from "../redux/actions/authActions";
import { useNavigate, Link } from "react-router-dom";
import signupImage from '../signup-image.png';
import socialImage from '../social-buttons.png';
import "../styles/signup.css";

const SignupPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const validateField = (name, value) => {
    let message = "";

    switch (name) {
      case "firstName":
        if (!value.trim()) message = "Firstname is required";
        break;
      case "lastName":
        if (!value.trim()) message = "Lastname is required";
        break;
      case "email":
        if (!value.trim()) {
          message = "Email is required";
        } else if (!/\S+@\S+\.\S+/.test(value)) {
          message = "Email is not valid";
        }
        break;
      case "password":
        if (!value) {
          message = "Password is required";
        } else if (value.length < 6 || value.length > 18) {
          message = "Password is week";
        } else if (!/(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*])/.test(value)) {
          message =
            "Password is fair";
        }
        break;
      default:
        break;
    }

    setErrors((prev) => ({ ...prev, [name]: message }));
  };

  const validateAll = () => {
    const fieldNames = ["firstName", "lastName", "email", "password"];
    let isValid = true;
    fieldNames.forEach((field) => {
      validateField(field, form[field]);
      if (
        !form[field] ||
        (errors[field] && errors[field].length > 0)
      ) {
        isValid = false;
      }
    });
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateAll()) {
      return;
    }
    setLoading(true);
    try {
      await dispatch(signupUser(form));
      await dispatch(
        loginUser({ email: form.email, password: form.password }, () => {
          navigate("/dashboard");
        })
      );
    }catch (err) {
      alert("Signup successful! Please log in.");
    }
     finally {
      setLoading(false);
    }
  };

  const isFormValid = () => {
    return (
      form.firstName.trim() &&
      form.lastName.trim() &&
      form.email.trim() &&
      form.password &&
      Object.values(errors).every((err) => err === "")
    );
  };

  return (
    <Container fluid className="p-0" style={{ maxHeight: "1080px" }}>
      <Row className="m-0 vh-100">
        <Col md={6} className="p-0">
          <img
            src={signupImage}
            alt="Signup"
            className="w-100 h-100"
            style={{ objectFit: "cover" }}
          />
        </Col>
        <Col
          md={6}
          className="d-flex align-items-center justify-content-center"
          style={{ backgroundColor: "#fff" }}
        >
          <div style={{ width: "100%", maxWidth: "400px", padding: "20px" }}>
            <h2 className="text-left" style={{ fontSize: "18px", color: "#5E5873" }}>Adventure starts here</h2>
            <Label className="text-left mb-5" style={{ fontSize: "14px", color: "#6E6B7B" }}>
              Make your app management easy and fun!
            </Label>
            <Form onSubmit={handleSubmit} noValidate className="submit-form">
              <FormGroup>
                <Label className="lable-input" for="firstName">First Name</Label><Label className="lable-require">*</Label>
                <Input
                  className="input-field"
                  id="firstName"
                  value={form.firstName}
                  onChange={(e) => {
                    const val = e.target.value;
                    setForm((prev) => ({ ...prev, firstName: val }));
                    validateField("firstName", val);
                  }}
                  onBlur={(e) => validateField("firstName", e.target.value)}
                />
                {errors.firstName && (
                  <div className="text-danger mt-1" style={{ fontSize: "0.875rem" }}>
                    {errors.firstName}
                  </div>
                )}
              </FormGroup>

              <FormGroup>
                <Label className="lable-input" for="lastName">Last Name</Label><Label className="lable-require">*</Label>
                <Input
                  className="input-field"
                  id="lastName"
                  value={form.lastName}
                  onChange={(e) => {
                    const val = e.target.value;
                    setForm((prev) => ({ ...prev, lastName: val }));
                    validateField("lastName", val);
                  }}
                  onBlur={(e) => validateField("lastName", e.target.value)}
                />
                {errors.lastName && (
                  <div className="text-danger mt-1" style={{ fontSize: "0.875rem" }}>
                    {errors.lastName}
                  </div>
                )}
              </FormGroup>

              <FormGroup>
                <Label className="lable-input" for="email">Email</Label><Label className="lable-require">*</Label>
                <Input
                  className="input-field"
                  id="email"
                  type="email"
                  onChange={(e) => {
                    const val = e.target.value;
                    setForm((prev) => ({ ...prev, email: val }));
                    validateField("email", val);
                  }}
                  onBlur={(e) => validateField("email", e.target.value)}
                />
                {errors.email && (
                  <div className="text-danger mt-1" style={{ fontSize: "0.875rem" }}>
                    {errors.email}
                  </div>
                )}
              </FormGroup>

              <FormGroup>
                <Label className="lable-input" for="password">Password</Label><Label className="lable-require">*</Label>
                <Input
                  className="input-field"
                  id="password"
                  type="password"
                  value={form.password}
                  onChange={(e) => {
                    const val = e.target.value;
                    setForm((prev) => ({ ...prev, password: val }));
                    validateField("password", val);
                  }}
                  onBlur={(e) => validateField("password", e.target.value)}
                />
                {errors.password ? (
                  <div className="text-danger mt-1" style={{ fontSize: "0.875rem" }}>
                    {errors.password}
                  </div>
                ) : form.password ? (
                  form.password.length === 9 ? (
                    <div className="mt-1" style={{ fontSize: "0.875rem", color: "#647FFF" }}>
                      Password is good
                    </div>
                  ) : (
                    <div className="mt-1" style={{ fontSize: "0.875rem", color: "#59BC87" }}>
                      Password is good
                    </div>
                  )
                ) : null}
              </FormGroup>

              <FormGroup check className="mb-3">
                <Label check className="d-flex align-items-center">
                  <Input
                    type="checkbox"
                    className="me-2"
                  />
                  I agree to{" "}
                  <a href="/privacy-terms" target="_blank" rel="noopener noreferrer" className="ms-1 me-1 no-underline">
                    Privacy Policy & Terms
                  </a>
                </Label>
              </FormGroup>

              <Button
                type="submit"
                disabled={!isFormValid() || loading}
                block
                className="button-submit"
              >
                {loading ? <Spinner size="sm" /> : "Sign Up"}
              </Button>

              <p className="mt-3 text-center">
                Already have an account? <Link to="/login" className="no-underline">Sign in instead</Link>
              </p>
            </Form>
            <div className="divider-with-text">or</div>
            <div className="d-flex justify-content-center align-items-center mt-3">
              <img src={socialImage} alt="socialImage" />
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default SignupPage;
