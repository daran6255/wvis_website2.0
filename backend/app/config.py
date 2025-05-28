import os

TEMP_FOLDER = os.path.abspath(os.path.join(os.path.dirname(__file__), '../temp'))

class Config:
    SQLALCHEMY_DATABASE_URI = 'postgresql://postgres:12345@localhost:5432/wvis-website'  # Replace with your DB info
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    SECRET_KEY = 'Grow@wvf123&'
