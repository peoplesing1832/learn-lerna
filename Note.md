## Multirepo模式

单体仓库，即每一个`package`都单独用一个仓库来进行管理。如果不同`package`之间相互依赖，会越来越难以维护。

## Monorepo

所有相关的`package`都放在一个仓库里进行管理。

## lerna是什么？

> A tool for managing JavaScript projects with multiple packages. 一个用于管理，具有多个`package`，项目的工具。

一个由lerna管理的项目，通常的结构如下：

```shell
- 📃 lerna.json
- 📃 package.json
- 📁 packages
  - 📁 packageA
    - 📃 package.json  
  - 📁 packageB
    - 📃 package.json
```

## lerna Fixed/Locked 模式 (默认模式)

默认的模式，`lerna init` 创建默认模式的项目。固定模式使用 `lerna.json` 对所有的 `package` 进行统一的版本管理。多项目中任何一个 `package` 修改都会导致所有 `package` 的版本号变动。

## lerna Independent 模式

独立模式，`lerna init --independent` 创建独立模式的项目。独立模式允许每一个 `package` 单独修改版本号。在 `lerna publish` 时, 只会更新有变化的 `package` 的版本号。

## lerna.json

```js
{
  "version": "1.1.3", // 版本号，Independent模式下设置为independent
  "npmClient": "npm", // 指定运行命令的客户端
  "command": {
    "publish": {
      "ignoreChanges": ["ignored-file", "*.md"], // 指定那些目录或者文件的变更不会被publish
      "message": "chore(release): publish", // 执行发布版本更新时的自定义提交消息
      "registry": "https://npm.pkg.github.com" // 设置npm包发布的注册地址
    },
  },
  "packages": ["packages/*"] // 指定包所在的目录
}
```

## 使用lerna

### 安装lerna

```shell
npm install --global lerna
```

### 初始化lerna (使用默认模式)

```shell
lerna init
```

项目目录结构如下：

```shell
- 📁 packages3
- 📃 package.json
- 📃 lerna.json
```

在项目目录中创建三个项目

![lerna-app.png](https://i.loli.net/2021/08/23/dLvmS6pIjgqV8nr.png)

- app 依赖 ui, utils
- ui 依赖 utils
- utils 不依赖任何库，需要发布到 npm 上

```shell
lerna create app && lerna create ui && lerna create utils
```

此时项目的文件夹结构，如下图所示：

![项目目录.png](https://i.loli.net/2021/08/23/ih4DHp8RkFXU9QE.png)

#### 处理 utils package

在 `utils.js` 中简单添加一些示例代码

```js
'use strict';

module.exports = { add };

function add(...args) {
    console.log('使用 utils 库的的 add 方法')
    let sum = 0
    for (let i = 0; i < args.length; i += 1) {
        sum += args[i]
    }
    return sum
}
```

#### 处理 ui package

1. 在 ui package 中的 package.json 文件中设置 `private: true`, npm 不会发布这个包。
2. 将 utils 添加到 ui package 中。`lerna add utils --scope=ui`

在 ui.js 中使用 utlis

```js
'use strict';

const { add } = require('utils');

module.exports = ui;

function ui(...args) {
  console.log('调用 ui 函数', ...args);
  add(...args)
}
```

#### 处理 app package

1. 在 app package 中的 package.json 文件中设置 `private: true`, npm 不会发布这个包。
2. 将 ui 和 utils 添加到app中。 `lerna add ui --scope=app`, `lerna add utils --scope=app`

在 app.js 中 使用 ui 和 utlis

```js
'use strict';

const { add } = require('utils');
const ui = require('ui');

module.exports = app;

function app() {
    add(1, 2, 3)
    ui(1, 2, 3)
}

app()
```

运行 app, `node app.js`。得到，如下的log

```shell
使用 utils 库的的 add 方法
调用 ui 函数 1 2 3
使用 utils 库的的 add 方法
```

## npm发布

我们需要把 utils 发布到 npm 上。如果项目需要 build。需要提前使用 build 命令对项目进行打包。

接下来调用 lerna publish 发布项目，



## lerna的命令

### lerna init

### lerna bootstrap

### lerna import

### lerna add

### lerna create

### lerna clean

### lerna ls

### lerna changed

### lerna diff

### lerna run

### lerna exec

### lerna link

### lerna version

### lerna publish



## 参考

- [package.json](https://docs.npmjs.com/cli/v7/configuring-npm/package-json)
- [lerna](https://github.com/lerna/lerna#readme)
- [lerna](https://lerna.js.org/)
- [lerna多包管理实践](https://juejin.cn/post/6844904194999058440#heading-22)