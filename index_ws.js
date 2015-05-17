var express = require('express');
var bookStore = require('./book_store');
var url = require('url');
var app = express();
var port = process.env.PORT || 8080;


//var books = [];

var book1 = {
	id : 1,
	bookName : 'Harry Potter',
	rate : 2,
	pages : 300,
	bookType : 'drama',
	author : 'Naftali_Gadassi'
}
var book2 = {
	id : 2,
	bookName : 'Batman',
	rate : 5,
	pages : 400,
	bookType : 'fantazy',
	author : 'Roni_Chabra'
}
var book3 = {
	id : 3,
	bookName : 'Superman',
	rate : 3,
	pages : 200,
	bookType : 'comedy',
	author : 'Tomas_Luster'
}
var book4 = {
	id : 4,
	bookName : 'Spiderman',
	rate : 4,
	pages : 220,
	bookType : 'drama',
	author : 'Rotem_Barzilay'
}

//add all the books to array
bookStore.Book(book1);
bookStore.Book(book2);
bookStore.Book(book3);
bookStore.Book(book4);


//get the best rates
function getBestRate(){
	return bookStore.getBestRate();
}
//get book by id
function getBookById(id){
	return bookStore.getBookById(id);
}
//get Longest Book
function checkLongestBook(){
	return bookStore.getLongestBook();
}
//search names by book type()
function searchByBookType(book_type){
	return bookStore.getBooksByType(book_type);
}
//get all book list from library
function getBookList(){
	return bookStore.getBookList();
}

//the url routes
app.get('/',function (req,res){ 
	res.sendFile(__dirname + '/index.html');
});

app.get('/longest',function (req,res){ 
	var lb = checkLongestBook();
	console.log("the longest book is: " + lb.bookName);
	app.set('json space',4);
	res.json(lb);
});

app.get('/list',function (req,res){ 
	app.set('json space',4);
	res.json(getBookList());
});

app.get('/find',function (req,res){
	var urlPart = url.parse(req.url,true);
	var query = urlPart.query;
	var bt = searchByBookType(query.book_type);
	console.log("book/s with type " + query.book_type + ": " + bt);
	app.set('json space',4);
	res.json(bt);
});

app.get('/id/:book_id',function (req,res){
	var bookId = req.params.book_id;
	console.log("book id is: " + bookId);
	var book_by_id = getBookById(bookId);
	app.set('json space',4);
	res.json(book_by_id);
});

app.get('/rate',function (req,res){ 
	var rate = getBestRate();
	console.log("the best rate book is: " + rate.bookName);
	app.set('json space',4);
	res.json(rate);
});

app.listen(port);
console.log("listening on port " + port + "\n");
console.log("\nplease type: \n1.url/longest \n2.url/rate \n3.url/find?field=bookType\nin the browser url\n");