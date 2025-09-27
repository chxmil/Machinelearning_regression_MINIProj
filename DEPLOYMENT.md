# LFPR Prediction Tool - Deployment Guide

This guide provides multiple deployment options for your Flask web application.

## 🚀 Quick Deployment Options

### Option 1: Heroku (Recommended for beginners)

1. **Create Heroku Account**
   - Go to [heroku.com](https://heroku.com) and sign up
   - Install Heroku CLI from [devcenter.heroku.com](https://devcenter.heroku.com/articles/heroku-cli)

2. **Prepare for Deployment**
   ```bash
   # Create Procfile
   echo "web: gunicorn app:app" > Procfile
   
   # Create runtime.txt
   echo "python-3.9.18" > runtime.txt
   
   # Update requirements.txt (add gunicorn)
   echo "gunicorn==21.2.0" >> requirements.txt
   ```

3. **Deploy to Heroku**
   ```bash
   # Login to Heroku
   heroku login
   
   # Create new app
   heroku create your-app-name
   
   # Set environment variables (if needed)
   heroku config:set FLASK_ENV=production
   
   # Deploy
   git add .
   git commit -m "Deploy to Heroku"
   git push heroku main
   ```

### Option 2: Railway

1. **Create Railway Account**
   - Go to [railway.app](https://railway.app) and sign up
   - Connect your GitHub account

2. **Deploy**
   - Click "New Project" → "Deploy from GitHub repo"
   - Select your repository
   - Railway will automatically detect Flask and deploy

### Option 3: Render

1. **Create Render Account**
   - Go to [render.com](https://render.com) and sign up
   - Connect your GitHub account

2. **Deploy**
   - Click "New" → "Web Service"
   - Connect your GitHub repository
   - Use these settings:
     - **Build Command**: `pip install -r requirements.txt`
     - **Start Command**: `gunicorn app:app`

### Option 4: PythonAnywhere

1. **Create PythonAnywhere Account**
   - Go to [pythonanywhere.com](https://pythonanywhere.com) and sign up

2. **Upload Files**
   - Upload all your files to PythonAnywhere
   - Install dependencies in the console

3. **Configure Web App**
   - Go to Web tab
   - Create new web app
   - Choose Flask and Python 3.9
   - Point to your app.py file

## 📁 GitHub Pages (Static Demo)

Your repository is already set up for GitHub Pages with a static demo version.

1. **Enable GitHub Pages**
   - Go to your repository settings
   - Scroll to "Pages" section
   - Select "Deploy from a branch"
   - Choose "main" branch and "/ (root)" folder
   - Save

2. **Access Your Site**
   - Your site will be available at: `https://yourusername.github.io/Machinelearning_regression_MINIProj`

## 🔧 Configuration Files

### Procfile (for Heroku)
```
web: gunicorn app:app
```

### runtime.txt (for Heroku)
```
python-3.9.18
```

### Updated requirements.txt
```
Flask==2.3.3
pandas==2.0.3
numpy==1.24.3
scikit-learn==1.3.0
joblib==1.3.2
xgboost==1.7.6
openpyxl==3.1.2
gunicorn==21.2.0
```

## 🔐 Environment Variables

If you need to set environment variables:

### Heroku
```bash
heroku config:set VARIABLE_NAME=value
```

### Railway
- Add in the Railway dashboard under "Variables" tab

### Render
- Add in the Render dashboard under "Environment" tab

## 📊 Monitoring and Logs

### Heroku
```bash
# View logs
heroku logs --tail

# View app info
heroku info
```

### Railway
- View logs in the Railway dashboard

### Render
- View logs in the Render dashboard

## 🚨 Troubleshooting

### Common Issues

1. **Model Loading Error**
   - Ensure `best_model.joblib` is in the root directory
   - Check file permissions

2. **Memory Issues**
   - Consider using a smaller model
   - Optimize data loading

3. **Dependency Issues**
   - Check Python version compatibility
   - Update requirements.txt

4. **Static Files Not Loading**
   - Ensure proper file structure
   - Check Flask static folder configuration

### Debug Mode

For local testing:
```bash
python app.py
```

For production, ensure `debug=False` in your deployment.

## 📈 Performance Optimization

1. **Model Optimization**
   - Use model compression techniques
   - Consider quantization for smaller models

2. **Caching**
   - Implement Redis for caching predictions
   - Use Flask-Caching for static content

3. **CDN**
   - Use CloudFlare or similar for static assets
   - Optimize images and CSS

## 🔄 Continuous Deployment

The GitHub Actions workflow will automatically deploy when you push to the main branch (if configured with secrets).

### Required Secrets (for GitHub Actions)

- `HEROKU_API_KEY`: Your Heroku API key
- `HEROKU_APP_NAME`: Your Heroku app name
- `RAILWAY_TOKEN`: Your Railway token (if using Railway)

## 📞 Support

If you encounter issues:

1. Check the logs of your deployment platform
2. Verify all files are uploaded correctly
3. Ensure all dependencies are installed
4. Check environment variables

## 🎯 Next Steps

1. Choose your preferred deployment platform
2. Follow the specific instructions above
3. Test your deployed application
4. Share the link with users
5. Monitor performance and usage

---

**Note**: Remember to update the deployment URLs in your static demo (`index.html`) once you have your live application deployed.
