#! /bin/bash
cd /home/paper/paper-web
yarn
yarn build
cd /home/paper/paper-web/nginx_conf
cp nginx.conf /etc/nginx/sites-available/nginx.conf
cd /etc/nginx/sites-enabled
ln -s /etc/nginx/sites-available/nginx.conf nginx.conf
service nginx start
