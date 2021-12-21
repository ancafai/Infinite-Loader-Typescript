import * as React from "react";
import { useEffect } from 'react';

type Props = {
  loadData: () => void;
  lastElementRef: React.MutableRefObject<any>;
  hasMoreData: boolean;
  children: any;
  isLoading: boolean;
};

export const InfiniteLoader: React.FC<Props> = ({children, lastElementRef, loadData, hasMoreData, isLoading}) => {

  useEffect(() => {
    loadData();
  }, [])

  const observer = 
    new IntersectionObserver(
        (entries) => {
            if (entries[0].isIntersecting && hasMoreData) {
              loadData();
            }
        });

  useEffect(() => {
    const lastElement = lastElementRef.current;
    if (lastElementRef && lastElement) {
        observer.observe(lastElement);
    }
    return () => {
      if (lastElement) { 
        observer.unobserve(lastElement) 
      }
    };
  }, [lastElementRef.current]);

  return (
    <React.Fragment>
      {children}
      {isLoading && 'Loading...'}
    </React.Fragment>
  )

};