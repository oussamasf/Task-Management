#!/bin/bash

# Get the current Git branch name
current_branch=$(git rev-parse --abbrev-ref HEAD)

# Check if the branch name is "staging"
if [[ "$current_branch" == "staging" ]]; then
    echo "Current branch is 'staging'. Pulling from it..."
    git pull origin staging
else
    echo "Current branch is not 'staging'. Switching to 'staging' branch and pulling..."
    git checkout staging
    git pull origin staging
fi

# Ask the user for a branch name
read -p "Enter the name of the new branch: " new_branch

if [[ -n "$new_branch" ]]; then
    echo "Creating and checking out branch '$new_branch'..."
    git checkout -b "$new_branch"
else
    echo "No branch name provided. Skipping branch creation."
fi