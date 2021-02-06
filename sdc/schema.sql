CREATE DATABASE erictnv;

USE erictnv;

CREATE TABLE listings(
  listing_id integer PRIMARY KEY auto_increment,
  num_reviews SMALLINT,
  all_reviews TABLE,
  review_categories TABLE,
  review_ratings TABLE,
  overall_rating_avg DECIMAL(2,1),
  FOREIGN KEY (all_reviews) REFERENCES reviews(listing_id)
  FOREIGN KEY (review_categories) REFERENCES categories(listing_id).categories
  FOREIGN KEY (review_ratings) REFERENCES ratings(listing_id).rating
);

CREATE TABLE reviews(
  review_id INTEGER PRIMARY KEY,
  user_id INTEGER,
  listing_id INTEGER,
  rating TABLE,
  body TEXT,
  entry_date DATE,
  category VARCHAR(255),
  FOREIGN KEY (user_id) REFERENCES users(user_id)
  FOREIGN KEY (listing_id) REFERENCES listings(listing_id)
  FOREIGN KEY (rating) REFERENCES ratings(review_id)
);

CREATE TABLE ratings(
  review_id INTEGER FOREIGN KEY REFERENCES reviews(review_id),
  cleanliness SMALLINT,
  communication SMALLINT,
  check_in SMALLINT,
  accuracy SMALLINT,
  location SMALLINT,
  value SMALLINT,
);

CREATE TABLE categories(
  review_id INTEGER PRIMARY KEY FOREIGN KEY REFERENCES reviews(review_id)
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
)

CREATE TABLE users (
  user_id: INTEGER PRIMARY KEY,
  firstName: VARCHAR(30),
  lastName: VARCHAR(50),
  email: VARCHAR(75) CHECK (email LIKE '%_@__%.__%'),
  profileUrl: VARCHAR(255),
  pictureUrl: VARCHAR(255),
  password: VARCHAR(60),
);
