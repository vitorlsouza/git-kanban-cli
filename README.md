# Git Kanban Cli

## How to use (Python)
```sh
./show-github-issues-metrics.py -h
```

## How to use (SHELL)

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
```
Or you can download the files to `/your/path`

Then to configure:
```sh
cd /your/path
./configure
```
If it didn't work, try run `sudo ./configure`

### Analyze
Change stage to **Analysis** and assign the task to you

Usage:
```sh
cd /path/your-project
gkc-analyze issueID
```

### Task start
Creates a new branch with the issue ID in you computer and move it and move it to stage In Progress.

Usage:
```sh
cd /path/your-project
gkc-task-start issueID
```

### New Pull Request
Create a new Pull Request with the current branch and last commit

Usage:
```sh
cd /path/your-project
gkc-pr
```

Optional arguments:
```sh
    -c|--custom     The mode where everything is asked
    -t|--title      You can type title as an argument (default is the current branch)
    --not-ready     When PR still in progress, then the review stage label isn't added
```

### Issue tag
Add, remove or change issue labels

Usage:
```sh
cd /path/your-project
gkc-issue-tag --add 'Label' issueId
gkc-issue-tag -cs 'Current' 'Desired' issueId
```

Available arguments:
```sh
    --add 'Label' issueID                               Label an issue
    --rm 'Label' issueID                                Dislabel an issue
    --change-stage|-cs 'Current' 'Desired' issueID      Change a the issue label stage
```


### To all scripts:
```sh
    comand --help|-h    Script helper
```
