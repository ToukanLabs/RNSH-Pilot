View online at: [http://rnshpilot.fiviumdev.com/](http://rnshpilot.fiviumdev.com/).

Pilot clinical research database for Royal North Shore Hospital, Sydney.

[![Build Status](https://travis-ci.org/FiviumAustralia/RNSH-Pilot.svg?branch=master)](https://travis-ci.org/FiviumAustralia/RNSH-Pilot)

# Development

## Setup

1. Clone this repo.
2. Ensure you have node.js installed.
3. From within the cloned repository run `npm install`
4. To start the dev server run `npm start`
5. Point your browser to `http://localhost:3000`.

### Troubleshooting

If you have issues getting things to run on widows, specifically errors relating to `libsass`, try the following:

1. `npm install config-chain`
2. `npm rebuild node-sass`

# Manual Deployment

1. Change `NODE_ENV` in .env to `production`
2. Bump version in `package.json`
3. Tag build.
4. Run `npm run clean`
5. Run `npm run compile`
6. If using apache:
    * Remove all files in your apache html directory (/var/www/html)
    * Deploy all files in `./dist` to your apache html directory.
7. If using nginx:
    * Remove all files in your server root (/var/www/rnshpilot.fiviumdev.com)
    * Deploy all files in `./dist` to your server root directory.

# Server Config

## nginx

***Note: all occurrences of rnshpilot.fiviumdev.com below should be replace with the actual domain you are using***

1. Install nginx `sudo apt-get install nginx`
2. Create a directory to store the webpage assets (/var/www/rnshpilot.fiviumdev.com)
3. Create a config by copying the default one `cp /etc/nginx/site-available/default /etc/nginx/site-available/rnshpilot.fiviumdev.com`
4. Modify the following in the contents of the newly created file.
  ```
server {
        listen 80;

        root /var/www/rnshpilot.fiviumdev.com;
        index index.html index.htm;

        server_name rnshpilot.fiviumdev.com;

        location / {
                # Ensure all URL requests are redirected to index.html
                try_files $uri /index.html;
        }
}
```
5. Create a symlink to the new config `ln -s /etc/nginx/sites-available/rnshpilot.fiviumdev.com /etc/nginx/sites-enable/rnshpilot.fiviumdev.com`
6. Restart nginx `service nginx restart`
