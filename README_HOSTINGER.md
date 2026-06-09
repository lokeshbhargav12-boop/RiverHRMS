# RIVER HRMS Next.js Deployment

This folder is a full Next.js App Router project for the RIVER HRMS proposal website.

## Local commands
7 | ```bash
npm install
npm run dev
npm run build
npm run start
``` 

## Hostinger Cloud Hosting
14 | Use the files in this project as the deployment source. The project is configured with `output: "standalone"` in `next.config.mjs`, which is the preferred mode for Node-based hosting.
15 | Typical Node deployment flow:
19 | 1. Upload the project files to your hosting account.
2. Run `npm install`.
3. Run `npm run build`.
4. Start the app with `npm run start`.
24 | If your Hostinger plan only supports static file upload and does not run Node.js apps, change `next.config.mjs` to use `output: "export"`, run `npm run build`, and upload the generated `out` folder.
25 |

26 | 27 | ## Environment Variables
27 | 28 | - Create a `.env` file at the project root.
28 | 29 | - Add `DATABASE_URL="postgresql://user:password@host:5432/database"` (replace with your actual connection string).
29 | 30 | - Ensure `.env` is listed in `.gitignore` (default).
30 | 31 | - For production on Hostinger, set the `DATABASE_URL` environment variable in the Hostinger dashboard.
31 | 32 | This variable is required for Prisma to load the database connection during `npm install` and `prisma generate`.

33 |

## Assets
29 | The company logo is stored at:
30 | ```text
31 | public/logo_HR.png
36 | ``` 
32 | The original proposal PDF remains in the workspace as source reference.