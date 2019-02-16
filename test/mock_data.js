const packageData = [{
  name: 'webpack',
  description: 'Packs CommonJs/AMD modules for the browser. Allows to split your codebase into multiple bundles, which can be loaded on demand. Support loaders to preprocess files, i.e. json, jsx, es7, css, less, ... and your custom stuff.',
  icon: 'https://webpack.js.org/assets/icon-square-big.svg',
  version: '3.1.14',
  keywords: ['webpack'],
  downloadsCount: 22629569,
  comments: []
},{
  name: 'webpack-dev-server',
  description: 'Serves a webpack app. Updates the browser on changes.',
  icon: 'https://webpack.js.org/assets/icon-square-big.svg',
  version: '3.1.14',
  keywords: ['webpack', 'server', 'development'],
  downloadsCount: 13643230,
  comments: []

}]

const projectData =[{
  name: 'Beautiful Project',
  description: 'The most beautiful project',
  // packages: [],
  // visible: true
  comments: []
},{
  name: 'Health & Tasty',
  description: 'Super healthy',
  comments: []

}]

const userData = {
  username: 'James',
  password: 'pass',
  passwordConfirmation: 'pass',
  email: 'james@email.com',
  image: 'https://scontent-lhr3-1.xx.fbcdn.net/v/t1.0-9/13592585_820157962567_7587254174743103700_n.jpg?_nc_cat=107&_nc_ht=scontent-lhr3-1.xx&oh=aeb90d73de4bda5f560059b37658a67f&oe=5CE8FD2F',
  bio: 'I love packages!'
}
// const userData = {
//   username: 'test',
//   email: 'test@test.com',
//   password: 'test',
//   passwordConfirmation: 'test'
// }
module.exports = {
  packageData,
  projectData,
  userData
}
