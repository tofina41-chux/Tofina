# Tofina Portfolio 

The live production deployment can be accessed at: tofina-portfolio.vercel.app
A production-ready, secure, full-stack portfolio platform and micro-Content Management System (CMS) built to showcase full-stack web applications, publish professional tech insights, manage media assets, and handle direct client communication.

## Key Features
```
Dynamic Project Showcasing: Full listing layout designed to feature live web platforms like Sanaa-Sync, BizApp_Central, and MyrnA Art Direction with complete metrics, tags, live deployment URLs, and code repository links.

Secure Admin Gateway Console: Cryptographic token isolation powered by a robust backend middleware rule checking custom authentication headers on administrative endpoints.

Hybrid Data Architecture: Low-latency file-system JSON database engines used to host layout and textual structures, integrated seamlessly with a live-streaming cloud pipeline.

Direct-to-Cloud Upload System: An optimized memory buffer middleware setup using Multer to route incoming files straight to Supabase Object Storage buckets without writing data onto the application host disk.

CV & Profile Flipper Sync: Automated administrative modules to instantly swap out public resume PDFs or profile avatar images directly inside the portfolio-assets cloud bucket.

Outbound Communication Pipeline: A fully isolated contact intake form that hooks into Nodemailer to stream customer messages and project inquiries cleanly into the administrator's email inbox.
```

## Technical Stack
```
Frontend
Core: React

Styling: Tailwind CSS / Modern CSS architectures

Hosting: Vercel

Backend (Server)
Runtime: Node.js (ES Modules syntax)

Framework: Express.js

Communication: Nodemailer (SMTP Relay)

File Handling: Multer (Memory Storage Engine)

Cloud & Databases
Asset Storage: Supabase Object Storage (Bucket: portfolio-assets)

Database Engine: Persistent Local File System JSON Matrix (projects.json, blogPosts.json)

```

## Project Architecture
```
server/
├── config/
│   └── supabase.js       # Initialize Supabase Client instance
├── middleware/
│   └── upload.js         # Multer RAM Memory storage configuration & rigid limits
├── routes/
│   └── adminRoutes.js    # System Endpoints Matrix (Auth, Cloud Sync, CRUD Pipelines)
├── blogPosts.json        # Persistent JSON Data Engine for blogs
├── projects.json         # Persistent JSON Data Engine for projects
├── .env                  # Protected system keys and credentials
├── index.js              # Server entry point & global middleware configuration
└── package.json

```

## Environment Variables Setup
Create a .env file inside your server's root folder and supply the following key-value properties:
```
PORT=5000
ADMIN_SECRET_KEY=your_highly_secure_admin_key_token
SUPABASE_URL=your_supabase_project_endpoint_url
SUPABASE_ANON_KEY=your_supabase_public_anon_api_key
EMAIL_USER=your_verified_gmail_address@gmail.com
EMAIL_PASS=your_secure_gmail_app_specific_password

```

## Installation & Local Execution
Follow these steps to spin up the persistent development environment locally:

1. Clone the Repository

git clone https://github.com/your-username/tofina-portfolio.git
cd tofina-portfolio/server

2. Install Dependencies
```
npm install
```
3. Launch the Server

```
npm start
```
