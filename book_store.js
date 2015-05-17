var events = require('events');
var util = require('util');
util.inherits(newBook,events.EventEmitter);

var books = [];
var index = 0;

exports.Book = function(info){
	var book = new newBook();
	book.setAllInfo(info);
	books[index] = info;
	index++;
	return book;
}

// Book Object Constructor
function newBook() {
	this.data = {
		id : null,
		bookName : null,
		rate : null,
		pages : null,
		bookType : null,
		author : null
	};

	this.setAllInfo = function(info) {
		for (var i in this.data){
			this.data[i] = info[i];
		}
		console.log("new book has arrived: " + info.bookName);
	}; 

	this.getAllInfo = function(){
		return this.data;
	}
	events.EventEmitter.call(this);
};


// Book Object prototypes
exports.getBestRate = function() {
	var bestRate = -1;
	var bestBookRate = -1;
	for (var i in books){
		if (books[i].rate > bestRate)
		{
			bestRate = books[i].rate;
			bestBookRate = books[i];
		}
	}
	if (bestBookRate!=-1)
		return bestBookRate;
	else return false;
}

exports.getLongestBook = function() {
	var bookLength = 0;
	var longestBook = -1;
	for (var i in books){
		if (books[i].pages > bookLength)
		{
			bookLength = books[i].pages;
			longestBook = books[i];
		}
	}
	return longestBook;
}

exports.getBooksByType = function(book_type) {
	var booksByType = [];
	var j = 0;
	for (var i in books){
		if (books[i].bookType == book_type)
		{
			booksByType[j] = books[i].bookName;
			j++;
		}
	}
	return booksByType;
}

exports.getBookList = function() {
	for (var i in books){
		console.log(books[i]);
	}
	return books;
}
exports.getBookById = function(id) {
	var book_by_id = null;
	for (var i in books){
		if (books[i].id == id)
		{
			console.log(books[i].bookName);
			book_by_id = books[i];
		}
	}
	if ( book_by_id != null )
	{
		console.log(book_by_id);
		return book_by_id;
	}
	else
		return "no such book";
}