#!/bin/bash

LOG_DIR=./log
LOG_FILE=$LOG_DIR/deploy.log

CONFIGURATION_DIR=./secrets
CONFIGURATION_FILE=$CONFIGURATION_DIR/build.conf

DEPLOY_DIR=./deploy
REMOTE_DIR="~/web2"

if [ ! -d $LOG_DIR ]; then
  mkdir $LOG_DIR
fi

if [ ! -d $LOG_DIR ]; then
  mkdir $LOG_DIR
fi

if [ ! -d $CONFIGURATION_DIR ]; then
  mkdir $CONFIGURATION_DIR
fi

if [ -f "$CONFIGURATION_FILE" ]; then
  source "$CONFIGURATION_FILE"
fi

read_param() {
  local prompt=$1
  local default_value=$2
  local var_name=$3

  if [ -n "$default_value" ]; then
    read -p "$prompt ($default_value): " input
    input=${input:-$default_value}
  else
    read -p "$prompt: " input
  fi

  eval $var_name="'$input'"
}

echo "Creating deploy dir..."
sh build.sh

echo "get username & password: https://se.ifmo.ru/passwd/"
read_param "Enter helios username" "${USERNAME:-}" USERNAME
read_param "Enter helios password" "${PASSWORD:-}" PASSWORD
read_param "Enter server" "${SERVER:-helios.cs.ifmo.ru}" SERVER
read_param "Enter port" "${PORT:-2222}" PORT

echo "USERNAME=$USERNAME" > "$CONFIGURATION_FILE"
echo "PASSWORD=$PASSWORD" >> "$CONFIGURATION_FILE"
echo "SERVER=$SERVER" >> "$CONFIGURATION_FILE"
echo "PORT=$PORT" >> "$CONFIGURATION_FILE"

echo "Connecting to the server and removing old deployment..."
sshpass -p $PASSWORD ssh -p $PORT $USERNAME@$SERVER "rm -rf $REMOTE_DIR/*" || exit 1

echo "Copying new files to the server..."
sshpass -p $PASSWORD scp -P $PORT -r $DEPLOY_DIR/* $USERNAME@$SERVER:$REMOTE_DIR || exit 1

echo "Deployment completed successfully! see $LOG_FILE"