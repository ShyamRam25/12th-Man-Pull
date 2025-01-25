from flask import Flask, jsonify
from flask_cors import CORS
from db import get_db_connection

app = Flask(__name__)
CORS(app)

@app.route('/books', methods=['GET'])
def get_books():
    conn = get_db_connection()
    cur = conn.cursor()
    cur.execute('SELECT * FROM books;')
    books = cur.fetchall()
    cur.close()
    conn.close()
    return jsonify(books)

if __name__ == '__main__':
    app.run(debug=True)
