-- my apikey = 808fc8164bad43728e9cb6d4d6329ffb
-- hide this api key in the env folder and call it using process.env.API_KEY

-- api request with keys
--  GET https://api.rawg.io/api/platforms?key=808fc8164bad43728e9cb6d4d6329ffb
-- GET https://api.rawg.io/api/games?key=808fc8164bad43728e9cb6d4d6329ffb&dates=2019-09-01,2019-09-30&platforms=18,1,7

USE gamegetter_db; 

SELECT name FROM videogames;

-- loop over rawg api for each name of videogames
-- get the name, description, background_image, background_image_additional, and website




-- once an apidatas table is created, 
-- Insert into videogames(col1,col2) select col1,col2 from apidatas;
-- maybe bulk insert is faster?
-- need game id from the videogames table


-- hit the api, loop over results of api, something matching 
-- bulk insert data from api where name = api.name