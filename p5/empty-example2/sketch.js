function setup() {
    createCanvas(1000, 1000);
    noStroke();
    }
function draw() {
    background(0, 26, 51); // Dark blue color
    fill(255, 255, 255); // White color
    ellipse(500, 375, 150, 150); // Top circle
    fill(255, 255, 255); // White color
    ellipse(500, 550, 250, 250); // Mid circle
    fill(255, 255, 255); // Wite color
    ellipse(500, 800, 350, 350); // Base circle

    fill(0, 0, 0); // Black color
    ellipse(500, 500, 20, 20); // Button 1
    fill(0, 0, 0); // Black color
    ellipse(500, 550, 20, 20); // Button 2
    fill(0, 0, 0); // Black color
    ellipse(500, 600, 20, 20); // Button 3

    fill(0, 0, 0); // Black color
    ellipse(475, 365, 15, 15); // Left Eye
    fill(0, 0, 0); // Black color
    ellipse(525, 365, 15, 15); // Right Eye

    fill(0, 0, 0); // Black color
    ellipse(525, 400, 10, 10); // Mouth 1
    fill(0, 0, 0); // Black color
    ellipse(515, 405, 10, 10); // Mouth 2
    fill(0, 0, 0); // Black color
    ellipse(505, 410, 10, 10); // Mouth 3
    fill(0, 0, 0); // Black color
    ellipse(495, 410, 10, 10); // Mouth 4
    fill(0, 0, 0); // Black color
    ellipse(485, 405, 10, 10); // Mouth 5
    fill(0, 0, 0); // Black color
    ellipse(475, 400, 10, 10); // Mouth 6

    //Nose
    fill(255,165,0)
    ellipse(510, 385, 30, 10)

    // Scarf
    fill(255,0,0)
    quad(425, 475, 455, 435, 565, 435, 550, 475);
    fill(255,0,0)
    triangle(550, 475, 585, 450, 570, 420);

    //Hat
    fill(0,0,0)
    quad(425, 335, 575, 335, 575, 305, 425, 305)
    quad(450, 335, 550, 335, 560, 250, 440, 250)
    }


    