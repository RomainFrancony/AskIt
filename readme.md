# Ask It

Inspire from [strawpoll](strawpoll.me) ,this is an website that allows you to create share polls, you can see the evolution of the result in real time. I developed his application in order to discover Node.

### Prerequisites

* Download and install [Node.js](https://nodejs.org/en/)
* Download and install [PostgreSQL](https://www.postgresql.org/)

### Installing

* Download this repositerie, install the dependencies with npm via the Windows console :

```
npm install
```

* Create the database using the SQL script [database.sql](database.sql)

* Connect the application to your database by modifying the connection string in [db.js](/model/db.js)

```
pg://user:password@host:port/database
```

* Then launch the application

```
node app.js
```

* The application is now launched, go at the following adress :

```
http://localhost:8080
```

## Built With

*[Node.js](https://nodejs.org/en/)
*[Bootstrap](http://getbootstrap.com/)

See the [package.json](package.json) for the npm modules used.


## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments

* Hat tip to anyone who's code was used
* Inspiration
* etc
