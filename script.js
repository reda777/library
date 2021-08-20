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
    status.setAttribute('class','status');
    const toggle=document.createElement('span');
    const remove=document.createElement('span');
    title.textContent='Title :'+newBook.title;
    author.textContent='Author :'+newBook.author;
    pages.textContent='Pages :'+newBook.pages;
    status.textContent=`Read :${(newBook.read)?"yes":"no"}`;
    status.setAttribute('data-index-number',myLibrary.indexOf(newBook));
    toggle.textContent='toggle';
    toggle.setAttribute('id','tog');
    toggle.addEventListener('click',()=>{toggleRead(newBook);});
    remove.textContent='X';
    remove.setAttribute('data-index-number',myLibrary.indexOf(newBook));
    remove.addEventListener('click',removeBook);
    book.appendChild(title);
    book.appendChild(author);
    book.appendChild(pages);
    book.appendChild(status);
    book.appendChild(toggle);
    book.appendChild(remove);
    books.appendChild(book);
}
function toggleRead(bookToggle){
    (bookToggle.read)?bookToggle.read=false:bookToggle.read=true;
    console.log(myLibrary.indexOf(bookToggle));
    const status=document.querySelector('.status[data-index-number="'+myLibrary.indexOf(bookToggle)+'"]');
    status.textContent=`Read :${(bookToggle.read)?"yes":"no"}`;;
    console.log('clicked',bookToggle.read);
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

form.addEventListener('submit', function(event) {
    event.preventDefault();
    let insertBook=new Book(form.elements[0].value,form.elements[1].value
        ,Number(form.elements[2].value)
        ,(form.elements[3].checked)?true:false);
    myLibrary.push(insertBook);
    displayBook(insertBook);
});
function removeBook(){
    const deleteBook=document.querySelector(
        '[data-index-number="'+this.dataset.indexNumber+'"]').parentNode;
    deleteBook.remove();
    delete myLibrary[this.dataset.indexNumber];
}