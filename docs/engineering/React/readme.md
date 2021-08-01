# 开始入门啦

新手上路总是有很多坑

## setInterval 不更新？

```js
export default () => {
  const [count, setCount] = useState(60);

  const useCountDown = () => {
    setInterval(() => {
      // console.log('interval',count) //永远是初始值
      if (count === 0) {
        clearInterval(timer);
        resolve(true);
      }
      setCount(count - 1);
    }, 1000);
  };
  return <button onClick={useCountDown}></button>;
};
```
