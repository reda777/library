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

function displayBook(newBook){
    const book=document.createElement('div');
    book.setAttribute('id',myLibrary.indexOf(newBook));
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
    remove.setAttribute('data-index-number',myLibrary.indexOf(newBook));
    remove.addEventListener('click',removeBook);
    book.appendChild(title);
    book.appendChild(author);
    book.appendChild(pages);
    book.appendChild(status);
    book.appendChild(remove);
    books.appendChild(book);
}
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
    let insertBook=new Book(form.elements[0].value,form.elements[1].value
        ,Number(form.elements[2].value)
        ,(form.elements[3].checked)?true:false);
    myLibrary.push(insertBook);
    displayBook(insertBook);
});
function removeBook(){
    const deleteBook=document.querySelector('[data-index-number="'+this.dataset.indexNumber+'"]').parentNode;
    console.log(this.dataset.indexNumber);
    deleteBook.remove();
    delete myLibrary[this.dataset.indexNumber];
}