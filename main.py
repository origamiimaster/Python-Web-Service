from flask import Flask, redirect
import subprocess

app = Flask(__name__, static_url_path='', static_folder='static')



@app.route('/')
def hello_world():
    # result = subprocess.run(["node", "--version"], capture_output=True)
    # string_result = str(result.stdout)
    # return 'Hello, World!' + "<br \\>" + string_result
    return redirect("/index.html", 302)

if __name__ == '__main__':
    app.run(host="0.0.0.0", port=8000, debug=False)
