//Variáveis 
const button_start = document.querySelector('#button-start');
const content = document.querySelector('#content');
const header = document.querySelector('#header');
const number_question = document.querySelector('.number-question');
const text_question = document.querySelector('.text-question');
const options = document.querySelectorAll('.option');
const button_next_question = document.querySelector('#button-next-question');
const message = document.querySelector('.message');
const text_message = document.querySelector('.text-message');
const final_result = document.querySelector('.final-result');
const final_result_message = document.querySelector('#final-result-message');
const final_result_score = document.querySelector('#final-result-score');
const button_restart = document.querySelector('#button-restart');
let points = 0;

const questions = {
    question1:{
        title:'Quando se iniciou a segunda guerra mundial?',
        answers:{
            a:{
                text: '1939.',
                correct:true
            },
            b:{
                text: '1950.',
                correct:false
            },
            c:{
                text: '1958.',
                correct:false
            },
            d:{
                text: '1985.',
                correct:false
            }
        }
    },
    question2:{
        title:'Quando se iniciou a guerra fria?',
        answers:{
            a:{
                text: 'Início do século XX..',
                correct:false
            },
            b:{
                text: 'Após o término da segunda guerra mundial.',
                correct:true
            },
            c:{
                text: 'Não houve esta guerra.',
                correct:false
            },
            d:{
                text: 'Ainda não terminou.',
                correct:false
            }
        }
    },
    question3:{
        title:'De quem é a famosa frase “Penso, logo existo”?',
        answers:{
            a:{
                text: 'Platão.',
                correct:false
            },
            b:{
                text: 'Jarbas.',
                correct:false
            },
            c:{
                text: 'Descartes.',
                correct:true
            },
            d:{
                text: 'Gabriel.',
                correct:false
            }
        }
    },
    question4:{
        title:'O que a palavra legend significa em português?',
        answers:{
            a:{
                text: 'Legenda.',
                correct:false
            },
            b:{
                text: 'História.',
                correct:false
            },
            c:{
                text: 'Legendário.',
                correct:true
            },
            d:{
                text: 'Conto',
                correct:false
            }
        }
    },
    question5:{
        title:'Atualmente, quantos elementos químicos a tabela periódica possui?',
        answers:{
            a:{
                text: '118.',
                correct:true
            },
            b:{
                text: '108',
                correct:false
            },
            c:{
                text: '92',
                correct:false
            },
            d:{
                text: '109',
                correct:false
            }
        }
    },
    question6:{
        title:'Qual o número mínimo de jogadores em cada time numa partida de futebol?',
        answers:{
            a:{
                text: '10.',
                correct:false
            },
            b:{
                text: '8',
                correct:false
            },
            c:{
                text: '6',
                correct:false
            },
            d:{
                text: '7',
                correct:true
            }
        }
    },
    question7:{
        title:'Qual a nacionalidade de Che Guevara?',
        answers:{
            a:{
                text: 'Cubana.',
                correct:false
            },
            b:{
                text: 'Argentina',
                correct:true
            },
            c:{
                text: 'Panamenha',
                correct:false
            },
            d:{
                text: 'Peruana',
                correct:false
            }
        }
    },
    question8:{
        title:'Qual personagem folclórico costuma ser agradado pelos caçadores com a oferta de fumo?',
        answers:{
            a:{
                text: 'Lobisomem.',
                correct:false
            },
            b:{
                text: 'Saci',
                correct:false
            },
            c:{
                text: 'Boitatá',
                correct:false
            },
            d:{
                text: 'Caipora',
                correct:true
            }
        }
    },
    question9:{
        title:'Em que oceano fica Madagascar?',
        answers:{
            a:{
                text: 'Oceano Antártico.',
                correct:false
            },
            b:{
                text: 'Oceano Atlântico',
                correct:false
            },
            c:{
                text: 'Oceano Ártico',
                correct:false
            },
            d:{
                text: 'Oceano Índico',
                correct:true
            }
        }
    },
    question10:{
        title:'Quantos anos tem a Funec',
        answers:{
            a:{
                text: '10',
                correct:false
            },
            b:{
                text: '50',
                correct:true
            },
            c:{
                text: '49',
                correct:false
            },
            d:{
                text: '52',
                correct:false
            }
        }
    }
}

//Iniciando o Quizz

