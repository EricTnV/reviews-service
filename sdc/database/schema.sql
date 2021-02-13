CREATE DATABASE IF NOT EXISTS erictnv;

CREATE SCHEMA IF NOT EXISTS listings;

CREATE TABLE IF NOT EXISTS listings.reviews(
  listing_id SERIAL PRIMARY KEY NOT NULL,
  num_reviews SMALLINT NOT NULL,
  all_reviews JSON[],
  review_categories JSON[],
  review_ratings JSON[],
  overall_rating_avg DECIMAL(2,1) NOT NULL
);

CREATE USER ubuntu WITH PASSWORD 'ubuntu'

GRANT ALL ON SCHEMA listings TO ubuntu;

CREATE UNIQUE INDEX reviews_idx IF NOT EXISTS ON listings.reviews (id);


SET search_path TO listings, "$user", public;
