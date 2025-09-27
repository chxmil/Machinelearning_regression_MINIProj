#!/bin/bash

# LFPR Prediction App Deployment Setup Script
# This script helps set up the application for deployment

echo "🚀 LFPR Prediction App - Deployment Setup"
echo "=========================================="

# Check if we're in the right directory
if [ ! -f "app.py" ]; then
    echo "❌ Error: app.py not found. Please run this script from the project root directory."
    exit 1
fi

echo "✅ Found app.py"

# Check if model file exists
if [ ! -f "best_model.joblib" ]; then
    echo "⚠️  Warning: best_model.joblib not found. Make sure to include this file for deployment."
else
    echo "✅ Found best_model.joblib"
fi

# Check if data file exists
if [ ! -f "data_encoded_fixed.csv" ]; then
    echo "⚠️  Warning: data_encoded_fixed.csv not found. Make sure to include this file for deployment."
else
    echo "✅ Found data_encoded_fixed.csv"
fi

# Create .gitignore if it doesn't exist
if [ ! -f ".gitignore" ]; then
    echo "📝 Creating .gitignore file..."
    cat > .gitignore << EOF
# Python
__pycache__/
*.py[cod]
*$py.class
*.so
.Python
build/
develop-eggs/
dist/
downloads/
eggs/
.eggs/
lib/
lib64/
parts/
sdist/
var/
wheels/
*.egg-info/
.installed.cfg
*.egg

# Virtual Environment
venv/
env/
ENV/

# IDE
.vscode/
.idea/
*.swp
*.swo

# OS
.DS_Store
Thumbs.db

# Logs
*.log

# Environment variables
.env
.env.local
.env.production

# Temporary files
*.tmp
*.temp
EOF
    echo "✅ Created .gitignore"
else
    echo "✅ .gitignore already exists"
fi

# Check if all required files exist
echo ""
echo "📋 Deployment Files Checklist:"
echo "=============================="

files=("app.py" "requirements.txt" "Procfile" "runtime.txt" "templates/index.html" "static/js/app.js" "index.html" "DEPLOYMENT.md")

for file in "${files[@]}"; do
    if [ -f "$file" ]; then
        echo "✅ $file"
    else
        echo "❌ $file (missing)"
    fi
done

echo ""
echo "🎯 Next Steps:"
echo "============="
echo "1. Choose your deployment platform (Heroku, Railway, Render, etc.)"
echo "2. Follow the instructions in DEPLOYMENT.md"
echo "3. For Heroku:"
echo "   - Install Heroku CLI"
echo "   - Run: heroku login"
echo "   - Run: heroku create your-app-name"
echo "   - Run: git push heroku main"
echo ""
echo "4. For GitHub Pages:"
echo "   - Enable Pages in repository settings"
echo "   - Select main branch and root folder"
echo "   - Your site will be at: https://yourusername.github.io/Machinelearning_regression_MINIProj"
echo ""
echo "5. Update deployment URLs in index.html once you have your live app"
echo ""
echo "📚 For detailed instructions, see DEPLOYMENT.md"
echo ""
echo "✨ Setup complete! Happy deploying! 🚀"
