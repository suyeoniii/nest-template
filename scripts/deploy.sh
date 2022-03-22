cd /var/www/nest-template
git pull origin main
npm ci
npm run build
pm2 restart dist/main.js
echo deploy completed