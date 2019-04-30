#!/usr/bin/env python3.6

import requests
import json
import sys
import os

CURRENT_ROOT = os.path.abspath(os.path.dirname(__file__))

class GithubSearch(object):
    api_uri = 'https://api.github.com/search/'
    config = {}

    def __init__(self, config):
        self.config = config

    def githubRequest(self, endpoint, payload):
        uri = self.api_uri + endpoint
        headers = {
            'Content-Type': 'application/json',
            'Accept': 'application/vnd.github.symmetra-preview+json',
            'Authorization': 'token {0}'.format(self.config['api_token'])
        }
        response = requests.get(uri, params=payload, headers=headers)
        return response

    def getIssuesFromDate(self, since_date):
        payload = {
            'q': 'repo:{1} is:issue is:closed closed:>={0}'.format(since_date, self.config['repository_path'])
        }
        response = self.githubRequest('issues', payload)
        return response

    def getIssuesByLabel(self, since_date, label):
        payload = {'q': 'repo:{2} is:issue is:closed closed:>={0} label:{1}'.format(since_date, label, self.config['repository_path'])}
        response = self.githubRequest('issues', payload)

        return {'total_count': response.json()['total_count']}

    def print_pretty_json(self, response_json):
        print(json.dumps(response_json, sort_keys=True, indent=4))

    def getIssuesByAssignee(self, since_date, assignee):
        payload = {'q': 'repo:{2} is:issue is:closed closed:>={0} assignee:{1}'.format(since_date, assignee, self.config['repository_path'])}
        response = self.githubRequest('issues', payload)
        response = response.json()

        pair_count = 0
        if 'items' not in response:
            return {
                total_count: response['total_count'],
                pair_count: pair_count
            }

        for item in response['items']:
            assignees_count = len(item['assignees'])
            if assignees_count > 1:
                pair_count += 1

        return {
            'total_count': response['total_count'],
            'pair_count': pair_count
        }


def main():
    file_path = os.path.join(CURRENT_ROOT, 'config', 'config.json')
    with open(file_path, "r") as read_file:
        config = json.load(read_file)

    since_date=sys.argv[1]
    githubSearch = GithubSearch(config['github'])

    response = githubSearch.getIssuesFromDate(since_date)
    response = response.json()
    issues_total = response['total_count']
    print()
    print("Total de tarefas: {0}".format(issues_total))
    print()

    for assignee in config['collaborators']:
        response = githubSearch.getIssuesByAssignee(since_date, assignee['username'])

        name = assignee['name']
        if 'company' in assignee.keys():
            company = ' ({0})'.format(assignee['company'])
            name = name + company

        result = "{0}: {1} total ({2} pair programming)".format(
            name,
            response['total_count'],
            response['pair_count']
        )
        print(result)

    print()

    for label in config['labels']:
        response = githubSearch.getIssuesByLabel(since_date, '"{0}"'.format(label))
        print("{0}: {1}".format(label, response['total_count']))

    print()

if __name__ == "__main__":
    main()
