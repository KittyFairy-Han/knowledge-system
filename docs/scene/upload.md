<!--
 * @Author: 鱼小柔
 * @Date: 2021-04-07 13:46:51
 * @LastEditors: your name
 * @LastEditTime: 2021-04-07 14:32:33
 * @Description: file content
-->
# 切片上传
遗留问题
某个切片上传失败怎么办？
上传过程中刷新页面怎么办？
```js
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
```
结合并发压缩等方案

## 画图
- 节点数量、图的大小
- webworker
- 服务端渲染
- 预生成
- loading