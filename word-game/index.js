const PORT = 8000;
const express = require('express')
const cors = require('cors')
require('dotenv').config
const axios = require('axios')
const app = express()
app.use(cors())

app.get('/',(req,res) => {
    res.json('hi')
})

app.get('/results',(req,res) => {
    const passedLevel = req.query.level
    const options = {
        method: 'GET',
        url: 'https://twinword-word-association-quiz.p.rapidapi.com/type1/',
        params: { level: passedLevel, area: 'sat' },
        headers: {
          'X-RapidAPI-Key': APIKEY,
          'X-RapidAPI-Host': 'twinword-word-association-quiz.p.rapidapi.com'
        }
      };
  
      axios.request(options).then((response) => {
        res.json(response.data)
        console.log(response.data);
      }).catch((error) => {
        console.error(error);
      })
})

app.listen(PORT, () => console.log(`Server running on PORT ${PORT}`))

