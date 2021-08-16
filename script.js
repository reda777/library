let myLibrary = [];
const books=document.querySelector('.books');
const newB=document.querySelector('.newB button:first-child');
const form=document.querySelector('.newB form');
function Book(title,author,pages,read) {
    this.title=title;
    this.author=author;
    this.pages=pages;
    this.read=read;
    this.info=function(){
        return `${title} 
        by ${author}, 
        ${pages} pages, 
        ${(read)?"read":"not read yet"}`;
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
        const title=document.createElement('span');
        const author=document.createElement('span');
        const pages=document.createElement('span');
        const status=document.createElement('span');
        title.textContent='Title :'+i.title;
        author.textContent='Author :'+i.author;
        pages.textContent='Pages :'+i.pages;
        status.textContent=`Status :${(i.read)?"read":"not read yet"}`;
        book.appendChild(title);
        book.appendChild(author);
        book.appendChild(pages);
        book.appendChild(status);
        books.appendChild(book);
    }
}
displayBooks();
function showForm(){
    if(newB.textContent==='add book'){
        form.style.display='block';
        newB.textContent='hide form';
    }
    else if(newB.textContent==='hide form'){
        form.style.display='none'; 
        newB.textContent='add book';
    }
}
newB.addEventListener('click',showForm);
form.addEventListener("submit", function(event) {
    event.preventDefault();
    console.log("Saving value", form.elements[0].value);
});