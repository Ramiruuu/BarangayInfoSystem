# Barangay Information & Reporting System

A web-based platform designed to streamline communication and services in a barangay (village) setting. This project leverages **Firebase** for real-time data management, **Tailwind CSS** for a modern UI, and **JavaScript** for dynamic functionality. It provides an efficient, paperless solution for barangay officials and residents to manage announcements, document requests, and incident reports—all at no cost and without requiring hardware.

## Features

- **Real-Time Announcements**: Barangay officials can post updates, events, or emergency notices, instantly visible to residents.
- **Online Document Requests**: Residents can request documents (e.g., barangay clearance, business permits) with approval/rejection tracking by officials.
- **Incident Reporting**: Residents can report community issues (e.g., broken streetlights, peace & order concerns) for quick resolution.
- **User Authentication**: Secure login and registration system for residents and admins using Firebase Authentication.
- **Role-Based Access**: Separate dashboards for residents and admins, ensuring appropriate access to features.

## Tech Stack

- **Frontend**: HTML, Tailwind CSS, JavaScript
- **Backend/Database**: Firebase (Firestore for data storage, Authentication for user management)
- **Real-Time Features**: Firebase Firestore’s real-time listeners
- **Hosting**: Static files (can be hosted locally or on Firebase Hosting)

## Prerequisites

- A modern web browser (e.g., Chrome, Firefox)
- Internet connection (for Firebase CDN and real-time updates)
- [Firebase account](https://firebase.google.com/) (free tier)

## Setup Instructions

1. **Clone the Repository**
   ```bash
   git clone https://github.com/Ramiruuuu/BarangayInfoSystem.git
   cd BarangayInfoSystem
   ```

2. **Set Up Firebase**
   - Go to the [Firebase Console](https://console.firebase.google.com/).
   - Create a new project (e.g., "BarangaySystem").
   - Enable **Authentication** (select Email/Password provider).
   - Enable **Firestore Database** in "Cloud Firestore" mode.
   - Copy your Firebase configuration from Project Settings > General > Your apps > Web app.

3. **Configure Firebase**
   - Open `firebase.js` and replace the `firebaseConfig` object with your Firebase project’s configuration:
     ```javascript
     const firebaseConfig = {
         apiKey: "your-api-key",
         authDomain: "your-auth-domain",
         projectId: "your-project-id",
         storageBucket: "your-storage-bucket",
         messagingSenderId: "your-messaging-sender-id",
         appId: "your-app-id"
     };
     ```

4. **Run Locally**
   - Use a local server (e.g., VS Code Live Server or `npx serve`):
     ```bash
     npx serve
     ```
   - Open your browser and navigate to `http://localhost:3000` (or the provided port).

5. **Optional: Deploy to Firebase Hosting**
   - Install Firebase CLI:
     ```bash
     npm install -g firebase-tools
     ```
   - Login and initialize hosting:
     ```bash
     firebase login
     firebase init hosting
     ```
   - Deploy:
     ```bash
     firebase deploy
     ```

## Project Structure

```
barangay-system/
├── index.html         # Landing page with login/register links
├── register.html      # User registration page
├── login.html         # User login page
├── dashboard.html     # Resident dashboard
├── admin.html         # Admin dashboard
├── logout.html        # Logout page
├── firebase.js        # Firebase configuration and logic
└── style.css          # Custom styles with Tailwind CSS
```

## Usage

1. **Register**: Create an account via `register.html` (defaults to "resident" role).
2. **Login**: Access your dashboard via `login.html`.
   - Residents: Redirected to `dashboard.html`.
   - Admins: Redirected to `admin.html`.
3. **Admin Setup**: Manually set a user’s role to "admin" in Firestore (`users` collection) via the Firebase Console.
4. **Explore Features**: Post announcements, request documents, or report incidents based on your role.

## Security Notes

- **Firebase Security Rules**: Update Firestore rules in the Firebase Console to secure data access. Example:
  ```json
  {
    "rules": {
      "users": {
        "$uid": {
          ".write": "auth.uid === $uid",
          ".read": "auth.uid === $uid"
        }
      },
      "announcements": {
        ".read": true,
        ".write": "data.child('role').val() === 'admin'"
      },
      "document_requests": {
        ".read": "data.child('role').val() === 'admin'",
        ".write": true
      },
      "incidents": {
        ".read": "data.child('role').val() === 'admin'",
        ".write": true
      }
    }
  }
  
- **Production**: Add input validation and error handling for a robust deployment.

## Contributing

Feel free to fork this repository, submit pull requests, or open issues for bugs and feature requests.

## License

This project is licensed under the [MIT License](LICENSE).

## Acknowledgments

- Built as a test capstone project idea for a no-cost, web-based barangay management system.
- Powered by [Firebase](https://firebase.google.com/) and [Tailwind CSS](https://tailwindcss.com/).
