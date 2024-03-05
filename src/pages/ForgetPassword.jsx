import { useEffect, useState } from "react";
import Helmet from "../Components/Helmet/Helmet";
import "../styles/login.css";
import { Container, Row, Col, Form, FormGroup } from "reactstrap";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

import axios from "axios";

const forgetPassword = () => {
  const { currentUser, loading } = useAuth();
  const [email, setEmail] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
  };

  useEffect(() => {
    setTimeout(() => {
      if (currentUser) {
        navigate("/home");
        toast.info("All Done");
      }
    }, 1000);
  }, [currentUser]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Helmet title="ForgetPassword">
      <section>
        <Container>
          <Row>
            {isLoading ? (
              <Col lg="12" className="text-center">
                <h5 className="fw-bold">Loading......</h5>
              </Col>
            ) : (
              <Col lg="7" className="m-auto text-center ">
                <h4 className="fw-bold mb-4 text-danger">ForgetPassword</h4>
                <Form className="auth__form" onSubmit={handleSubmit}>
                <FormGroup className="form__group p-0">
                    <input
                      type="email"
                      required
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </FormGroup>
                  {/* <button className="buy__btn auth__btn mb-3">   
                   <Link to="/verifyCode" className="text-danger"> Verify</Link>
                  </button> */}

<Link to="/verifyCode" className="btn btn-info buy__btn auth__btn">Verify</Link>
                
                </Form>
              </Col>
            )}
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default forgetPassword;
