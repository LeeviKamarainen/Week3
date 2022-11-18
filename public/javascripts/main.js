if(document.readyState !== "loading"){
    console.log("Document is ready");
    initializeCode();
} else {
    document.addEventListener("DOMContentLoaded", function(){
        console.log("Document ready after waiting!");
        initializeCode();
    })
}


function initializeCode() {
    saveUserInfo();
    findUser();
    console.log('Script loaded!')

}


function findUser() {
    let searchButton = document.getElementById('search');
    let searchName = document.getElementById('search-name');
    searchButton.addEventListener('click', function() {
        let username = searchName.value
        fetch('http://localhost:3000/user/'+username)
        .then(response => response)
        .then(data => {
            console.log(data);
        })
    });


}

function saveUserInfo() {
    let saveButton = document.getElementById('submit-data');
    let inputName = document.getElementById('input-name');
    let inputTask = document.getElementById('input-task');

    
    saveButton.addEventListener('click', function() {
        let userdata = {
            name: inputName.value,
            todos: [inputTask.value]
    
        }
        fetch('http://localhost:3000/todo', {
            method: "post",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(userdata)
        })
        .then(response => response)
        .then(data => {
            console.log(data);
        })
    });
}