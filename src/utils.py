import joblib

def save_model(model, filename):
    """Save the trained model to a file."""
    joblib.dump(model, filename)

def load_model(filename):
    """Load a saved model from a file."""
    return joblib.load(filename)
