import os
import uuid
from flask import Blueprint, request, jsonify, current_app, url_for
from werkzeug.utils import secure_filename
from app.models.blog import Blog
from app.database import db

blp = Blueprint("blog", __name__, url_prefix="/api/blogs")

@blp.route("/postblog", methods=["POST"])
def create_blog():
    title = request.form.get("title")
    description = request.form.get("description")
    author = request.form.get("author")
    tags = request.form.get("tags", "")
    image_file = request.files.get("image")

    if not all([title, description, author, image_file]):
        return jsonify({"error": "Missing required fields"}), 400

    # Save image
    image_filename = secure_filename(image_file.filename)
    image_path = os.path.join(current_app.static_folder, "images", image_filename)
    image_file.save(image_path)

    blog = Blog(
        id=uuid.uuid4(),
        title=title,
        description=description,
        author=author,
        tags=[tag.strip() for tag in tags.split(",") if tag.strip()],
        image=image_filename  # ✅ relative URL
    )

    db.session.add(blog)
    db.session.commit()

    return jsonify({
    "message": "Blog created successfully!",
    "blog": {
        "id": str(blog.id),
        "title": blog.title,
        "description": blog.description,
        "author": blog.author,
        "tags": blog.tags,
        "image": url_for("static", filename=f"images/{blog.image}", _external=True),
        "created_at": blog.created_at.isoformat()
    }
}), 201



# GET: Retrieve all blogs
@blp.route("/getall", methods=["GET"])
def get_all_blogs():
    blogs = Blog.query.order_by(Blog.created_at.desc()).all()
    return jsonify([
        {
            "id": str(blog.id),
            "title": blog.title,
            "image": url_for("static", filename=f"images/{blog.image}", _external=True),
            "tags": blog.tags,
            "description": blog.description,
            "author": blog.author,
            "created_at": blog.created_at.isoformat()
        } for blog in blogs
    ])


# GET: Retrieve a blog by ID
@blp.route("/get/<uuid:blog_id>", methods=["GET"])
def get_blog(blog_id):
    blog = Blog.query.get(blog_id)
    if not blog:
        return jsonify({"error": "Blog not found"}), 404
    return jsonify({
        "id": str(blog.id),
        "title": blog.title,
        "image": url_for("static", filename=f"images/{blog.image}", _external=True),
        "tags": blog.tags,
        "description": blog.description,
        "author": blog.author,
        "created_at": blog.created_at.isoformat()
    })


# DELETE: Delete a blog by ID
@blp.route("/<uuid:blog_id>", methods=["DELETE"])
def delete_blog(blog_id):
    blog = Blog.query.get(blog_id)
    if not blog:
        return jsonify({"error": "Blog not found"}), 404
    db.session.delete(blog)
    db.session.commit()
    return jsonify({"message": "Blog deleted"})
