CREATE DATABASE erictnv;

USE erictnv;

/*
PRIMARY RECORD (THIS IS WHERE MY COMPONENT'S NEEDS ARE ROOTED)
*/

CREATE TABLE listings(
  listing_id INTEGER PRIMARY KEY,
  /* MUST CALCULATE THE FOLLOWING PREINSERTION */
  num_reviews SMALLINT,
  all_reviews TABLE FOREIGN KEY REFERENCES reviews(listing_id),
  review_categories TABLE FOREIGN KEY REFERENCES categories(listing_id),
  review_ratings TABLE FOREIGN KEY REFERENCES ratings(listing_id),
  /* MUST CALCULATE THE FOLLOWING PREINSERTION */
  overall_rating_avg DECIMAL(2,1),
);

/*

SECONDARY RECORD (THIS IS WHAT MY COMPONENT NEEDS)

*/

CREATE TABLE reviews(
  review_id INTEGER PRIMARY KEY,
  user_id INTEGER FOREIGN KEY REFERENCES users(user_id),
  listing_id INTEGER FOREIGN KEY REFERENCES listings(listing_id),
  body TEXT,
  entry_date DATE,
  category VARCHAR(255),
);

/*
TERTIARY RECORDS (THIS IS WHAT MY PRIMARY AND SECONDARY RECORDS NEED)
*/

CREATE TABLE ratings(
  listing_id INTEGER FOREIGN KEY REFERENCES listing(listing_id),
  cleanliness DECIMAL(2,1),
  communication DECIMAL(2,1),
  check_in DECIMAL(2,1),
  accuracy DECIMAL(2,1),
  location DECIMAL(2,1),
  value DECIMAL(2,1),
);

CREATE TABLE categories(
  listing_id INTEGER PRIMARY KEY FOREIGN KEY REFERENCES listings(listing_id),
  /* MUST CALCULATE THE FOLLOWING PREINSERTION */
  r_h SMALLINT,
  g_l SMALLINT,
  h_h SMALLINT,
  c_b SMALLINT,
  e_c_i SMALLINT,
  g_v SMALLINT,
  a_q_n SMALLINT,
  c_l SMALLINT,
  t_t SMALLINT,
  f_h SMALLINT,
  g_r SMALLINT,
);

/*
THIS ONE I AM GOING TO LIMIT TO MAYBE 800k USERS WHO WILL WRITE ABOUT ~100 REVIEWS EACH
*/

CREATE TABLE users (
  user_id: INTEGER PRIMARY KEY,
  firstName: VARCHAR(30),
  lastName: VARCHAR(50),
  email: VARCHAR() CHECK (email LIKE '%_@__%.__%'),
  profileUrl: VARCHAR(255),
  pictureUrl: VARCHAR(255),
  password: VARCHAR(60),
);
