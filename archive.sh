#!/bin/sh

rm Actimoji.zip

zip -r Actimoji.zip .git* README.md \
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

