# Actimoji
The game: Actimoji

# Requirements

## Mariadb

You need a mariadb server running on port 3307. Run the dbSetup.sql script as
admin to create the database and the user. After that, the database part should
be fine. You only have to do this once, unless you delete either the database
or the user.

The script is found at: backend/Actimoji/src/main/dbSetup.sql

---

# Starting the server

To start the backend server, first open backend/Actimoji in Intellij Idea. If
not already selected, select ActimojiApplication from the running
configurations. Run the configuration.

To start the frontend server, navigate to /frontend in a terminal and run:
`npm start`

---

# Documentation

Documentation is accessible through this url:

https://github.com/BieleczkiGergo/Actimoji/tree/main/backend/Actimoji/docs

Or alternatively, you can click on the 'Docs' button in the application.

# Archiving

To create an archive of the project, run `archive.sh`.

