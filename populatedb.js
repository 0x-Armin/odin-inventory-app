#! /usr/bin/env node

console.log('This script populates some test boards and categories to your database. Specified database as argument - e.g.: node populatedb "mongodb+srv://cooluser:coolpassword@cluster0.lz91hw2.mongodb.net/local_library?retryWrites=true&w=majority"');

// Get arguments passed on command line
const userArgs = process.argv.slice(2);

const async = require('async')
const Board = require('./models/board')
const Category = require('./models/category')

const mongoose = require('mongoose');
mongoose.set('strictQuery', false); // Prepare for Mongoose 7

const mongoDB = userArgs[0];

main().catch(err => console.log(err));
async function main() {
  await mongoose.connect(mongoDB);
}

const boards = []
const categories = []

async function boardCreate(name, description, category, price, numInStock, cb) {
  const board = new Board({
    name: name,
    description: description,
    category: category,
    price: price,
    numInStock: numInStock,
  });

  try {
    await board.save();
    console.log('New Board: ' + board);
    boards.push(board);
    cb(null, board);
  } catch (err) {
    cb(err, null);
    return;
  }
}

async function categoryCreate(name, description, cb) {
  categorydetail = {name: name};
  if (description != false) categorydetail.description = description;

  const category = new Category(categorydetail);

  try {
    await category.save();
    console.log('New Category: ' + category);
    categories.push(category);
    cb(null, category);
  } catch (err) {
    cb(err, null);
    return;
  }
}

function createCategories(cb) {
  async.series([
    function(callback) {
      categoryCreate('Skatebord', 'Sports equipment for skateboarding', callback);
    },
    function(callback) {
      categoryCreate('Longboard', 'Sports equipment for longboarding', callback);
    },
    function(callback) {
      categoryCreate('Surf skates', 'Sports equipment for surf skating', callback);
    },
  ],
  // optional callback
  cb);
}

function createBoards(cb) {
  async.series([
    function(callback) {
      boardCreate(
        'Santa Cruz Classic Dot 8" Complete', 
        'Featuring all new wider shapes for easy foot placement and shorter wheelbases for easy turning with a sizing guide hangtag that makes buying a new complete straight forward for individuals of any age or gender.', 
        categories[0],
        239.00,
        5,
        callback
      );
    },
    function(callback) {
      boardCreate(
        'Globe Environmentalist Mini 7" Complete (Rubber Grip)',
        `The same great deck Resin-7 deck construction, but in smaller sizes for groms. This kid's complete skateboard features resin-7 hard rock maple deck with mellow concave, 4.75” Tensor alloy trucks and Globe's high rebound 51mm 95a wheels.`,
        categories[0],
        209.00,
        8,
        callback
      );
    },
    function(callback) {
      boardCreate(
        'Globe Bannerstone 41"',
        `Classic drop-down, twin-tip longboard with slight side-to-side concave. The Bannerstone in Lodge is a down-hill and cruising longboard featuring hard rock maple 8-ply deck with artwork by featured artist Sterling Bartlett.`,
        categories[1],
        329.00,
        7,
        callback
      );
    },
    function(callback) {
      boardCreate(
        `Sector 9 Basic Bintang Longboard 38" x 9.25"`,
        `This season, we're proud to introduce our latest artist and photographer, Travis Burke. He is an accomplished photographer, athlete, public speaker and explorer. Growing up passionate about skateboarding and surfing in San Diego, California, Travis has always been known to push the boundaries of his crafts.`,
        categories[1],
        339.00,
        11,
        callback
      );
    },
    function(callback) {
      boardCreate(
        `Santa Cruz x Carver Flamed Not a Dot Surf Skate 9.75" x 29.95"`,
        `Santa Cruz Skateboards, in collaboration with Carver, presents an all new line up of surf skate cruzers featuring high quality 7 ply North American Maple decks, branded OJ or Slime Balls wheels, and Carver surfskate trucks all custom designed and tuned by Santa Cruz.`,
        categories[2],
        379.00,
        21,
        callback
      );
    },
  ], 
  // optional callback
  cb);
}

async.series([
    createCategories,
    createBoards,
],
// Optional callback
function(err, results) {
    if (err) {
        console.log('FINAL ERR: ' + err);
    }
    else {
        console.log('Boards: ' + boards);
        
    }
    // All done, disconnect from database
    mongoose.connection.close();
});




