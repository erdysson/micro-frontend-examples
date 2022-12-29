echo "creating angular project with version $1 under $2"

npx -p @angular/cli@"$1" ng new "$2"
