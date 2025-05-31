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

@static_bp.route("/static/ebook/image/<path:filename>")
def serve_ebook_image(filename):
    pdf_dir = os.path.join(current_app.root_path, "static", "ebook", "images")
    return send_from_directory(pdf_dir, filename)

@static_bp.route("/static/ebook/pdf/<path:filename>")
def serve_ebook_pdf(filename):
    pdf_dir = os.path.join(current_app.root_path, "static", "ebook", "pdf")
    return send_from_directory(pdf_dir, filename)

@static_bp.route("/static/ebook/epub/<path:filename>")
def serve_ebook_epub(filename):
    epub_dir = os.path.join(current_app.root_path, "static", "ebook", "epub")
    return send_from_directory(epub_dir, filename)