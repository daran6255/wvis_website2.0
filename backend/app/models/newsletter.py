from sqlalchemy.dialects.postgresql import UUID
import uuid
from ..database import db
from datetime import datetime


class Newsletter(db.Model):
    __tablename__ = 'newsletters'

    id = db.Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4, unique=True, nullable=False)
    title = db.Column(db.String(200), nullable=False)
    image = db.Column(db.String(200), nullable=False)
    pdf = db.Column(db.String(200), nullable=False)
    description = db.Column(db.String(1000), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow, nullable=False)  # Add this line