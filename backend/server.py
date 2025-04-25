from flask import Flask, jsonify
from flask_cors import CORS

ALLOWED_ORIGINS = [
    "https://8080-idx-academicresource-1745588946287.cluster-ubrd2huk7jh6otbgyei4h62ope.cloudworkstations.dev"
]

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": ALLOWED_ORIGINS}})
@app.route("/", methods=["GET"])
def hello():
    return jsonify({"message": "Hello from Flask!"})

@app.route("/<path:path>", methods=["GET"])
def hello_path(path):
    return jsonify({"message": "Hello from Flask!"})



if __name__ == "__main__":
    app.run(debug=True)
