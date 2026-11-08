# 🍽️ IIIT Bhubaneswar - MessMate (Smart Mess OS)

> **Dynamic Web Application for Indian Institute of Information Technology, Bhubaneswar Mess Management System**  
> *Campus: Gothapatna, PO: Malipada, Bhubaneswar, Odisha 751003*

---

## 🌟 Overview

**MessMate** is a dynamic, high-performance web application engineered specifically for the hostel dining ecosystem of **IIIT Bhubaneswar**. It digitizes the entire hostel dining lifecycle — from dynamic anti-counterfeit QR meal tokens and weekly nutritional menus to automated leave rebate deductions, raw material pantry management, FSSAI hygiene audit checklists, and student grievance resolution workflows.

Designed with **zero external runtime dependencies**, MessMate runs instantly in any modern web browser, can be self-hosted, and deploys directly to **GitHub Pages**, **Vercel**, or **Netlify** with 100% free permanent 24/7 uptime.

---

## 🚀 Key Features

### 👨‍🎓 1. Student Portal
- **Dynamic Security QR Meal Token**:
  - Live generated QR code for active meal slots (Breakfast, Lunch, Snacks, Dinner).
  - Anti-spoofing animated glowing frame with real-time countdown clock to prevent screenshots.
  - Interactive counter plate punch simulation with audio confirmation.
- **7-Day Interactive Menu Calendar**:
  - Monday to Sunday meal plans with full nutritional breakdown (Calories, Protein, Carbs, Fats).
  - Dietary filters (Veg, Non-Veg, Jain).
  - Authentic Odisha culinary specialties (**Odia Dalma**, **Fish Besara**, **Chicken Kassa**, **Puri-Aloo Dum**, **Chhena Poda**, **Pahala Rasagola**).
- **Automated Meal Rebate & Leave System**:
  - Apply for mess bill rebate for vacations, internships, or illness (minimum 2 days rule).
  - Real-time rebate deduction calculator (`Days × ₹120/day`).
  - Live status tracking: *Pending Approval* &rarr; *Warden Approved* &rarr; *Credited to Monthly Bill*.
- **Monthly Mess Billing & Accounts**:
  - Real-time accounting: Base Fee (₹3,600) + Extra Canteen items - Approved Rebate Credits.
  - Online payment simulator supporting UPI (GPay, PhonePe, Paytm QR) and NetBanking.
  - One-click print/download of official IIIT Bhubaneswar Mess Bill receipt with watermark.
- **Night Canteen & Daily Extras Store**:
  - Order double egg omelettes, paneer rolls, chicken kathi rolls, Amul milk, and fresh juices charged directly to monthly mess account.
- **Sunday Grand Feast Voting Poll**:
  - Democratic voting system for upcoming weekend special dinner menu with real-time percentage bars.
- **Grievance & Hygiene Redressal Desk**:
  - Report cold food, staff hygiene, insect issues, or water purifier TDS concerns.
  - Track ticket status and view corrective action taken by the Chief Warden and caterer.

---

### 👨‍🍳 2. Mess Manager & Caterer Portal
- **Headcount & Plate Forecast**:
  - Real-time plate predictor based on enrolled hostel residents minus active rebate leaves.
  - Prevents food shortage and minimizes food wastage (< 3.2% surplus food metric).
- **Digital Token Scanner Counter**:
  - Virtual barcode/token scanner for counter staff.
  - Instant roll number validation, duplicate punch prevention, and audible beep feedback.
- **Pantry Stock & Raw Materials Inventory**:
  - Inventory tracker for Basmati Rice, Atta, Pulses, Mustard Oil, Dairy, Chicken, Vegetables, and 19kg commercial LPG cylinders.
  - Automatic low-stock warning badges and quick `+ Restock` logger.
- **Vendor Procurement Ledger**:
  - Track wholesale invoices from OMFED Dairy, Bhubaneswar Mandi, and IOCL Gas Agency.

---

### 🏛️ 3. Chief Warden & Mess Committee Portal
- **Hygiene & FSSAI Inspection Audit**:
  - Official inspection checklist assessing:
    1. Cleanliness of Utensils & Kitchen (20%)
    2. Water Purifier RO & TDS levels (20%)
    3. Cold Storage & Cooked Food Temperatures (20%)
    4. Staff Uniform & Hairnets (20%)
    5. Waste Segregation & Bio-disposal (20%)
  - Auto-calculates weighted hygiene score and official grade (e.g. `91.4% - Grade A`).
