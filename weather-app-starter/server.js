const express = require("express");
const axios = require("axios");
const app = express();

// Set the view engine to EJS
app.set("view engine", "ejs");

// Serve the public folder as static files
app.use(express.static("public"));

// Render the index template with default values for weather and error
app.get("/", (req, res) => {
  res.render("index", { weather: null, error: null });
});

// Handle the /weather route
app.get("/weather", async (req, res) => {
  // Get the city from the query parameters
  const city = req.query.city;
   
  const apiKey = '6ab8ca5f7387b45c8f222fea33cfdd97'

  // Add your logic here to fetch weather data from the API
  const APIUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`;
 let weather;
 let error = null
  try {
  const response = await axios.get(url)
  weather = response.data;
 } catch (error) {
  weather = null;
  error = "Error, Please try again"
 }
  // Render the index template with the weather data and error message
  res.render("index", { weather, error });
});

// Start the server and listen on port 3000 or the value of the PORT environment variable
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`App is running on port ${port}`);
});
const express = require('express');
const userModel = require('./models/usersmodel').usersModel;

//ADD SOME DUMMY DATA TO THE DB TO THE TEST THE CONNECTION

usersModel.create({

  name:'TEST_USER'
  email;'TEST_EMAIL@GMAIL>COM',
  password:'TEST_1234'

})

//Initialize express

const app = express()

//Routes Section
app.get('/getUser',(req,res)=>{
  //getUsers
  usersModel
  res.json('REQUEST WAS SUCCESSFUL')


)

}
      
//Configure the port
const port = process.env.PORT || 3000;

app.listen(port,()=>{
  console.log('********************************************')
  console.log(`SERVE RUNNING ON PORT ${port}`)
  console.log('********************************************')

});