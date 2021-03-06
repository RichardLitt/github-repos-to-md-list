var Github = require('github-api')
var fs = require('fs')
var _ = require('lodash')
var argv = require('minimist')(process.argv.slice(2), {
  alias: {
    o: getOrgRepos,
    p: parseJson,
    r: getRepos
  }
})

var github = new Github({
  username: process.env.USERNAME,
  password: process.env.PASSWORD,
  auth: 'basic'
})

var getOrgRepos = function (orgname) {
  var user = github.getUser()
  user.orgRepos(orgname, function (err, repos) {
    if (err) throw err
    fs.writeFile(orgname + '-repositories.txt', JSON.stringify(repos), function (err) {
      if (err) throw err
      console.log('It\'s saved!')
    })
  })
}

var getRepos = function () {
  var user = github.getUser()
  user.repos(function (err, repos) {
    if (err) throw err
    fs.writeFile(github.username + '-repositories.txt', JSON.stringify(repos), function (err) {
      if (err) throw err
      console.log('It\'s saved!')
    })
  })
}

var printString = function (data) {
  _.forEach(data, function (repo) {
    var string = '* [' + repo.name + ']('
    string += repo.html_url + ') ' + repo.description
    if (repo.fork && repo.homepage) {
      string += ' (_Fork_)'
    }

    console.log(string)
  })
}

var parseJson = function (filename) {
  fs.readFile(filename, function (err, data) {
    if (err) console.log('Failed to parse file.')
    printString(JSON.parse(data.toString()))
  })
}

var printRepos = function (orgname) {
  var user = github.getUser()
  user.orgRepos(orgname, function (err, repos) {
    if (err) console.log('Null')
    printString(repos)
  })
}

if (argv.getOrgRepos)getOrgRepos(argv.getOrgRepos)
if (argv.getRepos) getRepos()
if (argv.parse) parseJson(argv.parse)
if (argv._) _.forEach(argv._, printRepos(argv._))
