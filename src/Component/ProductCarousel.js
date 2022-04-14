import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { sliderItems } from "../data";
import { Carousel, Image } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Loader from "./Loader";
import Message from "./Message";
import { listTopProducts } from "../actions/productActions";

const ProductCarousel = () => {
  const dispatch = useDispatch();

  const productTopRated = useSelector((state) => state.productTopRated);
  const { loading, error } = productTopRated;

  useEffect(() => {
    dispatch(listTopProducts());
  }, [dispatch]);

  return loading ? (
    <Loader />
  ) : error ? (
    <Message variant="danger"> {error} </Message>
  ) : (
    <Carousel pause="hover" className="bg-dark">
      {sliderItems.map((item) => (
        <Carousel.Item key={item.id}>
          <Link to={`/product/${item.id}`}>
            <Image src={item.img} alt={item.name} fluid />
            <Carousel.Caption className="carousel-caption">
              <h2>
                {item.name} ({item.price})
              </h2>
            </Carousel.Caption>
          </Link>
        </Carousel.Item>
      ))}
    </Carousel>
  );
};

export default ProductCarousel;
