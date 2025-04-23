This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.


    Prisma is a modern DB toolkit to query, migrate and model your database (https://prisma.io)

    Usage

      $ prisma [command]

    Commands

                init   Set up Prisma for your app
            generate   Generate artifacts (e.g. Prisma Client)
                  db   Manage your database schema and lifecycle
             migrate   Migrate your database
              studio   Browse your data with Prisma Studio
            validate   Validate your Prisma schema
              format   Format your Prisma schema
             version   Displays Prisma version info
               debug   Displays Prisma debug info
                 mcp   Starts an MCP server to use with AI development tools

    Flags

         --preview-feature   Run Preview Prisma commands
         --help, -h          Show additional information about a command

┌──────────────────────────────────────────────────────────────────────────────────────┐
│  Optimize performance through connection pooling and caching with Prisma Accelerate  │
│  and capture real-time events from your database with Prisma Pulse.                  │
│  Learn more at https://pris.ly/cli/pdp                                               │
└──────────────────────────────────────────────────────────────────────────────────────┘

    Examples

      Set up a new Prisma project
      $ prisma init

      Generate artifacts (e.g. Prisma Client)
      $ prisma generate

      Browse your data
      $ prisma studio

      Create migrations from your Prisma schema, apply them to the database, generate artifacts (e.g. Prisma Client)
      $ prisma migrate dev

      Pull the schema from an existing database, updating the Prisma schema
      $ prisma db pull

      Push the Prisma schema state to the database
      $ prisma db push

      Validate your Prisma schema
      $ prisma validate

      Format your Prisma schema
      $ prisma format

      Display Prisma version info
      $ prisma version

      Display Prisma debug info
      $ prisma debug


# Runnig the compose file
```bash
docker-compose --env-file .env.local up -d postgres pgadmin
```

# Category Migration Process

To implement the Category model and migrate existing Article data, follow these steps:

## Step 1: Generate the migration

```bash
npx prisma migrate dev --name add_category_model
```

## Step 2: Run the migration script to populate categories and update articles

```bash
npx tsx prisma/migrations/migrate_categories.ts
```

## Step 3: Finalize the migration (after verifying data)

```sql
-- Run these SQL commands after the migration script completes successfully:
ALTER TABLE "Article" ALTER COLUMN "categoryId" SET NOT NULL;
ALTER TABLE "Article" ADD CONSTRAINT "Article_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "Article" DROP COLUMN "category";
```

## Step 4: Generate a new Prisma client

```bash
npx prisma generate
```

After completing these steps, all components using the Article model will need to be updated to reference `article.category.name` or `article.category.slug` instead of the previous `article.category` string value.