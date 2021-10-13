# signin_oAuth2.0
Simple side-project that integrates the google sign-in functionality thanks to oAuth2.0. This is made with:
     
     - Node.js (runtime)
     - express.js (framework)
     - ejs (template engine)
     - passport.js (framework)
     - passport-google-oauth20 (strategy of passport.js)
     
In this account i will build another project, more complete in ejs/html terms. So you can understand it more and more. It will be a 'real project scenario '.


<h1>Before coding, most importantly, you've to setup this project inside the dev console of google.</h1>

https://console.cloud.google.com

General Steps:
- Create the project
- Configure the OAuth consent screen:

      - External user type >
      - add scopes:  .../auth/userinfo.email, 	.../auth/userinfo.profile
      - add some emails to test the project in development mode
      - Go in the 'credentials' section and create ID client OAuth
      - Set 'web application' as type of the project(if it is naturally)
      - as redirect URI, set:   http://localhost:80/google/callback
      - Fill the credentials get from Google and fill them in the .env of the project
     

