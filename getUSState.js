console.clear()
const axios = require( "axios" );
const cheerio = require("cheerio");

async function getUSState( ) {
  const baseUrl =
  "https://en.wikipedia.org/wiki/List_of_states_and_territories_of_the_United_States";

  const { data } = await axios( baseUrl )

  const $ = cheerio.load(data);
  const table = $(
    "caption:contains(States of the United States of America)"
  ).parent();
  const states = [];
  const labels = [
    "code",
    "capital",
    "largest",
    "ratification",
    "population",
    "total_area_msqr",
    "total_area_kmsqr",
    "land_area_msqr",
    "land_area_kmsqr",
    "water_area_msqr",
    "water_area_kmsqr",
    "number_of_reps",
  ];
  const row = $(table)
    .find("tbody tr").slice(2)
    .each((i, element) => {
      const $row = $(element); //geting row from tbody of table
      let state = {}; // initial state object is empty
      state.name = $row.find("th a").first().text(); //extracting name from th a
      state.flag = $row.find("th span>img").attr("src"); //extracting flag from th span>img

      //getting rest of the td contnet through jquery loop
      $row.find("td").each((i, col) => {
        const $col = $(col); //custing or jQuery Object to Javascript Object
        let value = Number($col.text().trim().replace(/,/, "")); // replacing , from string to make it number

        if (isNaN(value)) {
          value = $col.text().trim();
        }
        //checking if there is a colspan then data move to next label
        if (i == 1 && $col.attr("colspan") == 2) {
          state[labels[i] + 1] = value;
        }
        state[labels[i]] = value;
      });
      states.push(state); //pushing to states array to make it json like object
    } );
  // console.log(states);

  return states; //finnally return states json like array javascript object
}
// getUSState()

module.exports = getUSState

