cmake_minimum_required(VERSION 3.15)
project(grayscale-node)

# 启用vcpkg集成
set(CMAKE_TOOLCHAIN_FILE $VCPKG_ROOT/scripts/buildsystems/vcpkg.cmake)

# 查找OpenCV包
find_package(OpenCV REQUIRED)

# 查找quirc包
find_package(quirc REQUIRED)

# 查找Node.js和NAPI
set(NodeJS_INCLUDE_DIR $ENV{NODE_PATH}/include/node)
include_directories(${NodeJS_INCLUDE_DIR})

# 指定 NAPI 路径
set(NAPI_INCLUDE_DIR "${CMAKE_CURRENT_SOURCE_DIR}/node_modules/node-addon-api")
include_directories(${NAPI_INCLUDE_DIR})

# 添加Node.js模块
add_library(${PROJECT_NAME} SHARED
    src/grayscale.cpp
)

# 链接库
target_link_libraries(${PROJECT_NAME} PRIVATE
    ${OpenCV_LIBS}
    ${NAPI_LIBRARIES}
)

# 包含目录
target_include_directories(${PROJECT_NAME} PRIVATE
    ${OpenCV_INCLUDE_DIRS}
    ${NAPI_INCLUDE_DIRS}
    ${NAPI_INCLUDE_DIR}
)

# 设置C++标准
set_target_properties(${PROJECT_NAME} PROPERTIES
    CXX_STANDARD 11
    CXX_STANDARD_REQUIRED ON
    PREFIX ""
    SUFFIX ".node"
)