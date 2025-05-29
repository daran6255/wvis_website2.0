from flask import Blueprint, send_from_directory, current_app
import os

static_bp = Blueprint("static_bp", __name__)

@static_bp.route("/static/pdfs/<path:filename>")
def serve_pdf(filename):
    pdf_dir = os.path.join(current_app.root_path, "static", "pdfs")
    return send_from_directory(pdf_dir, filename)

@static_bp.route("/static/images/<path:filename>")
def serve_image(filename):
    image_dir = os.path.join(current_app.root_path, "static", "images")
    print("Looking for image at:", image_dir)
    return send_from_directory(image_dir, filename)

