# @Author: Zilvia Kam
# @Date:   2019-04-04 17:39:35
# @Last Modified by:   Zilvia Kam
# @Last Modified time: 2019-10-02 10:55:15
#!/bin/sh

# PACKAGE_NAME=webui
# FILE_LIST="packtmp"
# EXCLUDE_LIST="html/test"
# PACKAGE_VERSION=$(cat package.json \
#   | grep version \
#   | head -1 \
#   | awk -F: '{ print $2 }' \
#   | sed 's/[",]//g' \
#   | tr -d '[[:space:]]')
# PACKAGE_FILE=${PACKAGE_NAME}_${PACKAGE_VERSION}.tar.gz
# SOURCE_PATH_BACKUP_DEV=backup-package/dev/
# SOURCE_PATH_PRODUCTION=source/
# SOURCE_PATH_BACKUP_PRD=backup-package/prd/

# mkdir packtmp
# cp -r html packtmp
# cp -r vendor packtmp
# cp package.json packtmp

# echo "Building backup tar file [DEV] '$PACKAGE_FILE'..."
# tar -zcvf ${SOURCE_PATH_BACKUP_DEV}/${PACKAGE_FILE} --exclude=${EXCLUDE_LIST} -C $FILE_LIST .

# mv packtmp/html/view/login-deploy.html packtmp/html/view/login.html
# mv packtmp/html/view/liveLocation-deploy.html packtmp/html/view/liveLocation.html

# sed -i "s/\$config\['data'\]\['webserver'\]/\$config\['data'\]\['dev'\]/g" packtmp/html/api/config/setup.php
# sed -i "s/\$config\['data'\]\['prd'\]/\$config\['data'\]\['webserver'\]/g" packtmp/html/api/config/setup.php

# echo "Building production tar file [PRD] '$PACKAGE_FILE'..."
# tar -zcvf ${SOURCE_PATH_PRODUCTION}/${PACKAGE_FILE} --exclude=${EXCLUDE_LIST} -C $FILE_LIST .

# cp ${SOURCE_PATH_PRODUCTION}/${PACKAGE_FILE} ${SOURCE_PATH_BACKUP_PRD}/${PACKAGE_FILE}

# rm -r packtmp

# echo ${PACKAGE_FILE}
# echo "Done!"

PACKAGE_NAME=webui
FILE_LIST="packtmp"
PACKAGE_VERSION=$(cat package.json \
  | grep version \
  | head -1 \
  | awk -F: '{ print $2 }' \
  | sed 's/[",]//g' \
  | tr -d '[[:space:]]')
PACKAGE_FILE=${PACKAGE_NAME}_${PACKAGE_VERSION}.tar.gz
SOURCE_PATH_BACKUP_DEV=backup-package/dev/
SOURCE_PATH_PRODUCTION=source/
SOURCE_PATH_BACKUP_PRD=backup-package/prd/

cp -r dist packtmp

echo "Building backup tar file [DEV] '$PACKAGE_FILE'..."
tar -zcvf ${SOURCE_PATH_BACKUP_DEV}/${PACKAGE_FILE} -C $FILE_LIST .

mv packtmp/html/view/login-deploy.html packtmp/html/view/login.html
mv packtmp/html/view/liveLocation-deploy.html packtmp/html/view/liveLocation.html

# Swap setting to production
sed -i "s/\$config\['data'\]\['webserver'\]/\$config\['data'\]\['dev'\]/g" packtmp/html/api/config/setup.php
sed -i "s/\$config\['data'\]\['prd'\]/\$config\['data'\]\['webserver'\]/g" packtmp/html/api/config/setup.php

sed -i "s/\$config\['api'\]\['yuweipath'\]\['host'\]/\$config\['api'\]\['yuweipath'\]\['hostdev'\]/g" packtmp/html/api/config/setup.php
sed -i "s/\$config\['api'\]\['yuweipath'\]\['hostprd'\]/\$config\['api'\]\['yuweipath'\]\['host'\]/g" packtmp/html/api/config/setup.php

sed -i "s/\$config\['api'\]\['yuweipath'\]\['livehost'\]/\$config\['api'\]\['yuweipath'\]\['livehostdev'\]/g" packtmp/html/api/config/setup.php
sed -i "s/\$config\['api'\]\['yuweipath'\]\['livehostprd'\]/\$config\['api'\]\['yuweipath'\]\['livehost'\]/g" packtmp/html/api/config/setup.php

sed -i "s/\$config\['db'\]\['host'\]/\$config\['db'\]\['hostdev'\]/g" packtmp/html/api/config/setup.php
sed -i "s/\$config\['db'\]\['hostprd'\]/\$config\['db'\]\['host'\]/g" packtmp/html/api/config/setup.php

sed -i "s/\$config\['ftp'\]\['host'\]/\$config\['ftp'\]\['hostdev'\]/g" packtmp/html/api/config/setup.php
sed -i "s/\$config\['ftp'\]\['hostprd'\]/\$config\['ftp'\]\['host'\]/g" packtmp/html/api/config/setup.php

echo "Building production tar file [PRD] '$PACKAGE_FILE'..."
tar -zcvf ${SOURCE_PATH_PRODUCTION}/${PACKAGE_FILE} -C $FILE_LIST .

cp ${SOURCE_PATH_PRODUCTION}/${PACKAGE_FILE} ${SOURCE_PATH_BACKUP_PRD}/${PACKAGE_FILE}

rm -r packtmp

echo ${PACKAGE_FILE}
echo "Done!"