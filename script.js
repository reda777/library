const books=document.querySelector('.books');
const button=document.querySelector('.addBook button');
const closeAdd=document.querySelector('#closeAdd');
const form=document.querySelector('.content form');
const overlay=document.querySelector('.overlay');

function Book(title,author,pages,read) {
    this.title=title;
    this.author=author;
    this.pages=pages;
    this.read=read;
}
function displayBook(bookIndex){
    let bookObj=JSON.parse(localStorage.getItem(bookIndex));
    /*create book block*/
    const book=document.createElement('div');
    book.setAttribute('id','book'+bookIndex);
    book.setAttribute('class','book');
    /*title div*/
    const titleDiv=document.createElement('div');
    const titleChild1=document.createElement('span');
    titleChild1.setAttribute('class','child1');
    const titleChild2=document.createElement('span');
    titleChild1.textContent='Title :';
    titleChild2.textContent=bookObj.title;
    titleDiv.appendChild(titleChild1);
    titleDiv.appendChild(titleChild2);
    /*author div*/
    const authorDiv=document.createElement('div');
    const authorChild1=document.createElement('span');
    authorChild1.setAttribute('class','child1');
    const authorChild2=document.createElement('span');
    authorChild1.textContent='Author :';
    authorChild2.textContent=bookObj.author;
    authorDiv.appendChild(authorChild1);
    authorDiv.appendChild(authorChild2);
    /*pages div*/
    const pagesDiv=document.createElement('div');
    const pagesChild1=document.createElement('span');
    pagesChild1.setAttribute('class','child1');
    const pagesChild2=document.createElement('span');
    pagesChild1.textContent='Num of pages :';
    pagesChild2.textContent=bookObj.pages;
    pagesDiv.appendChild(pagesChild1);
    pagesDiv.appendChild(pagesChild2);
    /*read status*/
    const statusDiv=document.createElement('div');
    const statusChild1=document.createElement('span');
    statusChild1.setAttribute('class','child1');
    const statusChild2=document.createElement('span');
    const statusChildToggle=document.createElement('div');
    statusChild1.textContent='Have read :';
    statusChild2.textContent=`${(bookObj.read)?'yes':'no'}`;
    statusChildToggle.textContent='Tog';
    statusChildToggle.addEventListener('click',()=>{
        (bookObj.read)?bookObj.read=false:bookObj.read=true;
        statusChild2.textContent=`${(bookObj.read)?'yes':'no'}`;
        localStorage.setItem(bookIndex,JSON.stringify(bookObj));
    });
    statusDiv.appendChild(statusChild1);
    statusDiv.appendChild(statusChild2);
    statusDiv.appendChild(statusChildToggle);
    /*edit button*/
    const dropDownDiv=document.createElement('div');
    dropDownDiv.setAttribute('class','dropdown');
    const dropDownButton=document.createElement('span');
    const dropDownImg=document.createElement('img');
    dropDownImg.setAttribute('src','images/icon.svg');
    const dropDownContent=document.createElement('div');
    dropDownContent.setAttribute('class','dropcontent');
    const editButton=document.createElement('span');
    editButton.textContent='Edit';
    const deleteButton=document.createElement('span');
    deleteButton.textContent='Delete';
    dropDownButton.appendChild(dropDownImg);
    dropDownContent.appendChild(editButton);
    dropDownContent.appendChild(deleteButton);
    dropDownDiv.appendChild(dropDownButton);
    dropDownDiv.appendChild(dropDownContent);
    dropDownButton.addEventListener('click',()=>{
        let compStyle=window.getComputedStyle(dropDownContent).display;
        if(compStyle==='flex')
            dropDownContent.style.display='none';
        if(compStyle==='none')
            dropDownContent.style.display='flex';
    });
    deleteButton.addEventListener('click',()=>{
        let deleteBook=document.querySelector('#book'+bookIndex);
        deleteBook.remove();
        localStorage.removeItem(bookIndex);
    });
    /*delete book button
    const remove=document.createElement('div');
    remove.textContent='X';
    remove.addEventListener('click',()=>{
        let deleteBook=document.querySelector('#book'+bookIndex);
        deleteBook.remove();
        localStorage.removeItem(bookIndex);
    });*/
    /*append children*/
    book.appendChild(dropDownDiv);
    book.appendChild(titleDiv);
    book.appendChild(authorDiv);
    book.appendChild(pagesDiv);
    book.appendChild(statusDiv);
    books.appendChild(book);
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
    event.preventDefault();
    let insertBook=new Book(form.elements[0].value,form.elements[1].value
        ,Number(form.elements[2].value)
        ,(form.elements[3].checked)?true:false);
    localStorage.setItem(localStorage.length,JSON.stringify(insertBook));
    displayBook(localStorage.length-1);
    overlay.style.display = "none";
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
window.addEventListener('click', function(e) {
    var content=document.querySelector('.dropcontent');
    if (e.target != document.querySelector('.dropdown>span')) {
        content.style.display = 'none';
    }
});