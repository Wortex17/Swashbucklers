#!/bin/bash
set -e # exit with nonzero exit code if anything fails

# clear and re-create the _deploy directory
rm -rf _deploy || exit 0;
mkdir _deploy

# pull the Git repo with gh-pages to the _deploy directory
git clone "https://${GH_REF}" --branch gh-pages --depth 1 _deploy/

# replace the book with the freshly built one
echo "Copy contents of public/ to _deploy/"
mv public/* _deploy/

# Determine the current branch
echo "Currently in branch: $TRAVIS_BRANCH"

if [[ "$TRAVIS_BRANCH" == "init/migration" ]] ;then

    echo "Branch marked for deployment, beginning.."

    # We will do some stuff with the repo now, so step in
    cd _deploy

    # inside this git repo we'll pretend to be a new user
    git config user.name "Travis CI"
    git config user.email "travis@nucular-bacon.com"

    # stage all changes
    git add .

    #count the changes that have been made
    changesN=$(git diff --cached | wc -l);

    echo "${changesN} changes found"

    if [[ $changesN > 0 ]] ;then

        echo "Commiting to gh-pages"

        # commit changed files with the commit message "Deploy to GitHub Pages".
        git commit -m "Travis-CI Build: $TRAVIS_JOB_ID"

        echo "Pushing to gh-pages"

        # Force push from the current repo's master branch to the remote
        # repo's gh-pages branch. (All previous history on the gh-pages branch
        # will be lost, since we are overwriting it.) We redirect any output to
        # /dev/null to hide any sensitive credential data that might otherwise be exposed.
        git push --quiet "https://${GH_TOKEN}@${GH_REF}" gh-pages:gh-pages > /dev/null 2>&1

    else

        echo "No changes to commit"

    fi

    echo "Deployment of book complete"

else
    echo "Branch not marked for deployment"
fi