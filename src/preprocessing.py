import pandas as pd
from sklearn.preprocessing import StandardScaler
from sklearn.model_selection import train_test_split
from imblearn.over_sampling import SMOTE
from src.config import DATA_PATH

def load_data():
    """Load the dataset from the CSV file."""
    data = pd.read_csv(DATA_PATH)
    return data

def preprocess_data(data):
    """Clean and preprocess the dataset."""
    # Check for missing values
    if data.isnull().sum().any():
        data = data.dropna()

    # Normalize 'Amount' feature
    scaler = StandardScaler()
    data['Normalized_Amount'] = scaler.fit_transform(data['Amount'].values.reshape(-1, 1))
    data = data.drop('Amount', axis=1)

    # Drop unnecessary columns if needed (adjust as required)
    # Example: data = data.drop(['Time'], axis=1)

    # Split into features and labels
    X = data.drop('Class', axis=1)
    y = data['Class']
    return X, y

def balance_data(X, y):
    """Handle imbalanced data using SMOTE."""
    smote = SMOTE(random_state=42)
    X_resampled, y_resampled = smote.fit_resample(X, y)
    return X_resampled, y_resampled

def split_data(X, y):
    """Split the dataset into training and testing sets."""
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.3, random_state=42)
    return X_train, X_test, y_train, y_test
