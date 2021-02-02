import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import classes from './UserReviews.module.css';

export default function ReviewsHeader({ profilePicture, firstName, entryDate }) {
  return (
    <div className={classes.header}>
      <img className={classes.userPhoto} alt="" src={`${profilePicture}?dummy=8484744`} />
      <div className={classes.textContainer}>
        {firstName}
        <div className={classes.date}>
          {moment(new Date(entryDate)).format('MMMM YYYY')}
        </div>
      </div>
    </div>
  );
}

ReviewsHeader.propTypes = {
  profilePicture: PropTypes.string.isRequired,
  firstName: PropTypes.string.isRequired,
  entryDate: PropTypes.string.isRequired,
};
