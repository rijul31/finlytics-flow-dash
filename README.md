# Finlytics Flow Dashboard

A modern, full-stack financial analytics dashboard built with React, Vite, TypeScript, TailwindCSS, and a Node.js/Express backend. The dashboard provides deep insights into financial transactions, customizable data visualizations, and robust export features.

---

## Table of Contents

* [Features](#features)
* [Novel Features](#novel-features)
* [Implementation Details](#implementation-details)
* [How to Run the Website](#how-to-run-the-website)
* [Getting Started](#getting-started)
* [Project Structure](#project-structure)
* [API Documentation](#api-documentation)
* [Future Scope](#future-scope)
* [License](#license)

---

## Features

* **User Authentication:** Secure login and registration.
* **Financial Analytics:** Visualize key metrics (growth, expense ratio, profit margin, diversification index).
* **Transaction Management:** View, filter, and manage transactions.
* **Charts & Visualizations:** Overview, category, and revenue charts.
* **Export Data:** Export transactions as CSV (with column selection) and PowerPoint (PPT) slides.
* **Customizable Graphs:** Generate and export custom graphs based on user-selected parameters.
* **Encrypted Backend Data:** All sensitive transaction data is encrypted before being saved in the database and decrypted dynamically when rendered in the frontend.

---

## Novel Features

### 1. Customizable Graph Generation Page

* **Location:** `src/pages/CustomGraphPage.tsx`
* **Description:** Users can create custom graphs by selecting X and Y axes from multiple options (month, week, people, category, status, date, etc.). The page supports various chart types and allows users to visualize their data in a way that best fits their needs.
* **Implementation:** Uses recharts for rendering interactive charts. Data can be filtered and grouped dynamically based on user input.

### 2. Export to CSV

* **Location:** `src/components/ExportModal.tsx`
* **Description:** Users can export transaction data to CSV, selecting which columns to include. The export is instant and works client-side for privacy and speed.
* **Implementation:** Uses browser APIs to generate and download CSV files. The backend also supports CSV export via an API endpoint for larger datasets.

### 3. Export to PowerPoint (PPT)

* **Description:** (Planned/Prototype) Users can export selected charts and analytics as PowerPoint slides for presentations and reporting.
* **Implementation:** (Planned) Will use libraries like PptxGenJS to generate PPTX files from chart data and user selections.

---

## Implementation Details

### Frontend

* **Framework:** React + Vite + TypeScript
* **UI:** TailwindCSS, shadcn/ui, Radix UI components
* **Charts:** Recharts for interactive data visualizations
* **State Management:** React hooks and context
* **Export Modal:** Allows column selection and instant CSV download

### Backend

* **Framework:** Node.js + Express
* **Database:** MongoDB (via Mongoose)
* **CSV Export:** Uses csv-writer to generate CSVs server-side for large or filtered exports
* **API Structure:** RESTful endpoints for analytics, transactions, authentication, and export
* **Encryption:** Sensitive fields such as `amount` and `description` are encrypted before storing in the database and decrypted when retrieved through the API

---

## How to Run the Website

To launch the complete project locally, follow these steps:

### 1. Clone the repository and navigate to the project folder

```bash
git clone https://github.com/yourusername/finlytics-flow-dash.git
cd finlytics-flow-dash
```

### 2. Install dependencies for both frontend and backend

```bash
# Install frontend dependencies
npm install

# Navigate to backend and install backend dependencies
cd backend
npm install
```

### 3. Create your environment file in the backend

Copy `.env.example` to `.env` and fill in required details:

* `PORT=5000`
* `MONGO_URI=your_mongodb_connection_string`
* `JWT_SECRET=your_jwt_secret`
* `ENCRYPTION_KEY=32_byte_encryption_key_in_hex`

### 4. Start the backend server

```bash
npm run dev
```

### 5. Open a new terminal and start the frontend

```bash
cd .. # go back to root if you're still in backend
npm run dev
```

### 6. Visit the website

Open your browser and go to:

```
http://localhost:5173
```

Log in with the seeded credentials or register as a new user.

---

## Getting Started

### 1. Install dependencies

```bash
npm install
cd backend && npm install
```

### 2. Run the backend

```bash
cd backend
npm run dev
```

### 3. Run the frontend

```bash
cd ..
npm run dev
```
---

## Project Structure

```
finlytics-flow-dash/
├── backend/                # Node.js/Express backend
│   ├── src/
│   │   ├── controllers/    # Route controllers
│   │   ├── middleware/     # Auth and other middleware
│   │   ├── models/         # Mongoose models
│   │   ├── routes/         # API routes
│   │   └── index.ts        # Entry point
│   ├── transactions.json   # Sample data
│   └── package.json
├── public/                 # Static assets
├── src/                    # React frontend
│   ├── components/         # UI components
│   ├── hooks/              # Custom hooks
│   ├── lib/                # API and utilities
│   ├── pages/              # Page components
│   └── App.tsx             # App entry
├── package.json            # Frontend dependencies
└── README.md               # Project documentation
```

---

## API Documentation

### Key Endpoints

* **GET /api/analytics** — Returns analytics data for charts and dashboards.
* **GET /api/transactions** — Fetches transactions, supports filtering and pagination.
* **POST /api/export/csv** — Exports transactions as CSV (with column selection).
* **POST /api/export/ppt** — (Planned) Exports selected analytics as PowerPoint slides.

*For a full API reference, see the backend source or future API docs.*

---

## Future Scope

* PowerPoint export for charts and analytics
* More chart types and data sources
* Advanced filtering and search
* User roles and permissions
* Mobile app version

---

## Contributing

Contributions are welcome! To contribute:

1. Fork the repository
2. Create a new branch (`git checkout -b feature/your-feature`)
3. Commit your changes
4. Push to your branch and open a Pull Request

For issues or feature requests, please use the GitHub Issues page.

---

## Contact / Support

For questions, support, or feedback, please contact:

* Email: rijulsidanale1431@gmail.com
* GitHub Issues:https://github.com/rijul31

---

## License

MIT License

---
![Screenshot 2025-06-29 211014](https://github.com/user-attachments/assets/e37771e4-936d-45e5-918b-2d65f0a0a28c)
![Screenshot 2025-06-29 214752](https://github.com/user-attachments/assets/02a0de9e-7125-4ef5-aeed-f1c4340216e3)
![Screenshot 2025-06-29 214806](https://github.com/user-attachments/assets/e8363143-abd4-4d77-a007-a0a4e38f3218)
![Screenshot 2025-06-29 214829](https://github.com/user-attachments/assets/b9a7272a-5e77-4e77-a89f-e8055b7d19ef)
![Screenshot 2025-06-29 214846](https://github.com/user-attachments/assets/72290501-313d-4723-8700-4462d933b6f9)




