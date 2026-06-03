 Secure Web Application – App_Final

 Description

A secure web application developed as part of the Application Security and Secure Code course. This app demonstrates secure coding practices including authentication, input validation, encryption, role-based access -control, and threat modeling.

---

 Tech Stack
. Frontend: HTML5
. Backend: Node.js with Express
. Database: MongoDB Atlas
. Authentication: JWT + bcrypt
. Deployment: GitHub

---

Features
 User Registration/Login
. Role-based access: Admin/Manager/User
. Session management
. Password hashing using bcrypt
. Encryption of sensitive data
. Input validation and sanitization
. STRIDE & DREAD security modeling
. Code scanning using CodeQL

---

Security Implementations
. Input Validation: validator.js
. Password Hashing: bcrypt
. Encryption: AES-256-CBC for sensitive fields
. Session Management: JWT expiry 1h
. Headers: Helmet for CSP, XSS protection
. CORS and rate limiting setup
. Role-based Authorization

---

Threat Modeling
See `docs/STRIDE_Threat_Model.md`
See `docs/DREAD_Risk_Assessment.md`

---

 Code Scanning Tools Used
. [x] GitHub CodeQL

---

Deployment
Link: https://github.com/abfs14777-oss/App_Final

Instructions:
```bash
git clone https://github.com/abfs14777-oss/App_Final.git
cd App_Final
npm install
node src/index.js
```

