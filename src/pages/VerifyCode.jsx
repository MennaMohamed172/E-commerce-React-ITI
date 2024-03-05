import { useEffect, useState } from "react";
import Helmet from "../Components/Helmet/Helmet";
import "../styles/login.css";
import { Container, Row, Col, Form, FormGroup } from "reactstrap";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

import axios from "axios";

const VerifyCode = () => {
  const { currentUser, loading } = useAuth();
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");

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
    <Helmet title="VerifyCode">
      <section>
        <Container>
          <Row>
            {isLoading ? (
              <Col lg="12" className="text-center">
                <h5 className="fw-bold">Loading......</h5>
              </Col>
            ) : (
              <Col lg="7" className="m-auto text-center ">
                <h4 className="fw-bold mb-4">VerifyCode</h4>
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

                  <FormGroup className="form__group p-0">
                    <input
                      type="text"
                      required
                      placeholder="Enter your code"
                      value={code}
                      onChange={(e) => setCode(e.target.value)}
                    />
                    
                  </FormGroup>

                  {/* <button className="buy__btn auth__btn mb-3">Submit</button> */}
                  <Link className="btn btn-info buy__btn auth__btn" to="/resetPassword"> Reset Password</Link>
                 
                </Form>
              </Col>
            )}
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default VerifyCode;
