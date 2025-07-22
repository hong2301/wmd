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