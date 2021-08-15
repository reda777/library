let myLibrary = [];
const books=document.querySelector('.books');
function Book(title,author,pages,read) {
    this.title=title;
    this.author=author;
    this.pages=pages;
    this.read=read;
    this.info=function(){
        return `${title} by ${author}, ${pages} pages, ${(read)?"read":"not read yet"}`;
    };
}

function addBookToLibrary(title,author,pages,read) {
    myLibrary.push(new Book(title,author,pages,read));
}
addBookToLibrary('overlord','some japanesse guy',1500,true);
addBookToLibrary('kumo desu','some stupid woman',1200,false);
addBookToLibrary('kumo desu','some stupid woman',1200,false);
addBookToLibrary('kumo desu','some stupid woman',1200,false);
addBookToLibrary('kumo desu','some stupid woman',1200,false);
addBookToLibrary('kumo desu','some stupid woman',1200,false);
addBookToLibrary('kumo desu','some stupid woman',1200,false);
function displayBooks(){
    for(let i of myLibrary){
        const book=document.createElement('div');
        book.setAttribute('class','book');
        const newContent=document.createTextNode(i.info());
        book.appendChild(newContent);
        books.appendChild(book);
    }
}
displayBooks();