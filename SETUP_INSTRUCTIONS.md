# 🔧 How to Fix "Invalid Gemini API key" Error

## The Problem
You're seeing this error because the `.dev.vars` file currently has a **placeholder** API key (`your-api-key-here`), not a real one.

## The Solution (5 minutes)

### Step 1: Get a FREE Gemini API Key

1. **Open this link in your browser:**
   ```
   https://aistudio.google.com/apikey
   ```

2. **Sign in** with your Google account (Gmail)

3. **Click the "Create API Key" button**
   - You'll see options for creating a new project or using an existing one
   - Choose whichever option you prefer

4. **Copy the API key** that appears
   - It will look something like: `AIzaSyAbc123def456ghi789jkl012mno345pqr678`
   - **Important:** Copy the ENTIRE key!

### Step 2: Add the API Key to Your Project

1. **Open the `.dev.vars` file** in your project root folder:
   ```
   C:\Users\soham\OneDrive\Desktop\LINGUA BRIDGE\.dev.vars
   ```

2. **Find line 14** which currently says:
   ```
   GEMINI_API_KEY=your-api-key-here
   ```

3. **Replace `your-api-key-here` with your actual API key:**
   ```
   GEMINI_API_KEY=AIzaSyAbc123def456ghi789jkl012mno345pqr678
   ```
   (Use YOUR key, not this example!)

4. **Save the file** (Ctrl+S)

### Step 3: Restart the Dev Server

1. **Stop the current dev server:**
   - Go to your terminal
   - Press `Ctrl+C` to stop the server

2. **Start it again:**
   ```bash
   npm run dev
   ```

3. **Test the translation feature** - it should work now! 🎉

## ⚠️ Important Notes

- **Keep your API key secret!** Don't share it or commit it to GitHub
- The `.dev.vars` file is already in `.gitignore`, so it won't be committed
- The Gemini API has a **free tier** with generous limits for testing
- If you see "quota exceeded" errors later, you might need to wait or upgrade your plan

## 🆘 Still Having Issues?

If you've followed all steps and still see the error:

1. **Double-check** that you copied the ENTIRE API key (no spaces before/after)
2. **Make sure** you saved the `.dev.vars` file
3. **Verify** you restarted the dev server after making changes
4. **Check** that your API key is valid by testing it at Google AI Studio

## 📝 Example of a Correct `.dev.vars` File

```bash
# Local development environment variables for Cloudflare Worker
# 
# IMPORTANT: You need to add your Gemini API key here for the translation feature to work
# 
# To get a Gemini API key:
# 1. Visit https://aistudio.google.com/apikey
# 2. Sign in with your Google account
# 3. Click "Create API Key"
# 4. Copy the generated key
# 5. Replace "your-api-key-here" below with your actual API key
#
# Example: GEMINI_API_KEY=AIzaSyAbc123def456ghi789jkl012mno345pqr678

GEMINI_API_KEY=AIzaSyDEMO_KEY_REPLACE_WITH_YOUR_REAL_KEY_123456789
```

---

**That's it!** Once you add your real API key, everything will work. 🚀
