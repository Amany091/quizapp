

let displayContainer = document.querySelector(".display"),
    deleteBtn = document.querySelector(".display #displayData .btn"),
    delay = document.querySelector(".time-delay"),
    count = document.querySelector(".length");

let questions = []

/* display Questions for review => display Questions Button */ 

const info = async () => {
    await fetch("http://localhost:3000/questions", {
        method: "GET",
        headers: { "content-type" : "application.json" }
    })
        .then((response) => response.json())
        .then(data => questions = data)
    
    
    questions.map((item) => {
        
        let data = ` <div data-column="question" data-order="desc" id="displayData" key = ${item.id} >
       <p class="fw-bold"> id: <span class="text-dark"> ${item.id} </span> </p>
       <p class= "fw-bold"> Question: <span > ${item.question} </span></p>
       <p class= "fw-bold choices "> Choices: ${item.choices.map((val) => val ? `<span class="text-primary" > ${val.value} </span>` : "Not Found")}  <span > </span></p >
       <p class= "fw-bold"> Answer: <span > ${item.answer} </span></p>
       <p class= "fw-bold text-danger d-block"> Time Delay: <span class="text-danger time d-inline"> ${item.timeDelay} </span></p>
       <button class="btn btn-danger btn-sm" onclick="deleteEl(${item.id})"> Delete </button>
       </div> `;
        displayContainer.innerHTML += data;
    })
    count.innerHTML = `No Of Questions: ${questions.length}`
}

// delete question by id 
async function deleteEl(id) {
    try {
        await fetch(`http://localhost:3000/questions/${id}/?_delay=100`, {
        method: "DELETE",
        headers: {"content-type": "application/json; charset = UTF-8"}
        }).then((response) => response.json())
        console.log(id);
    } catch (error) {
        alert(error)
        return questions;
    }
    
}

window.addEventListener("DOMContentLoaded", () => {
    // Display the information of all items on load
    info();
})
