# github-repos-to-md-list

[![Greenkeeper badge](https://badges.greenkeeper.io/RichardLitt/github-repos-to-md-list.svg)](https://greenkeeper.io/)
Make a markdown list of a user's or organization's repositories

# Usage

Manually enter in your username and password in index.js. 

To see the individual calls:

```sh
  node index.js --getOrgRepos=ExampleOrganization
  node index.js --parse=ExampleOrganization-repositories.txt
```

Else, just do:

```sh
  node index.js <organization_name>
```


