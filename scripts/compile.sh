#!/bin/bash
set -e # exit with nonzero exit code if anything fails

npm run deploy
cp -R static/* dist/static/
cp ./index.html ./dist
