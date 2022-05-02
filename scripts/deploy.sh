DEST=/var/www/nest-template
runuser -l ubuntu -c "pm2 stop $DEST/dist/main.js"
runuser -l ubuntu -c "pm2 start $DEST/dist/main.js"