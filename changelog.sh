# @Author: Zilvia Kam
# @Date:   2019-04-04 17:39:35
# @Last Modified by:   Zilvia Kam
# @Last Modified time: 2019-05-31 16:48:44
#!/bin/sh

if [ $# -lt 2 ]
	then
		echo 'Usage: $0 [add|update|bugfix|remove] [message]'
    	exit 1
fi

CHANGELOG_FILE="CHANGELOG.md"
case $1 in
	add)
        TYPE="ADDED"
        ;;
 	update)
        TYPE="UPDATED"
        ;;
 	bugfix)
        TYPE="BUG FIXED"
        ;;
    remove)
        TYPE="REMOVED"
        ;;
 	*)
        echo 'Usage: `basename $0` [add|update|bugfix|remove] [message]'
    	exit 1
    	;;
esac

STRING='3i\  \* ['${TYPE}'] '${2}
sed -i "${STRING}" ${CHANGELOG_FILE}