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
    "bootstrap": {
      "ignore": "component-*",
      "npmClientArgs": ["--no-package-lock"]
    }
  },
  "packages": ["packages/*"]
}
```

## 参考

- [lerna](https://github.com/lerna/lerna#readme)
- [lerna](https://lerna.js.org/)
- [lerna多包管理实践](https://juejin.cn/post/6844904194999058440#heading-22)