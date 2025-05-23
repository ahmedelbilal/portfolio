
---

# 🧑‍💻 Ahmed's Portfolio

Welcome to the source code of my personal portfolio website. This project is built using **Gatsby**, **React**, **Tailwind CSS**, and supports **internationalization** using `gatsby-plugin-react-i18next`.

This portfolio showcases my projects, skills, and allows visitors to get in touch with me directly through the contact form. It also supports **dark mode** and **RTL layout** for languages like Arabic.

---

## 🚀 Tech Stack

* **Framework:** Gatsby v5
* **Styling:** Tailwind CSS
* **Language Support:** i18next + gatsby-plugin-react-i18next
* **Icons:** lucide-react
* **Email Integration:** FormSubmit / EmailJS / Custom server (depending on deployment)
* **Deployment:** \[Optional: Add where you deployed it – Vercel, Netlify, etc.]

---

## 🌐 Features

* 💡 **Dark/Light Mode** toggle with `localStorage` persistence.
* 🌍 **Multilingual Support** for `en`, `ar`, `fr`, `it`, and `de`.
* 📱 **Responsive Design** optimized for mobile and desktop.
* 💼 **Projects Showcase** with translation support.
* 🛠️ **Skills Section** with animated progress indicators.
* ✉️ **Contact Form** to receive emails directly.
* 📄 **Resume Viewer** with download functionality.
* 🎯 **Smooth Animations** using Tailwind transitions.

---

## 📁 Project Structure

```
├── src
│   ├── components      # Reusable UI components (Navbar, Footer, Cards, etc.)
│   ├── pages           # Static & dynamic pages (Home, Projects, Skills, Contact)
│   ├── translations    # JSON translation files for i18n
│   ├── utils           # Theme logic, i18n helpers
│   ├── assets          # Images, logos, etc.
│   └── styles          # Global and Tailwind configuration
```

---

## 🧩 i18n Setup

Using `gatsby-plugin-react-i18next`. Translations are stored in `src/translations/{lang}/{namespace}.json`. Each page/component loads translations through the `useTranslation()` hook and optionally `graphql` queries.

* Default language: `en`
* Auto-detection enabled (from browser settings)
* RTL direction applied for Arabic

---

## 🌗 Dark Mode

Dark mode is handled via Tailwind's `dark:` classes. The theme is stored in `localStorage` and toggled with a simple state hook. The root `<html>` is updated using `useEffect`.

---

## ✉️ Contact Form

The contact form sends data through \[EmailJS / FormSubmit / custom API] depending on the selected service.

```tsx
const handleSubmit = async (e: React.FormEvent) => {
  // validate & send
};
```

Feel free to plug in your preferred method.

---

## 📄 Resume

The “View Resume” button links to a downloadable PDF or Google Drive link. You can either:

1. Upload it to `/static/resume.pdf`
2. Link it to an external platform like Notion or Google Docs

---

## 🧪 Local Development

```bash
npm install
gatsby develop
```

Make sure to include `.env` file for any keys if required (like EmailJS or deployment vars).

---

## 🌍 Translations

To add or update translations:

* Edit JSON files in `src/translations`
* Use key-based lookups like `t('projects.title')`

---

## 🧠 TODO / Improvements

* [ ] Add unit tests
* [ ] Enable lazy loading images
* [ ] Add blog or changelog section
* [ ] Improve form validation

---

## 🤝 License

This is a personal, private project and not intended for commercial reuse.

---

Let me know if you want this exported, turned into a Notion doc, or formatted for internal sharing!
