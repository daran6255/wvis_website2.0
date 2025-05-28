from flask import Blueprint, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from ..models.users import User
from ..database import db

blp = Blueprint("auth_verify", __name__, url_prefix="/auth")

@blp.route("/verify-token", methods=["GET"])
@jwt_required()
def verify_token():
    current_user_email = get_jwt_identity()

    if current_user_email is None:
        return jsonify({"status": "error", "result": "User not authorized"}), 401

    try:
        # Query the database for the user
        user = User.query.filter_by(email=current_user_email).first()

        if user:
            return jsonify({
                "status": "success",
                "message": "Token is valid",
                "result": {
                    "id": user.id,
                    "email": user.email,
                },
            }), 200
        else:
            return jsonify({"status": "error", "result": "User not found"}), 404

    except Exception as e:
        print(f"Error during token verification: {e}")
        return jsonify({"status": "error", "result": "An internal error occurred"}), 500
