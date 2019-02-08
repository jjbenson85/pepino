require('dotenv').config()

const mongoose = require('mongoose')
const Promise = require('bluebird')

mongoose.Promise = Promise

const Package = require('../models/package')



mongoose.connect(process.env.MONGODB_URI, (err, db) => {
  db.dropDatabase()

    .then(()=>{
      return Package.create({
        name: 'webpack',
        description: 'Packs CommonJs/AMD modules for the browser. Allows to split your codebase into multiple bundles, which can be loaded on demand. Support loaders to preprocess files, i.e. json, jsx, es7, css, less, ... and your custom stuff.',
        keywords: ['webpack'],
        downloadsCount: 22629569
      })
    })
    .then(()=>{
      return Package.create({
        name: 'webpack-dev-server',
        description: 'Serves a webpack app. Updates the browser on changes.',
        keywords: ['webpack', 'server', 'development'],
        downloadsCount: 13643230
      })
    })
    .then(()=>{
      return Package.create({
        name: 'webpack-dev-middleware',
        description: 'A development middleware for webpack',
        keywords: ['webpack'],
        downloadsCount: 17615165
      })
    })
    .then(()=>{
      return Package.create({
        name: 'file-loader',
        description: 'A file loader module for webpack',
        keywords: ['webpack', 'file-loader' ],
        downloadsCount: 16021065
      })
    })
    .then(()=>{
      return Package.create({
        name: 'postcss-loader',
        description: 'PostCSS loader for webpack',
        keywords: ['css', 'postcss','postcss-runner','webpack','webpack-loader'],
        downloadsCount: 16021065
      })
    })
    .then(()=>{
      return Package.create({
        name: 'html-webpack-plugin',
        description: 'Simplifies creation of HTML files to serve your webpack bundles',
        keywords: ['webpack','plugin','html','html-webpack-plugin'],
        downloadsCount: 10753297
      })
    })
    .then(()=>{
      return Package.create({
        name: 'url-loader',
        description: 'A loader for webpack which transforms files into base64 URIs',
        keywords: ['webpack', 'url', 'url-loader'],
        downloadsCount: 11671284
      })
    })
    .then(()=>{
      return Package.create({
        name: 'webpack-bundle-analyzer',
        description: 'Webpack plugin and CLI utility that represents bundle content as convenient interactive zoomable treemap',
        keywords: ['webpack', 'bundle', 'analyzer', 'modules', 'size', 'interactive', 'chart', 'treemap', 'zoomable', 'zoom'],
        downloadsCount: 3862578
      })
    })
    .then(()=>{
      return Package.create({
        name: 'sass-loader',
        description: 'Sass loader for webpack',
        keywords: [ 'sass', 'libsass', 'webpack', 'loader'],
        downloadsCount: 9913408
      })
    })
    .then(()=>{
      return Package.create({
        name: 'webpack-cli',
        description: 'CLI for webpack & friends',
        keywords: [ 'webpack', 'cli', 'scaffolding', 'module', 'bundler'],
        downloadsCount: 4891405
      })
    })
    .then(()=>{
      return Package.create({
        name: 'terser-webpack-plugin',
        description: 'Terser plugin for webpack',
        keywords: [ 'uglify', 'uglify-js', 'uglify-es', 'terser', 'webpack', 'webpack-plugin', 'minification', 'compress', 'compressor', 'min', 'minification', 'minifier', 'minify', 'optimize', 'optimizer'],
        downloadsCount: 5988334
      })
    })
    .then(()=>{
      return Package.create({
        name: 'case-sensitive-paths-webpack-plugin',
        description: 'Enforces module path case sensitivity in Webpack',
        keywords: ['webpack', 'plugin', 'case sensitive', 'import', 'require'],
        downloadsCount: 6755529
      })
    })

    .then(() => console.log('Database successfully seeded'))
    .catch(err => console.log(err))
    .finally(() => mongoose.connection.close())
})
