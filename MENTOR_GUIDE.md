# 🎓 Mentor Guide: Hope in Christ Finance Management System

Welcome to the HIC Finance project! As your mentor, I have structured this project specifically to serve two purposes:
1. **Solve a real-world problem**: Provide an easy, printable, and reliable way for HIC to track Sunday tithes, offerings, love gifts, and snacks.
2. **Build your developer resume**: Showcase clean Javascript, modern responsive CSS (without bloated libraries), data serialization (JSON exports), and native web platform capabilities (such as print stylesheets and `localStorage`).

Here is your step-by-step guide to run, manage, and deploy this project completely for free.

---

## 💻 Step 1: Run the Project Locally

Before launching your project, you need to install the project dependencies (Vite) and run the local development server.

1. **Open your terminal** in the `hic-finance` directory.
2. **Install Vite** (the development tool and bundler) by running:
   ```bash
   npm install
   ```
3. **Start the local server**:
   ```bash
   npm run dev
   ```
4. **Open your browser**: Vite will display a local address (usually `http://localhost:5173`). Click it to view and test your application! Any changes you make to the code will immediately refresh in your browser.

---

## 🐙 Step 2: Set up Git & GitHub (for your Resume)

Having code on GitHub is the single best way to prove to employers that you can write clean, organized code. Let's commit your files and upload them.

### 1. Initialize Git in the Project Folder
Open your terminal in `hic-finance` (not the main `ponytail-main` root folder, since this is a separate application) and run:
```bash
git init
```

### 2. Create a `.gitignore` File
Create a new file named `.gitignore` in `hic-finance` and add the following lines. This tells Git not to track your local node modules or environment files:
```text
node_modules/
.DS_Store
dist/
```

### 3. Commit Your Code
Run these commands to add your files and make your first commit:
```bash
git add .
git commit -m "feat: initial commit of HIC Finance Management System"
```

### 4. Push to GitHub
1. Go to [github.com](https://github.com) and log into your account.
2. Click **New Repository**.
3. Name it `hic-finance-system`. Leave it **Public** (so recruiters can see it) and do **NOT** check "Add a README" or "Add .gitignore" (we already created them).
4. Copy the commands under "**...or push an existing repository from the command line**". It will look like this:
   ```bash
   git branch -M main
   git remote add origin https://github.com/YOUR_GITHUB_USERNAME/hic-finance-system.git
   git push -u origin main
   ```
5. Run these commands in your local terminal. Refresh your GitHub page—your code is now live!

---

## 🚀 Step 3: Deploy to Vercel (100% Free)

Vercel is a hosting platform that is completely free for personal/hobby projects. It will sync with your GitHub repository: every time you push a change to GitHub, Vercel will automatically update your live website!

### 1. Create a Vercel Account
1. Go to [vercel.com](https://vercel.com) and click **Sign Up**.
2. Select **Continue with GitHub** to link your accounts.

### 2. Import Your Project
1. Once logged in, click **Add New** > **Project** on your Vercel Dashboard.
2. You will see a list of your GitHub repositories. Find `hic-finance-system` and click **Import**.
3. **Configure Project**:
   - Vercel will automatically detect that you are using Vite! It will pre-fill the build commands (`npm run build`) and output directory (`dist`).
   - You don't need to change any settings. Just click **Deploy**.

### 3. Get Your Free Domain
Within a minute, Vercel will give you a live URL (e.g., `hic-finance-system.vercel.app`).
- **Want a custom domain?** Vercel lets you add custom domains in the project settings. If you don't want to buy one, the `.vercel.app` subdomain is 100% free, SSL-secured (HTTPS), and looks perfectly professional on a resume or portfolio!

---

## 🌟 Step 4: How to Showcase This on Your Resume

When applying for jobs, recruiters want to see *why* you made design choices. Add this project to your resume and write a description like this:

> **Hope in Christ Church Finance System** | *Vite, ES6 Javascript, HTML5, CSS3, Git, Vercel*
> - Engineered a lightweight finance management web application to digitize Sunday inflows (tithes/offerings) and cash vouchers with zero-cost architecture.
> - Developed custom native CSS media query print layouts, enabling seamless print-to-paper and PDF generation for receipts and vouchers directly from the browser.
> - Implemented transactional local storage caching with client-side JSON serialization for data backup exports, maintaining zero server/hosting costs.
> - Integrated GitHub continuous deployment pipeline with Vercel for automated updates.

---

## 🚀 Future Upgrades to Impress Employers

Once you feel comfortable with the current setup, here are some beginner-friendly upgrades you can make to show off even more skills:

1. **Connect to Supabase (Database)**:
   - Currently, data is saved in the browser (`localStorage`). If you open the site on your phone, you won't see data entered on your computer.
   - *Upgrade path*: Create a free account on **Supabase** (which gives you a free PostgreSQL database) and use their JS library to save/read data. This demonstrates database integration on your resume!
2. **Chart Visualizations**:
   - Add a simple chart to show inflows and outflows over time.
   - *Upgrade path*: Use a simple vanilla library like **Chart.js** to draw a beautiful line chart of the last 4 weeks.
3. **User Authentication**:
   - Add a password screen so only authorized treasurers can view and edit the finances.
   - *Upgrade path*: Use Supabase Auth or a simple password lock.
