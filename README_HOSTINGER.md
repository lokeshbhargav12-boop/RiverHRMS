# RIVER HRMS Next.js Deployment

This folder is a full Next.js App Router project for the RIVER HRMS proposal website.

## Local commands

```bash
npm install
npm run dev
npm run build
npm run start
```

## Hostinger Cloud Hosting

Use the files in this project as the deployment source. The project is configured with `output: "standalone"` in `next.config.mjs`, which is the preferred mode for Node-based hosting.

Typical Node deployment flow:

1. Upload the project files to your hosting account.
2. Run `npm install`.
3. Run `npm run build`.
4. Start the app with `npm run start`.

If your Hostinger plan only supports static file upload and does not run Node.js apps, change `next.config.mjs` to use `output: "export"`, run `npm run build`, and upload the generated `out` folder.

## Assets

The company logo is stored at:

```text
public/logo_HR.png
```

The original proposal PDF remains in the workspace as source reference.
