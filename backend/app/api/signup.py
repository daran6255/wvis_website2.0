from flask import Blueprint, request, jsonify
from werkzeug.security import generate_password_hash
from ..models.users import User
from ..database import db

blp = Blueprint("signup", __name__, url_prefix="/auth")

@blp.route("/signup", methods=["POST"])
def signup():
    """Register a new user."""
    result = {
        "status": "error",
        "result": "An error occurred while processing your request",
    }

    try:
        req = request.get_json()
        email = req.get("email")
        password = req.get("password")

        # Input validation
        if not email or not password:
            result["result"] = "Email and password are required."
            return jsonify(result), 400

        # Check if email is already registered
        if User.query.filter_by(email=email).first():
            result["result"] = "Email is already registered."
            return jsonify(result), 409

        # Hash the password for security
        hashed_password = generate_password_hash(password)

        # Create a new user instance
        new_user = User(
            email=email,
            password=hashed_password,
        )

        # Add and commit the new user to the database
        db.session.add(new_user)
        db.session.commit()

        # Success response
        result = {
            "status": "success",
            "result": f"User registered successfully.",
        }
        return jsonify(result), 201

    except Exception as e:
        print(f"Error during signup: {e}")
        result["result"] = "An internal error occurred."
        return jsonify(result), 500
