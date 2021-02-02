/* eslint-disable react/prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import { BsX } from 'react-icons/bs';
import Backdrop from './backdrop/Backdrop';
import ShowAllHeader from './ShowAllHeader';
import classes from './ShowAll.module.css';

export default function ShowAll({
  show, close, categorySelected, numReviews,
  overallRatingAvg, children, highlightWords, bannerSentence,
}) {
  return (
    <>
      <Backdrop show={show} clicked={close} />
      <div
        className={classes.modal}
        style={{ transform: show ? 'translateY(0)' : 'translateY(-100vh)', opacity: show ? '1' : '0' }}
      >
        <div className={classes.exitBar}>
          <BsX type="button" onClick={close} className={classes.exitBtn} />
          <ShowAllHeader
            // eslint-disable-next-line react/prop-types
            categorySelected={categorySelected.title}
            numReviews={numReviews}
            overallRatingAvg={overallRatingAvg}
            highlightWords={highlightWords}
          />
          <div className={classes.something}>
            <div className={classes.graphsAndButtonContainer}>
              {children[0]}
              {children[1]}
            </div>
            <div className={classes.reviewsContainer}>
              <div className={classes.listDescription}>
                {bannerSentence}
              </div>
              {children[2]}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

ShowAll.propTypes = {
  show: PropTypes.bool.isRequired,
  close: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};
