# prepare dist folder
if [ -d dist ]; then rm -rf dist; fi;
mkdir dist

# build
npm run build --workspaces

cp -r packages/constraints/dist dist/constraints
cp -r packages/json-schema-modifier/dist dist/json-schema-modifier
cp -r packages/ribo/dist dist/ribo

# change ribo imports
rm dist/ribo/imports.js
cp scripts/templates/ribo/imports.js.txt dist/ribo/imports.js

rm dist/ribo/imports.d.ts
cp scripts/templates/ribo/imports.d.ts.txt dist/ribo/imports.d.ts

# copy files
cp README.md dist/README.md

# make package.json
version=$(grep -i '.version' package.json | cut -d: -f2 | tr -d '" ,')
echo '{
  "name": "ribof",
  "version": "'$version'",
  "license": "MIT"
}' > dist/package.json
