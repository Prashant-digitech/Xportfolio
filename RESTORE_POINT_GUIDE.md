# Xportfolio - System Restore Point & Disaster Recovery Guide

> **Restore Point Created:** September 29, 2026  
> **Status:** Production Verified & Live at [xportfolio-sigma.vercel.app](https://xportfolio-sigma.vercel.app)  
> **Quality Gate:** TypeScript Strict Checked (`0 errors`), Turbopack Build Passed, 7/7 Playwright E2E Tests Passed.

---

## 1. Git Restore Points (Remote & Local)

Your project has been permanently checkpointed in Git with both an annotated tag and a dedicated backup branch that is pushed to your remote repository:

| Asset Type | Identifier | Purpose |
| :--- | :--- | :--- |
| **Git Tag (Versioned)** | `v1.0.0-restore-point` | Immutable snapshot of verified production build |
| **Git Tag (Alias)** | `restore-point-stable` | Quick reference stable production tag |
| **Git Backup Branch** | `restore-point/stable-production-2026-09-29` | Isolated branch protected against changes to `main` |
| **Git Commit Hash** | `2279233` | Exact commit ID pushed to GitHub `origin/main` |
| **Remote Repository** | `https://github.com/Prashant-digitech/Xportfolio.git` | GitHub remote repository |

### How to Restore via Git:

#### Method A: 1-Click Script
Run the helper script from your terminal or double-click it in Windows Explorer:
```cmd
scripts\restore-from-checkpoint.bat
```
Choose `[1]` to hard reset to `v1.0.0-restore-point` or `[2]` to switch to the backup branch.

#### Method B: Manual Git Commands
If you ever need to roll back any bad code changes on `main`:
```bash
# Discard uncommitted changes and hard reset to the restore point:
git checkout main
git reset --hard v1.0.0-restore-point

# Force push to GitHub if main branch was accidentally broken:
git push origin main --force
```

Or switch directly to the permanent backup branch:
```bash
git checkout restore-point/stable-production-2026-09-29
```

---

## 2. Local Disk Backup (Offline & Self-Contained)

An exact, complete, uncompressed mirror AND an encrypted/compressed `.zip` archive of every source file, asset, public file, test, script, and config have been saved outside the working repository to prevent accidental deletion or corruption:

| Backup Path | Size | Description |
| :--- | :--- | :--- |
| `C:\D drive\Projects\Xportfolio_Backups\Xportfolio_restore_point_20260929_215253\` | **1.56 GB** (812 files) | Uncompressed, ready-to-copy snapshot |
| `C:\D drive\Projects\Xportfolio_Backups\Xportfolio_restore_point_20260929_215253.zip` | **1.47 GB** | Complete compressed ZIP archive |

### How to Restore via Local Disk Backup:

#### Method A: Using the Restore Script
Run `scripts\restore-from-checkpoint.bat` and select `[3]`. All files will be copied back into your workspace instantly.

#### Method B: Manual Copy
Copy the contents of `C:\D drive\Projects\Xportfolio_Backups\Xportfolio_restore_point_20260929_215253\` directly into `C:\D drive\Projects\Xportfolio\`.

---

## 3. What is Included in this Restore Point

1. **In-App Case Study Reader (`InAppCaseStudyViewer.tsx`)**:
   - Sandboxed inline case study and HTML deck viewer with a prominent "Back to Portfolio" button.
   - Interactive HTML decks for DeepAstro, CosmosX, TradeX, DesignOS, PathWise, PresentX, and FutureMind.

2. **Visual Systems & Artwork Showcase (`VisualSystems.tsx`)**:
   - Full 20-piece artwork collection with responsive cards, hover zoom, and smooth scale-transition overlay modals with technical specs.

3. **Client Web Showcase (`ClientWebsites.tsx`)**:
   - Veronixx live showcase, compressed high-fidelity app preview video, and graphics gallery.

4. **Showreel & Media Pipeline (`MotionLab.tsx`)**:
   - Clean, watermark-free showreel integration.

5. **Automated E2E Suite (`tests/e2e_check.spec.ts`)**:
   - 7 Playwright tests covering zero-error hydration, theme switching, drawer controls, chatbot interactions, graphics modal scaling, and in-app case study navigation.
