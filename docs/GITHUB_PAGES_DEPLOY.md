# GitHub Pages Deployment Guide

This guide will walk you through deploying your Three.js project to GitHub Pages.

## Prerequisites

- A GitHub account
- Git installed on your computer
- Node.js and npm installed (already have this if you can run `npm run build`)

## Step-by-Step Instructions

### Step 1: Initialize Git Repository (if not already done)

Open PowerShell or Command Prompt in your project directory and run:

```bash
cd C:\JS_ENGINE
git init
```

### Step 2: Add and Commit Your Files

```bash
git add .
git commit -m "Initial commit: Three.js project with GitHub Pages setup"
```

**Note:** The `.gitignore` file is configured to exclude `dist/`, `node_modules/`, and build artifacts. This is correct - GitHub Actions will build the project during deployment.

### Step 3: Create a GitHub Repository

1. Go to [https://github.com/new](https://github.com/new)
2. Fill in the repository details:
   - **Repository name:** Choose a name (e.g., `js-engine` or `threejs-test`)
   - **Description:** (Optional) "Three.js test pipeline for cross-platform game development"
   - **Visibility:** Choose **Public** (required for free GitHub Pages)
   - **DO NOT** initialize with README, .gitignore, or license (you already have these)
3. Click **Create repository**

### Step 4: Link Your Local Repository to GitHub

After creating the repository, GitHub will show you commands. Replace `YOUR_USERNAME` and `YOUR_REPO_NAME` with your actual GitHub username and repository name:

```bash
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
git branch -M main
git push -u origin main
```

**Example:**
```bash
git remote add origin https://github.com/johndoe/js-engine.git
git branch -M main
git push -u origin main
```

### Step 5: Enable GitHub Pages

1. Go to your repository on GitHub
2. Click on **Settings** (top menu)
3. In the left sidebar, click **Pages**
4. Under **Source**, select:
   - **Deploy from a branch** → Change to **GitHub Actions**
5. The page will automatically save

### Step 6: Wait for Deployment

1. Go to the **Actions** tab in your GitHub repository
2. You should see a workflow called "Deploy to GitHub Pages" running
3. Wait 1-2 minutes for it to complete
4. When it shows a green checkmark ✅, deployment is complete

### Step 7: Access Your Site

Your site will be available at:
```
https://YOUR_USERNAME.github.io/YOUR_REPO_NAME/
```

**Example:** If your username is `johndoe` and repo is `js-engine`:
```
https://johndoe.github.io/js-engine/
```

## Important Notes

### Base Path Configuration

The project is configured to work with GitHub Pages subdirectories. If your repository is named `my-repo`, your site will be at `https://username.github.io/my-repo/`, and the build automatically adjusts asset paths.

### Automatic Deployment

Every time you push to the `main` branch, GitHub Actions will:
1. Build your project
2. Deploy it to GitHub Pages automatically

You don't need to do anything manually after the initial setup!

### Future Updates

To update your site:

```bash
# Make your changes
git add .
git commit -m "Description of your changes"
git push
```

GitHub Actions will automatically rebuild and redeploy within 1-2 minutes.

## Troubleshooting

### Build Fails

1. Check the **Actions** tab for error messages
2. Ensure `package.json` has all dependencies listed
3. Verify your code has no syntax errors

### 404 Error on Site

1. Wait a few minutes - first deployment can take 2-3 minutes
2. Check that GitHub Pages is set to **GitHub Actions** source (not branch)
3. Verify the repository name in the URL matches exactly

### Assets Not Loading

1. The `vite.config.js` is configured to use the correct base path
2. Make sure you're accessing the site via the GitHub Pages URL (not localhost)
3. Check browser console for specific errors

### Need to Change Repository Name?

If you change your repository name, update the BASE_URL in `.github/workflows/deploy.yml` or the base path will auto-adjust on the next deployment.

## Verification Checklist

After deployment, verify:
- ✅ Site loads without errors
- ✅ Three.js scene renders correctly
- ✅ No 404 errors for assets
- ✅ Console shows no JavaScript errors
- ✅ Site works on mobile devices

---

**Need Help?** Check the [GitHub Pages documentation](https://docs.github.com/en/pages) or your repository's Actions tab for detailed logs.

