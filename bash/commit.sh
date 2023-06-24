#!/bin/bash

# Prompt for commit type
read -p "Enter commit type (e.g., feat, fix, docs): " commit_type

# Prompt for commit scope
read -p "Enter commit scope (e.g., placeholder/placeholder): " commit_scope

# Prompt for commit message
read -p "Enter commit message: " commit_text

# Construct commit message
commit_message="$commit_type($commit_scope):$commit_text"

# Check if commit message matches the specified format
if [[ ! "$commit_message" =~ ^[a-z]+\([a-zA-Z0-9_\-]+\/[a-zA-Z0-9_\-]+\)\:.+ ]]; then
  echo "Commit message is not in the correct format. Aborting."
  exit 1
fi

# Commit changes with the specified message
git commit -m "$commit_message"
