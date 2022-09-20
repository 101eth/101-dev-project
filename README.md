# 101 Full Stack Coding Challenge

This coding challenge involves a **fullstack app in TypeScript with [Next.js](https://nextjs.org/)** using [React](https://reactjs.org/), [Apollo Client](https://www.apollographql.com/docs/react/) (frontend), [Nexus Schema](https://nxs.li/components/standalone/schema) and [Prisma Client](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client) (backend). It uses a SQLite database file with some initial dummy data which you can find at [`./prisma/dev.db`](./prisma/dev.db).

## Getting started

### 1. Fork the repo

 1. Create a bare clone of the repository.
    (This is temporary and will be removed so just do it wherever.)
    ```bash
    git clone --bare git@github.com:101eth/101-dev-project.git
    ```

 2. [Create a new private repository on Github](https://help.github.com/articles/creating-a-new-repository/) and name it `101-dev-project`.

 3. Mirror-push your bare clone to your new `101-dev-project` repository.
    > Replace `<your_username>` with your actual Github username in the url below.
    
    ```bash
    cd 101-dev-project.git
    git push --mirror git@github.com:<your_username>/101-dev-project.git
    ```

 4. Remove the temporary local repository you created in step 1.
    ```bash
    cd ..
    rm -rf 101-dev-project.git
    ```
    
 5. You can now clone your `101-dev-project` repository on your machine (in my case in the `code` folder).
    ```bash
    cd ~/code
    git clone git@github.com:<your_username>/101-dev-project.git
    ```


### 2. Install  dependencies
Install npm dependencies:

```
cd 101-dev-project
yarn install
```

### 3. Create and seed the database

Run the following command to create your SQLite database file. This also creates the `User` and `Badge` tables that are defined in [`prisma/schema.prisma`](./prisma/schema.prisma):

```
yarn prisma migrate dev --name init
```

When `yarn prisma migrate dev` is executed against a newly created database, seeding is also triggered. The seed file in [`prisma/seed.ts`](./prisma/seed.ts) will be executed and your database will be populated with the sample data.


### 4. Start the app

```
yarn dev
```

The app is now running, navigate to [`http://localhost:3000/`](http://localhost:3000/) in your browser to explore its UI.

<details><summary>Expand for a tour through the UI of the app</summary>

<br />

**Leaderboard** (located in [`./pages/index.tsx`](./pages/index.tsx))

![](https://101-user-uploads.s3.us-east-1.amazonaws.com/Screen%20Shot%202022-09-20%20at%203.04.29%20PM.png)

**View profile** (located in [`./pages/u/[id].tsx`](./pages/p/[id].tsx))

![](https://101-user-uploads.s3.us-east-1.amazonaws.com/Screen%20Shot%202022-09-20%20at%2011.52.06%20AM.png)

</details>

## Using the GraphQL API

You can also access the GraphQL API of the API server directly. It is running on the same host machine and port and can be accessed via the `/api` route (in this case that is [`localhost:3000/api`](http://localhost:3000/api)).

Below are a number of operations that you can send to the API.

### Retrieve all users and their badges

```graphql
  query {
    users {
      id
      name
      wallet
      badges {
        badge {
          id
          name
          imageUrl
        }
        dateEarned
      }
    }
  }
```



## Evolving the app - these are examples don't actually do these

Evolving the application typically requires three steps:

1. Migrate your database using Prisma Migrate
1. Update your server-side application code
1. Build new UI features in React

For the following example scenario, assume you want to add a "profile" feature to the app where users can create a profile and write a short bio about themselves.

### 1. Migrate your database using Prisma Migrate

The first step is to add a new table, e.g. called `Profile`, to the database. You can do this by adding a new model to your [Prisma schema file](./prisma/schema.prisma) file and then running a migration afterwards:

```diff
// ./prisma/schema.prisma
model User {
  wallet String          @unique
  id     Int             @id @default(autoincrement())
  name   String?
  posts   Post[]
+ profile Profile?
}

model BadgeInstance {
  id         Int      @id @default(autoincrement())
  User       User     @relation(fields: [userId], references: [id])
  userId     Int
  Badge      Badge    @relation(fields: [badgeId], references: [id])
  badgeId    Int
  dateEarned DateTime
}

model Badge {
  id        Int             @id @default(autoincrement())
  name      String
  imageUrl  String
  instances BadgeInstance[]
}

+model Profile {
+  id     Int     @default(autoincrement()) @id
+  bio    String?
+  user   User    @relation(fields: [userId], references: [id])
+  userId Int     @unique
+}
```

Once you've updated your data model, you can execute the changes against your database with the following command:

```
yarn prisma migrate dev --name add-profile
```

This adds another migration to the `prisma/migrations` directory and creates the new `Profile` table in the database.

### 2. Update your application code

You can now use your `PrismaClient` instance to perform operations against the new `Profile` table. Those operations can be used to implement queries and mutations in the GraphQL API.

#### 2.1. Add the `Profile` type to your GraphQL schema

First, add a new GraphQL type via Nexus' `objectType` function:

```diff
// ./pages/api/index.ts
+const Profile = objectType({
+  name: 'Profile',
+  definition(t) {
+    t.nonNull.int('id')
+    t.string('bio')
+    t.field('user', {
+      type: 'User',
+      resolve: (parent) => {
+        return prisma.profile
+          .findUnique({
+            where: { id: parent.id || undefined },
+          })
+          .user()
+      },
+    })
+  },
+})

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
+   t.field('profile', {
+     type: 'Profile',
+     resolve: (parent) => {
+       return prisma.user.findUnique({
+         where: { id: parent.id }
+       }).profile()
+     }
+   })
  },
})
```

Don't forget to include the new type in the `types` array that's passed to `makeSchema`:

```diff
export const schema = makeSchema({
  types: [
    Query,
    Mutation,
    Badge,
    BadgeInstance,
    User,
+   Profile,
    GQLDate
  ],
  // ... as before
}
```

Note that in order to resolve any type errors, your development server needs to be running so that the Nexus types can be generated. If it's not running, you can start it with `yarn dev`.

#### 2.2. Add a `createProfile` GraphQL mutation

```diff
// ./pages/api/index.ts
const Mutation = objectType({
  name: 'Mutation',
  definition(t) {
    // other mutations
+   t.field('addProfileForUser', {
+     type: 'Profile',
+     args: {
+       wallet: stringArg(),
+       bio: stringArg()
+     }, 
+     resolve: async (_, args) => {
+       return prisma.profile.create({
+         data: {
+           bio: args.bio,
+           user: {
+             connect: {
+               wallet: args.wallet || undefined,
+             }
+           }
+         }
+       })
+     }
+   })
  }
})
```

Finally, you can test the new mutation like this:

```graphql
mutation {
  addProfileForUser(
    wallet: "timb.eth"
    bio: "I like turtles"
  ) {
    id
    bio
    user {
      id
      name
    }
  }
}
```

<details><summary>Expand to view more sample Prisma Client queries on <code>Profile</code></summary>

Here are some more sample Prisma Client queries on the new <code>Profile</code> model:

##### Create a new profile for an existing user

```ts
const profile = await prisma.profile.create({
  data: {
    bio: 'Hello World',
    user: {
      connect: { wallet: 'timc.eth' },
    },
  },
})
```

##### Create a new user with a new profile

```ts
const user = await prisma.user.create({
  data: {
    wallet: '0x420',
    name: 'Jamesy',
    profile: {
      create: {
        bio: 'Hello World',
      },
    },
  },
})
```

##### Update the profile of an existing user

```ts
const userWithUpdatedProfile = await prisma.user.update({
  where: { wallet: 'timc.eth' },
  data: {
    profile: {
      update: {
        bio: 'Hello Friends',
      },
    },
  },
})
```

</details>

### 3. Build new UI features in React

Once you have added a new query or mutation to the API, you can start building a new UI component in React. It could e.g. be called `profile.tsx` and would be located in the `pages` directory.

In the application code, you can access the new operations via Apollo Client and populate the UI with the data you receive from the API calls.

## Helpful Resources

- Check out the [Prisma docs](https://www.prisma.io/docs)
- Create issues and ask questions on [GitHub](https://github.com/prisma/prisma/)
- Watch our biweekly "What's new in Prisma" livestreams on [Youtube](https://www.youtube.com/channel/UCptAHlN1gdwD89tFM3ENb6w)


# The Challenge
Let's get to the meat and potatoes of what you'll be working on.
## The Rules
1. Make 100% sure your repo is private (Github now allows unlimited private repos)
2. Add Alex (`alec2435`) and Tim (`timconnorz`) to your repo on Github
3. Don't spend more than 3 hours on this project (this isn't meant to be some project where you overengineer this for extra credit)
4. Ask Alex clarifying questions
5. Glhf

## The Challenges
Try to complete as many of these as you can. They are relatively speaking in increasing order of how much time they should take
### 1. Fix the bugs
This repo has a few very obvious bugs (don't waste time looking for subtle stuff).
Do your best to find and fix them.

### 2. Optimize the leaderboard page
The leaderboard page takes a really long time to load for a homepage. Try to optimize
the load times.

Hints:
- We're not looking for single digit milisecond optimizations, there's some really big obvious problems
- Data fetching and the type of rendering used might be helpful avenues to look down

### 3. Add a connect wallet button to the home page
For this challenge, right under the seach bar add a connect wallet button. This button should
just take the current user's wallet address and attempt to open their own profile.

Hints:
- There are no bonus points for reinventing the wheel, use libraries to your advantage
- Add your own wallet address to the database using prisma studio (`yarn prisma studio`) for testing
- The styles don't need to match perfectly
- Don't overcomplicate this lol

### 3.1 Create a new user if a wallet is connected that hasn't been seen before
This one is self explanitory, but don't error out if a wallet is connected that we have never seen before.
For bonus points add some text to the page to inform the user they have no badges.

### 4. Make the search more searchy
Right now the search only allows you to type a wallet/id, press enter, then it opens that user if they exist. Ideally
we'd like some sort of basic typeahead/suggestion feature where the search bar in real time searches the database and provides suggestions.

(Find what this looks like in the designs)

### 5. [Bonus] Embed some courses

The exact way you add these visually doesn't really matter, but embed the course viewer from the main site, use [our docs](https://guide.101.xyz/user-guide/embedding-courses) and asking Alex for help with this.

Examples of how you can do this:
- Add some random courses from 101.xyz under the leaderboard with a header like `Level Up, Take Some Courses`
- Show courses to wallet-connected users on their profiles

## Resources

### Designs

These are rough designs to give you an idea of what we're looking for.

![](https://101-user-uploads.s3.us-east-1.amazonaws.com/Takehome.png)


![](https://101-user-uploads.s3.us-east-1.amazonaws.com/Takehome1.png)

[Figma Link](https://www.figma.com/file/S75Au6zRijETJc6nD12vz7/Who's-%231%3F?node-id=1%3A1526)

### Links I like
- Wallet connection stuff: [RainbowKit](https://github.com/rainbow-me/rainbowkit), [Wagmi](https://github.com/wagmi-dev/awesome-wagmi), [Web3Modal](https://github.com/WalletConnect/web3modal)
- [Nexus GraphQL docs](https://nexusjs.org/)
- [Tailwind Docs](https://tailwindcss.com/docs/utility-first)
- [Next.js Docs](https://nextjs.org/docs) ([my fav page](https://nextjs.org/docs/basic-features/data-fetching/overview))
- [101 "docs"](https://guide.101.xyz/#what-we-do)

## Changelog
Use this area to note down your progress

- [ ] 1. Fix the bugs
  - > **_NOTES:_**  

- [ ]  2. Optimize the leaderboard page
  - > **_NOTES:_**  

- [ ]  3. Add a connect wallet button to the home page
  - > **_NOTES:_**  

- [ ]  3.1 Create a new user if a wallet is connected that hasn't been seen before
  - > **_NOTES:_**  

- [ ]  4. Make the search more searchy
  - > **_NOTES:_**  

- [ ]  5. [Bonus] Embed some courses
  - > **_NOTES:_**  (Please mention where you put this if you did)
