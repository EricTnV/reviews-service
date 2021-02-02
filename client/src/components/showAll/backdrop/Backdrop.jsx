import React from 'react';
import PropTypes from 'prop-types';
import classes from './Backdrop.module.css';

export default function Backdrop({ show, clicked }) {
  return (
    show ? <div className={classes.bg} onClick={clicked} aria-hidden="true" /> : null
  );
}

Backdrop.propTypes = {
  show: PropTypes.bool.isRequired,
  clicked: PropTypes.func.isRequired,
};
