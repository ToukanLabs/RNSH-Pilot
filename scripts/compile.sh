#!/bin/bash
set -e # exit with nonzero exit code if anything fails

npm run deploy
cp ./index.html ./dist
