CREATE DATABASE IF NOT EXISTS erictnv;

CREATE SCHEMA IF NOT EXISTS erictnv.reviews;

CREATE TABLE IF NOT EXISTS reviews.users (
  user_id INTEGER PRIMARY KEY,
  firstName VARCHAR(30) NOT NULL,
  lastName VARCHAR(50) NOT NULL,
  profileUrl VARCHAR(255) NOT NULL,
  pictureUrl VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS reviews.listings(
  listing_id INTEGER PRIMARY KEY NOT NULL,
  /* MUST CALCULATE THE FOLLOWING PREINSERTION */
  num_reviews SMALLINT NOT NULL,
  overall_rating_avg DECIMAL(2,1) NOT NULL
  /* THE FOLLOWING ARE LOOKUPS */
/*     all_reviews TABLE REFERENCES reviews(listing_id),
  review_categories TABLE REFERENCES categories(listing_id),
  review_ratings TABLE REFERENCES ratings(listing_id), */
);


CREATE TABLE IF NOT EXISTS reviews.ratings(
  listing_id INTEGER PRIMARY KEY NOT NULL,
  cleanliness DECIMAL(2,1) NOT NULL,
  communication DECIMAL(2,1) NOT NULL,
  check_in DECIMAL(2,1) NOT NULL,
  accuracy DECIMAL(2,1) NOT NULL,
  location DECIMAL(2,1) NOT NULL,
  value DECIMAL(2,1) NOT NULL,
  FOREIGN KEY (listing_id) REFERENCES reviews.listings(listing_id)
);

CREATE TABLE IF NOT EXISTS reviews.categories(
  listing_id INTEGER PRIMARY KEY NOT NULL,
  r_h SMALLINT NOT NULL,
  g_l SMALLINT NOT NULL,
  h_h SMALLINT NOT NULL,
  c_b SMALLINT NOT NULL,
  e_c_i SMALLINT NOT NULL,
  g_v SMALLINT NOT NULL,
  a_q_n SMALLINT NOT NULL,
  c_l SMALLINT NOT NULL,
  t_t SMALLINT NOT NULL,
  f_h SMALLINT NOT NULL,
  g_r SMALLINT NOT NULL,
  FOREIGN KEY (listing_id) REFERENCES reviews.listings(listing_id)
);

CREATE TABLE IF NOT EXISTS reviews.reviews(
  review_id INTEGER PRIMARY KEY NOT NULL,
  user_id INTEGER NOT NULL,
  listing_id INTEGER NOT NULL,
  body TEXT NOT NULL,
  entry_date VARCHAR NOT NULL,
  category VARCHAR(255) NOT NULL,
  FOREIGN KEY (user_id) REFERENCES reviews.users(user_id),
  FOREIGN KEY (listing_id) REFERENCES reviews.listings(listing_id)
);
