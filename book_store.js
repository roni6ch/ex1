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

exports.getLongestBook = function(books) {
	var longestBook = 0;
	for (var i in books){
		if (books[i].data.pages > longestBook)
			longestBook = books[i].data.pages;
	}
	return books[i].data;
}

exports.getBooksByType = function(book_type,books) {
	var booksByType = [];
	var j = 0;
	for (var i in books){
		if (books[i].data.bookType == book_type)
		{
			booksByType[j] = books[i].data.bookName;
			j++;
		}
	}
	return booksByType;
}