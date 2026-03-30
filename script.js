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
  switch (keyCode) {
    case 'ArrowUp':
      if (robotY > 0) robotY -= speed;
      break;
    case 'ArrowDown':
      if (robotY + robotHeight + 20 < canvas.height) robotY += speed;
      break;
    case 'ArrowLeft':
      if (robotX > 0) robotX -= speed;
      break;
    case 'ArrowRight':
      if (robotX + robotWidth + 10 < canvas.width) robotX += speed;
      break;
  }
}

// Gestion des événements clavier
window.addEventListener('keydown', (event) => {
  updatePosition(event.key);
  clearCanvas();
  drawRobot();
});

// Initialisation
drawRobot();