## ToDo management web application

ToDo management web application website. Any user can create a Todo list and manage.

https://user-images.githubusercontent.com/65554508/132761367-ed8fbaef-6e70-4396-9c0c-11f184e01f97.mp4


**Tech Stack:** Next.js, Typescript, Auth0, AirTable, Material UI

---

### Getting Started

---

#### Set up Auth0

- Get the variables `AUTH0_BASE_URL`, `AUTH0_ISSUER_BASE_URL`, `AUTH0_CLIENT_ID`, `AUTH0_CLIENT_SECRET`.
- Create and fill up `.env` in root directory where `sample.env` file is available.
- More questions about Auth0 Configuration, please check the this [ref](https://github.com/auth0/nextjs-auth0).

#### Set up Airtable

- Create your own new workshop in Airtable
- Create four 4 fields which are `description` as Single line Text, `completed` as Checkbox, `userId` as Single line Text, `deadline` as Date.
- Get the variables `AIRTABLE_API_KEY`, `AIRTABLE_BASE_ID`, `AIRTABLE_TABLE_NAME`.
- Fill up `.env` in root directory where `sample.env` file is available.
- More questions about Airtable Configuration, please check the this [ref](https://help.appsheet.com/en/articles/1785063-using-data-from-airtable).

---

### Running the App

- Run `npm i` on root directory.
- To run `npm run dev` in the root directory.
