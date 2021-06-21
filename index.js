console.clear()
const express = require( 'express' )
const getUSState = require( './getUSState' )

const app = express();

const PORT = process.env.PORT || 4000


app.use(express.static('public'))

app.get( '/api/states', async (req, res ) => {
     const states = await getUSState();
     //     console.log(states)
     res.json(states)
  
})

app.listen( PORT, ( req, res ) => {
     console.log( `App is listening at http://localhost:${PORT}` );
} )
