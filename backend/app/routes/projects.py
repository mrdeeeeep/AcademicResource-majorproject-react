from flask import Blueprint, request, jsonify
from app.models.project import Project
from app import db

bp = Blueprint('projects', __name__, url_prefix='/api/projects')

@bp.route('/', methods=['GET'])
def get_projects():
    projects = Project.query.all()
    return jsonify([p.to_dict() for p in projects])

@bp.route('/', methods=['POST'])
def create_project():
    data = request.json
    project = Project(
        title=data['title'],
        prompt=data['prompt'],
        description=data.get('description', '')
    )
    db.session.add(project)
    db.session.commit()
    return jsonify(project.to_dict()), 201

@bp.route('/<int:project_id>', methods=['GET'])
def get_project(project_id):
    project = Project.query.get_or_404(project_id)
    result = project.to_dict()
    result['resources'] = [r.to_dict() for r in project.resources]
    return jsonify(result)

@bp.route('/search', methods=['GET'])
def search():
    query = request.args.get('q', '')
    projects = Project.query.filter(
        db.or_(
            Project.title.ilike(f'%{query}%'),
            Project.prompt.ilike(f'%{query}%'),
            Project.description.ilike(f'%{query}%')
        )
    ).all()
    return jsonify([p.to_dict() for p in projects])
