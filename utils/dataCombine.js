// USE gamegetter_db;

// SELECT name FROM videogames;
// videogames.forEach(game => {
//     console.log(game.name);
// });
// --loop over the names in name of videogame table.
// -- for each name, run the helper function toSlug
// -- for each slug we got out, where the name we passed in equals the name in the videogames table, insert the slug result into the respective row in the slug column of videogames

// fetch("https://api.rawg.io/api/games/{id}")
//     .then(res => {
//         if (res.ok) {
//             console.log("SUCCESS")
//         } else {
//             console.log("Not Successful")
//         }
//         res.json()
//     })
//     .then(data => console.log(data))
//     .catch(error => console.log("ERROR"))

// query to table model videogames findAll then loop over with forEach
// map over the database query and return back an array of the data
// might need a plain object in foreach toJSON

// const name = {videogames.name}

// let videoGamesUrl = "https://api.rawg.io/api/games" + { slug } + "?key=808fc8164bad43728e9cb6d4d6329ffb&dates=2019-09-01,2019-09-30&platforms=18,1,7"
// const data = { description, background_image, background_image_additional, website };
// fetch(videoGamesUrl, {
//     method: "GET",
//     headers: {
//         'Content-Type': 'application/json',
//     },
//     body: JSON.stringify(data),
// })
//     .then((response) => response.json())
//     .then((data) => {
//         console.log('Success:', data);
//     })
//     .catch((error) => {
//         console.error('Error:', error);
//     });

    // if (description && background_image && background_image_additional && website)
// module.exports = 