- **Rebate Approvals Desk**:
  - Review student leave applications and approve or reject with a single click.
  - `Bulk Approve All Pending` engine.
- **Grievance Redressal Action Center**:
  - Review student tickets, assign warnings or penalties to caterers, and dispatch maintenance.
- **Campus Mess Broadcast Notices**:
  - Publish urgent circulars regarding exam breakfast timings, water maintenance, or festival feasts.
- **Analytics & Expenditure Charts**:
  - Native HTML5 Canvas charts displaying weekly attendance by meal slot and budget distribution.
  - One-click export of complete dataset to JSON.

---

### 🏷️ 4. Guest & Visitor Pass
- Single-meal digital pass purchase (Breakfast ₹50, Lunch ₹90, Dinner ₹90) with QR code receipt for visiting parents, alumni, and conference delegates.

---

## 💻 Tech Stack & Architecture

- **Frontend Core**: Pure Semantic HTML5, CSS3 Custom Properties (Design System), Vanilla ES6+ JavaScript.
- **Self-Contained QR Generator**: `js/qr-helper.js` — fully client-side QR Matrix generator (zero external CDN or network dependency).
- **Sound Engine**: `js/audio.js` — synthesizes audio feedback using HTML5 Web Audio API.
- **Persistence & Reactivity**: `js/store.js` — LocalStorage state manager with pub/sub architecture and demo seed data reset.
- **Responsive & Accessible**: Works across smartphones, tablets, laptops, and desktop monitors with built-in Light and Dark themes.

---

## 🏃 How to Run Locally

You can run the web application immediately without installing any software or package managers:

### Method 1: Direct File Launch
Double-click `index.html` in any web browser (Google Chrome, Microsoft Edge, Firefox, Brave, Safari).

### Method 2: One-Click Windows Launcher
Double-click `start-server.bat` in the project root directory.

---

## 🌐 Deploy to GitHub Pages (24/7 Free Live Hosting)

This repository includes a pre-configured GitHub Actions workflow in `.github/workflows/deploy.yml` that automatically deploys your website to GitHub Pages on every push.

### Step-by-Step GitHub Pages Deployment:
1. Push this project to your GitHub repository (see instructions below).
2. On GitHub, navigate to your repository and click **Settings**.
3. In the left navigation sidebar, click **Pages**.
4. Under **Build and deployment** &rarr; **Source**, select **GitHub Actions**.
5. That's it! GitHub will automatically trigger the deployment workflow.
6. Your website will be live 24/7 at:
   ```
   https://<your-github-username>.github.io/<your-repository-name>/
   ```

---

## 📤 How to Upload to Your GitHub

### Option A: Using the Included Upload Script (If Git is installed)
1. Double-click `push-to-github.bat` or run PowerShell:
   ```powershell
   .\upload-to-github.ps1
   ```
2. Enter your GitHub repository URL (e.g. `https://github.com/your-username/iiitb-messmate.git`).
3. The script will automatically initialize the repository, commit all files, and push to the `main` branch.

### Option B: Manual Command Line
```bash
git init
git add .
git commit -m "Initial commit: IIIT Bhubaneswar Mess Management System"
git branch -M main
git remote add origin https://github.com/<your-username>/<your-repo-name>.git
git push -u origin main
```

### Option C: Drag & Drop via GitHub Web (Zero installation required)
1. Go to [https://github.com/new](https://github.com/new) and create a new repository (e.g. `iiitb-messmate`).
2. On the empty repository page, click the link **"uploading an existing file"**.
3. Select all files and folders in `D:\SupreetProject` and drag them into the upload box on GitHub.
4. Type commit message: `Initial commit: IIIT Bhubaneswar Mess Management System`.
5. Click **Commit changes**.

---

## 🏛️ Campus Hostels & Facilities Covered

| Hostel Code | Hostel Name | Resident Type | Mess Assigned | Capacity |
|---|---|---|---|---|
| **BH-1** | Mahanadi Hall of Residence | Boys | Central Mess | 450 |
| **BH-2** | Brahmaputra Hall of Residence | Boys | North Mess | 400 |
| **BH-3** | Baitarani Hall of Residence | Boys | North Mess | 350 |
| **GH-1** | Daya Hall of Residence | Girls | South Mess | 300 |
| **GH-2** | Rushikulya Wing | Girls | South Mess | 250 |

---

## 📄 License
Developed for IIIT Bhubaneswar hostel community dining management. Open-source educational project.
