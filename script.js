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

/*function addBookToLibrary(title,author,pages,read) {
    myLibrary.push(new Book(title,author,pages,read));
}*/

function displayAllBooks(){
    for(let i of myLibrary){
        displayBook(i);
    }
}
function displayBook(newBook){
    const book=document.createElement('div');
    book.setAttribute('class','book');
    const title=document.createElement('span');
    const author=document.createElement('span');
    const pages=document.createElement('span');
    const status=document.createElement('span');
    const remove=document.createElement('span');
    title.textContent='Title :'+newBook.title;
    author.textContent='Author :'+newBook.author;
    pages.textContent='Pages :'+newBook.pages;
    status.textContent=`Status :${(newBook.read)?"read":"not read yet"}`;
    remove.textContent='X';
    remove.setAttribute('class','remove');
    remove.setAttribute('data-index-number',myLibrary.length-1);
    book.appendChild(title);
    book.appendChild(author);
    book.appendChild(pages);
    book.appendChild(status);
    book.appendChild(remove);
    books.appendChild(book);
}
displayAllBooks();

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
    console.log(form.elements[0].value,form.elements[1].value
        ,form.elements[2].value
        ,(form.elements[3].checked)?form.elements[3].value:form.elements[4].value);
    myLibrary.push(new Book(form.elements[0].value,form.elements[1].value
        ,Number(form.elements[2].value)
        ,(form.elements[3].checked)?true:false));
    displayBook(myLibrary[myLibrary.length-1]);
    /*const remove=document.querySelector('.remove');
    remove.addEventListener('click',removeBook);*/
});
/*function removeBook(){
    console.log(this.dataset.indexNumber);
    delete myLibrary[this.dataset.indexNumber];
    displayAllBooks();
}*/