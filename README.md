# Introduction
Web clickers is an online tally counter for you and your friends. The main idea is to track small debts you and your group may share, such as share expenses during a trip or i day to day life. The app comes with a dockerfile and compose file out of the box.

# Developing

For development the app runs locally in vites dev mode.

Install dependencies with `npm install` (or `pnpm install` or `yarn`) and start a development server:

```bash
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

# Deploying

To run a production version of the app, simply run:

```bash
docker compose up -d --build
```

