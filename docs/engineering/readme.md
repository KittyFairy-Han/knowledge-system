<!--
 * @Author: 鱼小柔
 * @Date: 2021-02-14 13:32:56
 * @LastEditors: your name
 * @LastEditTime: 2021-06-14 15:20:47
 * @Description: file content
-->

# 前端工程化

前端工程化就是为了让前端开发能够“自成体系”，个人认为主要应该从模块化、组件化、规范化、自动化四个方面思考。

- 模块化：简单来说，模块化就是将一个大文件拆分成相互依赖的小文件，再进行统一的拼装和加载。
- 组件化：从 UI 拆分下来的每个包含模板(HTML)+样式(CSS)+逻辑(JS)功能完备的结构单元，我们称之为组件。
  > 模块化只是在文件层面上，对代码或资源的拆分；而组件化是在设计层面上，对 UI（用户界面）的拆分。
- 规范化：比如目录结构、文件命名、前后端分离等。都会影响到后期的维护性，甚至代码质量。
- 自动化：任何简单机械的重复劳动都应该让机器去完成。比如打包的流程

# 版本控制

### 为什么

协作性

### 运行 yarn，会如何读取配置？（怎么做）

1. 读取 package.json 文件：Yarn 首先会读取项目的 package.json 文件，获取项目的依赖信息。
2. 读取 yarn.lock 文件：

- - 如果项目中有 yarn.lock 文件，Yarn 会读取这个文件，获取依赖的具体版本信息
- - 假设 lock 中和 package.json 中的版本不一致，也会用 yarn.lock 种的
- - 如果 yarn.lock 文件中没有某个依赖的信息，Yarn 会根据 package.json 文件中的版本范围选择一个版本，并将这个版本的信息添加到 yarn.lock 文件中。

3. 检查 node_modules 文件夹：Yarn 会检查 node_modules 文件夹，看看需要的依赖是否已经安装。

- - 如果已经安装，版本一致，Yarn 会跳过安装步骤。
- - 如果已安装，版本冲突，更新 node_modules 中的依赖来匹配 lock 文件。
- - 如果没有安装，Yarn 会下载并安装依赖。

4. 下载并安装依赖
5. 如果想要更新版本，记得删除 lock 和 node_modules

### 频繁发版问题的解决策略

- 项目架构设计：比如一个组件库，尽量使组件功能单一，避免一个组件包含过多的功能。这样可以减少因为修改一个功能而影响到其他功能的情况，从而减少发版的频率。
- 项目质量把控：充分自测，减少因为 bug 要发版的情况
- 版本管理规范：对于修复 bug 和小改动，只升级补丁版本号；对于向后兼容的新功能，升级次版本号；对于不向后兼容的改动，升级主版本号。这样可以让使用者知道更新的版本是否可能影响到他们的代码。
- 使用 feature flag：对于新功能的开发，可以使用 feature flag 来控制新功能的开启和关闭。这样可以在不发版的情况下，控制新功能的发布。
- 使用 monorepo：如果你的项目由多个包组成，你可以考虑使用 monorepo 管理你的项目。这样可以更好地管理你的依赖，避免因为一个包的改动而需要发布多个包。
- 日志文档：让用户知道

## 考点

### package-lock.json、yarn.lock 干嘛用的

这两个文件都是锁定依赖项版本的机制，以确保团队的协作和构建的可重复性。

### 什么时候不锁定版本

当你正在开发一个库或框架时，你的库可能会被许多不同的项目使用，这些项目可能使用的是依赖的不同版本。如果你锁定了依赖的版本，那么你的库可能只能在特定版本的依赖上正常工作，这可能会限制你的库的使用范围。

### package.json 的 scripts 字段和直接使用 Node 运行脚本的主要区别

在于环境和便利性。

- 环境：一个是项目，一个是全局
- 便利性：scripts 组合命令，不需要每次输入很长（记忆也累）



# CICD （持续集成与部署）

## 为什么

可以帮助开发团队更快速、更频繁地交付高质量的软件产品。

### 怎么做

- 前置知识：git-版本控制、webpack-打包、jest-自动化测试、docker-容器、云服务、监控和日志
- 步骤：编写代码+Jenkins 的流程+日志监控

### Jenkins 把构建到部署的流程做成了自动化

Jenkins 是一个持续集成/持续部署（CI/CD）工具，它可以自动化软件的构建、测试和部署过程。

1. 开发人员将代码推送到代码仓库。
2. Jenkins 监测到代码变更，自动触发构建过程。

- - 使用 Docker 创建容器
- - 在容器中，使用 webpack 打包
- - 在容器中，使用 jest 自动化测试

3. Jenkins 将 Docker 容器部署到云服务上。云服务可以根据需要自动扩展应用，处理更多的流量。

### Docker 优点

- 环境一致
- 易于部署和扩展
- 隔离
- 轻量
- 版本控制和复用
- 持续集成部署
