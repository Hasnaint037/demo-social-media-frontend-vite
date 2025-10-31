import { useRef, useCallback } from "react";

interface UseInfiniteScrollOptions {
  loading: boolean;
  hasNextPage: boolean;
  onLoadMore: () => void;
}

export const useInfiniteScroll = ({
  loading,
  hasNextPage,
  onLoadMore,
}: UseInfiniteScrollOptions) => {
  const observerRef = useRef<IntersectionObserver | null>(null);

  const lastElementRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (loading) return;
      if (observerRef.current) observerRef.current.disconnect();

      observerRef.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasNextPage) {
          onLoadMore();
        }
      });

      if (node) observerRef.current.observe(node);
    },
    [loading, hasNextPage, onLoadMore]
  );

  return { lastElementRef };
};
