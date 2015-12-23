View online at: [http://rnshpilot.fiviumdev.com/](http://rnshpilot.fiviumdev.com/).

# Manual Deployment

1. Run `npm run compile`
2. Deploy all files in `./dist` to your apache html directory.
3. Ensure apache mod_rewrite is installed: `a2enmod rewrite`
4. Add the following to `<Directory /> ...` in apache2.conf:
  ```
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /index.html [L]
  ```
