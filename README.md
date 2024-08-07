# [Zenflow](https://zenflow.vercel.app/)

A task manager web application built with Next.js 14

## Tech Stack

- **Framework:** [Next.js](https://nextjs.org)
- **Styling:** [Tailwind CSS](https://tailwindcss.com)
- **User Management:** [clerk](https://clerk.com/)
- **Database:** [Supabase](https://supabase.com)
- **ORM:** [Drizzle ORM](https://orm.drizzle.team)
- **UI Components:** [shadcn/ui](https://ui.shadcn.com)
- **Payment management:** [Stripe](https://stripe.com)
- **Content Management:** [Contentlayer](https://www.contentlayer.dev)
- **Newsletter subscription:** [MailChimp](https://mailchimp.com/)

## Roadmap

- [x] SEO optimization & site configuration
- [x] Landing Page
- [x] Dark Mode Implementation
- [x] blog page
- [x] User Authentication using clerk
- [x] Account and Preference Settings Setup
- [x] Create New Task Functionality
- [x] Implement Tasks Board View
- [x] Task Actions (Edit, Delete, Mark as Done, etc)
- [x] Create New Board Column Feature
- [x] Column Actions (Edit and Delete) for Boards
- [x] Create New Board Capability
- [x] Board Actions (Edit and Delete)
- [x] Task Filtering, and Sorting Functionality
- [x] Add Analytics Page
- [x] Integrate stripe
- [x] Newsletter subscription with Mailchimp

## Running Locally

1. Clone the repository

   ```bash
   git clone https://github.com/Raphico/Zenflow
   ```

2. Install dependencies using npm

   ```bash
   npm install
   ```

3. Copy the `.env.example` to `.env` and update the variables.

   ```bash
   cp .env.example .env
   ```

4. Start the development server

   ```bash
   npm run dev
   ```

5. Push the database schema

   ```bash
   npm run db:push
   ```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
