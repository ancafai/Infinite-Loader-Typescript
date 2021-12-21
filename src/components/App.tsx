import * as React from "react";
import { useState, useEffect, useRef } from 'react';
import { InfiniteLoader } from './InfiniteLoader';
import axios from 'axios';

type userNameProps = {
  first: string;
  last: string;
}

type userLocationProps = {
  city: string;
  country: string;
}

type userProps = {
name: userNameProps,
location: userLocationProps
}

export const App = () => {

  const [users, setUsers] = useState<userProps[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const lastElement = useRef(null);
  
  const fetchUser = async () => {
    setIsLoading(true);
    let response = await axios.get(
        `https://randomuser.me/api/?page=${Math.floor(Math.random() * 10) + 1}&results=25&seed=abc`
    );
    let concatenatedUsers = [...users, ...response.data.results];
    setUsers(concatenatedUsers);
    setIsLoading(false);
  };

  return (
    <InfiniteLoader lastElementRef={lastElement} loadData={fetchUser} hasMoreData={users.length < 100} isLoading={isLoading}>
      {users.length > 0 && users.map((user, index) => {
        const {name, location} = user;
        return <div
            key={index}
            ref={lastElement}
            style={{width: '200px', border: '1px solid black'}}
          >
            <p>{name?.first}</p>
            <p>{name?.last}</p>
            <p>{location?.city}</p>
            <p>{location?.country}</p>
        </div>
        })}
      </InfiniteLoader>)
};