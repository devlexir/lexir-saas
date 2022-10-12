# b2b-saas-platform

B2B Lexir SaaS Platform

Dev Environment:

pscale connect platforms main --port 3309
yarn install && yarn run dev

kill -9 $(lsof -t -i:3000)

Remover comentarios html: <!--(.*?)-->

      <html lang="en" className="light">

Erro 1: Se os graficos nao aparecerem ou algum icon, devemos remover o ficheiro do maps dentro da app.js da dist

Prisma:

npx prisma migrate dev --name init

npx prisma studio
npx prisma db pull

npx prisma migrate reset
npx prisma migrate dev

mlab | lexir | C7KrENzWZge8eJHv

shadowDatabaseUrl = env("SHADOW_DATABASE_URL")

SHADOW*DATABASE_URL=mysql://fobaz42fcyvf:pscale_pw*-x_LjArCDfFcL9wHa2NeNd_tkPI5UZJ7AQS3CM8PPdI@u8dnlwgdf2nz.us-east-4.psdb.cloud/lexir?sslmode=require&sslcert=/etc/ssl/certs/ca-certificates.crt

previewFeatures = ["referentialIntegrity"]
referentialIntegrity = "prisma"

[MongoDB] Para mudar alguma coisa no schema e na db deve-se fazer: npx prisma db push

basicProductType String? // "spirits"
name String? // "Baldoria Rosé"
slug String? // "baldoria-rose"
description String? @db.String // "Pretty in pink, this semi-dry, lightly"
alcoholByVolume Int? // "18%"
price Int?
category String?
sku String?
image String? @db.String
flavourIntensity Int? // 3
