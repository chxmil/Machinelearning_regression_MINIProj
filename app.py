#!/usr/bin/env python3
"""
LFPR Prediction Flask Application
================================

A Flask web application for predicting Labour Force Participation Rate (LFPR)
using the best trained XGBoost model.

Features:
- User-friendly form interface
- Real-time predictions
- Model performance display
- Responsive design with Tailwind CSS
"""

from flask import Flask, render_template, request, jsonify
import pandas as pd
import numpy as np
import joblib
from sklearn.preprocessing import StandardScaler
from sklearn.impute import SimpleImputer
import os

app = Flask(__name__)

# Global variables for model and preprocessor
model = None
preprocessor = None
feature_names = None

def load_model():
    """Load the best model and create preprocessor"""
    global model, preprocessor, feature_names
    
    try:
        # Load the best model
        model = joblib.load("best_model.joblib")
        print(f"✅ Model loaded successfully: {type(model).__name__}")
        
        # Load sample data to get feature names and create preprocessor
        df = pd.read_csv("data_encoded_fixed.csv")
        
        # Define feature columns (exclude target 'value')
        feature_columns = [col for col in df.columns if col != 'value']
        feature_names = feature_columns
        
        # Create preprocessor (same as used in training)
        preprocessor = StandardScaler()
        
        # Fit preprocessor on the data
        X = df[feature_columns]
        preprocessor.fit(X)
        
        print(f"✅ Preprocessor created with {len(feature_names)} features")
        print(f"   Features: {feature_names}")
        
        return True
        
    except Exception as e:
        print(f"❌ Error loading model: {str(e)}")
        return False

def preprocess_input(form_data):
    """Preprocess user input to match training data format"""
    try:
        # Create a dictionary with all features initialized to 0
        features = {name: 0 for name in feature_names}
        
        # Map form data to features
        features['year'] = int(form_data.get('year', 2567))
        features['edu_encoded'] = float(form_data.get('education', 0))
        
        # Area features (one-hot encoded)
        area = form_data.get('area', 'รวม')
        if area == 'นอกเขตเทศบาล':
            features['area_clean_นอกเขตเทศบาล'] = 1
        elif area == 'เขตเทศบาล':
            features['area_clean_เขตเทศบาล'] = 1
        else:  # รวม
            features['area_clean_รวม'] = 1
        
        # Sex features (one-hot encoded)
        sex = form_data.get('sex', 'รวม')
        if sex == 'ชาย':
            features['sex_clean_ชาย'] = 1
        elif sex == 'หญิง':
            features['sex_clean_หญิง'] = 1
        else:  # รวม
            features['sex_clean_รวม'] = 1
        
        # Quarter features (one-hot encoded)
        quarter = form_data.get('quarter', '1')
        for i in range(1, 5):
            features[f'quarter{i}'] = 1 if quarter == str(i) else 0
        
        # Convert to DataFrame
        df = pd.DataFrame([features])
        
        # Ensure correct column order
        df = df[feature_names]
        
        return df
        
    except Exception as e:
        print(f"❌ Error preprocessing input: {str(e)}")
        return None

@app.route('/')
def index():
    """Main page with prediction form"""
    return render_template('index.html')

@app.route('/predict', methods=['POST'])
def predict():
    """Handle prediction requests"""
    try:
        if model is None or preprocessor is None:
            return jsonify({
                'success': False,
                'error': 'Model not loaded. Please check server logs.'
            })
        
        # Get form data
        form_data = request.get_json()
        
        # Preprocess input
        X = preprocess_input(form_data)
        if X is None:
            return jsonify({
                'success': False,
                'error': 'Error preprocessing input data'
            })
        
        # Apply preprocessing (scaling)
        X_scaled = preprocessor.transform(X)
        
        # Make prediction
        prediction = model.predict(X_scaled)[0]
        
        # Convert to Python float to avoid JSON serialization issues
        prediction = float(prediction)
        
        # Ensure prediction is within reasonable bounds (0-100)
        prediction = max(0, min(100, prediction))
        
        return jsonify({
            'success': True,
            'prediction': round(prediction, 2),
            'interpretation': f'The predicted Labour Force Participation Rate is {prediction:.2f}%. This means {prediction:.2f}% of the working-age population (15 years and older) is participating in the labour market.'
        })
        
    except Exception as e:
        return jsonify({
            'success': False,
            'error': f'Prediction error: {str(e)}'
        })

@app.route('/model_info')
def model_info():
    """Return model information"""
    if model is None:
        return jsonify({
            'success': False,
            'error': 'Model not loaded'
        })
    
    return jsonify({
        'success': True,
        'model_type': type(model).__name__,
        'features': feature_names,
        'performance': {
            'r2_score': 0.8262,
            'mae': 2.90,
            'rmse': 6.20
        }
    })

if __name__ == '__main__':
    print("🚀 Starting LFPR Prediction Application...")
    
    # Load model on startup
    if load_model():
        print("✅ Application ready!")
        app.run(debug=True, host='0.0.0.0', port=5000)
    else:
        print("❌ Failed to load model. Application cannot start.")
