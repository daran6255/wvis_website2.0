from app import create_app
from app.config import Config  # If config.py is in app/

app = create_app()

if __name__ == '__main__':
    app.run(debug=True, host="0.0.0.0", port=5000)
