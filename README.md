# Introduction
Web clickers is an online tally counter for you and your friends. The main idea is to track small debts you and your group may share, such as share expenses during a trip or i day to day life. The app comes with a dockerfile and compose file out of the box.

The app will automatically generate a new database if one is not already present. 
To run the app, create a `.env` file with the enviorment variable `JWT_ACCESS_SECRET` set to a string longer than 32 characters. One way to do this is to run 
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```
and copy the result into the `.env` file.
# Developing

For development the app runs locally in vites dev mode.

Install dependencies with `npm install` (or `pnpm install` or `yarn`) and start a development server:

```bash
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

# Deploying



To deploy this app, simply run:

```bash
docker compose up -d --build
```

and the app should run on port 80, ready for a reverse proxy. Opening this app to the internet without HTTPS through a reverse proxy or modifying the source code to support certs on its own is not safe.

