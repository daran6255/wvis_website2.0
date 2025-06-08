from sqlalchemy.dialects.postgresql import UUID
import uuid
from ..database import db
from datetime import datetime

class Ebook(db.Model):
    __tablename__ = 'ebooks'

    id = db.Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4, unique=True, nullable=False)
    name = db.Column(db.String(100), nullable=False)
    description = db.Column(db.String(100), nullable=True)
    image_file = db.Column(db.String(255), nullable=True)
    epub_file = db.Column(db.String(255), nullable=True)
    pdf_file = db.Column(db.String(255), nullable=True)
    page_count = db.Column(db.Integer, nullable=True)
    pdf_downloads = db.Column(db.Integer, default=0)
    epub_downloads = db.Column(db.Integer, default=0)
    rating = db.Column(db.Float, default=0)
    review_count = db.Column(db.Integer, default=0)
    created_at = db.Column(db.DateTime, default=datetime.utcnow, nullable=False)
