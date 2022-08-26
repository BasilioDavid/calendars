#!/bin/bash

echo "Starting migrations..."

sql_script="";

for filename in ./migrations/*; do
	sql_script="${sql_script} `cat $filename`";
done

#TODO: handle passwords
docker exec docker_db_1 mysql --user=root --password=example --execute="$sql_script"

echo "Migrations done"