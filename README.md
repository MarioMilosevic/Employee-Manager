# Employee Manager

Full stack application with express backend, PostreSQL database and Vue 3 frontend. Typescript supported both on the front and the back. SCSS for styling.

## Authentication
  Jason web token workflow. Token is saved in local storage, sent from the client and then decoded on the backend on authentication and particular requests.

## Models: Employee / User / InputField / Table Heading

## State Management: Pinia stores are to be found in stores folder.

## Features:
  - Sign up / Login / Guest login
  - Overview of the employees on the homepage (GET request),
  - Overview of the users on the dashboard page for ADMIN users only,
  - Edit employee information or remove employee (PUT & DELETE requests, real time updates on the client),
  - Admin dashboard: control user information. Delete users (DELETE request, Authorization middleware running on the backend preventing non admin users from reaching dashboard page).

## Technologies Used:
  - Node
  - Express
  - PostgreSQL
  - Prisma
  - JWT
  - Vue 3 (pinia, vue router)
  - zod
  - Scss
  - Typescript


  

