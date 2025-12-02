#!/bin/bash

LOG_DIR=./log
LOG_FILE=$LOG_DIR/clean.log

if [ ! -d $LOG_DIR ]; then
  mkdir $LOG_DIR
fi

echo "Removing build files..."
gradle clean >> $LOG_FILE 2>&1
echo "Removing log files..."
rm -rf log
echo "Successfully removed build files and WildFly"