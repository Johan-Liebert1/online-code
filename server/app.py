import json
from flask import Flask, request
import sys
from io import StringIO
import contextlib
from flask_cors import CORS

app = Flask(__name__)
cors = CORS(app)


@contextlib.contextmanager
def stdoutIO(stdout=None):
    old = sys.stdout
    if stdout is None:
        stdout = StringIO()
    sys.stdout = stdout
    yield stdout
    sys.stdout = old


@app.route("/", methods=["POST"])
def hello():
    data = json.loads(request.get_data().decode())

    print(data, type(data))

    output = None
    code_stderr = None

    with stdoutIO() as s:
        try:
            output = exec(data["code"], None, None)
        except Exception as e:
            code_stderr = e.with_traceback(None)
            code_stderr = code_stderr.__str__()

    code_stdout = s.getvalue()

    return json.dumps({"output": output, "stdout": code_stdout, "stderr": code_stderr})
