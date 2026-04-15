# E-Commerce Platform (Amazon Clone)
SDE Intern Fullstack Assignment

## Description
This is a functional e-commerce web application that closely replicates Amazon's design and user experience. 
The application includes product browsing, cart management, and order placement functionalities. Visually resembling 
Amazon's UI patterns, layout structure, and interaction design.

## Tech Stack
-   **Frontend**: Next.js (App Router), React, CSS Modules
-   **Backend**: Node.js, Express.js, Prisma ORM
-   **Database**: PostgreSQL
-   **Styling**: Custom CSS matching Amazon's color scheme and layouts

## Setup Instructions

### Environment Setup
Create a `.env` file in the `backend` directory based on `.env.example` or with the following variables:
```env
DATABASE_URL="postgresql://user:password@localhost:5432/ecommerce?schema=public"
PORT=5000
```

### Database Initialization
1. Navigate to the `backend` folder: `cd backend`
2. Install dependencies: 
`npm install`
3. Run Prisma migrations: 
`npx prisma migrate dev --name init`
4. Seed the database with sample catalog: 
`node prisma/seed.js`
5. Start the backend server: 
`npm run dev` (Runs on http://localhost:5000)

### Frontend Initialization
1. Navigate to the `frontend` folder: `cd frontend`
2. Install dependencies: 
`npm install`
3. Start the Next.js development server: 
`npm run dev` (Runs on http://localhost:3000)

## Features Included
-   **Product Listing**: Grid layouts, category filters, search input, price/ratings display.
-   **Detailed Product Pages**: Multiple images carousel, specifications, description.
-   **Cart Management**: Update quantities, remove items, live total calculation. 
-   **Checkout & Orders**: Checkout summaries, fake checkout flow, order confirmation, user order history.
-   **User Authentication**: Configured login and signup functionality. 

## Assumptions
- Uses a default session identifier or authenticated JWT token based on implementation details.
- Fake payment gateway is used during checkout (mocked ordering process).
- Sample product data provided for demonstration covers a few core target categories.

## Deployment

For detailed deployment instructions, refer to [DEPLOYMENT.md](./DEPLOYMENT.md)

### Quick Start for Production
1. **Set up a PostgreSQL database** (Neon, AWS RDS, or Supabase recommended)
2. **Backend deployment on Vercel**:
   - Add `DATABASE_URL` and other required environment variables
   - Deploy from the `backend/` directory
3. **Frontend deployment on Vercel**:
   - Set `NEXT_PUBLIC_API_URL` to your deployed backend URL
   - Deploy from the `frontend/` directory
4. **Health Check**: Visit `/api/health` on your backend to verify database connection

### Troubleshooting
- **Image 404 errors**: Already fixed - Next.js image optimization is disabled for external images
- **API errors (500)**: Check that DATABASE_URL is set and database is initialized with `npx prisma db push`
- **CORS issues**: Ensure FRONTEND_URL is set correctly in backend environment variables
