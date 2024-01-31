// 发布订阅 -- 就用redux吧
function createStore(reducer, preloadedState) {
    let state = preloadedState;
    const listeners = [];
    function getState() {
        return state;
    }
    function subscribe(listener) {
        listeners.push(listener);
        return function unsubscribe() {
            const index = listeners.indexOf(listener);
            listeners.splice(index, 1);
        };
    }
    function dispatch(action) {
        state = reducer(state, action);
        listeners.forEach((listener) => listener());
    }
    dispatch({ type: "@@redux/INIT" });
    return { dispatch, subscribe, getState };
}

// Promise.all
function promiseAll(promises) {
    return new Promise((resolve, reject) => {
        if (!Array.isArray(promises)) {
            return reject(new TypeError('Arguments must be an array'));
        }
        let count = 0;
        let total = promises.length;
        let results = Array.from({length:total});
        for (let i = 0; i < total; i++) {
            //Promise.resolve(promises[i]) 这样写的目的是为了确保 promises[i] 是一个 Promise 对象。
            Promise.resolve(promises[i]).then((value) => {
                count++;
                results[i] = value;
                if(count === total) return resolve(results)
            }).catch((reason) => {
                return reject(reason);
            });
        }
        
    });
}

// 节流 防抖
function getNow() {
    return new Date().getTime();
}
function debounce(fn, delay) {
    const ctx = this;
    let timer;
    return function () {
        const args = arguments;
        timer && clearTimeout(timer);
        timer = setTimeout(() => {
            fn.apply(ctx, args);
        }, delay);
    };
}
function throttle(fn, delay, wait) {
    const ctx = this;
    let start;
    let timer;
    return function () {
        const args = arguments;
        if (!start) {
            start = getNow();
        }
        const now = getNow();
        if (now - start < wait) {
            timer && clearTimeout(timer);
            timer = setTimeout(() => {
                fn.apply(ctx, args);
            }, delay);
        } else {
            fn.apply(ctx, args);
            start = getNow();
        }
    };
}


// fetch 重试 retry
async function fetchWithRetry(url, options, maxRetries = 3) {
    for (let i = 0; i < maxRetries; i++) {
        try {
            const response = await fetch(url, options);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return await response.json();
        } catch (error) {
            if (i === maxRetries - 1) {
                throw error;
            }
            console.log(`Attempt ${i + 1} failed. Retrying...`);
        }
    }
}

// 虚拟列表
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

// 切片上传
export default {
    methods: {
      async changeFile(e) {
        //文件转成二进制数据
        const file = e.target.files[0];
        const buffer = await this.filepParse(file);
        //得到二进制切片列表
        const partList = this.sliceBuffer(buffer,10);
  
        // 并行发出所有切片的请求
        promiseList = partList.map(async (item) => {
          return await this.createSendQeq(item);
        });
        await Promise.all(promiseList);
        // 通知服务器合并
        this.mergeUpload();
      },
      // 将文件转换为二进制
      filepParse(file) {
        const fileRead = new FileReader();
        return new Promise((resolve) => {
          fileRead.readAsArrayBuffer(file);
          fileRead.onload = (res) => {
            resolve(res.target.result);
          };
        });
      },
      // 切片
      sliceBuffer(file,num) {
        const partSize = file.size / num;
        let current = 0;
        let partList = []
        for (let i = 0; i < num; i++) {
          let item = {
            chunk: file.slice(current, current + partSize),
            filename: `${this.hash}_${i}.${suffix}`,
          };
          current += partSize;
          partList.push(item);
        }
        return partList
      },
      // 切片请求
      async createSendQeq(item) {
        const formData = new FormData();
        formData.append("chunk", item.chunk);
        formData.append("filename", item.filename);
        const res = await axios.post("/upload", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        return res;
      },
      
      // 发送代码合并请求
      mergeUpload() {},
    },
  };