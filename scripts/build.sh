# prepare dist folder
if [ -d dist ]; then rm -rf dist; fi;
mkdir dist

# build
npm run build --workspaces

cp -r packages/core/dist dist/core
cp -r packages/constraints/dist dist/constraints
cp -r packages/json-schema-modifier/dist dist/json-schema-modifier

cp package.json dist/package.json
