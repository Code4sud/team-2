from flask import Flask, jsonify, request
import os
import json
import ollama

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
    # Road traffic
    horary_traffic_data = get_json_data("json-traffic", "trafic_marseille_heure_20241003_111756.json")
    daily_traffic_data = get_json_data("json-traffic", "trafic_marseille_jour_20241003_111821.json")

    # Airport traffic
    weakly_airport_traffic_data = get_json_data("json-aeroport", "donnees_aeroport_semaine_20241003_114505.json")
    monthly_airport_traffic_data = get_json_data("json-aeroport", "donnees_aeroport_mois_20241003_114515.json")

    # Weather data
    # Marseille
    marseille_temperature_data = get_json_data("json-weather", "results_average_temp_2020_2022_marseille.json")
    marseille_humidity_data = get_json_data("json-weather", "results_humidity_2020_2022_marseille.json")
    marseille_rain_data = get_json_data("json-weather", "results_rain_2020_2022_marseille.json")
    marseille_wind_data = get_json_data("json-weather", "results_vent_2020_2022_marseille_kmh.json")

    # Fos
    fos_temperature_data = get_json_data("json-weather", "results_average_temp_2020_2022_fos.json")
    fos_humidity_data = get_json_data("json-weather", "results_humidity_2020_2022_fos.json")
    fos_rain_data = get_json_data("json-weather", "results_rain_2020_2022_fos.json")
    fos_wind_data = get_json_data("json-weather", "results_vent_2020_2022_fos_kmh.json")

    # Polluant data
    quarter_hour_pollutant_data = get_json_data("json-pollutant", "donnees_polluants_quart-dheure_20241003_145537.json")
    horary_pollutant_data = get_json_data("json-pollutant", "donnees_polluants_heure_20241003_145552.json")
    daily_pollutant_data = get_json_data("json-pollutant", "donnees_polluants_jour_20241003_145545.json")


    return {
        "roadTraffic": {
            "horary_traffic": horary_traffic_data,
            "daily_traffic": daily_traffic_data
        },
        "airportTraffic": {
            "weakly_traffic": weakly_airport_traffic_data,
            "monthly_traffic": monthly_airport_traffic_data
        },
        "weatherData": {
            "marseille": {
                "temperature": marseille_temperature_data,
                "humidity": marseille_humidity_data,
                "rain": marseille_rain_data,
                "wind": marseille_wind_data,
            },
            "fos": {
                "temperature": fos_temperature_data,
                "humidity": fos_humidity_data,
                "rain": fos_rain_data,
                "wind": fos_wind_data,
            }
        },
        "pollutantData": {
            "quarter_hour_pollutant": quarter_hour_pollutant_data,
            "horary_pollutant": horary_pollutant_data,
            "daily_pollutant": daily_pollutant_data
        }
    }

@app.route('/prompt', methods=['POST'])
def prompt():
    try:
        data = request.json
        user_message = data.get('prompt', '')

        response = ollama.generate(model='llama3.1', prompt=user_message, url='http://localhost:11434')  # Remplacez le port par celui utilisé

        return jsonify({'response': response['message']['content']}), 200

    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=False)
