const express = require("express");

const uuid = require("uuid")

const bodyParser = require("body-parser");

const app = express();

const db = require('knex')({
    client: 'pg',
    connection: {
        host: 'localhost',
        port: 5432,
        user: 'postgres',
        password: 'Akmm4167@',
        database: 'deanslot'
    }
});

app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.json("Everything is fine");
})

const database = {
    users: [
        {
            universityId: "211b414",
            password: "rma14",
            uuid: "ee78c517-cf20-45ab-a703-edb7347489fd"
        }
    ],
    sessions: [
        {
            "date": "2023-07-06",
            "time": "10:00 AM"
        },
        {
            "date": "2023-07-07",
            "time": "10:00 AM"
        }
    ]
}

app.post("/auth/student", (req, res) => {
    const { name, universityId, password } = req.body
    const myuuid = uuid.v4();
    db('student_users').insert({
        name: name,
        universityid: universityId,
        password: password,
        uuid: myuuid
    })
        .then(res.json(myuuid))
        .catch(res.json("Something went wrong"))

})

app.get("/sessions", (req, res) => {

    const token = req.headers.authorization.replace('Bearer ', '');
    db.select("*").from("student_users").where({
        uuid: token
    })
        .then(users => {
            if (users) {
                db.select("*").from("sessions")
                    .then(sessions => res.json(sessions))
                    .catch(err => res.json("Something went wrong"))
            }
            else {
                res.json("Invalid token")
            }
        })
        .catch("Something went wrong")

})

app.post("/sessions/book", (req, res) => {
    const { date, time } = req.body;
    const token = req.headers.authorization.replace('Bearer ', '');
    db.select("*").from("student_users").where({
        uuid: token
    })
        .then(users => {
            if (users) {
                db.transaction(trx => {
                    trx.insert({
                        student_name: users[0].name,
                        date: date,
                        time: time,
                    })
                        .into("pending_sessions")
                        .returning("*")
                        .then(sess => {
                            return trx("sessions")
                                .where({ date: date })
                                .del()
                        })
                        .then(trx.commit)
                        .catch(trx.rollback)
                })
            }
            else {
                res.json("Invalid token")
            }
        })
        .catch(err => res.json("Something went wrong"))




})

app.post("/auth/dean", (req, res) => {
    const { name, universityId, password } = req.body
    const myuuid = uuid.v4();
    db('dean_users').insert({
        name: name,
        universityid: universityId,
        password: password,
        uuid: myuuid
    })
        .then(res.json(myuuid))
        .catch(res.json("Something went wrong"))
})

app.get("/sessions/pending", (req, res) => {

    const token = req.headers.authorization.replace('Bearer ', '');
    db.select("*").from("dean_users").where({
        uuid: token
    })
        .then(users => {
            if (users) {
                db.select("*").from("pending_sessions")
                    .then(sessions => res.json(sessions))
                    .catch(err => res.json("Something went wrong"))
            }
            else {
                res.json("Invalid token")
            }
        })
        .catch("Something went wrong")

})


app.listen(3000, () => {
    console.log("App is running on port 3000");
})