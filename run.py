from flask import Flask, render_template, jsonify, request
from src.positioning import get_position
from src.navigation import find_path

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/api/position', methods=['POST'])
def position():
    wifi_data = request.json
    pos = get_position(wifi_data)
    return jsonify(pos)

@app.route('/api/navigate', methods=['POST'])
def navigate():
    data = request.json
    path = find_path(data['start'], data['end'])
    return jsonify(path)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)