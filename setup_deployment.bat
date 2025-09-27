@echo off
REM LFPR Prediction App Deployment Setup Script for Windows
REM This script helps set up the application for deployment

echo 🚀 LFPR Prediction App - Deployment Setup
echo ==========================================

REM Check if we're in the right directory
if not exist "app.py" (
    echo ❌ Error: app.py not found. Please run this script from the project root directory.
    pause
    exit /b 1
)

echo ✅ Found app.py

REM Check if model file exists
if not exist "best_model.joblib" (
    echo ⚠️  Warning: best_model.joblib not found. Make sure to include this file for deployment.
) else (
    echo ✅ Found best_model.joblib
)

REM Check if data file exists
if not exist "data_encoded_fixed.csv" (
    echo ⚠️  Warning: data_encoded_fixed.csv not found. Make sure to include this file for deployment.
) else (
    echo ✅ Found data_encoded_fixed.csv
)

REM Create .gitignore if it doesn't exist
if not exist ".gitignore" (
    echo 📝 Creating .gitignore file...
    (
        echo # Python
        echo __pycache__/
        echo *.py[cod]
        echo *$py.class
        echo *.so
        echo .Python
        echo build/
        echo develop-eggs/
        echo dist/
        echo downloads/
        echo eggs/
        echo .eggs/
        echo lib/
        echo lib64/
        echo parts/
        echo sdist/
        echo var/
        echo wheels/
        echo *.egg-info/
        echo .installed.cfg
        echo *.egg
        echo.
        echo # Virtual Environment
        echo venv/
        echo env/
        echo ENV/
        echo.
        echo # IDE
        echo .vscode/
        echo .idea/
        echo *.swp
        echo *.swo
        echo.
        echo # OS
        echo .DS_Store
        echo Thumbs.db
        echo.
        echo # Logs
        echo *.log
        echo.
        echo # Environment variables
        echo .env
        echo .env.local
        echo .env.production
        echo.
        echo # Temporary files
        echo *.tmp
        echo *.temp
    ) > .gitignore
    echo ✅ Created .gitignore
) else (
    echo ✅ .gitignore already exists
)

REM Check if all required files exist
echo.
echo 📋 Deployment Files Checklist:
echo ==============================

if exist "app.py" (echo ✅ app.py) else (echo ❌ app.py ^(missing^))
if exist "requirements.txt" (echo ✅ requirements.txt) else (echo ❌ requirements.txt ^(missing^))
if exist "Procfile" (echo ✅ Procfile) else (echo ❌ Procfile ^(missing^))
if exist "runtime.txt" (echo ✅ runtime.txt) else (echo ❌ runtime.txt ^(missing^))
if exist "templates\index.html" (echo ✅ templates\index.html) else (echo ❌ templates\index.html ^(missing^))
if exist "static\js\app.js" (echo ✅ static\js\app.js) else (echo ❌ static\js\app.js ^(missing^))
if exist "index.html" (echo ✅ index.html) else (echo ❌ index.html ^(missing^))
if exist "DEPLOYMENT.md" (echo ✅ DEPLOYMENT.md) else (echo ❌ DEPLOYMENT.md ^(missing^))

echo.
echo 🎯 Next Steps:
echo =============
echo 1. Choose your deployment platform ^(Heroku, Railway, Render, etc.^)
echo 2. Follow the instructions in DEPLOYMENT.md
echo 3. For Heroku:
echo    - Install Heroku CLI
echo    - Run: heroku login
echo    - Run: heroku create your-app-name
echo    - Run: git push heroku main
echo.
echo 4. For GitHub Pages:
echo    - Enable Pages in repository settings
echo    - Select main branch and root folder
echo    - Your site will be at: https://yourusername.github.io/Machinelearning_regression_MINIProj
echo.
echo 5. Update deployment URLs in index.html once you have your live app
echo.
echo 📚 For detailed instructions, see DEPLOYMENT.md
echo.
echo ✨ Setup complete! Happy deploying! 🚀
pause
