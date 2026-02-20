import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.preprocessing import LabelEncoder
from sklearn.metrics import accuracy_score, classification_report
import joblib
import json
import os

class CrimePredictor:
    def __init__(self):
        self.model = None
        self.encoders = {}
        
    def load_and_process_data(self, csv_path):
        """Load and process the CSV data"""
        df = pd.read_csv(csv_path)
        
        # Basic data cleaning
        df = df.dropna()
        
        # Extract time features if datetime columns exist
        if 'date' in df.columns:
            df['date'] = pd.to_datetime(df['date'])
            df['month'] = df['date'].dt.month
            df['day_of_week'] = df['date'].dt.dayofweek
            df['year'] = df['date'].dt.year
            
        if 'time' in df.columns:
            df['hour'] = pd.to_datetime(df['time'], format='%H:%M').dt.hour
            
        return df
    
    def prepare_features(self, df):
        """Prepare features for training"""
        # Identify categorical and numerical columns
        categorical_cols = df.select_dtypes(include=['object']).columns.tolist()
        numerical_cols = df.select_dtypes(include=[np.number]).columns.tolist()
        
        # Remove target column if exists
        if 'risk_level' in categorical_cols:
            categorical_cols.remove('risk_level')
        if 'crime_type' in categorical_cols and 'risk_level' not in df.columns:
            # Use crime_type as target if no risk_level
            target_col = 'crime_type'
        else:
            target_col = 'risk_level'
            
        # Encode categorical variables
        for col in categorical_cols:
            if col != target_col:
                le = LabelEncoder()
                df[col + '_encoded'] = le.fit_transform(df[col].astype(str))
                self.encoders[col] = le
                
        # Select features
        feature_cols = [col + '_encoded' for col in categorical_cols if col != target_col]
        feature_cols.extend([col for col in numerical_cols if col != target_col])
        
        X = df[feature_cols]
        y = df[target_col] if target_col in df.columns else df[categorical_cols[0]]
        
        return X, y, feature_cols
    
    def train(self, csv_path):
        """Train the model"""
        print("Loading data...")
        df = self.load_and_process_data(csv_path)
        print(f"Loaded {len(df)} records")
        
        print("Preparing features...")
        X, y, feature_cols = self.prepare_features(df)
        print(f"Features: {feature_cols}")
        
        # Split data
        X_train, X_test, y_train, y_test = train_test_split(
            X, y, test_size=0.2, random_state=42
        )
        
        print("Training model...")
        self.model = RandomForestClassifier(
            n_estimators=100,
            max_depth=10,
            random_state=42
        )
        
        self.model.fit(X_train, y_train)
        
        # Evaluate
        y_pred = self.model.predict(X_test)
        accuracy = accuracy_score(y_test, y_pred)
        
        print(f"Accuracy: {accuracy:.4f}")
        print("\nClassification Report:")
        print(classification_report(y_test, y_pred))
        
        # Save model and encoders
        os.makedirs('models', exist_ok=True)
        joblib.dump(self.model, 'models/crime_model.pkl')
        joblib.dump(self.encoders, 'models/encoders.pkl')
        
        # Save feature names and model info
        model_info = {
            'feature_cols': feature_cols,
            'accuracy': accuracy,
            'classes': list(self.model.classes_)
        }
        
        with open('models/model_info.json', 'w') as f:
            json.dump(model_info, f)
            
        print("Model saved successfully!")
        return accuracy

if __name__ == "__main__":
    predictor = CrimePredictor()
    
    # Train model with your CSV file
    csv_path = "../data/crime_data.csv"  # Adjust path to your CSV
    
    try:
        accuracy = predictor.train(csv_path)
        print(f"Model trained with accuracy: {accuracy:.4f}")
    except Exception as e:
        print(f"Error training model: {e}")