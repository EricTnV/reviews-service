import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';
import ButtonsDisplay from './ButtonsDisplay';
import classes from './Buttons.module.css';

export default function categoryControl({ categories, clicked }) {
  const [isLongList, setIsLongList] = useState(false);
  useEffect(() => {
    if (categories.length >= 5) {
      setIsLongList(true);
    }
  }, []);

  const [isShowMoreClicked, setIsShowMoreClicked] = useState(false);

  const handleShowMoreClick = () => {
    setIsShowMoreClicked(!isShowMoreClicked);
  };

  if (isLongList) {
    let lengthList;

    if (isShowMoreClicked) {
      lengthList = categories;
    } else {
      lengthList = categories.slice(0, 4);
    }
    return (
      <div className={classes.container}>
        <ButtonsDisplay id="showMore" categories={lengthList} clicked={clicked} />
        <button className={classes.showMore} type="button" onClick={handleShowMoreClick} data-testid="showMore">
          {isShowMoreClicked ? 'Show fewer ' : 'Show more'}
          <IoIosArrowDown style={{ transform: !isShowMoreClicked ? 'translateY(0)' : 'translateY(-100vh)' }} />
          <IoIosArrowUp style={{ transform: isShowMoreClicked ? 'translateY(0)' : 'translateY(-100vh)' }} />

        </button>
      </div>
    );
  }
  return (
    <div>
      <ButtonsDisplay categories={categories} />
    </div>
  );
}

categoryControl.propTypes = {
  categories: PropTypes.arrayOf(PropTypes.object).isRequired,
  clicked: PropTypes.func.isRequired,
};
