from cryptography.fernet import Fernet

# generate key
key = Fernet.generate_key()

cipher = Fernet(key)

with open("file.txt", "rb") as f:
    data = f.read()

encrypted_data = cipher.encrypt(data)

with open("encrypted_file.enc", "wb") as f:
    f.write(encrypted_data)

print("Encryption complete")
print("Key:", key)