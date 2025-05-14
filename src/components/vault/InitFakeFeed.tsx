import { useEffect } from 'react';
import useFakeStore from '../../stubs/fakeStore';

/**
 * A component that initializes and maintains a continuous flow of fake vault activities.
 * This component doesn't render anything visible, it just sets up the intervals
 * to periodically push new random activities to the feed.
 */
export function InitFakeFeed() {
  useEffect(() => {
    // Start interval to add a new random activity every 5 seconds
    const intervalId = setInterval(() => {
      useFakeStore.getState().pushRandomActivity();
    }, 5000); // 5 seconds
    
    // Clean up interval on unmount
    return () => clearInterval(intervalId);
  }, []);
  
  // This component doesn't render anything
  return null;
}