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
    console.log('Script loaded!')

}

function saveUserInfo() {
    let saveButton = document.getElementById('submit-data');
    let inputName = document.getElementById('input-name');
    let inputTask = document.getElementById('input-task');

    let userdata = {
        name: inputName.value,
        todos: inputTask.value

    }
    saveButton.addEventListener('click', function() {
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