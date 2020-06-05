$(document).ready(() => {

    firebase.auth().onAuthStateChanged((user) => {
        if(user){
            // console.log("hay un usuario logado")
            //console.log(user)
            $("#hellouser").html("Hello, " + user.displayName)
            $("#admin-photo").attr("src", user.photoURL)
            getQuestions(); 
            $("#summit").click(() => {registerQuestion()})
        }else{
            console.log("no hay nadieSSSSS")
            userLogin();
        }
    });
      

    
    
});

function getQuestions(){
    $.ajax({
        type: "GET",
        url: "https://askalvaro.rj.r.appspot.com/index",
        success: (response) => {
            $("#questions-wrapper").html("");
            displayQuestions(response);

        },
        error: (e) => {
            console.log("ERROR : ", e);
        }
    });
}

function displayQuestions(rows){
    // var user = firebase.auth().currentUser;
    // var displayphoto = user.photoURL;
    var html = "";
    for(var i=0, row; row = rows[i]; i++){
        html += `  
        <article>
        <img class="photo" src="${row.photo}" />
            <div class="project">
                ${row.project}
            </div>
            <div class="question">
                ${row.question}
            </div>
            <div class="user"> 
                ${row.name}
            </div>     
        </article>  `;
    }
    
    $("#questions-wrapper").html(html);
}

function registerQuestion(){  
    var user = firebase.auth().currentUser;
    var nameDisplay = user.displayName;
    var photoLink = user.photoURL;

    const question = {
        question: document.getElementById("question-textarea").value,
        project: $('input[name="options"]:checked').val(),   
        name: nameDisplay,
        photo: photoLink,
    }
    
    //console.log(question)
    
    $.ajax({
        type: "POST",
        url: "https://askalvaro.rj.r.appspot.com/register",
        headers: {
            "Content-Type": "application/json"
        },
        data: JSON.stringify(question),
        success: (response) => {
            console.log(response)
            $("#question-textarea").val(" ")
            getQuestions()
        },
        error: (e) => {
            console.log("ERROR : ", e);
        }

        
      });
    
}

function userLogin(){
    var provider = new firebase.auth.GoogleAuthProvider();

    firebase.auth().signInWithRedirect(provider);
    
    firebase.auth().getRedirectResult().then(function(result) {
        if (result.credential) {
            // This gives you a Google Access Token. You can use it to access the Google API.
            var token = result.credential.accessToken;
            // ...
        }
        // The signed-in user info.
        var user = result.user;
        console.log("Signed!")
        console.log(user)
    
    }).catch(function(error) {
    // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        // ...
        console.log(error)
    });
}

function signOut(){
    firebase.auth().signOut().then(function() {
        // Sign-out successful.
    }).catch(function(error) {
        // An error happened.
    });
}