- clone repo  : git clone https://github.com/andrski/car-booking.git

- install Makefile tool (not required)

- cd /booking-car

- create test.env (set pw for DB in Makefile instead <password here>, and set the same in test.env for DB), 
if did not install Makefile , set password in run DB command instead <password here> the same as like in test.env

- if Makefile tool installed run command run_db && run_app

- if have no Makefile
 run commands:
 docker run --name myPostgresDb -p 5432:5432 -e POSTGRES_USER=user -e POSTGRES_PASSWORD=<password here> -e POSTGRES_DB=postgresDB -d postgres

 docker-compose up --build -d
 