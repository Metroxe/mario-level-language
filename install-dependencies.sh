# shared
cd ./shared || exit
rm -rf ./shared/node_modules
npm install
npm run build

# mario-level-generator
cd ../mario-level-generator || exit
rm -rf ./node_modules/shared
npm remove shared
npm install ../shared
npm run build

# compiler
cd ../compiler || exit
rm -rf ./node_modules/shared
npm remove shared
npm install ../shared
npm run build

# front end
cd ../frontend || exit
rm -rf ./node_modules/shared
npm remove shared
npm install ../shared

# back end
cd ../backend || exit
rm -rf ./node_modules/shared
npm remove shared
npm install ../shared
rm -rf ./node_modules/mario-level-generator
npm remove mario-level-generator
npm install ../mario-level-generator
rm -rf ./node_modules/compiler
npm remove compiler
npm install ../compiler