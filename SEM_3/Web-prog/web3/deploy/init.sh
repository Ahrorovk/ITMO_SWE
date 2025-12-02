#!/bin/bash

WILDFLY_LINK=https://github.com/wildfly/wildfly/releases/download/34.0.0.Beta1/wildfly-34.0.0.Beta1.zip
WILDFLY_ZIP_FOLDER=./wildfly-zip
WILDFLY_FOLDER=~/wildfly

LOG_DIR=./log
LOG_FILE=$LOG_DIR/init.log

if [ ! -d $LOG_DIR ]; then
  mkdir $LOG_DIR
fi

echo "Cleaning up..."
rm -rf $WILDFLY_ZIP_FOLDER
rm -rf $WILDFLY_FOLDER

echo "Creating folders..."
mkdir -p $WILDFLY_ZIP_FOLDER
mkdir -p $WILDFLY_FOLDER

show_progress() {
  local pid=$1
  local delay=1
  local spinstr='|/-\'
  while [ "$(ps a | awk '{print $1}' | grep $pid)" ]; do
    local temp=${spinstr#?}
    spinstr=$temp${spinstr%"$temp"}
    sleep $delay
  done
  printf "    \b\b\b\b"
}

echo "Downloading WildFly..."
(
  wget -q --show-progress $WILDFLY_LINK -P $WILDFLY_ZIP_FOLDER &
  show_progress $!
)

echo "Unzip WildFly..."
(
  unzip -q ./$WILDFLY_ZIP_FOLDER/*.zip -d $WILDFLY_FOLDER &
  show_progress $!
)

echo "Cleaning up..."
rm -rf $WILDFLY_ZIP_FOLDER

echo "Successfully downloaded and unzipped WildFly"

echo "wildfly folder\t: $WILDFLY_FOLDER"