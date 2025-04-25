from app import db
from datetime import datetime

class Project(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(200), nullable=False)
    prompt = db.Column(db.Text, nullable=False)
    description = db.Column(db.Text)
    last_updated = db.Column(db.DateTime, default=datetime.utcnow)
    resources = db.relationship('Resource', backref='project', lazy=True)

    def to_dict(self):
        return {
            'id': self.id,
            'title': self.title,
            'prompt': self.prompt,
            'description': self.description,
            'lastUpdated': self.last_updated.isoformat()
        }
