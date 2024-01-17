/* --------------------------------------------------------------------------------

Consegna
Copiamo la griglia fatta ieri nella nuova repo e aggiungiamo la logica del gioco (attenzione: non bisogna copiare tutta la cartella dell'esercizio ma solo l'index.html, e le cartelle js/ css/ con i relativi script e fogli di stile, per evitare problemi con l'inizializzazione di git).

Il computer deve generare 16 numeri casuali nello stesso range della difficoltà prescelta: le bombe. 
Attenzione: Nell’array delle bombe non potranno esserci due numeri uguali.

In seguito l'utente clicca su una cella: se il numero è presente nella lista dei numeri generati - abbiamo calpestato una bomba - la cella si colora di rosso e la partita termina. 
Altrimenti la cella cliccata si colora di azzurro e l'utente può continuare a cliccare sulle altre celle.

La partita termina quando il giocatore clicca su una bomba o quando raggiunge il numero massimo possibile di numeri consentiti (ovvero quando ha rivelato tutte le celle che non sono bombe).
Al termine della partita il software deve comunicare il punteggio, cioè il numero di volte che l’utente ha cliccato su una cella che non era una bomba.

BONUS:
Aggiungere una select accanto al bottone di generazione, che fornisca una scelta tra tre diversi livelli di difficoltà:
- difficoltà 1 ⇒ 100 caselle, con un numero compreso tra 1 e 100, divise in 10 caselle per 10 righe;
- difficoltà 2 ⇒ 81 caselle, con un numero compreso tra 1 e 81, divise in 9 caselle per 9 righe;
- difficoltà 3 ⇒ 49 caselle, con un numero compreso tra 1 e 49, divise in 7 caselle per 7 righe;

-------------------------------------------------------------------------------- */
function randomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

const gridHtml = document.getElementById('griglia');
const playButtonHtml = document.getElementById('play-button');
let gameOver = false;
let points = 0;

// funzione che crea e restituisce una cella (elemento div con classe "cell")
function createCell(difficulty, arrayBombs, howManyCells) {
    const cell = document.createElement('div');
    
    cell.classList.add('cell');


    // Anzichè l'utilizzo di 3 classi diverse per ridimensionare la flex basis, si poteva impostare i value delle option del select ai valori 100, 81 e 49 e poi utilizzare setProperty ed impostare la flex basis a calc(100% / Math.sqrt(mode.value)) (che calcola la flex basis in base alla radice del value del select)
    switch (difficulty) {
        case "easy":
            cell.classList.add('easy-mode-cell');
            break;
        case "medium":
            cell.classList.add('medium-mode-cell');
            break;
        case "hard":
            cell.classList.add('hard-mode-cell');
            break;
    }

    cell.addEventListener('click', function(){
        if (!gameOver) {
            if(!arrayBombs.includes(Number(this.querySelector('span').innerText))){
                this.classList.toggle('active');
                points++;
                console.log(this.querySelector('span').innerText);
                console.log(`Points: ${points}`);
                if (points === howManyCells - arrayBombs.length) {
                    gameOver = true;
                    console.log('Hai vinto!');
                }
            } else {
                this.classList.toggle('danger');
                gameOver = true;
                console.log(this.querySelector('span').innerText, "Bomba!");
            }
        }
    });

    return cell;
}



// funzione che crea e restituisce l'array delle bombe
function bombsGenerator(n) {
    const bombs = [];
    let x = randomNumber(1, n);

    while (bombs.length < 16) {
        x = randomNumber(1, n);
        if(!bombs.includes(x)){
            bombs.push(x);
        }
    }

    return bombs;
}

// al click del bottone play viene generata la griglia di 100 celle
playButtonHtml.addEventListener('click', function(){
    const mode = document.getElementById('game-mode');
    let howManyCells = 0;
    let bombs = [];

    gameOver = false;
    points = 0;

    gridHtml.innerHTML = '';

    switch (mode.value) {
        case "easy":
            howManyCells = 100;
            //gridHtml.classList.add('easy-mode-grid');
            break;
        case "medium":
            howManyCells = 81;
            //gridHtml.classList.add('medium-mode-grid');
            break;
        case "hard":
            howManyCells = 49;
            //gridHtml.classList.add('hard-mode-grid');
            break;
    }

    bombs = bombsGenerator(howManyCells);

    console.log(bombs);

    // se non è ancora stata generata alcuna griglia..
    if (gridHtml.querySelectorAll('div').length === 0) {
        for(let i = 0; i < howManyCells; i++) {
            const cell = createCell(mode.value, bombs, howManyCells);
            const number = document.createElement('span');
    
            number.innerText = i+1;
    
            cell.append(number);
    
            gridHtml.append(cell);
        }
    }
    

});