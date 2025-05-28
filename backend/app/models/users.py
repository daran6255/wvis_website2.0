from sqlalchemy import Column, String, DateTime
from datetime import datetime
import uuid
from ..database import db

class User(db.Model):
    __tablename__ = 'users'

    id = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    email = Column(db.String(100), unique=True, nullable=False)
    password = Column(db.String(200), nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)

    def __repr__(self):
        return f"<User {self.email}>"
