export const users_resolver = {
  Query: {
    users: async (_: any, { amount, offset }: { amount: number; offset: number }) => {
      const fakeUsers = [
        { username: 'billy', id: 1 },
        { username: 'willy', id: 2 },
        { username: 'jimmmy', id: 3 },
        { username: 'timmy', id: 4 },
        { username: 'joe', id: 5 },
        { username: 'doug', id: 6 },
        { username: 'frogdude1123', id: 7 }
      ];

      const newArray = [];
      for (let i = 0; i < amount; i++) {
        newArray.push(fakeUsers[i + offset]);
      }

      return newArray;
    }
  }
};
