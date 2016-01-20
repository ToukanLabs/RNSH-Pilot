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
6. Remove all files in your apache html directory (/var/www/html)
7. Deploy all files in `./dist` to your apache html directory.

# Server Config

1. Ensure apache mod_rewrite is installed: `a2enmod rewrite`
2. Add the following to `<Directory /> ...` in apache2.conf:
  ```
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /index.html [L]
  ```
