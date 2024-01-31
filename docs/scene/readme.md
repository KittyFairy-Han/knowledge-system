
## 面试-场景题

#### 滚动加载的虚拟列表
```js
import React, { useEffect, useRef, useState } from 'react';

function InfiniteScrollList() {
  // 用于存储列表项目的状态
  const [items, setItems] = useState([]);
  // 用于存储加载状态的状态
  const [isLoading, setIsLoading] = useState(false);
  // 用于存储观察器的引用
  const observer = useRef();

  // 加载更多项目的函数
  const loadMore = () => {
    setIsLoading(true);
    fetchMoreItems().then(newItems => {
      setItems(prevItems => [...prevItems, ...newItems]);
      setIsLoading(false);
    });
  };

  // 观察器的回调函数
  const observerCallback = (entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        loadMore();
      }
    });
  };

  // 创建并设置观察器
  useEffect(() => {
    observer.current = new IntersectionObserver(observerCallback);
    return () => observer.current.disconnect();
  }, []);

  // 添加观察目标
  useEffect(() => {
    const lastItem = document.querySelector('.item:last-child');
    if (isLoading) return;
    if (observer.current) observer.current.observe(lastItem);
    return () => {
      if (observer.current) observer.current.unobserve(lastItem);
    };
  }, [items, isLoading]);

  return (
    <div>
      {items.map((item, index) => (
        <div key={index} className="item">
          {item}
        </div>
      ))}
      {isLoading && <p>Loading...</p>}
    </div>
  );
}

export default InfiniteScrollList;

```