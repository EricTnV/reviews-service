/* eslint-disable react/jsx-boolean-value */
/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Highlighter from 'react-highlight-words';
import ReviewHeader from './ReviewHeader';
import classes from './UserReviews.module.css';

export default function ReviewRender({
  reviewBody, profilePicture, firstName, entryDate, userId, hightlightText,
}) {
  const [isLongReview, setIsLongReview] = useState(false);
  useEffect(() => {
    const reviewLength = reviewBody.split('').length;
    if (reviewLength > 180) {
      setIsLongReview(true);
    }
  }, []);

  const [isShowMoreClicked, setIsShowMoreClicked] = useState(false);

  const handleShowMoreClick = () => {
    setIsShowMoreClicked(!isShowMoreClicked);
  };

  function LongReview({ lengthReview }) {
    return (
      <div>
        <Highlighter
          searchWords={[hightlightText]}
          autoEscape={true}
          textToHighlight={lengthReview}
        />
        <button className={classes.readMore} type="button" onClick={handleShowMoreClick} data-testid="readMore">
          {isShowMoreClicked ? 'read less' : 'read more'}
        </button>
      </div>
    );
  }

  function ShortReview({ lengthReview }) {
    return (
      <div>
        <Highlighter
          searchWords={[hightlightText]}
          autoEscape={true}
          textToHighlight={lengthReview}
        />
      </div>
    );
  }

  let lengthReview;
  let reviewElem;

  if (isLongReview) {
    if (isShowMoreClicked) {
      lengthReview = reviewBody;
    } else {
      lengthReview = `${reviewBody.slice(0, 180)}...`;
    }
    reviewElem = <LongReview lengthReview={lengthReview} />;
  } else {
    lengthReview = reviewBody;
    reviewElem = <ShortReview lengthReview={lengthReview} />;
  }

  return (
    <div className={classes.userReview} data-testid={userId}>
      <ReviewHeader profilePicture={profilePicture} firstName={firstName} entryDate={entryDate} />
      {reviewElem}
    </div>
  );
}

ReviewRender.propTypes = {
  profilePicture: PropTypes.string.isRequired,
  reviewBody: PropTypes.string.isRequired,
  firstName: PropTypes.string.isRequired,
  entryDate: PropTypes.string.isRequired,
  userId: PropTypes.number.isRequired,
};
