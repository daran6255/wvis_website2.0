from sqlalchemy.dialects.postgresql import UUID, ARRAY
import uuid
from ..database import db
from datetime import datetime


class Blog(db.Model):
    __tablename__ = 'blogs'

    id = db.Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4, unique=True, nullable=False)
    title = db.Column(db.String(200), nullable=False)
    image = db.Column(db.String(200), nullable=False)
    tags = db.Column(ARRAY(db.String), nullable=False)  # Stores tags as an array of strings
    description = db.Column(db.String(4000), nullable=False)
    author = db.Column(db.String(100), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow, nullable=False)
