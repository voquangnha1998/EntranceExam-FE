import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Form,
  FormGroup,
  Label,
  Input,
  Button,
  Spinner,
} from "reactstrap";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../redux/actions/authActions";
import { useNavigate, Link } from "react-router-dom";
import loginImage from "../signin-logo.png";
import socialImage from '../social-buttons.png';
import "../styles/signin.css";

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const isAuthenticated = useSelector(state => !!state.auth.isAuthenticated);

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/dashboard");
    }
  }, [isAuthenticated, navigate]);

  const validateField = (name, value) => {
    let message = "";
    if (name === "email") {
      if (!value.trim()) {
        message = "Email is required";
      } else if (!/\S+@\S+\.\S+/.test(value)) {
        message = "Email is not valid";
      }
    } else if (name === "password") {
      if (!value) {
        message = "Password is required";
      }
    }

    setErrors((prev) => ({ ...prev, [name]: message }));
  };

  const validateAll = () => {
    let isValid = true;
    ["email", "password"].forEach((field) => {
      validateField(field, form[field]);
      if (!form[field] || errors[field]) {
        isValid = false;
      }
    });
    return isValid;
  };

  const isFormValid = () => {
    return (
      form.email.trim() &&
      form.password &&
      Object.values(errors).every((err) => err === "")
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateAll()) return;

    setLoading(true);

    try {
      await dispatch(
        loginUser({ email: form.email, password: form.password }, () => {
          navigate("/dashboard");
        })
      );
    } catch (err) {
      setErrors({
        password: "Password is not valid",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container fluid className="p-0" style={{ maxHeight: "1080px" }}>
      <Row className="m-0 vh-100">
        <Col md={8} className="p-0">
          <img
            src={loginImage}
            alt="Login"
            className="w-100 h-100"
            style={{ objectFit: "cover" }}
          />
        </Col>
        <Col
          md={4}
          className="d-flex align-items-center justify-content-center"
          style={{ backgroundColor: "#fff" }}
        >
          <div style={{ width: "100%", maxWidth: "400px", padding: "20px" }}>
            <h2 className="text-left" style={{ fontSize: "18px", color: "#5E5873" }}>
              Welcome to Entrance Test Interview!
            </h2>
            <Label className="text-left mb-5" style={{ fontSize: "14px", color: "#6E6B7B" }}>
              Please sign-in to your account and start the adventure
            </Label>

            <Form onSubmit={handleSubmit} noValidate className="submit-form">
              <FormGroup>
                <Label className="lable-input" for="email">Email</Label><Label className="lable-require">*</Label>
                <Input
                  className="input-field"
                  id="email"
                  type="email"
                  value={form.email}
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
                <div className="d-flex justify-content-between align-items-center">
                  <Label for="password" className="mb-0">Password<Label className="lable-require">*</Label></Label>
                  <Link
                    to="/forgot-password"
                    className="text-primary small"
                    style={{ textDecoration: "none" }}
                  >
                    Forgot Password?
                  </Link>
                </div>
                <Input
                  id="password"
                  type="password"
                  value={form.password}
                  placeholder="••••••••"
                  onChange={(e) => {
                    const val = e.target.value;
                    setForm((prev) => ({ ...prev, password: val }));
                    validateField("password", val);
                  }}
                  onBlur={(e) => validateField("password", e.target.value)}
                />
                {errors.password && (
                  <div className="text-danger mt-1">{errors.password}</div>
                )}
              </FormGroup>


              <FormGroup check className="mb-3">
                <Label check className="d-flex align-items-center">
                  <Input
                    type="checkbox"
                    className="me-2"
                  />
                  Remember me
                </Label>
              </FormGroup>

              <Button
                type="submit"
                color="primary"
                disabled={!isFormValid() || loading}
                block
                className="button-submit"
              >
                {loading ? <Spinner size="sm" /> : "Login"}
              </Button>

              <p className="mt-3 text-center">
                New on our platform? <Link to="/signup" className="no-underline">Create an account</Link>
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

export default LoginPage;