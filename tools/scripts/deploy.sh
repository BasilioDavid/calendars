reset='\033[0m'
red='\033[0;31m'
yellow='\033[0;33m'
green='\033[0;32m'

echo "Deployeando..."
if [ ! -z $MIGRATIONS ]; then
	echo -e "${red}Estas seguro que quieres ejecutar las migraciones?${reset}"
	read -p "(Y/y/n/N)" doubleCheck

	if [[ "$doubleCheck" =~ ^Y|y$ ]]; then
	echo -e "${yellow}Ejecutando los migraciones...${reset}"
	pushd .
	cd ../migrations
	sh ./migrations.sh
	popd
	echo "Migraciones ejecutadas"
	fi;
fi;

echo "Transpilando frontend..."
cd frontend
yarn install
yarn build:wepback-prod
cd ..
echo -e "${green}frontend transpilado${reset}"

echo "Transpilando mobile..."
cd mobile
yarn install
yarn build:wepback-prod
cd ..
echo -e "${green}mobile transpilado${reset}"

echo "Transpilando bffe..."
cd bffe
yarn install
yarn build
cd ..
echo -e "${green}mobile transpilado${reset}"


echo "Arrancando bffe..."
systemctl start bffe-calendars
echo -e "${green}bffe arrancado${reset}"

echo -e "${green}Migraciones completadas${reset}"
