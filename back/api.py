from flask import Flask, jsonify
import os
import json

app = Flask(__name__)

def get_json_data(dir_name, file_name):
    try:
        json_dir_path = os.path.join(os.path.dirname(__file__), dir_name)
        json_file_name = file_name

        with open(os.path.join(json_dir_path, json_file_name), 'r') as file:
            data = json.load(file)

        return data

    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/', methods=['GET'])
def index():
    horary_traffic_data = get_json_data("json-traffic", "trafic_marseille_heure_20241003_111756.json")
    daily_traffic_data = get_json_data("json-traffic", "trafic_marseille_jour_20241003_111821.json")

    return {
        "traffic": {
            "horary_traffic": horary_traffic_data,
            "daily_traffic": daily_traffic_data
        }
    }

if __name__ == '__main__':  # Correction ici
    app.run(debug=False)
