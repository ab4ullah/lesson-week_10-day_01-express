
// require express library
const express = require('express');
const bodyParser = require('body-parser');
// instaniate/create an express application
const app = express();
const myMiddleware =(req, res, next) => {
  console.log("1st" + req.method + 'to' + req.url);
  next();
}


const myMiddleware2 =(req, res, next) => {
  console.log("2nd");
  next();
}

app.use(bodyParser.json());
app.use(myMiddleware);
app.use(myMiddleware2);
//define a port to host our server
const port = 3000;


// books for mocking a database
const books = [
    { title: 'Dictionary', author: 'Webster' }, // 0
    { title: 'Encyclopedia', author: 'Encarta' }, // 1
    { title: 'Clean Code', author: 'Robert Cecil Martin' } // 2
  ]

//define a home route (req (request) res (response))
app.get('/books', (req, res) => res.json({ books: books })); // books : is key books is the value

//define a show route /books/:id to respond with a single book

app.get('/books/:id', (req, res) => {
    
    const id = req.params.id;
    const book = books[id];
    res.json({books: book});

 })


// define a delete route /books/:id to remove the book and respond 204

app.delete('/books/:id', (req, res) => {
    
    const id = req.params.id;
    books.splice(id, 1);
    res.status(204).send();

 })

 app.post('/books', (req, res) => {
  const book = req.body.book;
   books.push(book);
   res.status(201).json({book: book});

})


app.put('/books/:id', (req, res) => {
   const id = req.params.id;
   const book = req.body.book;
   books[id]= book;
   res.status(201).json({book: book});

})

// start app on port 3000 and print to console that ti is running 
app.listen(port, () => console.log('App running on port ' + port));
