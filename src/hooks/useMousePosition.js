import { useState, useEffect } from 'react';

const useMousePosition = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  // if we register the mousemove event listener directly, it will get registered every time
  // React renders, and every time this runs it also updates state (teh x and y position)
  // whenever useState state changes React rerenders. So that will register thousands of events
  // and crash the browser quite quickly. So use useEffect and specificy its dependencies list as
  // and empty list so it only fires once, because we only need to register the event callback once,
  // after that the function will get called as teh mouse moves but it won't reregister event listeners
  useEffect(() => {
    const handleMouseMove = (e) => {
      setPosition({
        x: e.pageX,
        y: e.pageY,
      });
    };

    document.addEventListener('mousemove', handleMouseMove);

    // remember when you return a function in useEffect, it is called as a cleanup function when the
    // component unmounts. In this case we want to remove the event listener when it unmounts
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return position;
};

export { useMousePosition as default };
