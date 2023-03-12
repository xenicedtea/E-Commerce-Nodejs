const express = require('express');
const app = express();
const cors = require('cors')
const properties = require('./src/config/properties.config');
const PORT = properties.PORT;
const bodyParser = require('body-parser');
const initWebrouter = require('./src/routers/index.js')

// IMPORT=============================================================================


//START CONFIG========================================================================
// config body parser________________________________________________________________________
const bodyParserJSON = bodyParser.json();
const bodyParserURLEncoded = bodyParser.urlencoded({extended:true});
app.use(bodyParserJSON);
app.use(bodyParserURLEncoded);

//config cors________________________________________________________________________________
// let whitelist = properties.CORS;
// let corsOptions = {
//     origin: function (origin, callback) {
//       if (whitelist.indexOf(origin) !== -1) {
//         callback(null, true)
//       } else {
//         callback(new Error('Not allowed by CORS'))
//       }
//     }
//   }

app.use(cors({
    origin: 'http://localhost:3000', 
}));

//config web router_________________________________________________________________________
initWebrouter(app);
// END CONFIG=========================================================================

app.get("/welcome", (req, res) => {
    res.status(200).send("Welcome 🙌 ");
});

app.listen(PORT,()=>{
    console.log(`Example app listening at http://localhost:${PORT}`);
})