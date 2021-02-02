import React from 'react';
import { render, screen, fireEvent, waitFor, queryByAttribute } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect'
import moment from 'moment';
import UserReviews from '../client/src/components/userReviews/UserReviews'
import sampleData from '../__testData__/sampleData'

//basic render test, no data
describe('UserReviews', () => {

  // render component
  test('renders the UserReviews component', () => {
    render(<UserReviews reviews={[]}/>);
    // screen.debug();
  });

  test('renders specific user reviews properly', () => {
    const handleClick =jest.fn()

    render(<UserReviews reviews={sampleData.all_reviews}/>);
    const userReview = screen.getByTestId("2000")
    expect(userReview).toHaveTextContent('Xander')
    expect(userReview).toHaveTextContent('Eos mollitia aut sed nemo ipsum animi. Soluta vitae explicabo voluptatem vitae ut. Aut quam delectus voluptatem provident est et dolorem ipsam ipsum. Ut adipisci at ut sequi.')
  });

  // test('test read more button functionality', () => {
  //   const handleClick =jest.fn()

  //   render(<UserReviews reviews={sampleData.all_reviews} dummyFunc={handleClick}/>);
  //   const readMoreBtn = screen.getByTestId("readMore")
  //   fireEvent.click(readMoreBtn);
  //   expect(readMoreBtn).toHaveTextContent('read less')
  //   // await waitFor(()=> screen.getByTestId("readMore"))
  //   // expect(readMoreBtn).toHaveTextContent('read less')
  // });


});