echo "creating angular project with under $1 directory with version $2 and name $3"

cd "$1"

npx -p @angular/cli@"$2" ng new "$3"
