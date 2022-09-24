import { join } from 'path';
import { ApolloServer } from 'apollo-server-express';
import { loadSchemaSync } from '@graphql-tools/load';
import { GraphQLFileLoader } from '@graphql-tools/graphql-file-loader';
import express from 'express';
import cors from 'cors';

import { users_resolver } from './graphql/resolvers/users.js';

(async () => {
  const app = express();
  app.use(cors({ credentials: true, origin: ['http://localhost:3000', 'https://studio.apollographql.com'] }));

  const schema = loadSchemaSync(join('src', './graphql/schemas/*.gql'), { loaders: [new GraphQLFileLoader()] });
  const server = new ApolloServer({
    typeDefs: schema,
    resolvers: [users_resolver]
  });

  await server.start();
  server.applyMiddleware({
    app,
    cors: {
      credentials: true,
      origin: ['http://localhost:3000', 'https://studio.apollographql.com']
    }
  });

  app.listen(process.env.PORT ?? 9000, () => console.log(`server listening on port ${process.env.PORT ?? 9000}`));
})();
