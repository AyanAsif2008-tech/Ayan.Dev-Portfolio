# Ayan.Dev Portfolio (React + Vite)

```bash
npm install
npm run dev        # http://localhost:5173
```

## Contact form -> your inbox (one-time setup)

The form posts (with axios) to `/api/contact` (`api/contact.js`), which sends the message to your email with Nodemailer.
It needs a Gmail **App Password** (your normal password will not work):

1. Google Account -> **Security** -> turn on **2-Step Verification**.
2. Google Account -> **Security** -> **App passwords** -> create one (name it "Portfolio") and copy the 16 characters.
3. Local: copy `.env.example` to `.env` and fill in `SMTP_USER`, `SMTP_PASS`, `MAIL_TO`. Restart `npm run dev`.
4. Vercel: Project -> **Settings -> Environment Variables** -> add the same three variables -> **Redeploy**.

Replies: every email has *Reply-To* set to the visitor, so pressing Reply in Gmail answers them directly.
The rules for every field live in `src/utils/validation.js` and are used by both the browser (`pattern` attributes) and the server.

## Things you can edit

- Social links (LinkedIn / Instagram): `src/components/Footer.jsx` (top of the file)
- Skill percentages: `src/components/Skills.jsx` (`level` numbers)
- Scroll animations: `src/utils/useAOS.js` (AOS) - add `data-aos="fade-up"` to any element
