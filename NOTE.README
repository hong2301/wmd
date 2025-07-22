# 万铭达测试题

## 配置 vcpkg 环境

下载并初始化

```
git clone https://github.com/Microsoft/vcpkg.git
cd vcpkg
.\bootstrap-vcpkg.bat
```

检查是否成功

```
./vcpkg --version
```

配置环境变量

```
export VCPKG_HOME=/Users/hong/vcpkg-master
export PATH=$VCPKG_HOME:$PATH
```

## 配置 opencv 环境

安装，会有点久

```
vcpkg install opencv
```

配置环境变量

```
export OpenCV_DIR=$VCPKG_ROOT/installed/arm64-osx/share/opencv4
```

## c++模块

创建一个文件夹，此为 c++模块的根目录

### CMakeLists.ts

在项目根目录创建 CMakeLists.ts

```
cmake_minimum_required(VERSION 3.15)
project(grayscale)

# 启用vcpkg集成
set(CMAKE_TOOLCHAIN_FILE $VCPKG_ROOT/scripts/buildsystems/vcpkg.cmake)

# 查找OpenCV包
find_package(OpenCV REQUIRED)

# 查找quirc包
find_package(quirc REQUIRED)

# 添加可执行文件
add_executable(grayscale src/main.cpp)

# 链接OpenCV库
target_link_libraries(grayscale PRIVATE ${OpenCV_LIBS})

# 包含OpenCV头文件目录
target_include_directories(grayscale PRIVATE ${OpenCV_INCLUDE_DIRS})

# 设置C++标准
set_target_properties(grayscale PROPERTIES
    CXX_STANDARD 11
    CXX_STANDARD_REQUIRED ON)
```

### main.cpp

创建 src/main.cpp

```
#include <iostream>
#include <opencv2/opencv.hpp>

using namespace std;
using namespace cv;

int main(int argc, char** argv)
{
    cout<<'你好';

    return 0;
}
```

### 环境配置

```
export quirc_DIR=$VCPKG_ROOT/installed/arm64-osx/share/quirc
```

### 测试运行

```
cmake .. -DCMAKE_TOOLCHAIN_FILE=$VCPKG_ROOT/scripts/buildsystems/vcpkg.cmake
cmake --build .
./grayscale ../images/input.jpg
```
