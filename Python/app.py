from flask import Flask, request
from markupsafe import escape

app = Flask(__name__)

@app.route("/")
def hello_world():
    return "<p>Hello, World!</p>"

@app.route("/hello")
def hello_world_routed():
    if request.method == "GET":
        return "<p>Hello, World! from a GET request</p>"
    elif request.method == "POST":
        return "<p>Hello, World! from a POST request</p>"
    else:
        return "<p>Hello, World! from a request</p>"

@app.route("/hello/<name>")
def hello_world_with_name(name):
    return f"<p>Hello, {escape(name)}!</p>"

@app.get("/hello/decorator")
def hello_world_get():
    return "<p>Hello, World! from a GET request using the decorator</p>"

@app.post("/hello/decorator")
def hello_world_post():
    data = request.get_data()
    if data is not None:
        return f"<p>Hello, World! from a POST request using the decorator with data: {data}</p>"
    else:
        return "<p>Hello, World! from a POST request using the decorator</p>"