const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

let score = 0;
let player = { x: 100, y: canvas.height / 2, width: 65, height: 65 };
let predators = [];
let food = [];
let backgroundX = 0;
let isGameOver = false;

// Load player (fish) image
const playerImage = new Image();
playerImage.src = 'assets/turtle.png';

// Load background image
const backgroundImage = new Image();
backgroundImage.src = 'assets/waterbackground.png';

// Load multiple food images
const foodImages = [
  new Image(), new Image(), new Image(), new Image(), new Image(), new Image()
];
foodImages[0].src = 'assets/seaweed.png';
foodImages[1].src = 'assets/lettuce.png';
foodImages[2].src = 'assets/watermelonslice.png';
foodImages[3].src = 'assets/snail.png';
foodImages[4].src = 'assets/smallfish.png';
foodImages[5].src = 'assets/worm.png';

// Load multiple predator images
const predatorImages = [
  new Image(), new Image(), new Image(), new Image(), new Image(), new Image()
];
predatorImages[0].src = 'assets/plasticbag.png';
predatorImages[1].src = 'assets/plasticbottle.png';
predatorImages[2].src = 'assets/fishingnet.png';
predatorImages[3].src = 'assets/shark.png';
predatorImages[4].src = 'assets/sharprock.png';
predatorImages[5].src = 'assets/oilspill.png';

// Damage information for each obstacle
const damageInfo = {
  'plasticbag.png': `Plastic bags can be mistaken for jellyfish by sea turtles. Consuming plastic bags can lead to:<br>
- Blockages in the digestive tract<br>
- Nutritional deficiencies<br>
- Internal injuries<br>
- Death in severe cases<br>
  
Turtles may suffer from impaired feeding and digestion due to ingested plastic.<br><br><br>`,

  'plasticbottle.png': `Plastic bottles pose a significant threat to marine life. The damage caused by plastic bottles includes:<br>
- Entanglement in bottle rings or caps<br>
- Ingestion of small pieces leading to gastrointestinal blockages<br>
- Potential exposure to harmful chemicals leached from plastic<br>
- Injuries from sharp edges or broken pieces<br>

The accumulation of plastic waste in the ocean can be fatal for marine animals.<br><br><br>`,

  'fishingnet.png': `Abandoned or lost fishing nets, also known as "ghost nets," can cause severe damage to marine life, including:<br>
- Entanglement, leading to drowning or severe injury<br>
- Restriction of movement, resulting in starvation or injury<br>
- Infection from wounds caused by the nets<br>
- Death due to suffocation or loss of mobility<br>

Ghost nets contribute to significant suffering and mortality in sea turtles.<br><br><br>`,

  'shark.png': `Sharks are natural predators, but encounters with them can be dangerous for sea turtles. Potential impacts include:<br>
- Physical injuries from bites<br>
- Stress and trauma from predator encounters<br>
- Risk of infection from wounds<br>
- Death if the injuries are severe<br>

Sea turtles must navigate carefully to avoid predation from sharks.<br><br><br>`,

  'sharprock.png': `Sharp rocks can cause physical harm to sea turtles in their natural habitat. Risks include:<br>
- Lacerations and abrasions on the shell or skin<br>
- Damage to the turtle's flippers and limbs<br>
- Potential infections from wounds<br>
- Difficulty in movement or feeding due to injuries<br>

Avoiding sharp objects is crucial for the survival of sea turtles in rocky environments.<br><br><br>`,

  'oilspill.png': `Oil spills have devastating effects on marine ecosystems, including:<br>
- Contamination of the turtle's habitat<br>
- Ingestion of oil leading to poisoning and internal damage<br>
- Disruption of the turtle's feeding habits<br>
- Long-term health impacts from exposure to toxic substances<br>

Oil pollution poses a serious threat to the health and survival of sea turtles and other marine life.<br><br><br>`
};


// Get modal elements
const modal = document.getElementById('damageModal');
const closeButton = document.querySelector('.close-button');
const retryButton = document.getElementById('retryButton');
const damageMessageElement = document.getElementById('damageMessage');

// Function to show the modal with damage information
function showDamageModal(damageMessage) {
  damageMessageElement.textContent = damageMessage;
  modal.style.display = 'block';
}

// Function to hide the modal
function closeModal() {
  modal.style.display = 'none';
}

// Add event listener to close button
closeButton.addEventListener('click', closeModal);

// Add event listener to retry button
retryButton.addEventListener('click', () => {
  document.location.reload();
});

// Mousemove event listener to update the player's position
canvas.addEventListener('mousemove', (e) => {
  if (isGameOver) return;
  const rect = canvas.getBoundingClientRect();
  const mouseX = e.clientX - rect.left;
  const mouseY = e.clientY - rect.top;
  
  player.x = Math.min(canvas.width - player.width, Math.max(0, mouseX - player.width / 2));
  player.y = Math.min(canvas.height - player.height, Math.max(0, mouseY - player.height / 2));
});

