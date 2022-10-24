const grid = document.querySelector('.grid');
const player = document.querySelector('.player')

let firstCard = '';
let SecondCard = '';

const characters = [
    'beth',
    'bridgette',
];


const checkEndGame = () => {
    const disabledCards = document.querySelectorAll('.disabled-card');

    if (disabledCards.length === 4) {
        alert('Parabéns, você finalizou o Jogo da Memória!');
    };
};

const checkCards = () => {

    const fisrtCharacter = firstCard.getAttribute('data-character');
    const secondCharacter = SecondCard.getAttribute('data-character');

    if (fisrtCharacter === secondCharacter) {

        firstCard.firstChild.classList.add('disabled-card');
        SecondCard.firstChild.classList.add('disabled-card');

        firstCard = '';
        SecondCard = '';

        checkEndGame();

    } else {

        setTimeout(() => {
            firstCard.classList.remove('reveal-card');
            SecondCard.classList.remove('reveal-card');

            firstCard = '';
            SecondCard = '';

        }, 500);
    }
};

const revealCard = ({ target }) => {

    if (target.parentNode.className.includes('reveal-card')) {
        return;
    };

    if (firstCard === '') {

        target.parentNode.classList.add('reveal-card');
        firstCard = target.parentNode;

    } else if (SecondCard === '') {

        target.parentNode.classList.add('reveal-card');
        SecondCard = target.parentNode;

        checkCards();
        
    };
};

const createElement = (tag, className) => {
    const element = document.createElement(tag);
    element.className = className;

    return element;
};

const createCard = (character) => {

    const card = createElement('div', 'card');
    const front = createElement('div', 'face front');
    const back = createElement('div', 'face back');

    front.style.backgroundImage = `url('../images/totaldrama/personagens/${character}.jpg')`;

    card.appendChild(front);
    card.appendChild(back);
    
    card.addEventListener('click', revealCard);
    card.setAttribute('data-character', character);

    return card;
};

const LoadGame = () => {

    const duplicateCharacteres = [... characters, ... characters ];
    const shuffledArray = duplicateCharacteres.sort(() => Math.random() - 0.5);


    shuffledArray.forEach((character) => {
        const card = createCard(character);
        grid.appendChild(card);
    });
};

window.onload = () => {

    const playerName = localStorage.getItem('player');
    player.innerHTML = playerName;

    LoadGame();
}