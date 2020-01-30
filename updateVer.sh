# @Author: Zilvia Kam
# @Date:   2019-04-04 17:39:34
# @Last Modified by:   Zilvia Kam
# @Last Modified time: 2019-05-31 16:49:05
#!/bin/sh

if [ $# -gt 0 ]
	then
		VERSION_TYPE=$1

		PACKAGE_COUNT=$(cat package.json \
		  | grep version \
		  | head -1 \
		  | awk -F: '{ print $2 }' \
		  | sed 's/[",]//g' \
		  | tr -d '[[:space:]]' \
		  | cut -d '-' -f 2)

		npm version $1

		PACKAGE_NUMBER=$(cat package.json \
		  | grep version \
		  | head -1 \
		  | awk -F: '{ print $2 }' \
		  | sed 's/[",]//g' \
		  | tr -d '[[:space:]]' \
		  | cut -d '-' -f 1)

		npm version ${PACKAGE_NUMBER}-${PACKAGE_COUNT}

	else
		npm version prerelease
fi

PACKAGE_VERSION=$(cat package.json \
  | grep version \
  | head -1 \
  | awk -F: '{ print $2 }' \
  | sed 's/[",]//g' \
  | tr -d '[[:space:]]')

PACKAGE_YEAR=$(date +'%Y')

sed -i "s/version\:\ \".*\"/version\:\ \"${PACKAGE_VERSION}\"/g" html/js/config/constant/appConfig.js
sed -i "s/vyear\:\ \".*\"/vyear\:\ \"${PACKAGE_YEAR}\"/g" html/js/config/constant/appConfig.js

PACKAGE_DATE=$(date +'%Y-%m-%d')

CHANGELOG_FILE="CHANGELOG.md"
sed -i '3i\\r\n# '${PACKAGE_VERSION}' ['${PACKAGE_DATE}']\r\n' ${CHANGELOG_FILE}

git pull origin master
git add .
git commit -a -m"v${PACKAGE_VERSION} ${PACKAGE_DATE}"
git push origin master
