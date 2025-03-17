const { error } = require('console');
const express = require('express');
const app = express ();
app.use(express.json());
const PORT = process.env.PORT || 3000;

class Book {
    constructor(id, title, details) {
      this.id = id;
      this.title = title;
      this.details = details;
    }
    updateDetails(newDetails) {
        this.details = newDetails;
      }
}
    const book1 = new Book(1, "To Kill a Mockingbird", [
        {
          id: 1,
          author: "Harper Lee",
          genre: "Fiction",
          publicationYear: 1960
        }
      ]);

    const book2 = new Book(2, "harry potter", [
        {id: 2,
        author: "jk rowling",
        genre: "anime",
        publicationYear: 2025
        }
    ]);
    let books = [];
    books.push(book1);
    books.push(book2);

app.get("/whoami", (request, response) => {
    response.send({
       "studentNumber": "12345678"
    });
    
    // response.json(status);
 });

 app.get("/books", (request, response)=>{
    response.send(books);
 });

 app.get("/books/:id", (request, response) => {
    const book = books.find(xd => xd.id === parseInt(request.params.id)); 

    if (book) {
        response.send(book);  
    } else {
        response.status(404).json({ error: "Not Found" }); 
    }
});

app.post("/books", (request, response) => {
    const {id,title,details} = request.body;  
    
    if (!id || !title || !details || !Array.isArray(details)) {
      return response.status(400).json({ error: "Missing required book details" });
    }
  
    const newBook = {
      id: id,
      title: title,
      details: details
    };

    books.push({id,title,details});
    response.status(200).json({id,title,details});

});

app.put("/books/:id", (request,response)=>{
    const bid= request.params.id;
    const {id,title,details} = request.body;
    const btitle = request.params.title;
    const bdet = request.params.details;
    const bookIndex = books.findIndex(xd => xd.id === bid);

    if (!title){
        return response.status(400).json({ error: "Not found" });
      }

    if(!details){
        return response.status(400).json({ error: "Not found" });
    }
    if(!Array.isArray(details)){
        return response.status(400).json({ error: "Not found" });
    }

    books[bookIndex] = {
        id: bid, 
        title: title,
        details: details
    };

    response.json({
        updatedBook: books[bookIndex]
      });


});

app.delete("/books/:id",(request,response)=>{
    const bid = request.params.id;
    const {id,title,details} = request.body;
    const btitle = request.params.title;
    const bdetails = request.params.details;
    const bind = books.findIndex(xd => xd.id === bid);

    
    if(bind === -1){
        response.status(404).json({error : "Not FOund"} );
    }
    books.splice(bind, 1);
    response.json({ message:"Book deleted"});
});

app.post("/books/:id/details", (request, response) => {
    const details= request.body;  
    const bid = request.params.id;
    const book = books.find(xd =>xd.id === bid);
    if(!book){
        response.status(404)({error: "Not found"});
    }


    response.status(200).json({id,title,details});
    book.details.push(details);
    response.json(book);
});

app.delete("/books/:id/details/:detailId", (request,response)=>{
    const {id,title,details} = request.body;

    const bid = request.params.id;
    const book = books.find(xd =>xd.id === bid);
    if(!book){
        response.status(404)({error: "Not found"});
    }

    const newD = [];

    response.json(id,title,newD);
});

 app.listen(PORT, () => {
    console.log(`Server Listening on PORT:${PORT}`);
  });