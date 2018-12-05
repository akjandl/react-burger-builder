import React from 'react';

import classes from './Order.module.css'

const order = (props) => {
  // create an array of individual ingredient objects
  const ingredients = Object.entries(props.ingredients)
    .map( elem => { return {name: elem[0], amount: elem[1]} } );

  const ingredientOutput = ingredients.map( ing => {
    return (
      <span
        style={{
          textTransform: 'capitalize',
          display: 'inline-block',
          margin: '0 8px',
          border: '1px solid #ccc',
          padding: '5px',
          boxShadow: '0 1px 2px 0 #eee'
        }}
        key={ing.name}>{ing.name} ({ing.amount})</span>
    );
  });

  return (
    <div className={classes.Order}>
      <p>Ingredients: {ingredientOutput}</p>
      <p>Price: <strong>${Number.parseFloat(props.price).toFixed(2)}</strong></p>
    </div>
  );
};

export default order;