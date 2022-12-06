# Calendarios personalizado -- Custom calendars

With this app you can create your own custom calendar with 12 photos at your choice

## Why

The idea of an app where you can create your own custom calendars comes with my group of friends, we're always trying to create specials gifts, one year we decided to create a calendar with photos
about all our activities alongside the year and now I think more people may want to create their own custom calendars, so this it is.

## Is actually deployed ?

I deployed it in the Christmas season on www.calendariopersonalizado.es, so may it's still up

## How do I launch it ?

1. All you have to do is add the `month templates` in the `/common/templates` folder with the following naming ex: `April.png`
2. Prepare the services (mysql, apache), there is a docker compose in `/tools/docker` and the service script is in `/tools/scripts`
3. exec `npm i` all in all projects
4. run `MIGRATIONS=true npm run deploy` at the root of the project
5. and run
------------

```
Basilio Gómez
2022-2023
```
