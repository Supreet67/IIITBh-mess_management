# IIIT Bhubaneswar MessMate - GitHub Upload Assistant
# This script initializes the repository and pushes your project to GitHub.

Write-Host "=====================================================================" -ForegroundColor Cyan
Write-Host "   IIIT BHUBANESWAR - MESSMATE GITHUB UPLOAD ASSISTANT" -ForegroundColor Yellow
Write-Host "=====================================================================" -ForegroundColor Cyan
Write-Host ""

$gitCmd = Get-Command git -ErrorAction SilentlyContinue

if (-not $gitCmd) {
    Write-Host "[!] Git is not currently installed or not detected in your system PATH." -ForegroundColor Yellow
    Write-Host ""
    Write-Host "You have 3 easy ways to upload this project to your GitHub:" -ForegroundColor Green
    Write-Host ""
    Write-Host "Option 1 (Fastest - Browser Web Upload):" -ForegroundColor Cyan
    Write-Host "  1. Go to https://github.com/new and create a new repository (e.g. 'iiitb-messmate')."
    Write-Host "  2. On the new repository page, click 'uploading an existing file'."
    Write-Host "  3. Select all files and folders in 'D:\SupreetProject' and drag them into GitHub."
    Write-Host "  4. Click 'Commit changes'."
    Write-Host ""
    Write-Host "Option 2 (Install Git automatically via Windows Package Manager):" -ForegroundColor Cyan
    Write-Host "  Run: winget install --id Git.Git -e --source winget"
    Write-Host "  Then close and reopen PowerShell and run this script again."
    Write-Host ""
    Write-Host "Option 3 (GitHub Desktop):" -ForegroundColor Cyan
    Write-Host "  Download GitHub Desktop from https://desktop.github.com, choose 'Add Existing Repository', select 'D:\SupreetProject', and click 'Publish repository'."
    Write-Host ""
    
    $installNow = Read-Host "Would you like to try installing Git automatically now using winget? (Y/N)"
    if ($installNow -eq 'Y' -or $installNow -eq 'y') {
        Write-Host "Attempting winget install..." -ForegroundColor Cyan
        try {
            winget install --id Git.Git -e --source winget
            Write-Host "Git installation triggered. Please restart PowerShell and run this script again." -ForegroundColor Green
        } catch {
            Write-Host "Could not automatically invoke winget. Please download Git from https://git-scm.com/download/win or use Option 1." -ForegroundColor Red
        }
    }
    pause
    exit
}

# If Git is installed:
Write-Host "[✓] Git detected: $(git --version)" -ForegroundColor Green
Write-Host ""

$repoUrl = Read-Host "Please enter your GitHub repository URL (e.g., https://github.com/your-username/iiitb-messmate.git)"

if ([string]::IsNullOrWhiteSpace($repoUrl)) {
    Write-Host "[!] No URL provided. Aborting." -ForegroundColor Red
    pause
    exit
}

Set-Location -Path $PSScriptRoot

Write-Host "Initializing Git repository..." -ForegroundColor Cyan
git init
git add .
git commit -m "Initial commit: Complete dynamic web application for IIIT Bhubaneswar Mess Management System"
git branch -M main

# Check if origin already exists
$existingRemote = git remote get-url origin 2>$null
if ($existingRemote) {
    git remote set-url origin $repoUrl
} else {
    git remote add origin $repoUrl
}

Write-Host "Pushing to GitHub repository ($repoUrl)..." -ForegroundColor Cyan
git push -u origin main

if ($LASTEXITCODE -eq 0) {
    Write-Host ""
    Write-Host "[✓] SUCCESS! Your IIIT Bhubaneswar MessMate application is now on GitHub!" -ForegroundColor Green
    Write-Host ""
    Write-Host "To enable FREE 24/7 Deployment via GitHub Pages:" -ForegroundColor Yellow
    Write-Host "  1. Go to your repository on GitHub."
    Write-Host "  2. Click 'Settings' -> 'Pages' (in the left sidebar)."
    Write-Host "  3. Under 'Build and deployment', set Source to 'GitHub Actions'."
    Write-Host "  4. Your website will automatically go LIVE at:"
    Write-Host "     https://<your-username>.github.io/<repo-name>/" -ForegroundColor Cyan
} else {
    Write-Host ""
    Write-Host "[!] Push failed or required authentication. Make sure you are logged into GitHub CLI or have Personal Access Token configured." -ForegroundColor Yellow
}

pause
