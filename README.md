# Spokane Valley Community Advocates project

Its called R.E.A.C.T., Responsive Emergency Aid Communication Tree. We could use any and all help to get it up and running.

Our need is great and has worsened as we continue living with the COVID crisis. One of our ideas in filling this void is creating and organizing a website that will be a gateway into our services. We need domain hosting set up; resource partnership and text tree sign up forms; contact us access; blog space, as well as forms for requesting two types of help - resources and mutual aid. It would be great to also have a donation form with items offered.

Our goal is to be able to use a "text tree" (perhaps like a 6 digit # format) to put out a need request and a way to follow through when responses come back, as well as a way to accept donations. One of our E-board members is working on a resource list specific to the area and we are all connected to various Facebook groups and local entities. I'm not tech savvy in website production or creating an app that would work for our needs and would greatly appreciate, if chosen, any help 

**Work items**

* (*Anthony* & *Rachna*) Web development
  * [SVCA](https://m.facebook.com/SV.CommunityAdvocates/) - this is their Facebook page
  * Technologies to learn: HTML, CSS, Javascript, React, Bootstrap. We'll need to learn PHP too, but not yet.
  * [w3schools](https://w3schools.com) - This is a very good site to learn all sort of technologies that you'll need
* (*Phuc*) Database – start with blog 
* Text tree? 
* Forms for help – how does the conversation happen? 
* Meeting with client Tuesday
* WhitGit project 
* Daily standups 


Setting up using this: https://stackoverflow.com/questions/38671818/how-to-deploy-with-gitlab-ci-to-ec2-using-aws-codedeploy-codepipeline-s3

A runner was set up referencing this instruction: https://docs.gitlab.com/runner/register/

------------------------------------------------------------------

# 7/1 writeup - ()

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


