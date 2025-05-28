from flask import Flask
from flask_cors import CORS
from flask_migrate import Migrate
from flask_jwt_extended import JWTManager

from .database import db
from .models.users import User
from .api.login import blp as login_bp  # Login blueprint
from .api.signup import blp as signup_bp  # Signup blueprint
from .api.logout import blp as logout_bp  # Logout blueprint
from .api.verify_token import blp as verify_token_bp  # Verify token blueprint
from .api.newsletter import blp as newsletter
from .api.static_routes import static_bp
from .api.blog import blp as blog_bp  # Blog blueprint
import os

jwt = JWTManager()  # JWT Manager initialization


def create_app():
    """Create and configure the Flask app."""
    

    app = Flask(
        __name__,
        static_folder=os.path.join(os.path.dirname(__file__), 'static'),
        static_url_path='/static'
    )

    app.config['DEBUG'] = True 
    app.config.from_object('app.config.Config')  # Load configuration from the config module

    # Enable CORS for all origins (for development only)
    CORS(app, origins="*", supports_credentials=True)

    # Initialize Database and ORM
    db.init_app(app)

    # Initialize Migrate for database migrations
    migrate = Migrate(app, db)

    # Initialize JWT Manager
    jwt.init_app(app)

    # Register Blueprints
    app.register_blueprint(login_bp)  # Login endpoints
    app.register_blueprint(signup_bp)  # Signup endpoints
    app.register_blueprint(logout_bp)  # Logout endpoints
    app.register_blueprint(verify_token_bp)  # Verify token endpoints
    app.register_blueprint(newsletter)
    app.register_blueprint(static_bp)
    app.register_blueprint(blog_bp)
    

    return app
