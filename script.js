const books=document.querySelector('.books');
const button=document.querySelector('.addBook button');
const closeAdd=document.querySelector('#closeAdd');
const form=document.querySelector('.content form');
const overlay=document.querySelector('.overlay');

class Book{
    constructor(title,author,pages,read){
        this.title=title;
        this.author=author;
        this.pages=pages;
        this.read=read;
    }
}   
function displayBook(bookIndex){
    let bookObj=JSON.parse(localStorage.getItem(bookIndex));
    /*create book border div*/
    const bookBorder=document.createElement('div');
    bookBorder.setAttribute('class','book-border');
    /*create book block*/
    const book=document.createElement('div');
    book.setAttribute('id','book'+bookIndex);
    book.setAttribute('class','book');
    /*title div*/
    const titleDiv=document.createElement('div');
    titleDiv.setAttribute('class','titleDiv');
    const titleChild1=document.createElement('span');
    titleChild1.setAttribute('class','child1');
    const titleChild2=document.createElement('span');
    titleChild1.textContent='Title :';
    titleChild2.textContent=bookObj.title;
    titleDiv.appendChild(titleChild1);
    titleDiv.appendChild(titleChild2);
    /*author div*/
    const authorDiv=document.createElement('div');
    authorDiv.setAttribute('class','authorDiv');
    const authorChild1=document.createElement('span');
    authorChild1.setAttribute('class','child1');
    const authorChild2=document.createElement('span');
    authorChild1.textContent='Author :';
    authorChild2.textContent=bookObj.author;
    authorDiv.appendChild(authorChild1);
    authorDiv.appendChild(authorChild2);
    /*pages div*/
    const pagesDiv=document.createElement('div');
    pagesDiv.setAttribute('class','pagesDiv');
    const pagesChild1=document.createElement('span');
    pagesChild1.setAttribute('class','child1');
    const pagesChild2=document.createElement('span');
    pagesChild1.textContent='N° Pages :';
    pagesChild2.textContent=bookObj.pages;
    pagesDiv.appendChild(pagesChild1);
    pagesDiv.appendChild(pagesChild2);
    /*read status*/
    const statusDiv=document.createElement('div');
    statusDiv.setAttribute('class','statusDiv');
    const statusChild1=document.createElement('span');
    statusChild1.setAttribute('class','child1');
    const statusChild2=document.createElement('span');
    statusChild1.textContent='Have read :';
    statusChild2.textContent=`${(bookObj.read)?'yes':'no'}`;
    statusDiv.appendChild(statusChild1);
    statusDiv.appendChild(statusChild2);
    /*edit button*/
    const dropDownDiv=document.createElement('div');
    dropDownDiv.setAttribute('class','dropdown');
    const dropDownButton=document.createElement('span');
    dropDownButton.setAttribute('class','dropdown-button');
    const dropDownImg=document.createElement('img');
    dropDownImg.setAttribute('src','images/icon.svg');
    const saveEdit=document.createElement('span');
    saveEdit.setAttribute('class','saveButton');
    saveEdit.textContent='save';
    const dropDownContent=document.createElement('div');
    dropDownContent.setAttribute('class','dropcontent');
    const editButton=document.createElement('span');
    editButton.textContent='Edit';
    const deleteButton=document.createElement('span');
    deleteButton.textContent='Delete';
    dropDownButton.appendChild(dropDownImg);
    dropDownContent.appendChild(editButton);
    dropDownContent.appendChild(deleteButton);
    dropDownButton.appendChild(dropDownContent);
    dropDownDiv.appendChild(saveEdit);
    dropDownDiv.appendChild(dropDownButton);
    dropDownButton.addEventListener('click',()=>{
        const compStyle=window.getComputedStyle(dropDownContent).display;
        if(compStyle==='flex')
            dropDownContent.style.display='none';
        if(compStyle==='none')
            dropDownContent.style.display='flex';
    });
    editButton.addEventListener('click',()=>{
        const editBook=document.querySelector('#book'+bookIndex);
        editBook.querySelector('.dropdown').setAttribute('style','justify-content: space-between;');
        editBook.querySelector('.saveButton').style.display='block';
        /*title*/
        const editTitle=editBook.querySelector('.titleDiv span:last-child');
        editTitle.textContent='';
        const inputTitle=document.createElement('input');
        inputTitle.setAttribute('type','text');
        inputTitle.value=bookObj.title;
        editTitle.appendChild(inputTitle);
        /*author*/
        const editAuthor=editBook.querySelector('.authorDiv span:last-child');
        editAuthor.textContent='';
        const inputAuthor=document.createElement('input');
        inputAuthor.setAttribute('type','text');
        inputAuthor.value=bookObj.author;
        editAuthor.appendChild(inputAuthor);
        /*pages*/
        const editPages=editBook.querySelector('.pagesDiv span:last-child');
        editPages.textContent='';
        const inputPages=document.createElement('input');
        inputPages.setAttribute('type','text');
        inputPages.value=bookObj.pages;
        editPages.appendChild(inputPages);
        /*yes no*/
        const editStatus=editBook.querySelector('.statusDiv span:last-child');
        const label1=document.createElement('label');
        const label2=document.createElement('label');
        const input1=document.createElement('input');
        const input2=document.createElement('input');
        label1.textContent='yes';
        label2.textContent='no';
        input1.setAttribute('type','radio');
        input2.setAttribute('type','radio');
        input1.setAttribute('name','editedStatus'+bookIndex);
        input2.setAttribute('name','editedStatus'+bookIndex);
        input1.setAttribute('value','true');
        input2.setAttribute('value','false');
        if(bookObj.read)
            input1.checked=true;
        else
            input2.checked=true;
        editStatus.textContent='';
        label1.appendChild(input1);
        label2.appendChild(input2);
        editStatus.appendChild(label1);
        editStatus.appendChild(label2);
    });
    deleteButton.addEventListener('click',()=>{
        const deleteBook=document.querySelector('#book'+bookIndex).parentNode;
        deleteBook.remove();
        localStorage.removeItem(bookIndex);
        if(localStorage.length===0){
            books.setAttribute('class','books books-empty');
            document.querySelector('.empty-page').removeAttribute('style');
        }
        updateStats();
    });
    saveEdit.addEventListener('click',()=>{
        const saveBook=document.querySelector('#book'+bookIndex);
        let insertBook=new Book(saveBook.getElementsByTagName("input")[0].value,saveBook.getElementsByTagName("input")[1].value
            ,Number(saveBook.getElementsByTagName("input")[2].value)
            ,(saveBook.getElementsByTagName("input")[3].checked)?true:false);
        localStorage.setItem(bookIndex,JSON.stringify(insertBook));
        books.innerHTML='';
        displayAllBooks();
        updateStats();
    });
    /*append children*/
    book.appendChild(dropDownDiv);
    book.appendChild(titleDiv);
    book.appendChild(authorDiv);
    book.appendChild(pagesDiv);
    book.appendChild(statusDiv);
    bookBorder.appendChild(book);
    books.appendChild(bookBorder);
}
/*show stats*/
function updateStats(){
    const liSelect=document.querySelectorAll('.stats ul li')
    if(liSelect){
        liSelect.forEach(element =>{
            element.remove();
        });
    }
    const stats=document.querySelector('.stats ul');
    /*all books*/
    const li=document.createElement('li');
    li.textContent=`All (${ localStorage.length })`;
    li.addEventListener('click',()=>{
        books.innerHTML='';
        displayAllBooks();
    });
    stats.appendChild(li);
    /*to read*/
    const li1=document.createElement('li');
    li1.textContent=`To read (${ localStorage.length-readBooksCount()})`;
    li1.addEventListener('click',()=>{
        books.innerHTML='';
        displayNotReadBooks();
    });
    stats.appendChild(li1);
    /*have read*/
    const li2=document.createElement('li');
    li2.textContent=`Have read (${readBooksCount()})`;
    li2.addEventListener('click',()=>{
        books.innerHTML='';
        displayReadBooks();
    });
    stats.appendChild(li2);
}
/*hide/show form*/
button.addEventListener('click',()=>{
    overlay.style.display = "flex";
});
closeAdd.addEventListener('click',()=>{
    overlay.style.display = "none";
});
/*submit button*/
form.addEventListener('submit', function(event) {
    if(localStorage.length===0)
        document.querySelector('.empty-page').style.display='none';
    event.preventDefault();
    let insertBook=new Book(form.elements[0].value,form.elements[1].value
        ,Number(form.elements[2].value)
        ,(form.elements[3].checked)?true:false);
    localStorage.setItem(localStorageFullLength(),JSON.stringify(insertBook));
    books.setAttribute('class','books');
    displayBook(localStorageFullLength()-1);
    overlay.style.display = 'none';
    updateStats();
});
function readBooksCount(){
    let i=0,
        count=0,
        readCount=0;
    while(count<localStorage.length){
        if(!localStorage.getItem(i))
            i++;
        else if(localStorage.getItem(i)){
            let temp=JSON.parse(localStorage.getItem(i));
            if(temp.read)
                readCount++;
            i++;
            count++;
        }  
    }
    return readCount;
};
function localStorageFullLength(){
    let i=0,
        count=0;
    while(count<localStorage.length){
        if(!localStorage.getItem(i))
            i++;
        else if(localStorage.getItem(i)){
            i++;
            count++;
        }  
    }
    return i;  
};
function displayAllBooks(){
    let i=0;
    let count=0;
    if(localStorage.length>0){
        const emptyPage=document.querySelector('.empty-page')
        if(emptyPage!= null)
            emptyPage.style.display='none';
    }  
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
function displayNotReadBooks(){
    let i=0,
        count=0,
        readCount=0;
    while(count<localStorage.length){
        if(!localStorage.getItem(i))
            i++;
        else if(localStorage.getItem(i)){
            let temp=JSON.parse(localStorage.getItem(i));
            if(!temp.read)
                displayBook(i);
            i++;
            count++;
        }  
    }
    return readCount;
};
function displayReadBooks(){
    let i=0,
        count=0,
        readCount=0;
    while(count<localStorage.length){
        if(!localStorage.getItem(i))
            i++;
        else if(localStorage.getItem(i)){
            let temp=JSON.parse(localStorage.getItem(i));
            if(temp.read)
                displayBook(i);
            i++;
            count++;
        }  
    }
    return readCount;
};
window.onload=function(){
    displayAllBooks();
    updateStats();
    if(localStorage.length===0){
        books.setAttribute('class','books books-empty');
    }
};
window.addEventListener('click', function(e) {
    const allBooks=document.querySelectorAll('.book');
    allBooks.forEach(element => {
        let content=element.querySelector('.dropcontent');
        if (e.target != element.querySelector('.dropdown img')) {
            content.style.display = 'none';
        }
    });
});