/* eslint-disable react/jsx-one-expression-per-line */
import React, { useState } from 'react';
import classes from './ShowAll.module.css';

// eslint-disable-next-line react/prop-types
export default function ShowAllHeader({ overallRatingAvg, numReviews, highlightWords }) {
  const [textSearched, setTextSearched] = useState('');

  const handleChange = (event) => {
    setTextSearched(event.target.value);
  };

  const handleSubmit = (event) => {
    highlightWords(textSearched);
    event.preventDefault();
  };

  return (
    <div className={classes.modalHeader}>
      <div className={classes.starAndText}>
        <span className={classes.star}> &#9733;</span>
        <span className={classes.header}> {overallRatingAvg} ({numReviews} reviews) </span>
      </div>
      <div className={classes.searchBarContainer}>
        <form id="searchBar" className={classes.searchBar} onSubmit={handleSubmit}>
          <input className={classes.searchBar} onChange={handleChange} placeholder="Search reviews" />
        </form>
      </div>
    </div>
  );
}
