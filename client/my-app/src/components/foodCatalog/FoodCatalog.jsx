import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import classes from './foodCatalog.module.css';
import axios from 'axios';

const FoodCatalog = () => {
  const [filteredFoods, setFilteredFoods] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const location = useLocation();
  const foodEndpoint = location.pathname.split('/')[2];
  const { token } = useSelector((state) => state.auth);

  useEffect(() => {
    //You forgot to use async keyword here...Use async and await whenever you fetch data..
    const fetchFoodType = async () => {
      try {
        setLoading(true);
        const response = await fetch(`http://localhost:5000/product?category=${foodEndpoint}`, {
          headers: {
            //You should check this part too...Maybe...IDK bro...I found something sus here..
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await response.json();
        setFilteredFoods(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchFoodType();
  }, [foodEndpoint, token]);

  return (
    <div className={classes.container}>
      <div className={classes.wrapper}>
        {filteredFoods.length !== 0 && (
          <h2 className={classes.title}>The best {foodEndpoint} in the region</h2>
        )}
        {loading ? (
          <h1 className={classes.loading}>Loading...</h1>
        ) : error ? (
          <h1 className={classes.error}>{error}</h1>
        ) : (
          <div className={classes.foods}>
            {filteredFoods.map((f) => (
              <Link to={`/food/${f._id}`} key={f._id} className={classes.food}>
                <div className={classes.imgContainer}>
                  <img
                    src={`http://localhost:5000/images/${f?.img}`}
                    className={classes.foodImg}
                    alt={f?.title}
                  />
                </div>
                <div className={classes.foodDetails}>
                  <h4 className={classes.foodTitle}>{f?.title}</h4>
                  <span className={classes.price}>
                    <span>$</span> {f?.price}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        )}
        {filteredFoods.length === 0 && (
          <h1 className={classes.noQuantity}>No {foodEndpoint} right now</h1>
        )}
      </div>
    </div>
  );
};

export default FoodCatalog;