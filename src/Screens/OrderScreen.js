import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { PaystackButton } from "react-paystack";
import { Row, Col, ListGroup, Image, Card, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../Component/Message";
import Loader from "../Component/Loader";
import {
  deliverOrder,
  getOrderDetails,
  payOrder,
} from "../actions/orderActions";
import {
  ORDER_PAY_RESET,
  ORDER_DELIVER_RESET,
} from "../constants/orderConstants";

const OrderScreen = ({ match, history }) => {
  const [amount, setAmount] = useState(0);

  const [email, setEmail] = useState("");

  const orderId = match.params.id;

  const dispatch = useDispatch();

  const orderPay = useSelector((state) => state.orderPay);
  const { loading: loadingPay, success: successPay } = orderPay;

  const orderDeliver = useSelector((state) => state.orderDeliver);
  const { loading: loadingDeliver, success: successDeliver } = orderDeliver;

  const [payment, setPayment] = useState(false);

  const orderDetails = useSelector((state) => state.orderDetails);
  const { order, loading, error } = orderDetails;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (!userInfo) {
      history.push("/login");
    }
    if (order) {
      setAmount(order.totalPrice * 100 * 577);
      setEmail(order.user.email);
    }
  }, [order, history, userInfo]);

  if (!loading) {
    // Calculate Prices
    const addDecimals = (num) => {
      return (Math.round(num * 100) / 100).toFixed(2);
    };

    order.itemsPrice = addDecimals(
      order.orderItems.reduce((acc, item) => acc + item.price * item.qty, 0)
    );
  }

  console.log(order);

  const config = {
    reference: new Date().getTime().toString(),
    email: email,
    amount: amount,
    publicKey: "pk_live_2ea5dc3c8be21b201407fe19c9ee3994e56d539a",
  };

  useEffect(() => {
    if (!order || successPay || successDeliver) {
      dispatch({ type: ORDER_PAY_RESET });
      dispatch({ type: ORDER_DELIVER_RESET });
      dispatch(getOrderDetails(orderId));

      //
    } else {
      setPayment();
    }
  }, [dispatch, orderId, successPay, order, successDeliver]);
  //const [payReady, setPayReady] = useState(false);
  console.log(orderId);

  const successPaymentHandler = (paymentResult) => {
    dispatch(payOrder(orderId, paymentResult, email));
  };
  const handlePaystackCloseAction = () => {
    console.log("closed");
  };

  const deliverHandler = () => {
    dispatch(deliverOrder(order));
  };

  const componentProps = {
    ...config,
    text: "Buy now",
    color: "red",
    onSuccess: (reference) => successPaymentHandler(reference),
    onClose: handlePaystackCloseAction,
  };

  return loading ? (
    <Loader />
  ) : error ? (
    <Message variant="danger">{error}</Message>
  ) : (
    <>
      <h1> Order {order._id}</h1>
      <Row>
        <Col md={8}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>Shipping</h2>
              <p>
                <strong> Name : </strong> {order.user.name}{" "}
              </p>
              <p>
                {" "}
                <strong> Email : </strong>
                <a href={`mailto:${order.user.email}`}>
                  {order.user.email}
                </a>{" "}
              </p>
              <p>
                <strong>Address:</strong>
                {order.shippingAddress.address},{order.shippingAddress.city}
                {order.shippingAddress.postalCode},{" "}
                {order.shippingAddress.country},{" "}
                <p> Phone: {order.shippingAddress.phoneNumber} </p>
              </p>
              {order.isDelivered ? (
                <Message variant="success">
                  {" "}
                  Delivered on {order.deliveredAt}{" "}
                </Message>
              ) : (
                <Message variant="danger">Not Delivered</Message>
              )}
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Payment Method</h2>
              <p>
                <strong>Method: </strong>
                {order.paymentMethod}
              </p>
              {order.isPaid ? (
                <Message variant="success"> Paid </Message>
              ) : (
                <Message variant="danger">Not Paid</Message>
              )}
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Order Items</h2>
              {order.orderItems.length === 0 ? (
                <Message> Order is empty</Message>
              ) : (
                <ListGroup variant="flush">
                  {order.orderItems.map((item, index) => (
                    <ListGroup.Item key={index}>
                      <Row>
                        <Col md={1}>
                          <Image
                            src={item.image}
                            alt={item.name}
                            fluid
                            rounded
                          />
                        </Col>
                        <Col>
                          <Link to={`/product/${item.product}`}>
                            {item.name}
                          </Link>
                        </Col>
                        <Col md={4}>
                          {item.qty} x ${item.price} = ${item.qty * item.price}
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h2>Order Summary</h2>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Items</Col>
                  <Col>${order.itemsPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Shipping</Col>
                  <Col>${order.shippingPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Tax</Col>
                  <Col>${order.taxPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Total</Col>
                  <Col>${order.totalPrice}</Col>
                </Row>
              </ListGroup.Item>
              {!order.isPaid && (
                <ListGroup.Item>
                  {loadingPay && <Loader />}
                  {payment ? (
                    <Loader />
                  ) : (
                    <PaystackButton
                      style={{ color: "red" }}
                      {...componentProps}
                    >
                      {({ initializePayment }) => (
                        <button
                          style={{ color: "red" }}
                          variant="danger"
                          onClick={() =>
                            initializePayment(
                              successPaymentHandler,
                              handlePaystackCloseAction
                            )
                          }
                        ></button>
                      )}
                    </PaystackButton>
                  )}
                </ListGroup.Item>
              )}
              {loadingDeliver && <Loader />}
              {userInfo &&
                userInfo.isAdmin &&
                order.isPaid &&
                !order.isDelivered && (
                  <ListGroup.Item>
                    <Button
                      type="button"
                      className="btn btn-block"
                      onClick={deliverHandler}
                    >
                      Mark As Delivered
                    </Button>
                  </ListGroup.Item>
                )}
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default OrderScreen;
