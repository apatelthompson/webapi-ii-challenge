steps:

- git status
- mkdir folderName
- cd folderName
- git init
- npm init -y
- atom .

- change `"test": "echo \"Error: no test specified\" && exit 1"` inside the scripts object to read: `"start": "nodemon index.js".`
- npm i nodemon -D
- touch index.js
  // see a list of pre-populated movies
  // add a movie to the list
  // update movie information
  // remove a movie
  //see only released movies
- npx gitignore node

const express = require('express');

const server = express();

server.use('/', (req, res) => res.send('API up and running!'));

// using port 9000 for this example
server.listen(9000, () => console.log('API running on port 9000'));

---

endpoint (url + http method) === function

POST /api/movies (body:movie) === postApiMovies(movie)

|     non REST     |          REST          |
| :--------------: | :--------------------: |
|   /createMovie   |    POST /api/movies    |
| /removeMovie/:id | DELETE /api/movies/:id |

Other Approaches to building Web APIs (than REST):

- GraphQL
- gRPC
- gRPC
- SOAP
