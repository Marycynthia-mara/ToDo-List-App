// SELECT ELEMENTS


// this selects the clear icon by it's className 'clear'
//i noted that this selects only the first element with this className, in this case there is just one element with this className, if there are multiple element with this className an i wish to get all these elements i will use querySelectorAll instead which will return an array of all the elements with the className 'clear'

const clear = document.querySelector('.clear');

// selects the element with the unique id 'date'
const dateElement = document.getElementById('date');


// selects the element with the unique id 'list'
const list = document.getElementById('list');

// selects the element with the unique id 'input'
const input = document.getElementById('input');

// selects the element with the unique id 'addBtn'
const addBtn = document.getElementById('addBtn');

// get item from local storage 
let data = localStorage.getItem("TODO");


// CSS CLASS NAMES -- added dynamically to list items

const CHECK = "fa-check-circle";
const UNCHECK = "fa-circle-thin";
const LINE_THROUGH = "lineThrough";



// TODAYS DATE

const dateOptions = {weekday:'long', month:'short', day:'numeric'}
const today = new Date();
dateElement.innerHTML = today.toLocaleDateString('en-US', dateOptions);



// VARIABLES

let LIST, id;



// ADD A TODO


// this function is called whenever the user hit the enter key on the keyboard or onclick of the add icon
function addToDo(toDo, id, done, trash){

    // here if the trash property is set to true the function will execute the return statement, preventing the rest of the code blocks in the  function
    if (trash) {
        return;
    }

    const DONE = done ? CHECK : UNCHECK;
    const LINE = done ? LINE_THROUGH : "";

    // insertAdjacentHTML() -- this a javascript inbuilt method that allow us to add element(s) into a given element in this case is the list, it takes the position argument -- which could be (beforebegin, afterbegin, beforeend, and afterend) of the specified element and the text argument -- which could be any valid html element(s) text...

    // innerHTML is not suitable here because it will overide all that is in the specified element

    const position = "beforeend";

    //using template literal and placeholder
    const text =  `<li class="item">
                    <i class="fa ${DONE} co" job="complete" id="${id}"></i>
                    <p class="text ${LINE}">${toDo}</p>
                    <i  class="fa fa-edit ed" job="edit" id="${id}"></i>
                    <i  class="fa fa-trash-o de" job="delete" id="${id}"></i>
                </li>`;
    

    list.insertAdjacentHTML(position, text); 

}

// COMPLETE TO DO

function completeToDo(element) {
        element.classList.toggle(CHECK);
        element.classList.toggle(UNCHECK);
        element.parentNode.querySelector(".text").classList.toggle(LINE_THROUGH);

        LIST[element.id].done =  LIST[element.id].done ? false : true;
    
}

// REMOVE TO DO

function removeToDo(element){
    // console.log(element);
    if (confirm('Do you want to delete this list')) {
        element.parentNode.parentNode.removeChild(element.parentNode);
        LIST[element.id].trash = true;
    }
}


// EDIT TO DO

function editToDo(element){
    if (confirm('Do you want to edit this list')) {

        // this store the value entered by the user in the input field
        const toDo = prompt('Edit todo here');
        
        // checks if toDo is empty (todo in the if statement will automatically return false if it's empty but if not empty the code block executes)
        if (toDo) {
            // console.log(element.id);
            LIST[element.id].name = toDo;

            // add item to localstorage
            localStorage.setItem("TODO",JSON.stringify(LIST));
            LIST= JSON.parse(localStorage.getItem("TODO"));
            location.reload();

        }
    }
    
}


// checks if data is not empty
if(data){
    LIST= JSON.parse(data);
    id = parseInt(LIST.length); //sets the id to the last one in the list
    // console.log(id);
    loadList(LIST); //load the list to the user
}else{
    // this block executes if data is empty
    LIST = [];
    id = 0;
}


// LOAD TODO
function loadList(array){
    array.forEach(function(item) {
        addToDo(item.name, item.id, item.done, item.trash)
    });
}


// EVENT LISTENERS


// this handles the keyup event if the user hits the enter key on the keyboard 
document.addEventListener('keyup', function (event) {
    if (event.keyCode == 13) {
        console.log(id);
        // this store the value entered by the user in the input field
        const toDo = input.value;
        
        // checks if toDo is empty (todo in the if statement will automatically return false if it's empty but if not empty the code block executes)
        if (toDo) {
            
            // calls the function addToDo
            // the first argument contains the value of the input, the second contains the id of the todo, the third contains the value of the done, and the last contains the value of the trash
            addToDo(toDo, id, false, false);
            LIST.push(
                {
                    name: toDo,
                    id: id,
                    done: false,
                    trash : false
                }
            );

            // add item to localstorage
            localStorage.setItem("TODO",JSON.stringify(LIST));

            id++;
        }
        input.value = "";  // sets toDo to an empty string there by clearing the input field
        
    }
});


// this handles the onclick event if the user clicks the add icon
addBtn.addEventListener('click', function (event) {

        // this store the value entered by the user in the input field
        const toDo = input.value;
        
        // checks if toDo is empty (todo in the if statement will automatically return false if it's empty but if not empty the code block executes)
        if (toDo) {
            
            // calls the function addToDo
            // the first argument contains the value of the input, the second contains the id of the todo, the third contains the value of the done, and the last contains the value of the trash
            addToDo(toDo, id, false, false);
            LIST.push(
                {
                    name: toDo,
                    id: id,
                    done: false,
                    trash : false
                }
            );

            // add item to localstorage
            localStorage.setItem("TODO",JSON.stringify(LIST));

            id++;
        }
        input.value = "";  // sets toDo to an empty string there by clearing the input field
        
});


// handles all the clicked element in a list
list.addEventListener('click', function (event) {
        let element = event.target; // returns the clicked element inside list
        const elementJob= element.attributes.job.value; //gets the job attribute of the clicked element

        if (elementJob == 'complete') {
            completeToDo(element);
            
        } else if (elementJob == 'delete'){
            removeToDo(element);
        }

        else if (elementJob == 'edit'){
            editToDo(element);
        }
                    
        // add item to localstorage
        localStorage.setItem("TODO",JSON.stringify(LIST));
});


// clear localstorage
clear.addEventListener("click", function (event) {
    localStorage.clear();
    location.reload();
})
