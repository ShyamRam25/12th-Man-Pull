from dotenv import load_dotenv
import os
import psycopg2
from psycopg2.extras import RealDictCursor


def get_db_connection():
    conn = psycopg2.connect(
        host="localhost",
        database="ticketpull_database",
        user=os.getenv('DB_USERNAME'),
        password=os.getenv('DB_PASSWORD'),
        cursor_factory=RealDictCursor
    )
    return conn