button_start.addEventListener('click',function(){
    //Esconder o menu
    header.classList.add('hide');
    //Eibir painel de perguntas
    content.classList.remove('hide');

    //Primeira questão
    const question_1 = questions.question1;
    number_question.innerHTML = 1;
    text_question.innerHTML = question_1.title;

    options[0].innerHTML = `A) ${question_1.answers.a.text}`;
    options[1].innerHTML = `B) ${question_1.answers.b.text}`;
    options[2].innerHTML = `C) ${question_1.answers.c.text}`;
    options[3].innerHTML = `D) ${question_1.answers.d.text}`;

    options.forEach(option => {
        option.addEventListener('click',function(){
            remove_all_options_selected(options);
            option.classList.add('selected');
            
        });
    });

});

button_next_question.addEventListener('click',function(){
    const option_user_selected = document.querySelector('.selected');
    const current_answer = find_current_answer(questions);
    if(!option_user_selected==''){
        let answer_user = option_user_selected.childNodes[0].textContent;
        answer_user = answer_user.slice(3);//Removendo a marcação da alternativa
        if(answer_user===current_answer){
            points++;
            create_message(message,'success','Parabéns! Resposta correta!');
        }else{
            create_message(message,'danger','Resposta Incorreta!');
        }
       setTimeout(() => {
            next_question();
       }, 1000);
    }else{
        create_message(message,'warning','Selecione uma alternativa primeiro!');
    }
});

//Funções auxiliares

//Remover a classe selected de todos os botões
function remove_all_options_selected(options){
    options.forEach(option => {
        option.classList.remove('selected');
    });
}

//Encontrar a resposta para atual pergunta
function find_current_answer(questions){
    const current_number_question = find_current_question();
    for (const key in questions) {
        if(key){
            if(key=='question'+current_number_question){
                for (const iterator in  questions[key].answers) {
                    if(questions[key].answers[iterator].correct===true){
                        return questions[key].answers[iterator].text;
                    }
                }
               
            }
        }
    }
}
//Criar mensagem para controle das ações do quizz
function create_message(message,type_message,content){
    message.classList.remove('message-danger');
    message.classList.remove('message-warning');
    message.classList.remove('message-success');

    message.classList.add('message-'+type_message);
    text_message.innerHTML = content;
    message.classList.remove('hide');
    setTimeout(()=>{
        const message = document.querySelector('.message');
        message.classList.add('hide');
    }, 1000);
}

//Encontrar número da questão atual
function find_current_question(){
    let current_number_question = document.querySelector('.number-question');
    current_number_question = current_number_question.childNodes[0].textContent;
    return  current_number_question;
}

//Pular para a próxima pergunta
function next_question(){
    
    let current_number_question = parseInt(find_current_question()) + 1;
    number_question.innerHTML = current_number_question;
    
    //Limpar selected dos botões
    remove_all_options_selected(options);
    
    //Verifica se existe próxima questão
    const number_of_quetions = Object.keys(questions).length;
    if(number_of_quetions<current_number_question){
        show_result_quizz();
    }else{
        for (const key in questions) {
            if(key){
                if(key=='question'+current_number_question){
                    text_question.innerHTML = questions[key].title;
                    options[0].innerHTML = `A) ${questions[key].answers.a.text}`;
                    options[1].innerHTML = `B) ${questions[key].answers.b.text}`;
                    options[2].innerHTML = `C) ${questions[key].answers.c.text}`;
                    options[3].innerHTML = `D) ${questions[key].answers.d.text}`;
                }
            }
        }
    }

}

//Mostrar resultado final
function show_result_quizz(){
    //Limpar selected dos botões
    remove_all_options_selected(options);

    //Remover as perguntas
    number_question.innerHTML = 0;
    text_question.innerHTML = '';
    options[0].innerHTML = ``;
    options[1].innerHTML = ``;
    options[2].innerHTML = ``;
    options[3].innerHTML = ``;
    content.classList.add('hide');
    button_next_question.classList.add('hide');

    const number_of_quetions = Object.keys(questions).length;
    
    final_result.classList.remove('hide');
    final_result_message.innerHTML = `Sua pontuação final foi de:`;
    final_result_score.innerHTML = `${points}/${number_of_quetions}`;
    button_restart.classList.remove('hide');
}

button_restart.addEventListener('click',function (){
    //Zerar a ponutação
    points = 0;

    final_result.classList.add('hide');
    final_result_message.innerHTML = '';
    final_result_score.innerHTML = '';
    button_restart.classList.add('hide');

    //Mostrar o menu
    header.classList.remove('hide');
    button_next_question.classList.remove('hide');
});