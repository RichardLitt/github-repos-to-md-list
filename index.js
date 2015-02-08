var Github = require("github-api")
var fs = require("fs")
var argv = require('minimist')(process.argv.slice(2));
var _ = require("lodash")

var github = new Github({
  username: "YOUR_USERNAME",
  password: "YOUR_PASSWORD",
  auth: "basic"
});

var getOrgRepos = function(org) {
	var user = github.getUser();
	user.orgRepos(org, function(err, repos) {
		fs.writeFile(org + '-repositories.txt', JSON.stringify(repos), function (err) {
		  if (err) throw err;
		  console.log('It\'s saved!');
		});
	});
}

var getRepos = function() {
  var user = github.getUser();
  user.repos(function(err, repos) {
    fs.writeFile(github.username + '-repositories.txt', JSON.stringify(repos), function (err) {
      if (err) throw err;
      console.log('It\'s saved!');
    });
  });
}

var parseJson = function(filename) {
	fs.readFile(filename, function(err, data) {
    if (err) console.log("Failed to aprse file.")

    data = JSON.parse(data.toString())

    _.forEach(data, function(repo) {

      var string = ' * [' + repo.name + ']('
      string += repo.html_url + ') ' + repo.description
      if (repo.fork && repo.homepage) 
        string += ' (_Fork_)\n'
      else 
        string += '\n'

      fs.appendFile('links.md', string, function(err) {
        if (err) console.log("Something broke", err)

        console.log(string)
      })
    })

  })
}

if (argv.getOrgRepos) getOrgRepos(argv.getRepos)
if (argv.getRepos) getRepos()
if (argv.parse) parseJson(argv.parse)