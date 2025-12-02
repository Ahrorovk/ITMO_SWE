#!/bin/bash

DEPLOY_DIR=./deploy
BUILD_DIR=./build
LOG_DIR=./log
LOG_FILE=$LOG_DIR/build.log

if [ -d "deploy" ]; then
  rm -rf deploy
fi

if [ ! -d $LOG_DIR ]; then
  mkdir $LOG_DIR
fi

touch $LOG_FILE
mkdir deploy

export JAVA_VERSION=21

echo "Building war file..."
./gradlew war >> $LOG_FILE 2>&1
echo "Copying war file to deploy folder..."
cp $BUILD_DIR/libs/*.war $DEPLOY_DIR >> $LOG_FILE 2>&1
echo "Copying scripts to deploy folder..."
cp *.sh $DEPLOY_DIR >> $LOG_FILE 2>&1
echo "Successfully built war file and copied to deploy folder"
./gradlew clean >> $LOG_FILE 2>&1
echo "Log file you can see at $LOG_FILE"