const fs = require("fs");
const axios = require("axios");
const inquirer = require("inquirer");
const pdf = require("html-pdf");
const options = { format: "Letter" }

inquirer
  .prompt([
    {
    message: "Enter your GitHub username:",
    name: "username"
    },
    {
      message:"What's your favorite color?",
      name:"color"
    }
])
  .then(function({ username, color }) {
    const queryUrl = `https://api.github.com/users/${username}`;
    
    axios.get(queryUrl)
    .then(function(results) {
      const dataSet= results.data;
      // console.log(dataSet)

      const name = dataSet.name;
      const login = dataSet.login;
      const photoSource = dataSet.avatar_url;
      const mapLink = `https://www.google.com/maps/place/${dataSet.location}/`;
      const ghLink = `https://github.com/${username}`;
      const blogLink = `https://github.com/${username}?tab=repositories`;
      const bio = dataSet.bio;
      const repoSum = dataSet.public_repos;
      const followers = dataSet.followers;
      const following = dataSet.folloring;
      const starGazers = 'NEED TO PATH STARGAZERS';

      const newDoc=
      `<!DOCTYPE html>
      <html lang="en">
      <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <meta http-equiv="X-UA-Compatible" content="ie=edge">
          
          <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
          <style>
          body{
              background-color: black;
              font-family: Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;
              margin:50px;
          }
          header{
              background-color: ${color};
              color:black;
              font-size:35px;
              margin-bottom:30px;
              text-align: center;
          }
          #newFoot{
              background-color:${color};
              bottom: 0px;
              color:black;
              display: flex;
              height: 40px;
              justify-content: center;
              margin-top: 15px;
              position: absolute;
          }
          #profilePic{
              height: 200px;
              width: 200px;
          }
          #row1{
              background-color: ${color};
              border-radius: 5px;
              justify-content: space-evenly;
              padding:10px;
          }
          #row2{
              background-color: ${color};
              border-radius: 5px;
              padding:10px;
          }
          </style>
          <title>Developer Profile</title>
      </head>
      <body>
          <header>
              Developer Profile
          </header>
          
          <div class= "container">
              <div class="row" id ="row1">
                  <div class="col-md-6">
                      <h1>${name}</h1>
                      <h2>${login}</h1>
                      <h3>${dataSet.location}</h3>
                      <p><a href="${mapLink}">See on Google Maps</a></p>
                  </div>
                  <div class="col-md-2">
                      <img id="profilePic" src="${photoSource}" class="rounded float-right" alt="profilePhoto">
                  </div>
              </div>
              <br>
              <br>
              <div class="row" id="row2">
                      <div class="col-md-4">
                          <h3>Bio:</h3>
                              <p>${bio}</p>
                              <br>
                              <p>Number of GitHub Followers: ${followers}</p>
                              <p>Star Gazer count: ${starGazers}</p>
                              <p>Following ${following} users</p>
                      </div>
                      <div class="col-md-4">
                          <h3>Total Repositories:</h3>
                          <h5>${repoSum}</h5>
                          <h4>GitHub:</h4>
                          <p>${ghLink}</p>   
                          <h4>Blog:</h4>
                          <p>${blogLink}</p> 
                      </div>
                  </div>
          </div>
      </body>
      </html>`

        fs.writeFile("newNess.html", newDoc, function(err) {
          if (err) {
            throw err;
          };
        });
    })
    .then(function() {
      var html = fs.readFileSync("newNess.html", 'utf8')
       
      pdf.create(html, options).toFile('./Developer-Profile.pdf', function(err, res) {
        if (err) return console.log(err);
        console.log(res); // { filename: '/app/businesscard.pdf' }
      });
    });
        console.log(`COMPLETE`);
  });