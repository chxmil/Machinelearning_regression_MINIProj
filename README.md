# LFPR Prediction Application

A Flask web application for predicting Labour Force Participation Rate (LFPR) using machine learning.

## 🎯 What is LFPR?

The Labour Force Participation Rate (LFPR) measures the share of the working-age population (15 years and older) that is in the labour force (employed, unemployed, or seasonally unemployed). It is expressed as a percentage (0–100%).

**Example:** If the model predicts 65%, it means 65% of the working-age population is participating in the labour market.

## 🚀 Features

- **Modern Web Interface**: Built with Flask, HTML, CSS (Tailwind), and JavaScript
- **Real-time Predictions**: Get instant LFPR predictions based on input parameters
- **User-friendly Form**: Intuitive interface with validation and error handling
- **Model Performance Display**: Shows R² score, MAE, and RMSE metrics
- **Responsive Design**: Works on desktop and mobile devices
- **Sample Data**: Quick testing with predefined sample inputs

## 📊 Model Information

- **Algorithm**: XGBoost Regressor
- **Performance Metrics**:
  - R² Score: 0.8262 (82.62% variance explained)
  - MAE: 2.90 (Mean Absolute Error)
  - RMSE: 6.20 (Root Mean Square Error)
- **Training Data**: 5,603 samples from Thailand Open Data
- **Features**: 13 encoded variables including year, education, area, gender, and quarter

## 🛠️ Installation

1. **Clone or download the project files**

2. **Install dependencies**:
   ```bash
   pip install -r requirements.txt
   ```

3. **Ensure you have the required files**:
   - `best_model.joblib` - The trained XGBoost model
   - `data_encoded_fixed.csv` - Preprocessed training data

## 🏃‍♂️ Running the Application

1. **Start the Flask server**:
   ```bash
   python app.py
   ```

2. **Open your web browser** and navigate to:
   ```
   http://localhost:5000
   ```

3. **Use the prediction form** to get LFPR predictions!

## 📝 Input Parameters

The application requires the following inputs:

- **Year**: Thai Buddhist calendar year (2550-2580)
- **Education Level**: 13 levels from "ไม่มีการศึกษา" to "รวม"
- **Area**: Geographic area (รวม, เขตเทศบาล, นอกเขตเทศบาล)
- **Gender**: Population group (รวม, ชาย, หญิง)
- **Quarter**: Time period (ไตรมาสที่ 1-4)

## 🎨 Interface Features

- **Gradient Background**: Beautiful blue gradient design
- **Interactive Form**: Real-time validation and error handling
- **Loading Animations**: Smooth loading spinners during prediction
- **Result Display**: Clear prediction results with interpretation
- **Model Metrics**: Performance indicators for transparency
- **Responsive Layout**: Adapts to different screen sizes

## 📁 Project Structure

```
├── app.py                 # Flask application
├── templates/
│   └── index.html        # Main HTML template
├── static/
│   └── js/
│       └── app.js        # JavaScript functionality
├── best_model.joblib     # Trained XGBoost model
├── data_encoded_fixed.csv # Preprocessed data
├── requirements.txt      # Python dependencies
└── README.md            # This file
```

## 🔧 Technical Details

- **Backend**: Flask (Python web framework)
- **Frontend**: HTML5, Tailwind CSS, JavaScript
- **ML Model**: XGBoost Regressor
- **Data Processing**: Pandas, NumPy, Scikit-learn
- **Preprocessing**: StandardScaler for feature normalization

## 📊 Data Source

- **Original Source**: Thailand Open Data (data.go.th)
- **Agency**: National Statistical Office of Thailand
- **Dataset**: Labour Force Participation Rate data
- **Preprocessing**: One-hot encoding for categorical variables

## 🎯 Use Cases

- **Policy Planning**: Forecast LFPR for policy decisions
- **Research**: Academic research on labour market trends
- **Business Intelligence**: Workforce planning and analysis
- **Government Agencies**: Economic planning and monitoring

## ⚠️ Important Notes

- The model is trained on Thai data and may not generalize to other countries
- Predictions are based on historical patterns and should be used as guidance
- The model has an MAE of 2.90, meaning predictions are typically within ±2.9 percentage points
- For critical decisions, consider consulting domain experts

## 🤝 Contributing

Feel free to submit issues, feature requests, or pull requests to improve the application.

## 📄 License

This project is for educational and research purposes. Please ensure compliance with data usage policies when using the model for production purposes.

---

**Built with ❤️ using Flask, XGBoost, and modern web technologies**
