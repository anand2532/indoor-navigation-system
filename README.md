# indoor-navigation-system


A simple and innovative indoor navigation system using Wi-Fi signal strength for positioning. This project helps users navigate through indoor spaces with a user-friendly web interface.

## Features

- 📍 Real-time indoor positioning using Wi-Fi signals
- 🗺️ Interactive floor plan visualization
- 🏢 Room-based navigation
- 🧭 Turn-by-turn directions
- 🌐 Web-based interface


## Prerequisites

- Python 3.8 or higher
- Web browser (Chrome, Firefox, Safari)
- Wi-Fi access points in the building

## Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/indoor-nav.git
cd indoor-nav
```

2. Create and activate virtual environment:
```bash
# Windows
python -m venv venv
venv\Scripts\activate

# Linux/Mac
python3 -m venv venv
source venv/bin/activate
```

3. Install dependencies:
```bash
pip install -r requirements.txt
```

## Running the Application

1. Start the server:
```bash
python run.py
```

2. Open your web browser and navigate to:
```
http://localhost:5000
```

## Usage

1. **Select Destination**
   - Choose your desired destination room from the dropdown menu

2. **View Path**
   - The system will display the optimal path on the floor plan
   - Your current position is shown as a blue dot
   - The navigation path is shown in red

3. **Follow Directions**
   - Follow the turn-by-turn directions displayed below the map
   - The system updates your position in real-time

## Project Configuration

### Wi-Fi Access Points
Configure access point locations in `src/positioning.py`:
```python
access_points = {
    'AP1': {'location': (0, 0), 'reference_rssi': -50},
    'AP2': {'location': (10, 0), 'reference_rssi': -50},
    'AP3': {'location': (0, 10), 'reference_rssi': -50},
}
```

### Room Definitions
Add or modify rooms in `static/js/main.js`:
```javascript
const ROOMS = {
    'Room A': [3, 3],
    'Room B': [9, 3],
    'Room C': [3, 9],
    'Room D': [9, 9],
    'Lobby': [6, 6]
};
```

## Development

To modify the project:

1. **Floor Plan**
   - Edit the canvas drawing in `static/js/main.js`
   - Modify room layouts and corridors

2. **Navigation Logic**
   - Update pathfinding in `src/navigation.py`
   - Modify positioning algorithms in `src/positioning.py`

3. **User Interface**
   - Edit the HTML template in `templates/index.html`
   - Modify styles in `static/css/style.css`

## Troubleshooting

Common issues and solutions:

1. **Position Not Updating**
   - Check Wi-Fi connection
   - Verify access point configurations
   - Check browser console for errors

2. **Navigation Not Working**
   - Ensure room coordinates are correct
   - Verify the pathfinding algorithm inputs
   - Check server logs for errors

## Acknowledgments

- Flask web framework
- Wi-Fi positioning research community
- Indoor navigation algorithms