# Git Kanban Cli

## How to use

If you want to use this script you have to set the environment variables bellow on `~/.bashrc` (or another file as your choice):
```sh
export GITHUB_TOKEN=tokenValue
#OR
export GITHUB_USER=username
export GITHUB_PASSWORD=userpass
```

# Instalation

To install into your machine run the commands bellow:
```sh
git clone git@github.com:euclecio/git-kanban-cli.git /your/path
cd /your/path
./configure
```
If it didn't work, try run it with `sudo`

```
### Analyze
Change stage to **Analysis** and assign the task to you

Usage: 
```sh
cd /path/your-project
analyze issueID
```

### Task start
Creates a new branch with the issue ID in you computer and move it and move it to stage In Progress.

Usage: 
```sh
cd /path/your-project
task-start issueID
```

### New Pull Request
Create a new Pull Request with the current branch and last commit

Usage: 
```sh
cd /path/your-project
new-pr

Help:
    -h|--help       Show this help, then exit
    -c|--custom     The mode where everything is asked
    -t|--title      You can type title as an argument
    --not-ready     When PR still in progress, then don't add review stage label
```

To all scripts:
```sh
    --help, -h    Script helper
```
