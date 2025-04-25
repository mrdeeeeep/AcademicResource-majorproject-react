from flask import Blueprint, request, jsonify
from app.models.resource import Resource
from app.models.project import Project
from app import db

bp = Blueprint('resources', __name__, url_prefix='/api/projects/<int:project_id>/resources')

@bp.route('/', methods=['POST'])
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
    
    return jsonify(resource.to_dict()), 201
