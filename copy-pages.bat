@echo off
REM Copy all page files from root pages folder to frontend/src/pages
REM Run this script from the project root directory

echo ======================================
echo Frontend Structure Migration Script
echo ======================================
echo.

if not exist "pages" (
    echo ERROR: pages folder not found in current directory!
    echo Make sure you run this script from the project root.
    pause
    exit /b 1
)

if not exist "frontend\src\pages" (
    echo ERROR: frontend\src\pages folder not found!
    echo Make sure frontend folder is properly set up.
    pause
    exit /b 1
)

echo Copying page files...
xcopy pages\*.tsx frontend\src\pages\ /Y

echo.
echo ======================================
echo Copy completed!
echo ======================================
echo.
echo Next steps:
echo 1. Verify all page files are in frontend/src/pages/
echo 2. Delete old page files from root
echo 3. Run: cd frontend
echo 4. Run: npm install
echo 5. Run: npm run dev
echo.
pause
