from flask import Blueprint, request, jsonify, make_response
from flask_jwt_extended import create_access_token
from werkzeug.security import check_password_hash
from datetime import timedelta
from ..models.users import User
from ..database import db

blp = Blueprint("auth", __name__, url_prefix="/auth")

@blp.route("/login", methods=["POST"])
def login():
    result = {
        "status": "error",
        "result": "An error occurred while processing your request",
    }

    req = request.get_json()
    email = req.get("email")
    password = req.get("password")

    if not email or not password:
        result["result"] = "Email and password are required"
        return jsonify(result), 400

    try:
        user = User.query.filter_by(email=email).first()

        if user and check_password_hash(user.password, password):
            expires = timedelta(days=10)
            access_token = create_access_token(
                identity=user.email, expires_delta=expires
            )

            response = make_response({
                "status": "success",
                "token": access_token,
                "result": {
                    "id": user.id,
                    "email": user.email,
                },
            })
            return response, 200
        else:
            result = {"status": "error", "result": "Invalid email or password"}
            return jsonify(result), 401

    except Exception as e:
        print(f"Error during login: {e}")
        result = {"status": "error", "result": "An internal error occurred"}
        return jsonify(result), 500
