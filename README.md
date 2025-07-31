🩸 BloodLink - Blood Bank Management System
A powerful web-based platform that bridges the gap between blood donors and recipients, empowering administrators to manage everything seamlessly.

..........................................................................................................

🌟 Key Features :-

👤 Donors -
📝 Register & manage profile (with blood type, age & location)
🧾 View donation history
🔔 Get alerts for matching blood requests
📊 Personal donation dashboard


🧑‍⚕️ Recipients -
📢 Request blood with urgency & type
🔍 Track request status & history
🧬 Match with nearby compatible donors
📜 View past requests

🛡️ Admins -
🗃️ Manage blood inventory
👥 Manage users (donors/recipients)
✅ Approve or reject blood requests
📈 System-wide reports and analytics

..........................................................................................................

⚙️ Tech Stack :-

💻 Frontend
HTML5, CSS3, JavaScript (ES6+)
Font Awesome for icons ⭐

🔧 Backend
Node.js, Express.js
MongoDB + Mongoose
JWT for Auth 🔐
bcrypt.js for password security 🔑

..........................................................................................................

📁 Project Structure

BloodBankManagementSystem/
├── client/                     # Frontend application
│   ├── css/
│   │   └── style.css          # Main stylesheet
│   ├── js/
│   │   ├── admin.js           # Admin dashboard functionality
│   │   ├── auth.js            # Authentication logic
│   │   ├── donor.js           # Donor dashboard functionality
│   │   └── recipient.js       # Recipient dashboard functionality
│   ├── admin-dashboard.html   # Admin dashboard page
│   ├── donor-dashboard.html   # Donor dashboard page
│   ├── index.html             # Landing page
│   ├── login.html             # Login page
│   ├── recipient-dashboard.html # Recipient dashboard page
│   └── register.html          # Registration page
└── server/                    # Backend application
    ├── controllers/           # Route controllers
    │   ├── adminController.js
    │   ├── authController.js
    │   ├── donorController.js
    │   └── recipientController.js
    ├── middleware/            # Custom middleware
    │   ├── authMiddleware.js  # Authentication middleware
    │   └── roleMiddleware.js  # Role-based access control
    ├── models/               # Database models
    │   ├── Donation.js
    │   ├── Inventory.js
    │   ├── Request.js
    │   └── User.js
    ├── routes/               # API routes
    │   ├── adminRoutes.js
    │   ├── authRoutes.js
    │   ├── donorRoutes.js
    │   └── recipientRoutes.js
    ├── package.json          # Backend dependencies
    └── server.js             # Main server file

..........................................................................................................

📡 API Overview :-
🔐 Auth:
POST /api/auth/register – Register user
POST /api/auth/login – Login user
GET /api/auth/profile – Fetch profile

❤️ Donor:
GET /api/donor/dashboard – Donor stats
POST /api/donor/donate – Submit donation
GET /api/donor/donations – Donation history
GET /api/donor/requests – Matching requests

🩺 Recipient:
GET /api/recipient/dashboard – Request overview
POST /api/recipient/request – Create request
GET /api/recipient/requests – Request history
GET /api/recipient/donors – Match donors

👨‍💼 Admin:
GET /api/admin/dashboard – Admin overview
GET /api/admin/users – All users
GET /api/admin/inventory – Blood inventory
PUT /api/admin/approve-request – Approve request
DELETE /api/admin/delete-user – Delete account

..........................................................................................................

🛡️ Security Highlights :-

🔒 Passwords encrypted with bcrypt
🔐 JWT-based login sessions
🧑‍⚖️ Role-based access control
🧼 Input validation for safety
🌍 CORS protection

..........................................................................................................

📊 Database Models :-

🧑 User:
name, email, password, role, bloodType, age, location, timestamps

💉 Donation:
donorId, bloodType, quantity, status, donationDate, timestamps

🆘 Request:
recipientId, bloodType, quantity, urgency, status, timestamps

🩸 Inventory:
bloodType, availableUnits, reservedUnits, lastUpdated

..........................................................................................................

💡 Future Plans :-

 🔔 Real-time alerts (WebSocket)
 📱 Mobile App
 📊 Advanced reports & charts
 🏥 Integration with other blood banks
 ✉️ SMS/Email notifications
 🧪 Compatibility calculator
 🚨 Emergency request handling
 🏅 Donor rewards & badges

..........................................................................................................

🚧 Development

### Running in Development Mode

bash--

# Backend (with auto-restart)
cd server
npm start

# Frontend
# Open client/index.html in browser or use a local server

..........................................................................................................

🤝 Contribute :
🍴 Fork the project
🌿 Create your feature branch
✅ Commit & push your changes
📬 Submit a Pull Request

Have a question or suggestion?Text Me...

----------------------------------------------------------------------------------------------------------

 BloodLink – Where hope meets humanity. 🩸✨