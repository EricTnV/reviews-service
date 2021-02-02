import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect'
import CategoryGraphs from '../client/src/components/categoryGraphs/CategoryGraphs'
import sampleData from '../__testData__/sampleData'

describe('CategoryGraphs', () => {

  it('renders the CategoryGraphs component', () => {
    render(<CategoryGraphs ratings={[]} isForModal={false}/>);
    // screen.debug();
  });


  test('renders the individual graph', () => {
    render(<CategoryGraphs ratings={sampleData.review_ratings} isForModal={false}/>);
    const categoryGraph = screen.getByTestId("Cleanliness")
    expect(categoryGraph).toHaveTextContent("Cleanliness")
    // screen.debug();
  });

  test('renders the individual graph', () => {
    render(<CategoryGraphs ratings={sampleData.review_ratings} isForModal={false}/>);
    const categoryGraph = screen.getByTestId("Cleanliness")
    expect(categoryGraph).toHaveTextContent("4.3")
    // screen.debug();
  });

});



