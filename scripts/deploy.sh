runuser -l ubuntu -c "pm2 stop dist/main.js"
runuser -l ubuntu -c "pm2 start dist/main.js"