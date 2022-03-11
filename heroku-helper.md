# Heroku Helper

#### Dump local (Docker)

`docker exec -t mundolunar_postgres_1 pg_dump -d mundolunar -U mundolunar --no-acl --no-owner -f /home/dumps/mundolunar_$(date +"%Y-%m-%d")`

#### Restore local (Docker)

`cat your_dump.sql | docker exec -i your-db-container psql -U postgres`

#### Restore Heroku

`heroku pg:psql -a mundolunar -f pg-dumps/mundolunar_2022-02-21 `

ou

`heroku pg:psql -a mundolunar < pg-dumps/mundolunar_2022-02-21 `

#### Herokul pull database

`PGHOST=localhost PGUSER=postgres PGPASSWORD=postgres heroku pg:pull DATABASE_URL  mundolunar2 -a mundolunarheroku pg:pull DATABASE_URL  mundolunar2 -a mundolunar` 
