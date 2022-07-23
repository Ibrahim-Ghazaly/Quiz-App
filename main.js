//select elements
let countQuestion =document.querySelector(".count span");
let QuizArea =document.querySelector(".quiz-area");
let answersArea =document.querySelector(".answers-area");
let submit = document.querySelector(".submit-button");
let bulletsSpans =  document.querySelector(".bullets .spans");
let countdownElement =  document.querySelector(".bullets .countdown");
let results =document.querySelector(".results");
let bullets =document.querySelector(".bullets");




// Set Options
let currentIndex = 0;
let rightAnswers = 0;
let countdownInterval;


function getQuestions(){
    let req = new XMLHttpRequest();
    req.onreadystatechange =function(){
        if(req.readyState === 4 && req.status === 200){
            let request =JSON.parse(req.responseText);
            let reqlength =request.length;

            // Create Bullets + Set Questions Count
            createtBullets(reqlength);

            // Add Question Data
            addQuestions(request[currentIndex],reqlength);

            
              // Start CountDown
              countDown(5,reqlength)
            //  countdown(3, reqlength);
submit.onclick=function(){
    countQuestion.innerHTML--
       // Get Right Answer
    let theRightAnswer =  request[currentIndex].right_answer

        currentIndex++;

     checkAnswers(theRightAnswer)   
     QuizArea.innerHTML = "";
     answersArea.innerHTML = "";

         // Add Question Data
      addQuestions(request[currentIndex],reqlength);

      //hanle bullets

      handleBullets()
      // clear interval before submit
      clearInterval(countdownInterval)
     // Start CountDown
      countDown(5,reqlength)

      // show results

      showResults(reqlength)
    }
 
  }
    }

    
 req.open("GET", "data.json", true);
 req.send();
}

getQuestions()

function  createtBullets(num){

    countQuestion.innerHTML = num;

    for(let i = 0 ; i<num;i++){
        let span = document.createElement("span");
        bulletsSpans.appendChild(span);
        if(i === 0){
            span.className="on"
        }

    }
}

function addQuestions(obj,num){
    if (currentIndex < num) {
  let h2 = document.createElement("h2");
   h2.textContent = obj.title;
   QuizArea.appendChild(h2);

let keys = Object.keys(obj);
let values = Object.values(obj);

for(let i =1 ;i<keys.length-1;i++){
    
  let div = document.createElement("div");
  div.className="answer";

  let input = document.createElement("input");
  input.type="radio";
  input.id=keys[i];
  input.name="question";
  input.dataset.answer =values[i];
  
    // Make First Option Selected
    if (i === 1) {
        input.checked = true;
      }

  let label = document.createElement("label");
  label.setAttribute("for",keys[i]);
  label.textContent =values[i];
  answersArea.appendChild(div)
  div.appendChild(input);
  div.appendChild(label);

}
    }
    console.log(obj)
}

//check answers 

function checkAnswers(rightAnswer){
  let question = document.getElementsByName("question");
  let chooseanswer;
for(let i =0;i<question.length;i++) {
    if(question[i].checked){
        chooseanswer = question[i].dataset.answer;
     }
   }

   if(rightAnswer === chooseanswer){
   
    rightAnswers++;
 
   }
}


// handle bullets

function handleBullets(){
  let span = Array.from(bulletsSpans.children) 
 span.forEach((element,index) => {
    if(currentIndex == index){
      element.className="on"
    }
 });
}

// showResults

function showResults(num) {
  let theResults;
  if (currentIndex === num) {
    QuizArea.remove();
    answersArea.remove();
    submit.remove();
    bullets.remove();

    if (rightAnswers > num / 2 && rightAnswers < num) {
      theResults = `<span class="good">Good</span>, ${rightAnswers} From ${num}`;
    } else if (rightAnswers === num) {
      theResults = `<span class="perfect">Perfect</span>, ${rightAnswers} From ${num}`;
    } else {
      theResults = `<span class="bad">Bad</span>, ${rightAnswers} From ${num}`;
    }

    results.innerHTML= theResults;
    results.style.padding = "10px";
    results.style.backgroundColor = "white";
    results.style.marginTop = "10px";
  }
}

// make a countdown function

function countDown(duration,num){
    if(currentIndex < num){

        let minutes,seconds
        countdownInterval =  setInterval(() => {
           minutes =parseInt(duration /60) ;
           seconds =parseInt(duration % 60) ; 

           minutes = minutes < 10 ? `0${minutes}` : minutes;
           seconds = seconds < 10 ? `0${seconds}` : seconds;

           countdownElement.innerHTML=`${minutes} ${seconds}`
            --duration;
            if(duration < 0){
                clearInterval(countdownInterval)
                submit.click()
            }
        }, 1000);

    }
  

}