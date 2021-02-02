import React from 'react';
import PropTypes from 'prop-types';
import classes from './Graph.module.css';

export default function GraphRender({ rating, isForModal }) {
  let classForGraphs;

  if (isForModal) {
    classForGraphs = classes.containerModal;
  } else {
    classForGraphs = classes.containerFull;
  }

  const percentage = (rating.rating / 5) * 100;
  let ratingDisplayed;

  if (rating.rating === 4 || rating.rating === 5) {
    ratingDisplayed = `${JSON.stringify(rating.rating)}.0`;
  } else {
    ratingDisplayed = JSON.stringify(rating.rating);
  }

  function Filler(precentage) {
    return <div className={classes.filler} style={{ width: `${precentage}%` }} />;
  }

  const fill = Filler(percentage);

  return (
    <div className={classForGraphs} data-testid={rating.title}>
      <div className={classes.indivGraph}>
        <div className={classes.ratingTitle}>{rating.title}</div>
        <div className={classes.pushRight}>
          <div className={classes.ratingBar}>
            <div className={classes.baseBar}>
              {fill}
            </div>
          </div>
          <span className={classes.ratingNum}>
            {ratingDisplayed}
          </span>
        </div>
      </div>

    </div>
  );
}

GraphRender.propTypes = {
  rating: PropTypes.shape({
    title: PropTypes.string,
    rating: PropTypes.number,
  }).isRequired,
  isForModal: PropTypes.bool.isRequired,
};
