import type { NextPage } from 'next';
import { gql, useQuery } from '@apollo/client';
import { useState, useEffect } from 'react';

const Home: NextPage = () => {
  const usersQuery = gql`
    query ($amount: Int!, $offset: Int!) {
      users(amount: $amount, offset: $offset) {
        username
        id
      }
    }
  `;

  const [limit] = useState(2);
  const [offset, setOffset] = useState(0);
  const { error, loading, data, fetchMore } = useQuery(usersQuery, { variables: { amount: 2, offset: 0 }, fetchPolicy: 'cache-and-network' });

  const fetchMorePosts = () => {
    return fetchMore({
      variables: {
        limit: limit,
        offset: offset + limit
      },
      updateQuery: (prev, { fetchMoreResult }: any) => {
        console.log(fetchMoreResult);
        if (!fetchMoreResult) return prev;
        if (fetchMoreResult.users.length !== 0) setOffset(offset + limit);
        return Object.assign({}, prev, {
          users: [...prev.users, ...fetchMoreResult.users]
        });
      }
    });
  };

  if (loading) return <h1>loading...</h1>;
  if (error) return <h1>something went wrong</h1>;

  return (
    <div className='w-[max-content] m-auto text-[40px]'>
      <h1>hello</h1>
      <button onClick={() => fetchMorePosts()} className='bg-gray-700 rounded-[10px] p-[20px] w-[max-content] m-auto flex hover:bg-gray-800 duration-300'>
        fetch more users
      </button>
      <div>
        {data.users.map(({ username, id }: { username: string; id: number }, index: number) => (
          <h1 key={index}>
            username: {username} id: {id}
          </h1>
        ))}
      </div>
    </div>
  );
};

export default Home;
