#!/usr/bin/env python3.7

import requests
import json
import sys

token = '{YOUR_TOKEN}'
repository_id = '{YOUR_REPOSITORY_ID}'
repository_path = '{YOUR_REPOSITORY_PATH}'

def get_help():
    text = 'Script to get Github issues metrics\n\n'
    text += 'Usage:\n'
    text += '\tpython show-github-issues-metrics.py date [n_weeks]\n\n'
    text += 'Params:\n'
    text += '\t--help|-h\tto show this help\n'
    text += '\tdate\t\tmust be a valid date (ex.: 2018-01-01)\n'
    text += '\tn_weeks\t\t[Optional] number of weeks in the month to calculate average\n'
    print(text)
    sys.exit()

def github_search_request(endpoint, payload):
    url = 'https://api.github.com/search/{0}'.format(endpoint)
    global token
    headers = {
        'Content-Type': 'application/json',
        'Accept': 'application/vnd.github.symmetra-preview+json',
        'Authorization': 'token {0}'.format(token)
    }
    response = requests.get(url, params=payload, headers=headers)
    return response

def print_pretty_json(response_json):
    print(json.dumps(response_json, sort_keys=True, indent=4))

def get_issues_from_date(since_date):
    payload = {'q': 'repo:{1} is:issue is:closed closed:>={0}'.format(since_date, repository_path)}
    response = github_search_request('issues', payload)
    return response

def get_issues_by_label(since_date, label):
    payload = {'q': 'repo:{2} is:issue is:closed closed:>={0} label:{1}'.format(since_date, label, repository_path)}
    response = github_search_request('issues', payload)
    return "{0}: {1}".format(label, response.json()['total_count'])

def get_issues_by_assignee(since_date, assignee):
    payload = {'q': 'repo:{2} is:issue is:closed closed:>={0} assignee:{1}'.format(since_date, assignee, repository_path)}
    response = github_search_request('issues', payload)
    response = response.json()
    pair_count = 0
    if 'items' not in response:
        return "{0}: {1} total ({2} pair programming)".format(assignee, response['total_count'], pair_count)

    for item in response['items']:
        assignees_count = len(item['assignees'])
        if assignees_count > 1:
            pair_count += 1

    return "{0}: {1} total ({2} pair programming)".format(assignee, response['total_count'], pair_count)

def get_bug_labels_reasons():
    global repository_id
    payload = {
        'repository_id': repository_id,
        'q': 'Reason'
    }
    response = github_search_request('labels', payload)
    items = response.json()['items']
    reasons_count = {}
    for item in items:
        reasons_count[item['id']] = {
            'name': item['name'],
            'count': 0
        }

    return reasons_count

def print_bug_reasons_ocurrency(since_date):
    reasons_counter = get_bug_labels_reasons()
    for reason_id in reasons_counter:
        reason_name = '"{}"'.format(reasons_counter[reason_id]['name'])

        payload = {'q': 'repo:compufour/compufacil is:issue is:closed closed:>={0} label:{1}'.format(since_date, reason_name)}
        response = github_search_request('issues', payload)
        response = response.json()
        print('{0}: {1} vezes'.format(reason_name, response['total_count']))

if len(sys.argv) < 1:
    get_help()
first_arg = sys.argv[1]
if (first_arg == '--help') or (first_arg == '-h'):
    get_help()

since_date=sys.argv[1]
n_weeks=4
if 2 in sys.argv:
    n_weeks=sys.argv[2]

response = get_issues_from_date(since_date)
response = response.json()

issues_total = response['total_count']
print()
print("Total de tarefas: {0}".format(issues_total))
print('Média por semana: {0}'.format(issues_total/n_weeks))
print()
print(get_issues_by_label(since_date, '"Type: Bug"'))
print(get_issues_by_label(since_date, '"Type: New Feature"'))
print(get_issues_by_label(since_date, '"Type: Improvement"'))
print(get_issues_by_label(since_date, '"Category: Backend"'))
print(get_issues_by_label(since_date, '"Category: Frontend"'))
print(get_issues_by_label(since_date, '"Category: DevOps"'))
print()
print_bug_reasons_ocurrency(since_date)
print()
print(get_issues_by_assignee(since_date, 'euclecio'))
