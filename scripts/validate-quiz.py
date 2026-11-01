#!/usr/bin/env python3
"""Check the monthly @enfol quizzes in data/quiz/*.json."""
import glob
import json
import sys

ORDER = ['B1', 'B1+', 'B2', 'B2+', 'C1', 'C1+', 'C2']
errors = []

for path in sorted(glob.glob('data/quiz/*.json')):
    data = json.load(open(path, encoding='utf-8'))
    def err(msg):
        errors.append(f'{path}: {msg}')
    for key in ('id', 'month', 'results', 'questions'):
        if key not in data:
            err(f'no "{key}"')
    if not any(r.get('min') == 0 for r in data.get('results', [])):
        err('results need an entry with "min": 0')
    last = -1
    for n, q in enumerate(data.get('questions', []), 1):
        where = f'question {n}'
        opts, why, c = q.get('options', []), q.get('why', []), q.get('correct')
        if len(opts) != 4 or len(set(opts)) != 4:
            err(f'{where}: needs 4 different options')
        if not isinstance(c, int) or not 0 <= c < len(opts):
            err(f'{where}: bad "correct"')
            continue
        if len(why) != len(opts):
            err(f'{where}: "why" must have one entry per option')
        for i, text in enumerate(why):
            if (i == c) != (text is None):
                err(f'{where}: "why" must be null only for the correct option ({i})')
        if q.get('prompt', '').count('___') > 1:
            err(f'{where}: more than one gap')
        if not q.get('note'):
            err(f'{where}: no "note"')
        level = q.get('level')
        if level not in ORDER:
            err(f'{where}: unknown level {level}')
        elif ORDER.index(level) < last:
            err(f'{where}: levels must not go down')
        else:
            last = ORDER.index(level)
    print(f'{path}: {len(data.get("questions", []))} questions')

if errors:
    print('\n'.join(errors))
    sys.exit(1)
print('OK')
