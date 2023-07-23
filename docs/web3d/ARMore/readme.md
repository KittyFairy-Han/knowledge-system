### 👗 模型效果（阴影等）

- 阴影对象

```js
// 获取模型的边界框
const boundingBox = new THREE.Box3().setFromObject(model);
// 定义平面的尺寸和中心点
const planeWidth = 3;
const planeHeight = 3;

// 计算平面的位置
const planePosition = new THREE.Vector3(
  (boundingBox.max.x + boundingBox.min.x) / 2,
  -0.05, //y的位置固定取值，前提是与模型设计师沟通好，人脚低的位置在y轴0点
  (boundingBox.max.z + boundingBox.min.z) / 2
);

// 计算平面的旋转角度（与地面平行）
const planeRotation = new THREE.Euler(-Math.PI / 2, 0, 0);

// 创建了一个半径为1、分成32个段的圆形
const geometry = new THREE.CircleBufferGeometry(1, 32);
const material = new THREE.MeshStandardMaterial({
  color: 0xffffff,
  transparent: true,
  opacity: 0.1, // 透明度不能为0 否则无法接收阴影
});
const plane = new THREE.Mesh(geometry, material);
plane.receiveShadow = true;
plane.castShadow = true;
plane.position.copy(planePosition);
plane.rotation.copy(planeRotation);
```

- render 设置

```js
renderer = new THREE.WebGLRenderer({
  antialias: !isIOS, //抗锯齿 IOS需关闭
  alpha: true,
  shadowMapEnabled: true, //使渲染器支持阴影贴图
});
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
```

- 灯光设置

```js
light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(-3, 10, -4); //设置灯光位置
scene.add(light); //添加到场景
light.castShadow = true; //设置灯光生成阴影
// 设置阴影映射参数
light.shadow.mapSize.width = 1024 * 4;
light.shadow.mapSize.height = 1024 * 4;
light.shadow.camera.near = 0.5;
light.shadow.camera.far = 80;
light.shadow.opacity = 1; // 设置阴影不透明
```

- 模型上的设置

```js
//设置模型生成阴影并接收阴影
model.castShadow = true;
model.receiveShadow = true;
```

### 🚀 内存问题解决

打开页面的次数增多，会造成小程序闪退，我们从内存释放角度解决。

- AR 场景

```js
if (session) {
  webglBusiness.dispose();
  session.destroy();
  session = null;
}
```

- 3d 渲染  
   three.js 会创建在渲染中所必需的特定对象，这些对象并不会被自动释放；相反，应用程序必须使用特殊的 API 来释放这些资源。[官方说明在这里](https://threejs.org/docs/index.html#manual/zh/introduction/How-to-dispose-of-objects)

```js
// mesh 释放
if (modelGroup) {
  modelGroup.traverse((object) => {
    if (object.isMesh) {
      const { geometry, material, skeleton } = object;
      geometry.dispose(); //几何体释放
      material.dispose(); //材质释放
      Object.keys(material).forEach((propName) => {
        const propValue = material[propName];
        if (propValue && propValue.isTexture) {
          propValue.dispose(); //纹理释放
        }
      });
      if (skeleton && skeleton.boneTexture) {
        skeleton.boneTexture.dispose(); //骨骼纹理释放
      }
    }
  });
  scene.remove(modelGroup);
  modelGroup = null;
}

// 灯光阴影
if (light) {
  light.shadow.map.dispose();
  scene.remove(light);
  light = null;
}

// 清除场景本身
if (scene) {
  scene.dispose();
  scene = null;
}

// render 释放
if (renderer) {
  renderer.dispose();
  renderer = null;
}
```

> 做了以上这些卸载，有一定作用，但是加载模型还是会有内存问题，希望大佬们在评论区给些建议

### 💫 重置与平移

开发过程中遇到，重置与平移功能无法完美共存的问题。以手指向左滑动，模型左移为例子来进行下面的说明。

#### 问题描述

相机打开瞬间（朝向正东方）创建了世界坐标系，模型刚好朝着相机，监听 onTouchMove，获取手指滑动距离 dir，调用 model.position.x=model.position.x-dir。模型的表现为向左平移。  
当手机姿态发生改变，比如朝向正西方，放置模型。模型会朝着相机，但是手指向左滑动时，模型向右移动。

#### 解决方案

- 实时计算正确方位

拿到相机和模型在 3d 空间的坐标，根据模型与相机的位置关系实时计算模型应该移动的方向。以模型位置指向相机位置的向量为模型的前方，后、左、右依次类推。手指上、下、左、右滑动时，对应的模型平移方向分别为前方，后、左、右。
然后踩坑了，相机和模型拿到的位置坐标永远都是 0 0 0，大无语。

- 反复销毁创建 AR 场景

每次放置模型时，都重新创建 AR 场景，创建完立刻执行 hitTest，把模型加到场景中。方向是对了。\
但是！销毁创建会导致画面闪烁，并且那些不容易检测的手机再也检测不到平面了。

- 刷新

一切重来！对模型数据进行缓存，每次放置模型时都刷新一次页面，重新创建 AR 场景，创建完立刻执行 hitTest。方向肯定是对的啦，也不会画面闪烁。
但那些不容易检测的手机还是再也检测不到平面。

#### 最优解：毁灭吧！