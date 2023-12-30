// typecontent ke p ke andar hm apne paragrahs ko load kra rhe h
let type_content = document.querySelector('.type_content p');
//whatever we are typing , thier values stores here
let input = document.getElementById('typeValue');
let resetBtn = document.querySelector('.bottom_part button');
let soundBtn = document.querySelector('.sound input');
//created a var of name letterindex in which we pas is typing =0 nd jo b istyping ki value hogi vomistakes k equal kr di h 
let letterIndex = (mistakes = isTyping = 0);
let time;
let t_left = document.querySelector('.t-left');
let error = document.querySelector('.error');
let wpm = document.querySelector('.wpm');
let cpm = document.querySelector('.cpm');
let maxTime = 60;
let timeleft = maxTime;

let correctType = new Audio('type.mp3');
let IncorrectType = new Audio('wrong.mp3');


const playSound = () =>{
    correctType.pause();
    IncorrectType.pause();
}

soundBtn.addEventListener('click', ()=>{
    playSound();
})

//define the loadPera function : writing this function to load differnt paragraphs 
const loadPera = () => {
    // using math.random function to load random para, & math.floor kya krta h point value ko nhi show krta h & article.lenth us para ki lenth hogi
    let random_Pera = Math.floor(Math.random() * article.length);
   type_content.innerHTML = "";
   // split words ko split krke ek new array me provide krta h ; uske sath foreach loop me element function ko pass kr rhe h realData arguement k andar span tag bna ke
    article[random_Pera].split('').forEach(element => {
// we creating span tag to store each single character of every word, taki jb type kre to ek ek char pe cursur blink kre to type that given char
        let realData = `<span>${element}</span>`;
// ab yhi agr innertext likhte to ek ek word span tag me likh ke aata jo ki correct nhi h, but innerhtml likhnge to vhi pura random paragraph load hoke aaega
        type_content.innerHTML += realData;
    });

   type_content.querySelectorAll('span')[0].classList.add('active');
    document.addEventListener('click', ()=>{
        input.focus();
    })
    type_content.addEventListener('click', ()=>{
        input.focus();
    })
}

loadPera();

// jo input bnayah hmne kaise pta lgega ki koi input de rha h usme? uske liye yha input pr event listener lgaye h to target the value of input 
input.addEventListener('input', (e) => {
    //to get all the span in which chars of words are stored
    let char = type_content.querySelectorAll('span');
    //to get the index value of letter by split method
    let inputValue = e.target.value.split('')[letterIndex];

    if (!isTyping) {
        time = setInterval(timeSetup, 1000);
        isTyping = true;
    }

    if (letterIndex < char.length - 1) {
        if (inputValue == null) {
            if(letterIndex > 0){
                letterIndex--;
                if(char[letterIndex].classList.contains('incorrect')){
                    mistakes--
                }
                char[letterIndex].classList.remove('correct','incorrect');
            }
        } else {
            if (char[letterIndex].innerText == inputValue) {
                char[letterIndex].classList.add('correct');
                correctType.play();
                // playSound();
            } else {
                char[letterIndex].classList.add('incorrect');
                mistakes++;
                IncorrectType.play();
                // playSound();
            }
        }


        letterIndex++;
        char.forEach(element =>{
            element.classList.remove('active');
        })
        char[letterIndex].classList.add('active');
        error.innerText = `Mistakes : ${mistakes}`;
        cpm.innerText = `CPM : ${letterIndex - mistakes}`;
    } else {
        clearInterval(time);
        input.value = "";
    }

});

const timeSetup = () =>{
    if(timeleft > 0){
        timeleft--;
        t_left.innerText = `Time-Left : ${timeleft}S`;
        let wpmTab = Math.round((letterIndex - mistakes) / 5 / (maxTime - timeleft) * 60);
        wpm.innerText = `WPM : ${wpmTab}`;
    }else{
        clearInterval(time);
        input.value = "";
    }
};


resetBtn.addEventListener('click', ()=>{
    loadPera();
    clearInterval(time);
    wpm.innerText = `WPM : `;
    error.innerText = `Mistakes : `;
    cpm.innerText = `CPM :`;
    timeleft = maxTime;
    t_left.innerText = `Time-Left : ${maxTime}S`;
    input.value = "";
    letterIndex = mistakes = isTyping = 0;
})