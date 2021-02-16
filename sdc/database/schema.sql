CREATE DATABASE IF NOT EXISTS erictnv;

CREATE SCHEMA IF NOT EXISTS listings;

CREATE SCHEMA IF NOT EXISTS users;

CREATE TABLE IF NOT EXISTS users.user(
  user_id INTEGER /* PRIAMRY KEY */ NOT NULL,
  firstName VARCHAR(50) NOT NULL,
  lastName VARCHAR(50) NOT NULL,
  profileUrl TEXT NOT NULL,
  pictureUrl TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS listings.listing(
  listing_id INTEGER /* PRIMARY KEY */ NOT NULL,
  /* MUST CALCULATE THE FOLLOWING PREINSERTION */
  num_reviews SMALLINT NOT NULL,
  overall_rating_avg DECIMAL(2,1) NOT NULL
);

CREATE TABLE IF NOT EXISTS listings.ratings(
  listing_id INTEGER /* PRIMARY KEY */ NOT NULL,
  cleanliness DECIMAL(2,1) NOT NULL,
  communication DECIMAL(2,1) NOT NULL,
  check_in DECIMAL(2,1) NOT NULL,
  accuracy DECIMAL(2,1) NOT NULL,
  location DECIMAL(2,1) NOT NULL,
  value DECIMAL(2,1) NOT NULL/* ,
  FOREIGN KEY (listing_id) REFERENCES listings.listing(listing_id) */
);

CREATE TABLE IF NOT EXISTS listings.categories(
  listing_id INTEGER /* PRIMARY KEY  */NOT NULL,
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
  g_r SMALLINT NOT NULL/* ,
  FOREIGN KEY (listing_id) REFERENCES listings.reviews(listing_id)
 */);

CREATE TABLE IF NOT EXISTS listing.review(
  review_id INTEGER /* PRIMARY KEY */ NOT NULL,
  user_id INTEGER NOT NULL,
  firstName VARCHAR(50) NOT NULL,
  lastName VARCHAR(50) NOT NULL,
  profileUrl TEXT NOT NULL,
  pictureUrl TEXT NOT NULL,
  listing_id INTEGER NOT NULL,
  body TEXT NOT NULL,
  entry_date VARCHAR NOT NULL,
  category VARCHAR(255) NOT NULL/* ,
  FOREIGN KEY (user_id) REFERENCES users.user(user_id),
  FOREIGN KEY (listing_id) REFERENCES listings.listing(listing_id) */
);

CREATE USER IF NOT EXISTS ubuntu WITH PASSWORD 'ubuntu'

GRANT ALL ON SCHEMA listings TO ubuntu;
GRANT ALL ON SCHEMA users TO ubuntu;

ALTER TABLE users.user ADD PRIMARY KEY (user_id);
ALTER TABLE users.review ADD PRIMARY KEY (review_id);
ALTER TABLE listings.listing ADD PRIMARY KEY (listing_id);
ALTER TABLE listings.categories ADD PRIMARY KEY (listing_id);
ALTER TABLE listings.ratings ADD PRIMARY KEY (listing_id);
ALTER TABLE users.review ADD FOREIGN KEY (listing_id) REFERENCES listings.listing(listing_id);
ALTER TABLE users.review ADD FOREIGN KEY (user_id) REFERENCES users.user(user_id);
ALTER TABLE listings.categories ADD FOREIGN KEY (listing_id) REFERENCES listings.listing(listing_id);
ALTER TABLE listings.ratings ADD FOREIGN KEY (listing_id) REFERENCES listings.listing(listing_id);

CREATE UNIQUE INDEX listings_idx ON listings.listing (listing_id);
CREATE UNIQUE INDEX users_idx ON users.user (user_id);
CREATE INDEX reviews_by_listing_idx ON users.review (listing_id);
CREATE INDEX reviews_by_user_idx on users.review (user_id);
CREATE UNIQUE INDEX categories_idx ON listings.categories (listing_id);
CREATE UNIQUE INDEX users_idx ON listings.ratings (listing_id);

SET search_path TO listings, users, "$user", public;
