# indoor-navigation-system

# Indoor Navigation System

A lightweight and innovative indoor navigation system using Wi-Fi signal strength for positioning. This project provides real-time indoor positioning and navigation guidance through a web interface.

## Features

- 📍 Real-time indoor positioning using Wi-Fi signal strength
- 🗺️ Interactive web-based interface
- 🧭 Turn-by-turn navigation instructions
- 📱 Mobile-friendly design
- 🚀 Easy deployment on Raspberry Pi
- ⚡ Minimal hardware requirements

## Prerequisites

- Python 3.8 or higher
- Raspberry Pi (recommended) or any Linux/Windows/macOS system
- Modern web browser
- Wi-Fi access points with known locations

## Quick Start

1. **Clone the repository**
```bash
git clone https://github.com/yourusername/indoor-nav.git
cd indoor-nav
```

2. **Install using Make**
```bash
make install
```

3. **Run the application**
```bash
make run
```

4. Open your browser and navigate to `http://localhost:5000`

## Manual Setup

If you prefer not to use Make, follow these steps:

1. **Create and activate virtual environment**
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

2. **Install dependencies**
```bash
pip install -r requirements.txt
```

3. **Run the application**
```bash
python run.py
```


## Configuration

### Wi-Fi Access Points

Configure your access points in `src/positioning.py`:

```python
self.access_points = {
    'AP1': {'location': (0, 0), 'reference_rssi': -50},
    'AP2': {'location': (10, 0), 'reference_rssi': -50},
    'AP3': {'location': (0, 10), 'reference_rssi': -50},
}
```

### Server Settings

Modify `run.py` to change host and port:

```python
app.run(host='0.0.0.0', port=5000)
```

## Available Make Commands

- `make install` - Install dependencies
- `make run` - Run the application
- `make dev` - Run in development mode
- `make test` - Run tests
- `make lint` - Check code style
- `make clean` - Remove generated files
- `make help` - Show all available commands

## API Endpoints

### Get Current Position
```http
POST /api/position
Content-Type: application/json

{
    "AP1": -60,
    "AP2": -70,
    "AP3": -80
}
```

### Calculate Navigation Path
```http
POST /api/navigate
Content-Type: application/json

{
    "start": [0, 0],
    "end": [10, 10]
}
```

## Usage Example

1. Open the web interface
2. Your current position will be automatically detected and displayed
3. Enter your destination coordinates (e.g., "10,10")
4. Click "Navigate" to see the path and instructions
5. Follow the turn-by-turn directions to reach your destination

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit changes: `git commit -am 'Add feature'`
4. Push to the branch: `git push origin feature-name`
5. Submit a Pull Request

## Troubleshooting

### Common Issues

1. **Position not updating**
   - Check Wi-Fi connection
   - Verify access point configurations

2. **Server won't start**
   - Ensure port 5000 is available
   - Check Python version compatibility

3. **Navigation not working**
   - Verify destination format (x,y)
   - Check console for JavaScript errors

## Performance Optimization

- Configure appropriate update intervals in `static/js/main.js`
- Adjust Wi-Fi scanning frequency based on needs
- Optimize pathfinding parameters in `src/navigation.py`

## Security Considerations

- The application runs on local network only
- Implement authentication if needed
- Keep Raspberry Pi and dependencies updated


## Acknowledgments

- Flask web framework
- Raspberry Pi Foundation
- Wi-Fi positioning research community

