#!/usr/bin/env node
"use strict";


var express = require("express");
var app = express();
const path = require("path");

app.set('view engine', 'pug');


var staticFiles = path.join(__dirname, "public");

app.use(express.static(staticFiles));

app.get("/", (req, res) => {
    res.render("home", {
        title: "Hem"
    });
});

app.get("/about", (req, res) => {
    res.render("about", {
        title: "Om Kursen"
    });
});

app.get("/report", (req, res) => {
    res.render("report", {
        title: "Kursmoment"
    });
});

app.use((req, res, next) => {
    var err = new Error("Not Found");

    err.status = 404;
    next(err);
});

app.use((err, req, res, next) => {
    if (res.headersSent) {
        return next(err);
    }
    err.status = err.status || 500;
    res.status(err.status);
    res.render("error", {
        error: err
    });
});

var DBWEBB_PORT = 1337;

if ( typeof process.env.DBWEBB_PORT !== 'undefined' && process.env.DBWEBB_PORT ) {
    DBWEBB_PORT = process.env.DBWEBB_PORT;
}
app.listen(DBWEBB_PORT, function() {
    console.log("Listening to port " + DBWEBB_PORT);
});
