$(document).ready(() => {
    getQuestions() 
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