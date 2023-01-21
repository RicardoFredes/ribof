# prepare dist folder
if [ -d dist ]; then rm -rf dist; fi;
mkdir dist

# build
npm run build --workspaces

cp -r packages/ribo/dist dist/ribo
cp -r packages/constraints/dist dist/constraints
cp -r packages/json-schema-modifier/dist dist/json-schema-modifier

cp package.json dist/package.json
