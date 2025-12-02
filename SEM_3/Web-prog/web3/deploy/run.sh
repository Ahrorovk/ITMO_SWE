#!/bin/bash

if [ ! -d "$HOME/wildfly" ]; then
  echo "WildFly not found!"
  echo "Running init.sh..."
  sh init.sh
  exit 1
fi

LOG_DIR=./log
LOG_FILE=$LOG_DIR/run.log

if [ ! -d $LOG_DIR ]; then
  mkdir $LOG_DIR
fi

echo "Copying war file to WildFly deployment folder..."
# shellcheck disable=SC2129
rm ~/wildfly/wildfly-*/standalone/deployments/*.war* >> $LOG_FILE 2>&1
cp ./deploy/*.war ~/wildfly/wildfly-*/standalone/deployments/ >> $LOG_FILE 2>&1
cp ./*.war ~/wildfly/wildfly-*/standalone/deployments/ >> $LOG_FILE 2>&1
clear
sh ~/wildfly/wildfly-*/bin/standalone.sh