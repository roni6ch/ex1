var express = require('express');
var bookStore = require('./book_store');
var url = require('url');
var app = express();
var port = process.env.PORT || 8080;


var books = [];

var book1 = {
	bookName : 'Harry Potter',
	rate : '5',
	pages : 300,
	bookType : 'drama',
	author : 'Naftali_Gadassi'
}
var book2 = {
	bookName : 'Batman',
	rate : '2',
	pages : 400,
	bookType : 'fantazy',
	author : 'Roni_Chabra'
}
var book3 = {
	bookName : 'Superman',
	rate : '3',
	pages : 200,
	bookType : 'comedy',
	author : 'Tomas_Luster'
}
var book4 = {
	bookName : 'Spiderman',
	rate : '4',
	pages : 220,
	bookType : 'drama',
	author : 'Rotem_Barzilay'
}

//add all the books to array
books[0] = bookStore.Book(book1);
books[1] = bookStore.Book(book2);
books[2] = bookStore.Book(book3);
books[3] = bookStore.Book(book4);


//get Longest Book
function checkLongestBook(){
	return bookStore.getLongestBook(books);
}
//search names by book type()
function searchByBookType(book_type){
	return bookStore.getBooksByType(book_type,books);
}
//get the best rates
function getBestRate(){
	return bookStore.getBestRate();
}

app.get('/',function (req,res){ 
	res.sendFile(__dirname + '/index.html');
});

app.get('/longest',function (req,res){ 
	var lb = checkLongestBook();
	console.log("the longest book is: " + lb.bookName);
	app.set('json space',4);
	res.json(lb);
});

app.get('/find',function (req,res){
	var urlPart = url.parse(req.url,true);
	var query = urlPart.query;
	var bt = searchByBookType(query.book_type);
	console.log("book/s with type " + query.book_type + ": " + bt);
	app.set('json space',4);
	res.json(bt);
});

app.get('/rate',function (req,res){ 
	var rate = getBestRate();
	console.log("the best rate book is: " + rate);
	app.set('json space',4);
	res.json(lb);
});

app.listen(port);
console.log("listening on port 8080");
console.log("please type: /find?field=x or /longest in the browser url");