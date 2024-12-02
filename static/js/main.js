// Global variables
let currentPosition = null;
const canvas = document.getElementById('map');
const ctx = canvas.getContext('2d');

// Constants
const GRID_SIZE = 40;
canvas.width = 600;
canvas.height = 600;

// Room definitions
const ROOMS = {
    'Room A': [3, 3],
    'Room B': [9, 3],
    'Room C': [3, 9],
    'Room D': [9, 9],
    'Lobby': [6, 6]
};

function drawFloorPlan() {
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw grid
    ctx.strokeStyle = '#ddd';
    ctx.beginPath();
    for (let x = 0; x <= canvas.width; x += GRID_SIZE) {
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
    }
    for (let y = 0; y <= canvas.height; y += GRID_SIZE) {
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
    }
    ctx.stroke();

    // Draw rooms
    ctx.fillStyle = '#f0f0f0';
    ctx.strokeStyle = '#000';
    
    // Draw all rooms
    Object.entries(ROOMS).forEach(([roomName, [x, y]]) => {
        ctx.beginPath();
        ctx.rect(GRID_SIZE * (x - 1), GRID_SIZE * (y - 1), GRID_SIZE * 2, GRID_SIZE * 2);
        ctx.fill();
        ctx.stroke();
        ctx.fillStyle = '#000';
        ctx.font = '12px Arial';
        ctx.fillText(roomName, GRID_SIZE * (x - 0.5), GRID_SIZE * (y - 0.2));
        ctx.fillStyle = '#f0f0f0';
    });

    // Draw corridors
    ctx.fillStyle = '#f8f8f8';
    ctx.beginPath();
    // Horizontal corridors
    ctx.rect(GRID_SIZE * 2, GRID_SIZE * 6, GRID_SIZE * 11, GRID_SIZE);
    // Vertical corridors
    ctx.rect(GRID_SIZE * 6, GRID_SIZE * 2, GRID_SIZE, GRID_SIZE * 9);
    ctx.fill();
    ctx.stroke();

    // Draw legend
    drawLegend();
}

function drawLegend() {
    const legendY = canvas.height - 80;
    ctx.fillStyle = '#000';
    ctx.font = 'bold 14px Arial';
    ctx.fillText('Legend:', 10, legendY);
    
    // Current position indicator
    ctx.fillStyle = 'blue';
    ctx.beginPath();
    ctx.arc(20, legendY + 20, 5, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#000';
    ctx.font = '12px Arial';
    ctx.fillText('Your Position', 35, legendY + 25);
    
    // Path indicator
    ctx.strokeStyle = 'red';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(10, legendY + 40);
    ctx.lineTo(30, legendY + 40);
    ctx.stroke();
    ctx.lineWidth = 1;
    ctx.fillText('Navigation Path', 35, legendY + 45);
    
    // Room indicator
    ctx.fillStyle = '#f0f0f0';
    ctx.strokeStyle = '#000';
    ctx.beginPath();
    ctx.rect(10, legendY + 55, 20, 20);
    ctx.fill();
    ctx.stroke();
    ctx.fillStyle = '#000';
    ctx.fillText('Room', 35, legendY + 70);
}

function updatePosition() {
    // Simulate WiFi scanning
    const wifiData = {
        'AP1': -60,
        'AP2': -70,
        'AP3': -80
    };

    fetch('/api/position', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(wifiData)
    })
    .then(response => response.json())
    .then(position => {
        currentPosition = position;
        drawMap();
    })
    .catch(error => {
        console.error('Error updating position:', error);
    });
}

function startNavigation() {
    if (!currentPosition) {
        alert('Waiting for position data...');
        return;
    }

    const destination = document.getElementById('destination').value;
    let destCoords;

    // Check if destination is a room name or coordinates
    if (ROOMS[destination]) {
        destCoords = ROOMS[destination];
    } else {
        // Parse coordinates in format "x,y"
        const coords = destination.split(',').map(num => parseInt(num.trim()));
        if (coords.length === 2 && !isNaN(coords[0]) && !isNaN(coords[1])) {
            destCoords = coords;
        } else {
            alert('Invalid destination. Please enter a room name or coordinates (e.g., "5,5")');
            return;
        }
    }

    fetch('/api/navigate', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            start: currentPosition,
            end: destCoords
        })
    })
    .then(response => response.json())
    .then(path => {
        drawPath(path);
        showInstructions(path);
    })
    .catch(error => {
        console.error('Error calculating path:', error);
        alert('Error calculating navigation path');
    });
}

function drawMap() {
    drawFloorPlan();
    
    if (currentPosition) {
        // Draw current position
        ctx.fillStyle = 'blue';
        ctx.beginPath();
        ctx.arc(
            currentPosition[0] * GRID_SIZE, 
            currentPosition[1] * GRID_SIZE, 
            6, 0, Math.PI * 2
        );
        ctx.fill();
    }
}

function drawPath(path) {
    ctx.strokeStyle = 'red';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(path[0][0] * GRID_SIZE, path[0][1] * GRID_SIZE);
    
    for (const point of path) {
        ctx.lineTo(point[0] * GRID_SIZE, point[1] * GRID_SIZE);
    }
    
    ctx.stroke();
    ctx.lineWidth = 1;
}

function showInstructions(path) {
    const instructions = document.getElementById('instructions');
    let html = '<h3>Navigation Instructions:</h3><ol>';
    
    for (let i = 1; i < path.length; i++) {
        const direction = getDirection(path[i-1], path[i]);
        const distance = getDistance(path[i-1], path[i]);
        html += `<li>Move ${direction} for ${distance.toFixed(1)} meters</li>`;
    }
    
    html += '</ol>';
    instructions.innerHTML = html;
}

function getDirection(from, to) {
    const dx = to[0] - from[0];
    const dy = to[1] - from[1];
    
    if (Math.abs(dx) > Math.abs(dy)) {
        return dx > 0 ? 'right' : 'left';
    }
    return dy > 0 ? 'down' : 'up';
}

function getDistance(from, to) {
    const dx = to[0] - from[0];
    const dy = to[1] - from[1];
    // Assuming each grid unit is 1 meter
    return Math.sqrt(dx * dx + dy * dy);
}

// Handle window resize
function resizeCanvas() {
    const container = document.getElementById('map-container');
    const size = Math.min(container.clientWidth, 600);
    canvas.style.width = `${size}px`;
    canvas.style.height = `${size}px`;
}

// Event listeners
window.addEventListener('resize', resizeCanvas);
document.getElementById('destination').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        startNavigation();
    }
});

// Initialize
drawFloorPlan();
resizeCanvas();
setInterval(updatePosition, 2000);

// Error handling for canvas
if (!ctx) {
    console.error('Canvas context not available');
    alert('Your browser does not support canvas. Please use a modern browser.');
}