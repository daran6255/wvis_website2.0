from flask import Flask
from flask_cors import CORS
from flask_migrate import Migrate
from flask_jwt_extended import JWTManager
import os
from werkzeug.middleware.proxy_fix import ProxyFix

from .database import db
from .models.users import User
from .api.login import blp as login_bp  # Login blueprint
from .api.signup import blp as signup_bp  # Signup blueprint
from .api.logout import blp as logout_bp  # Logout blueprint
from .api.verify_token import blp as verify_token_bp  # Verify token blueprint
from .api.newsletter import blp as newsletter # Newsletter blueprint
from .api.static_routes import static_bp # Static routes blueprint
from .api.blog import blp as blog_bp  # Blog blueprint
from .api.ebook import blp as ebook_bp

jwt = JWTManager()  # JWT Manager initialization


def create_app():
    """Create and configure the Flask app."""
    
    app.wsgi_app = ProxyFix(app.wsgi_app, x_proto=1, x_host=1)
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
    app.register_blueprint(newsletter) # Newsletter endpoints
    app.register_blueprint(static_bp) # Static routes for serving files
    app.register_blueprint(blog_bp) # Blog endpoints
    app.register_blueprint(ebook_bp) # Ebook endpoints

    return app
