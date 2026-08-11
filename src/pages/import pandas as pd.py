import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LinearRegression
from sklearn import metrics

# Load the dataset directly from DigiSkills LMS
url = "https://lms.digiskills.pk/Courses/AIP301/Downloads/HousePricePrediction.csv"
try:
    df = pd.read_csv(url)
    print("Dataset loaded successfully!")
except Exception as e:
    print("Error loading online dataset. Please ensure 'HousePricePrediction.csv' is in your directory.")
    df = pd.read_csv("HousePricePrediction.csv")

# Identify features (X) and target variable (y)
# (Assuming 'Price' is the target column based on the dataset)
X = df.drop(columns=['Price'])
y = df['Price']

# =========================================================
# Task 1: Train-Test Split (80% Training, 20% Testing)
# =========================================================
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

print("\n--- Task 1: Train-Test Split ---")
print(f"Total dataset samples: {df.shape[0]}")
print(f"Training feature set size: {X_train.shape}")
print(f"Testing feature set size: {X_test.shape}")

# =========================================================
# Task 2: Model Training
# =========================================================
model = LinearRegression()
model.fit(X_train, y_train)

print("\n--- Task 2: Model Training ---")
print("Linear Regression model trained successfully using training split data.")

# =========================================================
# Task 3: Model Prediction
# =========================================================
y_pred = model.predict(X_test)

print("\n--- Task 3: Model Prediction ---")
print("Predictions successfully generated for the testing subset.")
# Display first 5 values side by side for confirmation
preview_df = pd.DataFrame({'Actual Price': y_test.values[:5], 'Predicted Price': y_pred[:5]})
print(preview_df.to_string(index=False))

# =========================================================
# Task 4: Model Evaluation
# =========================================================
mae = metrics.mean_absolute_error(y_test, y_pred)
mse = metrics.mean_squared_error(y_test, y_pred)
rmse = np.sqrt(mse)
r2 = metrics.r2_score(y_test, y_pred)

print("\n--- Task 4: Model Evaluation Metrics ---")
print(f"Mean Absolute Error (MAE): {mae:.2f}")
print(f"Mean Squared Error (MSE): {mse:.2f}")
print(f"Root Mean Squared Error (RMSE): {rmse:.2f}")
print(f"R² Score: {r2:.4f}")