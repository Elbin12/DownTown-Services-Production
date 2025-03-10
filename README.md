# DownTown-Services-Production

A **home service booking platform** where users can connect with verified service providers offering services like plumbing, electrical work, home cleaning, and more. Built using **Django (Backend) & React (Frontend)** with JWT authentication.

## 🚀 Features
- 🔐 **User & Worker Authentication** (JWT)
- 📌 **Location-based service suggestions** (Google Places API)
- 📊 **Comprehensive admin dashboard**
- 💬 **Real-time notifications and chat** (WebSocket)
- ⏳ **Background tasks** (Celery & Redis)
- ☁️ **Profile image storage** (AWS S3)
- 💳 **Secure payment processing** (Stripe)

---

## 🛠️ Technologies Used
- **Backend:** Django, Django REST Framework, Celery, Redis
- **Frontend:** React, Redux, Tailwind CSS
- **Database:** PostgreSQL
- **Authentication:** JWT (JSON Web Tokens)
- **Deployment:** Docker, Nginx, Gunicorn, Google Cloud Platform (GCP)
- **Others:** Google Places API (for location suggestions)

---

## 📦 Installation & Setup

### **1️⃣ Clone the Repository**
```bash
git clone <repository-url>
cd DownTown-Services-Production
```
### **2️⃣ Set Up Environment Variables**
Backend .env File
Create a .env file inside backend/downtown_services/:

```sh
SECRET_KEY=your_secret_key
POSTGRES_DB=your_db_name
POSTGRES_USER=your_db_user
POSTGRES_PASSWORD=your_db_password
DB_HOST=your_db_host
DB_PORT=5432

EMAIL_HOST_USER=your_email
EMAIL_HOST_PASSWORD=your_email_password

AWS_ACCESS_KEY_ID=your_aws_key
AWS_SECRET_ACCESS_KEY=your_aws_secret
AWS_STORAGE_BUCKET_NAME=your_bucket_name
AWS_S3_REGION_NAME=your_region

STRIPE_SECRET_KEY=your_stripe_secret_key

CELERY_BROKER_URL=redis://redis:6379

BACKEND_BASE_URL=http://localhost:8000
FRONTEND_BASE_URL=http://localhost:3000
```
Frontend .env File
Create a .env file inside frontend/:

```sh
REACT_APP_GOOGLE_LOCATION_API=your_google_api_key
REACT_APP_STRIPE_PUBLISH_KEY=your_stripe_publishable_key
REACT_APP_API_URL=http://127.0.0.1:8000/
REACT_APP_DOMAIN=127.0.0.1:8000
```
### **3️⃣ Backend Setup**
```sh
cd DownTown-Services-Backend/
python3 -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
```
### **4️⃣ Frontend Setup**
```sh
cd DownTown-Services-Frontend/frontend
npm install
npm start
```

### **🎉 You're All Set!**

Your DownTown-Services-Production platform is now up and running! 🚀 Users can seamlessly connect with verified service providers, ensuring high-quality home services with secure authentication, real-time interactions, and efficient background task processing.

Whether you're a developer contributing to the project or a user exploring its features, this setup will provide a smooth experience.

Happy coding! 💻✨ If you encounter any issues, feel free to explore the documentation or raise a query in the project repository.

Enjoy building and scaling your home service platform! 🏡🔧