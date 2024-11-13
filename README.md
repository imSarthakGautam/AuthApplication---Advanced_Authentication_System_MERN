# Advanced Authentication Project

This project includes building a robust and secured backend authentication system which includes:
- Email Verification
- Password Recovery
- Welcome Emails

## Tech Stack 
- React + Tailwind
- MongoDB
- Node, Express
- JWT Auth 

## Packages
```bash
npm install express cookie-parser mailtrap bcryptjs dotenv jsonwebtoken mongoose crypto
```
[More about these packages](./notes/aboutPackages.md)

## Notes

- [Handling Password Reset and Email Verification](./notes/handling_Password_reset%20_and_email_verification.md)

- [Sending Emails via : Mailtrap](./notes/sending_emails_via_Mailtrap.md)


## Frontend Setup
```bash
npm create vite@latest
npm i
```

- **Tailwind CSS**: installing dependencies and configuring `tailwind.config.js` file.
```
npm install -D tailwindcss postcss autoprefixer
npx tailwind init -p
```
- **React-router-dom**: For page reloading without refresh, nested & dynamic routing, simplified navigation,etc
```
npm i react-router-dom
```

- **Framer Motion** - animation library used to add smooth, interactive animations and transitions to components in a React application.

```bash
npm install framer-motion
```

npm i lucide-react

### Zustand
```bash
npm install zustand
```

```
npm i axios
npm i react-hot-toast
```