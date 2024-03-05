import React, { useEffect } from "react";
import "../styles/cart.css";
import Helmet from "../Components/Helmet/Helmet";
import CommonSection from "../Components/UI/CommonSection";
import { Container, Row, Col } from "reactstrap";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { cartActions } from "../redux/slices/cartSlice";
import { CiSquareRemove } from 'react-icons/ci';

const Cart = () => {
  const { cartItems, totalAmount } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleDelete = (id) => {
    dispatch(cartActions.deleteItem(id));
  };

  const formatter = Intl.NumberFormat("en", {
    notation: "compact",
  });

  // Function to increment the quantity of an item in the cart
  const handleIncrementQuantity = (id) => {
    dispatch(cartActions.incrementQuantity(id));
  };

  // Function to decrement the quantity of an item in the cart
  const handleDecrementQuantity = (id) => {
    dispatch(cartActions.decrementQuantity(id));
  };

  // Function to navigate to the details page of an item
  const goToDetails = (id) => {
    navigate(`/details?id=${id}`);
  };

  return (
    <Helmet title="Cart">
      <CommonSection title="Shopping Cart" />

      <section>
        <Container>
          <Row>
            <Col lg="9">
              {cartItems.length > 0 ? (
                <>
                  <table className="table bordered mb-5">
                    <thead>
                      <tr>
                        <th>Image</th>
                        <th>Title</th>
                        <th>Price</th>
                        <th>Qty</th>
                        <th className="text-center">Delete</th>
                      </tr>
                    </thead>
                    <tbody>
                      {cartItems.map((item) => (
                        <tr key={item.id} className="table__content mb-3">
                          <td>
                            <img src={item.imgUrl} alt="" />
                          </td>
                          <td>{item.productName}</td>
                          <td>${item.price}</td>
                          <td>
                            <div className="d-flex align-items-center justify-content-center">
                              <button
                                className="btn btn-decrement_cart"
                                onClick={() => handleDecrementQuantity(item.id)}
                              >
                                -
                              </button>
                              <span className="number number_cart">{item.quantity}</span>
                              <button
                                className="btn btn-increment_cart"
                                onClick={() => handleIncrementQuantity(item.id)}
                              >
                                +
                              </button>
                            </div>
                          </td>
                          <td className="text-center">
                            <CiSquareRemove className="remove-icon" onClick={() => handleDelete(item.id)} />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </>
              ) : (
                <h4 className="text-center mt-5">No item added to the cart</h4>
              )}
            </Col>

            <Col lg="3">
              <div className="d-flex flex-column">
                <div className="d-flex align-items-center justify-content-between">
                  <h5>Subtotal</h5>
                  <h4>${formatter.format(totalAmount)}</h4>
                </div>
                <p>taxes and shipping will calculate in checkout</p>
                <button
                  className="buy__btn"
                  onClick={() => navigate("/checkout")}
                >
                  Checkout
                </button>
                <button
                  className="buy__btn mt-3"
                  onClick={() => navigate("/shop")}
                >
                  Continue Shopping
                </button>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default Cart;
