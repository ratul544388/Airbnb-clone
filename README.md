# 🏡 Airbnb Clone (Next.js)

A modern, responsive **Airbnb Clone** built with **Next.js 15**, **Tailwind CSS**, **Prisma**, and many other powerful tools.  
This project is **still in development** — many more features are coming soon!

🔗 **Live Demo:** [https://airbnb-xyz.vercel.app](https://airbnb-xyz.vercel.app)  
📦 **GitHub Repo:** [https://github.com/ratul544388/airbnb-clone](https://github.com/ratul544388/airbnb-clone)

---

## ✨ Features

- 🏠 Property listing & detailed property pages  
- 📅 Date range picker for reservations  
- 🔐 Authentication via **Better Auth**  
- 📍 Interactive maps with **Leaflet & React-Leaflet**  
- 📷 Image uploading via **ImageKit**  
- 📱 Fully responsive, mobile-first UI  
- 🎨 Styled with **Tailwind CSS** + **shadcn/ui**  
- 🗄️ Database handling with **Prisma ORM**  
- 🌗 Dark mode support with **next-themes**

---

## 🚧 Upcoming Features

- ✅ Full booking & reservation system  
- ✅ User dashboard for hosts and guests  
- ✅ Payment integration  
- ✅ Reviews & ratings  
- ✅ Advanced search & filtering  
- ✅ Admin panel  

---

## 🛠️ Tech Stack

**Frontend:**  
- [Next.js 15](https://nextjs.org/)  
- [React 19](https://react.dev/)  
- [Tailwind CSS 4](https://tailwindcss.com/)  
- [shadcn/ui](https://ui.shadcn.com/)  
- [Framer Motion](https://www.framer.com/motion/)  

**Backend & Database:**  
- [Prisma ORM](https://www.prisma.io/)  
- [PostgreSQL (NeonDB)](https://neon.tech/)  

**Authentication & Image Hosting:**  
- [Better Auth](https://better-auth.com/)  
- [ImageKit](https://imagekit.io/)  

**Other Utilities:**  
- [Leaflet](https://leafletjs.com/) for maps  
- [React Hook Form](https://react-hook-form.com/) for form handling  
- [Zod](https://zod.dev/) for validation  
- [React Day Picker](https://react-day-picker.js.org/) for date selection  

---

## 📦 Installation & Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/ratul544388/airbnb-clone.git
   cd airbnb-clone
````

2. **Install dependencies**

   ```bash
   npm install
   # or
   yarn install
   ```

3. **Set up environment variables**
   Create a `.env` file in the root directory based on `.env.example`:

   ```env
   BETTER_AUTH_SECRET=your_secret
   BETTER_AUTH_URL=http://localhost:3000
   NEXT_PUBLIC_BASE_URL=http://localhost:3000
   GITHUB_CLIENT_ID=your_github_client_id
   GITHUB_CLIENT_SECRET=your_github_client_secret
   DATABASE_URL=your_database_url
   NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY=your_imagekit_public_key
   IMAGEKIT_PRIVATE_KEY=your_imagekit_private_key
   IMAGEKIT_URL_ENDPOINT=your_imagekit_endpoint
   ```

4. **Generate Prisma client**

   ```bash
   npx prisma generate
   ```

5. **Run the development server**

   ```bash
   npm run dev
   ```

---

## 📜 Scripts

| Command         | Action                                      |
| --------------- | ------------------------------------------- |
| `npm run dev`   | Start the development server with Turbopack |
| `npm run build` | Build for production                        |
| `npm start`     | Start the production server                 |
| `npm run lint`  | Run ESLint                                  |
| `postinstall`   | Generate Prisma client                      |

---

## 🖼️ Screenshots

> *Add screenshots or GIFs here to showcase the UI.*

---

## 🤝 Contributing

Contributions are welcome! Please fork the repo and open a PR.
Bug reports and feature requests are also appreciated.

---

## 📄 License

This project is licensed under the **MIT License**.

---

**Author:** [@ratul544388](https://github.com/ratul544388)
💌 *Star the repo if you like this project!*
