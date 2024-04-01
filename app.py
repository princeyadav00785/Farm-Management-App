from flask import Flask, request
from flask_cors import CORS, cross_origin
app = Flask(__name__)
# CORS(app)


app.config['CORS_HEADERS'] = 'Content-Type'

@app.route("/")
def hello_world():
    return "<p>Hello, World!</p>"


@app.route('/receive_string', methods=['POST'])
@cross_origin()
def receive_string():
    data = request.json  # Assuming JSON data is sent in the request body
    received_string = data.get('input_string')  # Assuming the key for the string is 'input_string'
    print("Received string:", received_string)
    return "String received successfully."

if __name__ == '__main__':
    app.run(debug=True)