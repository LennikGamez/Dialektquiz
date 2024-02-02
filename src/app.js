import hessischData from '../data/hessisch.json' assert {type: 'json'};
import berlinData from '../data/Berlin.json' assert {type: 'json'};
import ruhrpottData from '../data/Ruhrpott.json' assert {type: 'json'};

const data = {
    'hessisch': hessischData,
    'ruhrpott': ruhrpottData,
    'berlin': berlinData
}

class App{
    
    dataBase = {}

    constructor(){
        this.questionField = document.getElementById('question');
        this.optionDiv = document.getElementById('options');
        this.options = document.querySelectorAll('.option');
        this.select = document.getElementById('changeDict');
        this.correctElement = null;
        
        this.question = '';
        this.answer = '';
        this.example = '';
        
        this.timeout = 2000;
        this.guessed = false;

        this.select.addEventListener('change', (element)=>{
            this.loadData(data[element.target.value]);
        })

        this.options.forEach(element =>
            {
                this.checkAnswer(element);   
            })
    }

        checkAnswer(element){
        const app = this;
        element.addEventListener('click', ()=>{
            if (app.guessed){
                return;
            }

            if(element.innerText == app.answer){
                element.classList.add('correct');
            }else{
                element.classList.add('wrong');
                console.log("Die richtige Antwort war "+ app.answer);
                app.correctElement.classList.add('solution');
            }
            this.guessed = true;
            setTimeout(() =>{
                app.generateQuestion(app);
            }, this.timeout);
        })
    }

    loadData(data){
        this.dataBase = data;
    }

    selectRandomWord(){
        const entry = choice(this.dataBase);

        this.question = entry.word;
        this.answer = entry.description;
        this.example = entry.example;
        
        this.loadQuestionInDOM(this.question);
    }

    selectRandomOptions(){
        let descriptions = [];
        for(let i=0; i<this.options.length-1; i++){
            const entry = choice(this.dataBase);
            descriptions.push(entry.description);
        }
        // Add in the correct answer
        descriptions.push(this.answer);
        shuffle(descriptions);
        this.applyOptions(descriptions);
    }

    applyOptions(descriptions){
        this.options.forEach((element, index) => {
            element.innerText = descriptions[index]; 
            if(element.innerText == this.answer){
                this.correctElement = element;
            }
        })
    }

    loadQuestionInDOM(question){
        this.questionField.value = question
    }


    generateQuestion(app){
        this.guessed = false;
        this.options.forEach((element)  => {
            element.classList.remove('wrong');
            element.classList.remove('correct');
            element.classList.remove('solution');
        });
        app.selectRandomWord();
        app.selectRandomOptions();
    }
}



var choice = function (object) {
    var keys = Object.keys(object);
    return object[keys[Math.floor(keys.length * Math.random())]];
  };

const shuffle = (array) => { 
for (let i = array.length - 1; i > 0; i--) { 
    const j = Math.floor(Math.random() * (i + 1)); 
    [array[i], array[j]] = [array[j], array[i]]; 
} 
return array; 
};


const app = new App();
app.loadData(hessischData);
app.generateQuestion(app);