// Function to detect collision between two rectangles
function detectCollision(rect1, rect2) {
  return (
    rect1.x < rect2.x + rect2.width &&
    rect1.x + rect1.width > rect2.x &&
    rect1.y < rect2.y + rect2.height &&
    rect1.y + rect1.height > rect2.y
  );
}

// Define sizes for predators and food
const predatorSizes = [
  { width: 50, height: 50 }, // Size for plastic bag
  { width: 30, height: 50 }, // Size for plastic bottle
  { width: 80, height: 80 }, // Size for fishing net
  { width: 180, height: 90 }, // Size for shark
  { width: 30, height: 30 }, // Size for sharp rock
  { width: 40, height: 40 }  // Size for oil spill
];

const foodSizes = [
  { width: 40, height: 60 }, // Size for seaweed
  { width: 40, height: 40 }, // Size for lettuce
  { width: 40, height: 40 }, // Size for watermelon slice
  { width: 30, height: 30 }, // Size for snail
  { width: 30, height: 20 }, // Size for small fish
  { width: 20, height: 20 }  // Size for worm
];

// Modify the spawnObstacles function
function spawnObstacles() {
  if (Math.random() < 0.02) {
    const index = Math.floor(Math.random() * predatorImages.length);
    const size = predatorSizes[index];
    predators.push({
      x: canvas.width,
      y: Math.random() * (canvas.height - size.height),
      width: size.width,
      height: size.height,
      speed: 3 + Math.random() * 2,
      image: predatorImages[index]
    });
  }

  if (Math.random() < 0.03) {
    const index = Math.floor(Math.random() * foodImages.length);
    const size = foodSizes[index];
    food.push({
      x: canvas.width,
      y: Math.random() * (canvas.height - size.height),
      width: size.width,
      height: size.height,
      image: foodImages[index]
    });
  }
}

// Function to update game objects (player, obstacles, food)
function update() {
  if (isGameOver) return;
  // Move background to create an endless scrolling effect
  backgroundX -= 2;
  if (backgroundX <= -canvas.width) {
    backgroundX = 0;
  }

// Function to show the modal with damage information
function showDamageModal(damageMessage) {
  damageMessageElement.innerHTML = damageMessage;
  document.getElementById('finalScore').textContent = 'Final Score: ' + score;
  modal.style.display = 'block';
}

// Check for collisions and handle game over
predators.forEach((predator, index) => {
  predator.x -= predator.speed;
  if (predator.x + predator.width < 0) {
    predators.splice(index, 1); // Remove off-screen predators
  }

  // Check for collisions between player and predator
  if (detectCollision(player, predator)) {
    // Extract the damage information for the collided predator
    const damageMessage = damageInfo[predator.image.src.split('/').pop()];

    // Format the message with a newline between the score and the damage information
    const formattedMessage = `<br><b>Damage Information:</b><br><br>${damageMessage}`;
    
    // Show the modal with the formatted message
    showDamageModal(formattedMessage);
    
    // Set game over flag and stop further processing
    isGameOver = true;
    return;
  }
});


  // Move food towards the player
  food.forEach((item, index) => {
    item.x -= 2;
    if (item.x + item.width < 0) {
      food.splice(index, 1); // Remove off-screen food
    }

    // Check for collisions between player and food
    if (detectCollision(player, item)) {
      score += 10; // Add points
      food.splice(index, 1); // Remove food on collision
    }
  });

  // Spawn new predators and food
  spawnObstacles();

  // Update score
  document.getElementById('score').textContent = 'Score: ' + score;
}

// Function to draw game objects
function draw() {
  if (isGameOver) return; 
  // Draw the background with endless scrolling effect
  ctx.drawImage(backgroundImage, backgroundX, 0, canvas.width, canvas.height);
  ctx.drawImage(backgroundImage, backgroundX + canvas.width, 0, canvas.width, canvas.height);

  // Draw the player
  ctx.drawImage(playerImage, player.x, player.y, player.width, player.height);

  // Draw predators with their respective images
  predators.forEach((predator) => {
    ctx.drawImage(predator.image, predator.x, predator.y, predator.width, predator.height);
  });

  // Draw food with their respective images
  food.forEach((item) => {
    ctx.drawImage(item.image, item.x, item.y, item.width, item.height);
  });
}

// Main game loop
let gameLoopId;
function gameLoop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas
  update(); // Update game objects
  draw(); // Draw the updated scene
  if (!isGameOver) {
    gameLoopId = requestAnimationFrame(gameLoop); // Loop the game
  }
 // Loop the game
}

// Start the game loop
gameLoop();
