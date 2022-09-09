# cloud-analyse-sdk

## 技术

### 依赖包

- @microsoft/api-extractor：汇总产物中的类型定义
- @rollup/plugin-typescript：用于构建阶段TS的转换
- core-js：用于js polyfill支持
- tslib：为TS提供一些辅助方法，Runtime - library for TypeScript helper functions
- eslint：代码规范
- vite：开发阶段测试，与库的最终构建（Rollup提供构建能力）
- rimraf：替代rm -rf指令用于清理不需要的资源
- typescript：TS支持

### 文件目录

- 文件 src/index.ts：主要用于模块内容的导出
- 目录 src/lib：主要用于存放库的核心源码
- 目录 src/types：TS定义文件
- 目录 src/constants：常量
- 目录 src/utils：工具方法