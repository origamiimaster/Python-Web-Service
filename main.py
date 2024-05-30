from flask import Flask
import subprocess

app = Flask(__name__)


@app.route('/')
def hello_world():
    result = subprocess.run(["node", "--version"], capture_output=True)
    string_result = str(result.stdout)
    return 'Hello, World!' + "<br \\>" + string_result


if __name__ == '__main__':
    app.run(host="0.0.0.0", port=8000, debug=False)
