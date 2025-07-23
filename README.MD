# 项目说明

## 启动

### 环境配置

1. vcpkg(3.15) 环境

```
export VCPKG_ROOT=/Users/hong/vcpkg-master
export PATH=$VCPKG_ROOT:$PATH
```

2. openCV(4.11.0) 环境及其子依赖 quirc

目前 opencv 配置是 MacOs 系统的需要修改环境变量到 windows 版本的

```
export OpenCV_DIR=$VCPKG_ROOT/installed/arm64-osx/share/opencv4
export quirc_DIR=$VCPKG_ROOT/installed/arm64-osx/share/quirc
```

3. node 环境(v20.11.1)

```
export NODE_PATH=/opt/homebrew/opt/nvm/versions/node/v20.11.1
```

## 运行

### 编译 node 扩展

```
cd addon/grayscale
npm install
npm run build
```

### 运行 electron

```
# 在项目根目录
npm install
npm run start
```
