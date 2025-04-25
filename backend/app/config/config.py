import os

class Config:
    # Database
    SQLALCHEMY_DATABASE_URI = 'sqlite:///academic_resources.db'
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    
    # Security
    SECRET_KEY = os.environ.get('SECRET_KEY') or 'dev-key-please-change'
    
    # API
    API_VERSION = '1.0'
