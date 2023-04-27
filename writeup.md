To test things in the member registration form and Donation form

# Member Registration Form
Link: https://sv-communityadvocates.org/members/member-registration
1. Each field is required that means if the user leaves a field blank he/ she will be prompted to complete that field
2. Phone number and e-mail address have set patterns that means if the user enters a phone number or an e-mail address in a different format then he/ she will be prompted to match the required format
3. The submit button at the end should prompt an alert and after clicking OK, the data should be sent to the database in the back end

# Donation Form
Link: https://sv-communityadvocates.org/donation/
1. This form has multiple steps and has previous and next buttons to go to one page from another, there are also circles at the bottom that indicate which page you're on and once you've completed a page the circle indicating that respective page turns green
2. All the fields are required so if the user leaves a field blank and try to go to the next page, the field will turn red-ish to prompt the user to complete it

*The $10, $20 etc. buttons don't do anything as of now
*I have set the patterns for Phone number and e-mail address but I still need to fix some things for that to work

# Admin dashboard
link: https://sv-communityadvocates.org/admin/dashboard/

# Need dashboard: 
link: https://sv-communityadvocates.org/admin/dashboard/need/?id=2

## Website links
List of links to the working site:

  - Admin dashboard: https://sv-communityadvocates.org/admin/dashboard/
  - Need dashboard: https://sv-communityadvocates.org/admin/dashboard/need/?id=2
  - Request form: https://sv-communityadvocates.org/needs/request/
  - Member registration (to be a part of REACT program): https://sv-communityadvocates.org/members/member-registration/
  - Donation page: https://sv-communityadvocates.org/donation/
  - Some more

## Website structure
  
  - Domain name: sv-communityadvocates.org
    
    - The domain name is registered with GoDaddy under Sherri account. Sherri has shared her access to Phuc's GoDaddy acount (chphuc05@gmail.com)
    - The domain's DNS (which IP address the domain point to) is being manage by Phuc's Cloudflare account.

  - The website main address (sv-communityadvocates.org) is staying behind Cloudflare's CDN, which provides caching, SSL.

## Backend structure
The current backend is fully hosted on Amazon Web Service, using Dornsife's AWS account. List of services that currently being used:

- AWS Lightsail Instance: A compute instance (aka a computer) act as the main server, hosting the website (webserver, backend api server) and codedeploy server.
    
  - Specs: 1GB ram, 1 vCPU, 40GB SSD
  - Price: $5/month

- AWS Lightsail Database: MySQL database managed by aws for the website, storing all data.

  - Storage: 40GB
  - Price: $15/month

- AWS Codedeploy: This is a service from aws that automatically read any changes in our repository and deploy those changes (if any) directly to the server.

  - Price: $0.02 per update(?)

- AWS S2: Storage service, used in this case to store artifact from AWS Codedeploy

  - Price: $0?
   
   