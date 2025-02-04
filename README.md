# Attendance List App

This is a simple straight forward application where you can enter the details of attendees like firstname, lastname, email, address and phone number, and generate a list that is a compilation of all the names entered that day.

- The list is downloadable both as pdf and csv format.
- It uses indexDB in the browser to store the list in the browser.
- You can create, edit and delete an entry.

## Screenshots

![App Screenshot](/public/ss1.png)
![App Screenshot](/public/ss2.png)
![App Screenshot](/public/ss3.png)
![App Screenshot](/public/ss4.png)


## Tech Stack

**Client:** 
- NextJs, 
- TailwindCSS (for styling), 
- Shadcn component library,
- Dexie.js( used to interact with indexDB ), 
- react-pdf( for creating downloadable pdf ), 
- react-hook-form (For managing the form),
- zod ( validating the user input ),
- uuid (for generating unique values as keys)

## Run Locally

Clone the project

```bash
  git clone https://github.com/BiggieOneBillion/attendance-sheet.git
```

Go to the project directory

```bash
  cd my-project
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm run dev
```
