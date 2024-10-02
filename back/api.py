from flask import Flask, jsonify, request, abort, make_response, send_file
import os
from datetime import datetime
import pandas as pd
import io

app = Flask(__name__)

@app.route('/', methods=['GET'])
def index():
    return jsonify({'message': 'Welcome to API !'})

if __name__ == '__main__':
    # app.run(host='localhost', port=8083, debug=True)
    app.run(debug=False)