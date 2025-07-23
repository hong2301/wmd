# 项目说明

## 启动

### 环境配置

1. vcpkg(3.15) 环境

```
export VCPKG_ROOT=/Users/hong/vcpkg-master
export PATH=$VCPKG_ROOT:$PATH
```

2. openCV(4.11.0) 环境和 quirc 环境

目前 opencv 配置是 MacOs 系统的需要修改环境变量到 windows 版本的

```
# Mac
export OpenCV_DIR=$VCPKG_ROOT/installed/arm64-osx/share/opencv4
export quirc_DIR=$VCPKG_ROOT/installed/arm64-osx/share/quirc

# Windows 中，OpenCV_DIR 应指向包含 OpenCVConfig.cmake 的目录，路径通常是：
# <你的OpenCV解压路径>\build\x64\<vc版本>\lib
# 编译好的window版本的OpenCv的解压包由于过大，已准备安装链接
# https://github.com/opencv/opencv/releases/download/4.11.0/opencv-4.11.0-windows.exe
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
