#!/bin/sh

#rm Actimoji.zip

current_date=$(date +"%Y_%b_%d")

outfile="archives/Actimoji_${current_date}.zip"

echo $outfile

rm "$outfile"

zip -r "$outfile" .git* README.md \
  frontend/.git* frontend/public frontend/README.md \
  frontend/package* frontend/src frontend/test \
  backend/Actimoji/docs \
  backend/Actimoji/.git* \
  backend/Actimoji/HELP.md \
  backend/Actimoji/.idea \
  backend/Actimoji/.mvn/ \
  backend/Actimoji/mvnw \
  backend/Actimoji/pom.xml \
  backend/Actimoji/src

