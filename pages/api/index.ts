import { DateTimeResolver } from "graphql-scalars";
import { NextApiHandler } from "next";
import {
  asNexusMethod,
  list,
  makeSchema,
  nonNull,
  nullable,
  objectType,
  stringArg,
} from "nexus";
import path from "path";
import cors from "micro-cors";
import prisma from "../../lib/prisma";
import { ApolloServer } from "apollo-server-micro";

export const GQLDate = asNexusMethod(DateTimeResolver, "date");

const User = objectType({
  name: "User",
  definition(t) {
    t.int("id");
    t.string("name");
    t.string("wallet");
    t.list.field("badges", {
      type: "BadgeInstance",
      resolve: (parent) =>
        prisma.user
          .findUnique({
            where: { id: Number(parent.id) },
          })
          .badges(),
    });
  },
});

const BadgeInstance = objectType({
  name: "BadgeInstance",
  definition(t) {
    t.int("id");
    t.field("dateEarned", {
      type: "DateTime",
    });
    t.nullable.field("badge", {
      type: "Badge",
      resolve: (parent) =>
        prisma.badgeInstance
          .findUnique({
            where: { id: Number(parent.id) },
          })
          .Badge(),
    });
    t.nullable.field("user", {
      type: "User",
      resolve: (parent) =>
        prisma.badgeInstance
          .findUnique({
            where: { id: Number(parent.id) },
          })
          .User(),
    });
  },
});

const Badge = objectType({
  name: "Badge",
  definition(t) {
    t.int("id");
    t.string("name");
    t.string("imageUrl");
    t.nullable.field("instances", {
      type: list("BadgeInstance"),
      resolve: (parent) =>
        prisma.badgeInstance.findMany({
          where: { badgeId: Number(parent.id) },
        }),
    });
  },
});

const Query = objectType({
  name: "Query",
  definition(t) {
    t.field("users", {
      type: list("User"),
      args: {},
      resolve: (_, args) => {
        return prisma.user.findMany();
      },
    });

    t.field("badge", {
      type: "Badge",
      args: {
        badgeId: nonNull(stringArg()),
      },
      resolve: (_, args) => {
        return prisma.badge.findUnique({
          where: { id: Number(args.badgeId) },
        });
      },
    });

    t.field("badgeInstance", {
      type: "BadgeInstance",
      args: {
        badgeInstanceId: nonNull(stringArg()),
      },
      resolve: (_, args) => {
        return prisma.badgeInstance.findUnique({
          where: { id: Number(args.badgeInstanceId) },
        });
      },
    });

    t.field("badges", {
      type: list("Badge"),
      args: {},
      resolve: (_, args) => {
        return prisma.badge.findMany();
      },
    });

    t.field("badgeInstances", {
      type: list("BadgeInstance"),
      args: {
        userId: stringArg(),
      },
      resolve: (_, args) => {
        if (args.userId)
          return prisma.badgeInstance.findMany({
            where: { id: Number(args.userId) },
          });
        return prisma.badgeInstance.findMany({});
      },
    });

    t.list.field("filterBadgeInstances", {
      type: "BadgeInstance",
      args: {
        searchString: nullable(stringArg()),
      },
      resolve: (_, { searchString }, ctx) => {
        return prisma.badgeInstance.findMany({});
      },
    });
  },
});

const Mutation = objectType({
  name: "Mutation",
  definition(t) {
    t.field("signupUser", {
      type: "User",
      args: {
        name: stringArg(),
        wallet: nonNull(stringArg()),
      },
      resolve: (_, { name, wallet }, ctx) => {
        return prisma.user.create({
          data: {
            name,
            wallet,
          },
        });
      },
    });
  },
});

export const schema = makeSchema({
  types: [Query, Mutation, Badge, BadgeInstance, User, GQLDate],
  outputs: {
    typegen: path.join(process.cwd(), "generated/nexus-typegen.ts"),
    schema: path.join(process.cwd(), "generated/schema.graphql"),
  },
});

export const config = {
  api: {
    bodyParser: false,
  },
};

let apolloServerHandler: NextApiHandler;

async function getApolloServerHandler() {
  const apolloServer = new ApolloServer({ schema });

  if (!apolloServerHandler) {
    await apolloServer.start();

    apolloServerHandler = apolloServer.createHandler({
      path: "/api",
    });
  }

  return apolloServerHandler;
}

const handler: NextApiHandler = async (req, res) => {
  const apolloServerHandler = await getApolloServerHandler();

  if (req.method === "OPTIONS") {
    res.end();
    return;
  }

  return apolloServerHandler(req, res);
};

//@ts-ignore
export default cors()(handler);
