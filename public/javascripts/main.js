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
    console.log('Script loaded!')
    
    saveUserInfo();
    findUser();
    let deleteButton = document.getElementById('delete-user');
    let displayData = document.getElementById('display-data')
    deleteUser();
    let foundUser = 0;


    function findUser() {
        let searchButton = document.getElementById('search');
        let searchName = document.getElementById('search-name');
        searchButton.addEventListener('click', function() {
            let username = searchName.value
            fetch('http://localhost:3000/user/'+username)
            .then(response => response.json())
            .then(data => {
                foundUser = data.name;
                console.log(data)
                displayData.innerHTML = 'Name: '+data.name;

                for (let i = 0; i < data.todos.length; i++) {
                    var button = document.createElement('button');
                    button.innerHTML = data.todos[i];
                    button.username = username;
                    button.className = 'delete-task';
                    button.addEventListener('click',deleteTodos);
                    displayData.appendChild(button);
                }

                if(data != undefined) {
                    deleteButton.hidden = false;
                }
            })
        });
    }

    function deleteTodos() {
        let userData = {
            name: this.username,
            todo: this.innerHTML
        }
        fetch('http://localhost:3000/user/', {
            method: 'PUT',
            headers: {
                'Content-type': 'application/json'
               },
            body: JSON.stringify(userData)
        })
        .then(response => response.json())
        .then(data => {
           console.log(data)
            if(data=='Task deleted') {
                this.remove();
            }
        });
    }


    function deleteUser() {
        deleteButton.addEventListener('click', function() {
            fetch('http://localhost:3000/user/'+foundUser, {
                method: 'DELETE',
                headers: {
                    'Content-type': 'application/json'
                   },
            }).then(response => response.json())
                .then(data => {
                console.log(data)
                deleteButton.hidden = true;
                displayData.innerHTML = ''
          });
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
            .then(response => response.json())
            .then(data => {
                console.log(data);
            })
        });
    }
}

