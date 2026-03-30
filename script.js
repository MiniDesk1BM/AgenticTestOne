// Configuration du canvas
const canvas = document.getElementById('robotCanvas');
const ctx = canvas.getContext('2d');
canvas.width = 600;
canvas.height = 400;

// Position initiale du robot
let robotX = canvas.width / 2;
let robotY = canvas.height / 2;

// Taille du robot
const robotWidth = 50;
const robotHeight = 50;

// Vitesse de déplacement
const speed = 20;

// Gravité et saut
const gravity = 1; // Force de la gravité
let velocityY = 0; // Vitesse verticale
const jumpStrength = -15; // Force du saut
let isOnGround = false; // Vérifie si le robot est au sol

// Dessiner le robot
function drawRobot() {
  // Corps
  ctx.fillStyle = '#007BFF';
  ctx.fillRect(robotX, robotY, robotWidth, robotHeight);

  // Tête
  ctx.fillStyle = '#FFD700';
  ctx.fillRect(robotX + 15, robotY - 20, 20, 20);

  // Yeux
  ctx.fillStyle = '#000';
  ctx.fillRect(robotX + 18, robotY - 15, 5, 5);
  ctx.fillRect(robotX + 27, robotY - 15, 5, 5);

  // Bras
  ctx.fillStyle = '#007BFF';
  ctx.fillRect(robotX - 10, robotY + 10, 10, 30); // Bras gauche
  ctx.fillRect(robotX + 50, robotY + 10, 10, 30); // Bras droit

  // Jambes
  ctx.fillStyle = '#007BFF';
  ctx.fillRect(robotX + 10, robotY + 50, 10, 20); // Jambe gauche
  ctx.fillRect(robotX + 30, robotY + 50, 10, 20); // Jambe droite
}

// Effacer le canvas
function clearCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

// Mettre à jour la position du robot
function updatePosition(keyCode) {
  // Déplacement horizontal
  switch (keyCode) {
    case 'ArrowLeft':
      if (robotX > 0) robotX -= speed;
      break;
    case 'ArrowRight':
      if (robotX + robotWidth < canvas.width) robotX += speed;
      break;
    case 'Space': // Saut
      if (isOnGround) {
        velocityY = jumpStrength; // Appliquer une impulsion vers le haut
        isOnGround = false; // Le robot n'est plus au sol
      }
      break;
  }
}

// Appliquer la gravité
function applyGravity() {
  if (!isOnGround) {
    velocityY += gravity; // Ajouter l'effet de la gravité
    robotY += velocityY; // Mettre à jour la position verticale
  }

  // Vérifier si le robot touche le sol
  if (robotY + robotHeight >= canvas.height) {
    robotY = canvas.height - robotHeight; // Positionner le robot au niveau du sol
    velocityY = 0; // Réinitialiser la vitesse verticale
    isOnGround = true; // Le robot est au sol
  }
}

// Boucle d'animation
function gameLoop() {
  clearCanvas();
  applyGravity();
  drawRobot();
  requestAnimationFrame(gameLoop); // Appeler la prochaine frame
}

// Gestion des événements clavier
window.addEventListener('keydown', (event) => {
  updatePosition(event.key);
});

// Initialisation
gameLoop();