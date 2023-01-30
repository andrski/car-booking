export const queries = {
  // FK_5B980199A76ED395
  create: {
    booking: `CREATE TABLE IF NOT EXISTS booking (
    id serial PRIMARY KEY,
    start_time INT,
    end_time INT,
    price INT,
    date_value DATE NOT NULL,
    car_id INT,
    CONSTRAINT car_id FOREIGN KEY(car_id) REFERENCES cars(id)
);`,
    cars: `CREATE TABLE IF NOT EXISTS cars (
    id serial PRIMARY KEY,
    car VARCHAR(255) NOT NULL,
    car_number VARCHAR(50) UNIQUE NOT NULL
    );`,
    prices: `CREATE TABLE IF NOT EXISTS prices (
    id serial PRIMARY KEY,
    base INT NOT NULL,
    sale_4_days INT NOT NULL,
    sale_9_days INT NOT NULL,
    sale_17_days INT NOT NULL,
    sale_29_days INT NOT NULL
    );`,
  },
  selectFrom: 'SELECT * FROM',
  insert: {
    cars: `INSERT INTO cars(car, car_number)
    VALUES('geely','1111'),
    ('audi','2222'),
    ('mercedes','4444'),
    ('lada','5555'),
    ('moskvich','3333');`,
    prices: `INSERT INTO prices(base, sale_4_days, sale_9_days, sale_17_days, sale_29_days)
    VALUES(1000, 5, 10, 15, 15);`,
    booking: `INSERT INTO booking`,
  },
  bookingsByCarId: `select * from booking
  left join cars on cars.id = booking.car_id
  where cars.id =`,
};
