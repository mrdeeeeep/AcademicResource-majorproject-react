from flask import Flask
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from app.config.config import Config

db = SQLAlchemy()

def create_app(config_class=Config):
    app = Flask(__name__)
    app.config.from_object(config_class)
    
    # Initialize extensions
    CORS(app)
    db.init_app(app)
    
    # Register blueprints
    from app.routes import projects, resources
    app.register_blueprint(projects.bp)
    app.register_blueprint(resources.bp)
    
    # Create database tables
    with app.app_context():
        db.create_all()
    
    return app
