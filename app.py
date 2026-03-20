from flask import Flask, render_template, request, send_file
from cryptography.fernet import Fernet
import os

app = Flask(__name__)

key = Fernet.generate_key()
cipher = Fernet(key)

@app.route("/")
def home():
    return render_template("index.html")


@app.route("/decrypt_page")
def decrypt_page():
    return render_template("decrypt.html")


@app.route("/encrypt", methods=["GET","POST"])
def encrypt():
    file = request.files["file"]
    data = file.read()

    encrypted = cipher.encrypt(data)

    path = "encrypted/file.enc"

    with open(path, "wb") as f:
        f.write(encrypted)

    return send_file(path, as_attachment=True)


@app.route("/decrypt", methods=["POST"])
def decrypt():
    file = request.files["file"]
    data = file.read()

    decrypted = cipher.decrypt(data)

    path = "decrypted/decrypted_file.txt"

    with open(path, "wb") as f:
        f.write(decrypted)

    return send_file(path, as_attachment=True)


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)