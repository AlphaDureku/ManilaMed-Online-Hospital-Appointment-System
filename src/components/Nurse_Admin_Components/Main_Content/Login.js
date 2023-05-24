import { Button, Loader, PasswordInput, TextInput } from "@mantine/core";
import axios from "axios";
import {
  MDBCard,
  MDBCardBody,
  MDBCol,
  MDBContainer,
  MDBIcon,
  MDBRow,
} from "mdb-react-ui-kit";
import { useState } from "react";
import { Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const onChangeHandler = (event) => {
    setError(false);
    setCredentials((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  const onSubmitHandler = async (event) => {
    setError(false);
    setLoading(true);
    event.preventDefault();
    const { data } = await axios.post(
      process.env.REACT_APP_ONLINE + "/admin/nurse-login",
      credentials
    );
    if (data.data.status) {
      //Set token authentication
      localStorage.setItem("nurseToken", data.data.token);
      navigate("/admin/dashboard");
    } else {
      setError(true);
    }
    setLoading(false);
  };
  return (
    <div className="login--wrapper">
      <MDBContainer className="login--contentContainer">
        <MDBCard>
          <MDBRow className="g-0">
            <MDBCol md="6" className="login--leftContent">
              <div>
                Making Appointments easy for you{" "}
                <img
                  src="/images/medlogo.png"
                  height="30"
                  style={{ marginBottom: "5%" }}
                  alt=""
                />
              </div>
            </MDBCol>

            <MDBCol md="6" style={{ position: "relative" }}>
              <MDBCardBody className="d-flex flex-column">
                <div className="d-flex flex-row mt-4">
                  <MDBIcon
                    fas
                    icon="cubes fa-3x me-3"
                    style={{ color: "#ff6219" }}
                  />
                  <img src="/images/ManilaMed-Logo.png" alt="" />
                </div>

                <h5
                  className="fw-normal ms-3 mt-3 mb-5 subheaderlogin"
                  style={{ letterSpacing: "1px" }}
                >
                  Sign into your admin account
                </h5>
                <Container className="mb-4">
                  <form onSubmit={onSubmitHandler}>
                    <TextInput
                      className="mb-3 ms-3"
                      label="Username"
                      placeholder="Username"
                      type="text"
                      name="username"
                      value={credentials.username}
                      onChange={onChangeHandler}
                    />
                    <PasswordInput
                      className="mb-5 ms-3"
                      placeholder="Password"
                      label="Password"
                      name="password"
                      value={credentials.password}
                      onChange={onChangeHandler}
                    />
                    <div className="text-center">
                      <Button
                        type="submit"
                        variant="gradient"
                        className="login--Btn"
                        gradient={{ from: "#00c2ff", to: "#5addee", deg: 105 }}
                      >
                        Login
                      </Button>
                    </div>
                  </form>
                </Container>
                {error ? (
                  <p className="shake-error errorMSG">Wrong credentials</p>
                ) : (
                  ""
                )}
                {loading ? (
                  <Loader
                    size={"sm"}
                    color={"teal"}
                    className="smallLoading"
                  ></Loader>
                ) : (
                  ""
                )}
                <a className="small text-muted" href="#!">
                  Forgot password?
                </a>
              </MDBCardBody>
            </MDBCol>
          </MDBRow>
        </MDBCard>
      </MDBContainer>
    </div>
  );
}
