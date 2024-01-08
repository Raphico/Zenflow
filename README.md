# [Zenflow](https://zenflow.vercel.app/)

A task manager web application built with Next.js 14

## Tech Stack

- **Framework:** [Next.js](https://nextjs.org)
- **Styling:** [Tailwind CSS](https://tailwindcss.com)
- **User Management:** [clerk](https://clerk.com/)
- **Database:** [Planetscale](https://planetscale.com/)
- **ORM:** [Drizzle ORM](https://orm.drizzle.team)
- **UI Components:** [shadcn/ui](https://ui.shadcn.com)
- **Email:** [React Email](https://react.email)
- **Content Management:** [Contentlayer](https://www.contentlayer.dev)
- **File Uploads:** [uploadthing](https://uploadthing.com)

## Roadmap

- [x] SEO optimization & site configuration
- [x] Landing Page
- [x] Dark Mode Implementation
- [x] blog page
- [ ] User Authentication using NextAuth
- [ ] Account and Preference Settings Setup
- [ ] Create New Task Functionality
- [ ] Implement Tasks Board View
- [ ] Task Actions (Edit, Delete, Mark as Done, Duplicate, etc)
- [ ] Create New Board Column Feature
- [ ] Column Actions (Edit and Delete) for Boards
- [ ] Create New Board Capability
- [ ] Board Actions (Edit and Delete)
- [ ] Task Search, Filtering, and Sorting Functionality
- [ ] Integrate Analytics Page
- [ ] Integrate stripe

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
