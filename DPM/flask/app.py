from flask import Flask, request, jsonify
import joblib
import numpy as np
from flask_cors import CORS
app = Flask(__name__)
CORS(app)

# Load your trained model
model = joblib.load("model.pkl")

@app.route('/')
def home():
    return "Flask server is running!"

@app.route("/predictAndLog", methods=["POST"])
def predict():
    try:
        data = request.json

        feature = data["features"]
        features = np.array([feature['temperature'], feature['vibration'], feature['load']]).reshape(1, -1)

        prediction = model.predict(features)
        return jsonify({"prediction": bool(prediction[0])})

    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(debug=True)