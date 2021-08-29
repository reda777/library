const books=document.querySelector('.books');
const newB=document.querySelector('.newB button:first-child');
const form=document.querySelector('.newB form');

function Book(title,author,pages,read) {
    this.title=title;
    this.author=author;
    this.pages=pages;
    this.read=read;
}
function displayBook(bookIndex){
    bookObj=JSON.parse(localStorage.getItem(bookIndex));
    /*create book block*/
    const book=document.createElement('div');
    book.setAttribute('id','book'+bookIndex);
    book.setAttribute('class','book');
    /*title div*/
    const titleDiv=document.createElement('div');
    const titleChild1=document.createElement('span');
    const titleChild2=document.createElement('span');
    titleChild1.textContent='Title :';
    titleChild2.textContent=bookObj.title;
    titleDiv.appendChild(titleChild1);
    titleDiv.appendChild(titleChild2);
    /*author div*/
    const authorDiv=document.createElement('div');
    const authorChild1=document.createElement('span');
    const authorChild2=document.createElement('span');
    authorChild1.textContent='Author :';
    authorChild2.textContent=bookObj.author;
    authorDiv.appendChild(authorChild1);
    authorDiv.appendChild(authorChild2);
    /*pages div*/
    const pagesDiv=document.createElement('div');
    const pagesChild1=document.createElement('span');
    const pagesChild2=document.createElement('span');
    pagesChild1.textContent='Num of pages :';
    pagesChild2.textContent=bookObj.pages;
    pagesDiv.appendChild(pagesChild1);
    pagesDiv.appendChild(pagesChild2);
    /*read status*/
    const statusDiv=document.createElement('div');
    const statusChild1=document.createElement('span');
    const statusChild2=document.createElement('span');
    const statusChildToggle=document.createElement('div');
    statusChild1.textContent='Have read :';
    statusChild2.textContent=bookObj.read;
    statusChildToggle.textContent='Tog';
    statusDiv.appendChild(statusChild1);
    statusDiv.appendChild(statusChild2);
    statusDiv.appendChild(statusChildToggle);
    /*delete book button*/
    const remove=document.createElement('div');
    remove.textContent='X';
    remove.addEventListener('click',()=>{
        let deleteBook=document.querySelector('#book'+bookIndex);
        deleteBook.remove();
        localStorage.removeItem(bookIndex);
    });
    /*append children*/
    book.appendChild(remove);
    book.appendChild(titleDiv);
    book.appendChild(authorDiv);
    book.appendChild(pagesDiv);
    book.appendChild(statusDiv);
    books.appendChild(book);
}
/*
function displayAllBooks(){
    books.innerHTML='';
    for(let i in localStorage){
        if (localStorage.hasOwnProperty(i)) {
        newBook=JSON.parse(localStorage.getItem(i));
        const book=document.createElement('div');
        book.setAttribute('id',i);
        book.setAttribute('class','book');
        const title=document.createElement('span');
        const author=document.createElement('span');
        const pages=document.createElement('span');
        const status=document.createElement('span');
        status.setAttribute('class','status');
        const toggle=document.createElement('span');
        const remove=document.createElement('span');
        title.setAttribute('class','title');
        title.textContent='Title :'+newBook.title;
        author.setAttribute('class','author');
        author.textContent='Author :'+newBook.author;
        pages.setAttribute('class','pages');
        pages.textContent='Pages :'+newBook.pages;
        status.textContent=`Read :${(newBook.read)?'yes':'no'}`;
        status.setAttribute('data-index-number',i);
        toggle.textContent='toggle';
        toggle.setAttribute('class','tog');
        toggle.addEventListener('click',()=>{
            (newBook.read)?newBook.read=false:newBook.read=true;
            let status=document.querySelector('.status[data-index-number="'+i+'"]');
            status.textContent=`Read :${(newBook.read)?'yes':'no'}`;
            localStorage.setItem(i,JSON.stringify(newBook));
        });
        remove.textContent='X';
        remove.setAttribute('class','remove');
        remove.setAttribute('data-index-number',i);
        remove.addEventListener('click',()=>{
            let deleteBook=document.querySelector(
                '[data-index-number="'+i+'"]').parentNode;
            deleteBook.remove();
            localStorage.removeItem(i);
        });
        book.appendChild(remove);
        book.appendChild(title);
        book.appendChild(author);
        book.appendChild(pages);
        book.appendChild(status);
        status.appendChild(toggle);
        books.appendChild(book);
    }}
        
}
*/
newB.addEventListener('click',()=>{
    if(newB.textContent==='add book'){
        form.style.display='block';
        newB.textContent='hide form';
    }
    else if(newB.textContent==='hide form'){
        form.style.display='none'; 
        newB.textContent='add book';
    }
});

form.addEventListener('submit', function(event) {
    event.preventDefault();
    let insertBook=new Book(form.elements[0].value,form.elements[1].value
        ,Number(form.elements[2].value)
        ,(form.elements[3].checked)?true:false);
    localStorage.setItem(localStorage.length,JSON.stringify(insertBook));
    displayBook(localStorage.length-1);
});

window.onload=function(){
    let i=0;
    let count=0;
    while(count<localStorage.length){
        if(!localStorage.getItem(i))
            i++;
        else if(localStorage.getItem(i)){
            displayBook(i);
            i++;
            count++;
        }  
    }     
};