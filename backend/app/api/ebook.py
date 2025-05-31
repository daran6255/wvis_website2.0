import os
import uuid
from flask import Blueprint, request, jsonify, current_app, url_for
from werkzeug.utils import secure_filename
from PyPDF2 import PdfReader
from app.models.ebook import Ebook
from app.database import db

blp = Blueprint("ebook", __name__, url_prefix="/api/ebooks")

def save_file(file, subfolder):
    filename = secure_filename(file.filename)
    folder_path = os.path.join(current_app.static_folder, "ebook", subfolder)
    os.makedirs(folder_path, exist_ok=True)
    file_path = os.path.join(folder_path, filename)
    file.save(file_path)
    return filename, file_path

@blp.route("/upload", methods=["POST"])
def upload_ebook():
    name = request.form.get("name")
    description = request.form.get("description", "")
    image_file = request.files.get("image_file")
    pdf_file = request.files.get("pdf_file")
    epub_file = request.files.get("epub_file")

    if not name or not pdf_file or not epub_file or not image_file:
        return jsonify({"error": "Missing required fields"}), 400

    # Save files
    image_filename, _ = save_file(image_file, "images")
    pdf_filename, pdf_path = save_file(pdf_file, "pdf")
    epub_filename, _ = save_file(epub_file, "epub")

    # Count pages in PDF
    try:
        reader = PdfReader(pdf_path)
        page_count = len(reader.pages)
    except Exception as e:
        return jsonify({"error": f"Failed to read PDF: {str(e)}"}), 500

    # Save to DB
    ebook = Ebook(
        id=uuid.uuid4(),
        name=name,
        description=description[:100],
        image_file=image_filename,
        pdf_file=pdf_filename,
        epub_file=epub_filename,
        page_count=page_count
    )
    db.session.add(ebook)
    db.session.commit()

    return jsonify({
        "message": "Ebook uploaded successfully",
        "ebook": {
            "id": str(ebook.id),
            "name": ebook.name,
            "description": ebook.description,
            "image_file": url_for("static", filename=f"ebook/images/{ebook.image_file}", _external=True),
            "pdf_file": url_for("static", filename=f"ebook/pdf/{ebook.pdf_file}", _external=True),
            "epub_file": url_for("static", filename=f"ebook/epub/{ebook.epub_file}", _external=True),
            "page_count": ebook.page_count,
            "created_at": ebook.created_at.isoformat()
        }
    }), 201

@blp.route("/getall", methods=["GET"])
def get_all_ebooks():
    ebooks = Ebook.query.order_by(Ebook.created_at.desc()).all()
    return jsonify([
        {
            "id": str(e.id),
            "name": e.name,
            "description": e.description,
            "image_file": url_for("static", filename=f"ebook/images/{e.image_file}", _external=True),
            "pdf_file": url_for("static", filename=f"ebook/pdf/{e.pdf_file}", _external=True),
            "epub_file": url_for("static", filename=f"ebook/epub/{e.epub_file}", _external=True),
            "page_count": e.page_count,
            "created_at": e.created_at.isoformat()
        } for e in ebooks
    ])

@blp.route("/get/<uuid:ebook_id>", methods=["GET"])
def get_ebook(ebook_id):
    ebook = Ebook.query.get(ebook_id)
    if not ebook:
        return jsonify({"error": "Ebook not found"}), 404
    return jsonify({
        "id": str(ebook.id),
        "name": ebook.name,
        "description": ebook.description,
        "image_file": url_for("static", filename=f"ebook/images/{ebook.image_file}", _external=True),
        "pdf_file": url_for("static", filename=f"ebook/pdf/{ebook.pdf_file}", _external=True),
        "epub_file": url_for("static", filename=f"ebook/epub/{ebook.epub_file}", _external=True),
        "page_count": ebook.page_count,
        "created_at": ebook.created_at.isoformat()
    })

@blp.route("/delete/<uuid:ebook_id>", methods=["DELETE"])
def delete_ebook(ebook_id):
    ebook = Ebook.query.get(ebook_id)
    if not ebook:
        return jsonify({"error": "Ebook not found"}), 404

    # Delete files
    for subfolder, filename in [("images", ebook.image_file), ("pdf", ebook.pdf_file), ("epub", ebook.epub_file)]:
        path = os.path.join(current_app.static_folder, "ebook", subfolder, filename)
        if os.path.exists(path):
            os.remove(path)

    db.session.delete(ebook)
    db.session.commit()
    return jsonify({"message": "Ebook deleted successfully"})

@blp.route('/<int:ebook_id>/increment_download', methods=['POST'])
def increment_download(ebook_id):
    data = request.get_json()
    download_type = data.get('type')

    if download_type not in ['pdf', 'epub']:
        return jsonify({"error": "Invalid download type. Must be 'pdf' or 'epub'."}), 400

    ebook = Ebook.query.get(ebook_id)
    if not ebook:
        return jsonify({"error": "Ebook not found"}), 404

    if download_type == 'pdf':
        ebook.pdf_downloads = (ebook.pdf_downloads or 0) + 1
    elif download_type == 'epub':
        ebook.epub_downloads = (ebook.epub_downloads or 0) + 1

    db.session.commit()

    return jsonify({
        "message": f"{download_type.upper()} download count incremented",
        "pdf_downloads": ebook.pdf_downloads,
        "epub_downloads": ebook.epub_downloads
    }), 200