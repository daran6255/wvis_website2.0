import re

def clean_text(text):
    """Perform basic text cleaning and preprocessing."""
    # Remove extra spaces, tabs, and newlines
    text = re.sub(r"\s+", " ", text).strip()
    
    # Remove special characters except basic punctuation (.,!?)
    text = re.sub(r"[^\w\s.,!?]", "", text)
    
    # Convert to lowercase
    text = text.lower()
    
    return text
