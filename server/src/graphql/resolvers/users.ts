export const users_resolver = {
  Query: {
    users: async (_: any, { amount, offset }: { amount: number; offset: number }) => {
      return [
        {
          username: 'hello',
          id: 1
        }
      ];
    }
  }
};
