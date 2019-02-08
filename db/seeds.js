require('dotenv').config()

const mongoose = require('mongoose')
const Promise = require('bluebird')

mongoose.Promise = Promise

const Package = require('../models/package')
const Project = require('../models/project')
const User = require('../models/user')

// let user1
// let user2

mongoose.connect(process.env.MONGODB_URI, (err, db) => {
  db.dropDatabase()
    .then( ()=>{
      return User.create({
        username: 'James',
        password: 'pass',
        passwordConfirmation: 'pass',
        email: 'james@email.com',
        image: 'https://scontent-lhr3-1.xx.fbcdn.net/v/t1.0-9/13592585_820157962567_7587254174743103700_n.jpg?_nc_cat=107&_nc_ht=scontent-lhr3-1.xx&oh=aeb90d73de4bda5f560059b37658a67f&oe=5CE8FD2F',
        bio: 'I love packages!'
      })
    })
    .then((user)=>{
      Project.create({
        name: 'Beautiful Project',
        description: 'The most beautiful',
        user: user,
        public: true
      })

      return Package.create([{
        name: 'webpack',
        description: 'Packs CommonJs/AMD modules for the browser. Allows to split your codebase into multiple bundles, which can be loaded on demand. Support loaders to preprocess files, i.e. json, jsx, es7, css, less, ... and your custom stuff.',
        keywords: ['webpack'],
        downloadsCount: 22629569,
        comments: [{
          text: 'This is great!',
          user: user
        },{
          text: 'Best package ever!',
          user: user
        }]
      },{
        name: 'webpack-dev-server',
        description: 'Serves a webpack app. Updates the browser on changes.',
        keywords: ['webpack', 'server', 'development'],
        downloadsCount: 13643230
      },{
        name: 'webpack-dev-middleware',
        description: 'A development middleware for webpack',
        keywords: ['webpack'],
        downloadsCount: 17615165
      },{
        name: 'webpack-dev-middleware',
        description: 'A development middleware for webpack',
        keywords: ['webpack'],
        downloadsCount: 17615165
      },{
        name: 'file-loader',
        description: 'A file loader module for webpack',
        keywords: ['webpack', 'file-loader' ],
        downloadsCount: 16021065
      },{
        name: 'postcss-loader',
        description: 'PostCSS loader for webpack',
        keywords: ['css', 'postcss','postcss-runner','webpack','webpack-loader'],
        downloadsCount: 16021065
      },{
        name: 'html-webpack-plugin',
        description: 'Simplifies creation of HTML files to serve your webpack bundles',
        keywords: ['webpack','plugin','html','html-webpack-plugin'],
        downloadsCount: 10753297
      },{
        name: 'url-loader',
        description: 'A loader for webpack which transforms files into base64 URIs',
        keywords: ['webpack', 'url', 'url-loader'],
        downloadsCount: 11671284
      },{
        name: 'webpack-bundle-analyzer',
        description: 'Webpack plugin and CLI utility that represents bundle content as convenient interactive zoomable treemap',
        keywords: ['webpack', 'bundle', 'analyzer', 'modules', 'size', 'interactive', 'chart', 'treemap', 'zoomable', 'zoom'],
        downloadsCount: 3862578
      },{
        name: 'sass-loader',
        description: 'Sass loader for webpack',
        keywords: [ 'sass', 'libsass', 'webpack', 'loader'],
        downloadsCount: 9913408
      },{
        name: 'webpack-cli',
        description: 'CLI for webpack & friends',
        keywords: [ 'webpack', 'cli', 'scaffolding', 'module', 'bundler'],
        downloadsCount: 4891405
      },{
        name: 'terser-webpack-plugin',
        description: 'Terser plugin for webpack',
        keywords: [ 'uglify', 'uglify-js', 'uglify-es', 'terser', 'webpack', 'webpack-plugin', 'minification', 'compress', 'compressor', 'min', 'minification', 'minifier', 'minify', 'optimize', 'optimizer'],
        downloadsCount: 5988334
      },{
        name: 'case-sensitive-paths-webpack-plugin',
        description: 'Enforces module path case sensitivity in Webpack',
        keywords: ['webpack', 'plugin', 'case sensitive', 'import', 'require'],
        downloadsCount: 6755529
      }])
    })


    .then(() => console.log('Database successfully seeded'))
    .catch(err => console.log(err))
    .finally(() => mongoose.connection.close())
})
