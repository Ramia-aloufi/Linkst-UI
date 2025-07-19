import { useEffect, useState } from 'react';

export const useScrollEnd = (ref: React.RefObject<HTMLDivElement | null>, offset = 100) => {
  const [isBottom, setIsBottom] = useState(false);

  useEffect(() => {
    const element = ref.current;
    console.log("Element",element);
    
    if (!element) return;

    const onScroll = () => {
      const atBottom =
        element.scrollTop + element.clientHeight >= element.scrollHeight - offset;
      setIsBottom(atBottom);
    };

    element.addEventListener("scroll", onScroll);
    return () => element.removeEventListener("scroll", onScroll);
  }, [ref, offset]);

  return isBottom;
};

