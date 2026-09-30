# Git Guidelines for RE:ST Project

## 📋 Overview
This document defines what **should** and **should NOT** be pushed to the GitHub repository. Follow these guidelines to keep the repo clean and under GitHub's size limits.

---

## ✅ ALWAYS Push (Source Code & Config)

### Source Code
```
src/
├── app/                    # All 13 screens (onboarding, home, sleep-twin, etc.)
├── core/
│   ├── domain/             # TypeScript types (SleepSession, DailyContext, etc.)
│   ├── compliance.ts       # DPDP, CDSCO, privacy
│   ├── signals/            # Signal interpretation logic
│   └── onboarding/         # Onboarding feature logic
├── components/             # Reusable UI components (when added)
└── hooks/                  # Custom React hooks (when added)
```

### Configuration Files
| File | Purpose |
|------|---------|
| `package.json` | Dependencies & scripts |
| `package-lock.json` | Locked dependency versions |
| `tsconfig.json` | TypeScript config |
| `app.json` | Expo config (permissions, plugins, icons) |
| `babel.config.js` | Babel config |
| `.gitignore` | Git ignore rules |
| `.gitattributes` | Git LFS tracking (if needed) |

### Assets (Small, < 5MB each)
```
assets/
├── Logo.png, Logo_WithoutBG.png
├── icon.png, splash-icon.png
├── android-icon-*.png
├── favicon.png
```
> ✅ These are small (< 5MB each) and safe to push

### Scripts
```
scripts/
├── download-model.js    # Downloads model from Hugging Face
```
> ✅ Push this - it's small and essential for model setup

### Documentation
| File | Purpose |
|------|---------|
| `README.md` | Project overview |
| `pending work.md` | Roadmap & pending items |
| `GIT_GUIDELINES.md` | This file |
| `AGENTS.md` | Agent instructions |

---

## ❌ NEVER Push (Git Ignored)

### Model Files (> 100MB)
```
models/
├── *.gguf                    # Quantized models (1+ GB each)
├── *.bin                     # Binary model weights
├── *.safetensors             # SafeTensor format
└── *.pt / *.pth              # PyTorch checkpoints
```
> **Reason**: GitHub limits files to 100MB. Models are 1+ GB.
> **Alternative**: Host on Hugging Face, download via `npm run download-model`

### Build Artifacts
```
dist/
build/
*.apk
*.ipa
*.aab
.expo/
.expo-shared/
web-build/
```

### IDE / OS Files
```
.idea/
.vscode/
*.swp
*.swo
.DS_Store
Thumbs.db
*.log
```

### Node Modules & Cache
```
node_modules/
npm-debug.log*
yarn-debug.log*
yarn-error.log*
*.tsbuildinfo
```

### Environment & Secrets
```
.env
.env.local
.env.*.local
*.pem
*.key
*.cert
google-services.json
GoogleService-Info.plist
```

### Health Data (Privacy)
```
health-data/
*.fit
*.tcx
*.gpx
health-export/
```
> **Reason**: User health data is private, DPDP compliant

---

## ⚠️ Conditional: Large Assets

### Model Files - Host on Hugging Face Instead
| Model | Size | Location | Download |
|-------|------|----------|----------|
| `qwen3-1.7b.Q4_K_M.gguf` | 1.08 GB | Hugging Face: `intern26050018-Derek/re-st-qwen3-1.7b` | `npm run download-model` |

**Why not Git?**
- GitHub file limit: 100 MB
- GitHub LFS free tier: 1 GB total (model is 1.08 GB)
- Hugging Face is purpose-built for ML models
- Version control for models is different from code

**When you improve the model:**
1. Upload new version to Hugging Face repo
2. Update `scripts/download-model.js` with new URL/size
2. Commit the script change
3. Team runs `npm run download-model` to get new version

---

## 📦 On New Machine Setup

```bash
# 1. Clone repo
git clone https://github.com/intern26050018-Derek/RE-ST.git
cd RE-ST

# 2. Install dependencies
npm install

# 3. Download model (1.08 GB)
npm run download-model

# 4. Start development
npm start
```

---

## 🔧 Git Commands Reference

### Add all source files (safe)
```bash
git add src/ package.json package-lock.json tsconfig.json app.json babel.config.js .gitignore scripts/ assets/ *.md
git commit -m "feat: description"
git push origin main
```

### Check what will be pushed
```bash
git status
git diff --cached --name-only
```

### If you accidentally committed a large file:
```bash
# Remove from git history (use with caution)
git rm --cached path/to/large-file
echo "path/to/large-file" >> .gitignore
git commit -m "Remove large file from tracking"
```

---

## 📝 Summary Checklist

Before pushing, verify:
- [ ] No `*.gguf`, `*.bin`, `*.safetensors` files in commit
- [ ] No `node_modules/`, `dist/`, `build/` in commit
- [ ] No `.env`, `*.pem`, `*.key` files in commit
- [ ] No `*.log`, `.DS_Store`, `Thumbs.db` in commit
- [ ] Model download script (`scripts/download-model.js`) is included
- [ ] All source files under `src/` are included
- [ ] Config files (`package.json`, `app.json`, etc.) are included
- [ ] Documentation updated if needed

---

## 📞 Questions?

If unsure about a file, check:
1. Is it under 100 MB? → OK to push
2. Is it source code / config / docs? → OK to push
3. Is it a model / build artifact / secret / cache? → DO NOT push
4. When in doubt: add to `.gitignore` and ask

---

**Last Updated**: 2026-09-30  
**Model Version**: Qwen3-1.7B Q4_K_M (1.08 GB) hosted on Hugging Face