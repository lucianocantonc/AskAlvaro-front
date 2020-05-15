$(document).ready(() => {
    getQuestions(); 
    $("#summit").click(() => {
        
        registerQuestion()
    })
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
    var html = "";
    for(var i=0, row; row = rows[i]; i++){
        html += `
        <article>
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


    const question = {
        question: document.getElementById("question-textarea").value,
        project: $('input[name="options"]:checked').val(),   
        name: "testadore",
    }
    
    // console.log(question)
    
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