#!/bin/bash

set -o errexit -o nounset

if [ "$TRAVIS_BRANCH" != "master" ]
then
  echo "This commit was made against the $TRAVIS_BRANCH and not the master! No deploy!"
  exit 0
fi

rev=$(git rev-parse --short HEAD)

cd build

git init
git config user.name "Łukasz Strączyński"
git config user.email "l.straczynski@hotmail.com"

git remote add upstream "https://$GH_TOKEN@github.com/straku/toggl-balance.git"
git fetch upstream
git reset upstream/gh-pages

touch .

git add -A .
git commit -m "Rebuild at ${rev}"
git push -q upstream HEAD:gh-pages
