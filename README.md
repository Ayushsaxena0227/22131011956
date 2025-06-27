# Backend Evaluation Submission – 22131011956

This repository contains the backend submission for the Full Stack or Backend Track as a part of the Affordmed evaluation.

##  Folder Structure

22131011956/ ├── Logging Middleware/ │ ├── index.js │ ├── auth.js │ ├── store.js │ ├── package.json │ ├── .gitignore │ ├── routes/ │ │ └── shortner.js │ ├── middleware/ │ │ └── logger.js │ ├── utils/ │ │ └── logger.js │ └── Screenshots/ │ └──All Postman API tests with request + response │ └── Backend Test Submission/ └── (Intentionally left empty as per submission guidelines)


---

##  Project Summary

###  **Logging Middleware**
This module logs API requests automatically using an Express middleware and a reusable `Log()` function:
- Sends logs to `http://20.244.56.144/evaluation-service/logs`
- Uses Bearer Token for secure logging
- Logs include level (`debug`, `error`), stack name (`backend`), and request message (`GET /shorturls/:code`)

###  **API Functionalities** (`routes/shortner.js`)
- `POST /shorturls` → Shorten a long URL
- `GET /:code` → Redirect to original URL
- `GET /shorturls/:code` → Fetch click stats

---

 Getting Started
# Install Dependencies
```bash
npm install
▶️ Start Server
node index.js

Server starts at: http://localhost:3000

Testing
Use Postman or any API client to test the API.
 Screenshots of all endpoints and logger response are available under:

Logging Middleware/Screenshots/
Example screenshots include:

Logging payloads sent to the server
Auth token response
POST and GET API requests, responses & times
API Test Samples
Method	Endpoint	Description
POST	/shorturls	Create short URL
GET	/:code	Redirect to original URL
GET	/shorturls/:code	Get stats for a shortcode
 Note
node_modules/ is excluded using .gitignore
Auth credentials used only for test server log upload
This repo contains no mentions of Affordmed inside files or folders
 Submission Metadata
 Roll Number: 22131011956
 Track: Backend Track
 Fulfills required folder structure and code quality guidelines
