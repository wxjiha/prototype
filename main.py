from src.preprocessing import load_data, preprocess_data, balance_data, split_data
from src.model_training import train_model, evaluate_model
from src.utils import save_model

def main():
    # Step 1: Load the dataset
    data = load_data()

    # Step 2: Preprocess the data
    X, y = preprocess_data(data)

    # Step 3: Balance the dataset
    X_resampled, y_resampled = balance_data(X, y)

    # Step 4: Split into training and testing sets
    X_train, X_test, y_train, y_test = split_data(X_resampled, y_resampled)

    # Step 5: Train the model
    model = train_model(X_train, y_train)

    # Step 6: Evaluate the model
    evaluate_model(model, X_test, y_test)

    # Step 7: Save the model for later use
    save_model(model, "fraud_detection_model.pkl")

if __name__ == "__main__":
    main()
