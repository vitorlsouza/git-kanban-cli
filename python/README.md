# Git Kanban Cli

## Script to get Github issue metrics

Duplicate de file `python/scripts/config/config.json.cnf` to `python/scripts/config/config.json` with your API token and repository, labels and collaborators that you want to get data

Execute the script to get data from all issues closed since the date given as param
```sh
$ python3 github-issues-metrics.py 2019-01-01                           # Print in the terminal
$ python3 github-issues-metrics.py 2019-01-01 > /tmp/issues_data.json   # To save output into a file
```
