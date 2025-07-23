# 项目说明

## 启动
### 环境配置
1. vcpkg环境
```
export VCPKG_ROOT=/Users/hong/vcpkg-master
export PATH=$VCPKG_ROOT:$PATH
```
2. openCV环境及其子依赖quirc
```
export OpenCV_DIR=$VCPKG_ROOT/installed/arm64-osx/share/opencv4
export quirc_DIR=$VCPKG_ROOT/installed/arm64-osx/share/quirc 
```
3. node环境
```
export NODE_PATH=/opt/homebrew/opt/nvm/versions/node/v20.11.1
export CMAKE_JS_INC="$NODE_PATH/include/node"
```