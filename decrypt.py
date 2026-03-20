from cryptography.fernet import Fernet

key = b'PASTE_KEY_HERE'

cipher = Fernet(key)

with open("encrypted_file.enc", "rb") as f:
    encrypted_data = f.read()

decrypted_data = cipher.decrypt(encrypted_data)

with open("decrypted_file.txt", "wb") as f:
    f.write(decrypted_data)

print("Decryption complete")