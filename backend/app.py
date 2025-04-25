from flask import Flask, jsonify, request
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime
import os

app = Flask(__name__)
CORS(app)

# Database configuration
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///academic_resources.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)

# Models
class Project(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(200), nullable=False)
    prompt = db.Column(db.Text, nullable=False)
    description = db.Column(db.Text)
    last_updated = db.Column(db.DateTime, default=datetime.utcnow)
    resources = db.relationship('Resource', backref='project', lazy=True)

class Resource(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(200), nullable=False)
    type = db.Column(db.String(50))  # video, paper, book, article, repository
    url = db.Column(db.String(500))
    description = db.Column(db.Text)
    project_id = db.Column(db.Integer, db.ForeignKey('project.id'), nullable=False)

# Create database tables
with app.app_context():
    db.create_all()

# Routes
@app.route('/api/projects', methods=['GET'])
def get_projects():
    projects = Project.query.all()
    return jsonify([{
        'id': p.id,
        'title': p.title,
        'prompt': p.prompt,
        'description': p.description,
        'lastUpdated': p.last_updated.isoformat()
    } for p in projects])

@app.route('/api/projects', methods=['POST'])
def create_project():
    data = request.json
    project = Project(
        title=data['title'],
        prompt=data['prompt'],
        description=data.get('description', '')
    )
    db.session.add(project)
    db.session.commit()
    
    return jsonify({
        'id': project.id,
        'title': project.title,
        'prompt': project.prompt,
        'description': project.description,
        'lastUpdated': project.last_updated.isoformat()
    }), 201

@app.route('/api/projects/<int:project_id>', methods=['GET'])
def get_project(project_id):
    project = Project.query.get_or_404(project_id)
    return jsonify({
        'id': project.id,
        'title': project.title,
        'prompt': project.prompt,
        'description': project.description,
        'lastUpdated': project.last_updated.isoformat(),
        'resources': [{
            'id': r.id,
            'title': r.title,
            'type': r.type,
            'url': r.url,
            'description': r.description
        } for r in project.resources]
    })

@app.route('/api/projects/<int:project_id>/resources', methods=['POST'])
def add_resource(project_id):
    project = Project.query.get_or_404(project_id)
    data = request.json
    
    resource = Resource(
        title=data['title'],
        type=data['type'],
        url=data.get('url'),
        description=data.get('description'),
        project_id=project.id
    )
    db.session.add(resource)
    db.session.commit()
    
    return jsonify({
        'id': resource.id,
        'title': resource.title,
        'type': resource.type,
        'url': resource.url,
        'description': resource.description
    }), 201

@app.route('/api/search', methods=['GET'])
def search():
    query = request.args.get('q', '')
    projects = Project.query.filter(
        db.or_(
            Project.title.ilike(f'%{query}%'),
            Project.prompt.ilike(f'%{query}%'),
            Project.description.ilike(f'%{query}%')
        )
    ).all()
    
    return jsonify([{
        'id': p.id,
        'title': p.title,
        'prompt': p.prompt,
        'description': p.description,
        'lastUpdated': p.last_updated.isoformat()
    } for p in projects])

if __name__ == '__main__':
    app.run(debug=True, port=5000)
