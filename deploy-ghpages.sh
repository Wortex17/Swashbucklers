#!/bin/bash
set -e # exit with nonzero exit code if anything fails

# clear and re-create the _deploy directory
rm -rf _deploy || exit 0;
mkdir _deploy

# pull the Git repo with gh-pages to the _deploy directory
git clone "https://${GH_REF}" --branch gh-pages --depth 1 _deploy/

# replace the book with the freshly built one
rm -rf _deploy/book || exit 0;
mkdir _deploy/book
mv Letterpress/_html/* _deploy/book/

# We will do some stuff with the repo now, so step in
cd _deploy

# inside this git repo we'll pretend to be a new user
git config user.name "Travis CI"
git config user.email "travis@nucular-bacon.com"

#count the changes that have been made
if [[ $(git diff --numstat | wc -l) > 0 ]] ;then

    # The first and only commit to this new Git repo contains all the
    # files present with the commit message "Deploy to GitHub Pages".
    git add .
    git commit -m "Deploy to GitHub Pages"

    # Force push from the current repo's master branch to the remote
    # repo's gh-pages branch. (All previous history on the gh-pages branch
    # will be lost, since we are overwriting it.) We redirect any output to
    # /dev/null to hide any sensitive credential data that might otherwise be exposed.
    git push --quiet "https://${GH_TOKEN}@${GH_REF}" master:gh-pages > /dev/null 2>&1

else

    echo "No changes to commit"

fi
