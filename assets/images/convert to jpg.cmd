@echo off

cd icons/blacksmith
for %%i in (*.png) do ffmpeg -i "%%i" "%%~ni.webp"

cd ../enemies
for %%i in (*.png) do ffmpeg -i "%%i" "%%~ni.webp"

cd ../misc
for %%i in (*.png) do ffmpeg -i "%%i" "%%~ni.webp"

cd ../mutators
for %%i in (*.png) do ffmpeg -i "%%i" "%%~ni.webp"

cd ../perks
for %%i in (*.png) do ffmpeg -i "%%i" "%%~ni.webp"

cd ../royal_forge
for %%i in (*.png) do ffmpeg -i "%%i" "%%~ni.webp"

cd ../units
for %%i in (*.png) do ffmpeg -i "%%i" "%%~ni.webp"

cd ../upgrades
for %%i in (*.png) do ffmpeg -i "%%i" "%%~ni.webp"

cd ../weapons
for %%i in (*.png) do ffmpeg -i "%%i" "%%~ni.webp"

echo "====== ICONS DONE ======
pause

cd ../../maps/durststein
for %%i in (*.png) do ffmpeg -i "%%i" "%%~ni.webp"

cd ../frostsee
for %%i in (*.png) do ffmpeg -i "%%i" "%%~ni.webp"

cd ../neuland
for %%i in (*.png) do ffmpeg -i "%%i" "%%~ni.webp"

cd ../nordfels
for %%i in (*.png) do ffmpeg -i "%%i" "%%~ni.webp"

cd ../sturmklamm
for %%i in (*.png) do ffmpeg -i "%%i" "%%~ni.webp"

cd ../uferwind
for %%i in (*.png) do ffmpeg -i "%%i" "%%~ni.webp"

echo MAPS DONE
pause