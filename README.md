# EvictUs

## Table of Contents

  * [EvictUs](#what-is-evictus?)
  * [What technologies will be used?](#what-technologies-will-be-used?)
  * [Goals](#goals)
  * [How to set up the website?](#how-to-set-up-the-website?)
  * [Heroku Link](#Heroku Link)
  * [Prototyping](#prototyping)
    * [Wireframes](#wireframes)
      * [Minimum Viable Product](#minimum-viable-product)
      * [Stretch: Single Page](#stretch-single-page)
      * [Stretch: User](#stretch-user)
    * [Entity Relationship Diagram](#entity-relationship-diagram)
    * [User Stories](#user-stories)

## What is EvictUs?

![main screenshot](https://github.com/isangieri/project-01/blob/master/public/images/main-content-shot.png)
![tenant-rights screenshot](https://github.com/isangieri/project-01/blob/master/public/images/tenant-rights-content.png)
![eviction-feed screenshot](https://github.com/isangieri/project-01/blob/master/public/images/eviction-feed-content.png)
A website that will serve as a resource for evictions in San Francisco.  Its aim is to synthesize tenants rights information and existing advocacy efforts into a social forum. Users are able to upload photos, correspondence, and documents. The app creates a paper trail, and connects users to rights organizations.

## Technologies

EvictUs was created as a full stack web application using Mongoose, Express, jQuery/AJAX, and Node.js.

## Goals

**Goals that have been strikethroughed mean that goal has been reached.**
*~~Express Application that has both HTML and JSON API endpoints~~
*~~RESTful CRUD routes~~
*~~Leverage AJAX to fetch JSON data from the backend~~
*~~Use jQuery to add interactivity and render data on the client-side~~
*~~Persist at least three models to a Mongo Database~~
*~~Use Twitter Bootstrap CSS framework~~
*~~Render JSON data on the frontend using Handlebars templates~~
*~~Use external API from https://data.sfgov.org to integrate evictions and notices~~
*~~Use external Google Street View API to integrate images and evictions~~
*~~Deploy code to Heroku~~
*~~Links to more information about tenant rights resources~~
*~~Single page app~~
*~~Users can browse eviction information and notices~~
*~~Users can submit, edit and delete notices stored in a database~~
*Users can signup, login, and logout
*Users can search for an eviction by Estoppel ID or neighborhood
*Validate data by handling incorrect form inputs during create/update
*Embedded Google map with markers for each eviction
*Users can browse eviction makers in embedded Google Map


## How to set up the website?

Make sure you have [Node Package Manager](https://www.npmjs.com/) installed.

Commands that need to be run in order to install everything:
* `npm init`
* `npm install --save express`
* `npm install --save mongoose`
* `npm install --save mongodb`

## Heroku Link

https://sf-evictions-feed.herokuapp.com/

## Prototyping

### Wireframes

![Wireframe 01](https://raw.githubusercontent.com/isangieri/project-01/master/public/images/IMG_20151210_165526.jpg)

![Wireframe 02](https://github.com/isangieri/project-01/blob/master/public/images/IMG_20151215_220235.jpg)

### Front End Flow Diagram

![Front End Flow](https://github.com/isangieri/project-01/blob/master/public/images/IMG_20151210_173251.jpg)

### Database Flow Diagram

![Database Flow](https://github.com/isangieri/project-01/blob/master/public/images/IMG_20151212_185737.jpg)

#### Minimum Viable Product

![MVP](https://raw.githubusercontent.com/isangieri/project-01/master/public/images/MVP.png)

#### Stretch: User Auth

![Login and Signup](https://image.png)

#### Stretch: Multiple HTML Endpoints, Map

![Mulitple HTML Endpoints](https://image.png)

![Map](https://image.png)

### Entity Relationship Diagram

![ERD](https://github.com/isangieri/project-01/blob/master/public/images/ERD.png)

### User Stories

A [Trello board](https://trello.com/) is being used to track user stories and the current progress on each one.