
const canvas = document.getElementById('canvas');
const score = document.getElementById('score');
const clicks = document.getElementById('clicks');
const endScreen = document.getElementById('endScreen');
const changeTheme = document.getElementById('changeTheme');


clicksLeft = 50;
gameOverNumber = 25;
loopPlay = false;
themeVirus = false;


changeTheme.addEventListener('click', () => {
    // On reset tout à 0 pour une nouvelle partie
    count = 0;
    getFaster = 6000;
    clicksRemaining = clicksLeft;
    canvas.innerHTML = '';
    score.innerHTML = count;
    clicks.innerHTML = clicksRemaining;
    themeVirus = !themeVirus;
    document.querySelector('body').classList.toggle('is_cs');
    document.querySelector('body').classList.toggle('is_hospital');
});


function start() {
    // On reset tout à 0 pour une nouvelle partie
    count = 0;
    getFaster = 6000;
    clicksRemaining = clicksLeft;

    canvas.innerHTML = '';
    score.innerHTML = count;
    clicks.innerHTML = clicksRemaining;

    // S'assurer de ne pas avoir plusieurs instances de game() en même temps
    loopPlay ? '' : game();
    loopPlay = true;

    function game() {
        let randomTime = Math.round(Math.random() * getFaster);
        getFaster > 700 ? getFaster = (getFaster * 0.90) : '';

        setTimeout(() => {
            if (clicksRemaining === 0) {
                youWin();
            }
            else if (canvas.childElementCount < gameOverNumber) {
                enemyPop();
                game();
            }
            else {
                gameOver();
            }
        }, randomTime);
    }

    const gameOver = () => {
        endScreen.innerHTML = `<div class="gameOver">Game over ... <br/> Score : ${ count } </div>`;
        endScreen.style.visibility = 'visible';
        endScreen.style.opacity = '1';
        loopPlay = false;
    };

    const youWin = () => {

        let accuracy = Math.round(count / clicksLeft * 100);

        endScreen.innerHTML = `<div class="youWin">Mission réussie ! <br/> <span>Précision : ${ accuracy }%</span> </div>`;
        endScreen.style.visibility = 'visible';
        endScreen.style.opacity = '1';
        loopPlay = false;
    };

}

function enemyPop() {

    let enemy = new Image();

    themeVirus ? enemy.src = './media/basic-pics/pngwave.png' : enemy.src = './media/basic-pics/cs_enemy.png';

    enemy.classList.add('enemy');
    enemy.style.top = Math.random() * 500 + 'px'; // Le pop de l'ennemi se fait entre 1 et 500px de hauteur, le canvas fait 500px de haut donc on sera toujours dedans
    enemy.style.left = Math.random() * 500 + 'px'; // Pareil pour la largeur

    let x, y;
    x = y = (Math.random() * 45) + 30; // La taille de l'ennemi fera au minimum 30px (puisqu'on ajoute 30)
    enemy.style.setProperty('--x', `${ x }px`);
    enemy.style.setProperty('--y', `${ y }px`);

    let plusMinus = Math.random() < 0.5 ? -1 : 1; // On génère aléatoirement du movement positif ou négatif (vers le haut ou vers le bas, etc..)
    let trX = Math.random() * 500 * plusMinus;
    let trY = Math.random() * 500 * plusMinus;
    enemy.style.setProperty('--trX', `${ trX }%`);
    enemy.style.setProperty('--trY', `${ trY }%`);

    let changeFace = Math.random() < 0.5 ? '0deg' : '180deg';
    enemy.style.setProperty('--face', `${ changeFace }`);

    canvas.appendChild(enemy);
}

// Fonction pour supprimer un virus au click
document.addEventListener('click', function(e) {
    let targetElement = e.target || e.srcElement;
    if (targetElement.classList.contains('enemy')) {
        targetElement.remove();
        count++;
        score.innerHTML = count;
    };
})

// Compte à rebours des clicks restants
canvas.addEventListener('click', () => {
    if (clicksRemaining > 0) {
        clicksRemaining--;
        clicks.innerHTML = clicksRemaining;
    }
});

// Clôturer l'écran de fin (avec un délai de 2s pour éviter qu'on ne clique trop vite)
endScreen.addEventListener('click', () => {
    setTimeout(() => {
        endScreen.style.opacity = '0';
        endScreen.style.visibility = 'hidden';
    }, 2000);
});

