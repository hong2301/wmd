#include <napi.h>
#include <opencv2/opencv.hpp>
#include <vector>

// 避免直接使用 `using namespace`，改为显式指定命名空间
using Napi::Buffer;
using Napi::CallbackInfo;
using Napi::Env;
using Napi::Function;
using Napi::Object;
using Napi::TypeError;

// 不再使用 `using namespace cv`，改用 `cv::` 前缀
Buffer<uint8_t> ConvertToGrayscale(const CallbackInfo& info) {
  Env env = info.Env();

  // 参数验证
  if (info.Length() < 1 || !info[0].IsBuffer()) {
    TypeError::New(env, "Buffer expected").ThrowAsJavaScriptException();
    return Buffer<uint8_t>::New(env, 0);
  }

  // 获取输入 Buffer
  Buffer<uint8_t> inputBuffer = info[0].As<Buffer<uint8_t>>();
  size_t length = inputBuffer.Length();
  uint8_t* inputData = inputBuffer.Data();

  // 将 Buffer 解码为 OpenCV Mat
  std::vector<uint8_t> bufferData(inputData, inputData + length);
  cv::Mat inputMat = cv::imdecode(bufferData, cv::IMREAD_COLOR);
  
  if (inputMat.empty()) {
    Napi::Error::New(env, "Failed to decode image from buffer").ThrowAsJavaScriptException(); // 显式使用 Napi::Error
    return Buffer<uint8_t>::New(env, 0);
  }

  // 转换为灰度图
  cv::Mat grayMat;
  cv::cvtColor(inputMat, grayMat, cv::COLOR_BGR2GRAY);

  // 编码为 JPEG 格式的 Buffer
  std::vector<uint8_t> outputBuffer;
  std::vector<int> compression_params = {
    cv::IMWRITE_JPEG_QUALITY, 90  // 设置JPEG质量
  };
  
  if (!cv::imencode(".jpg", grayMat, outputBuffer, compression_params)) {
    Napi::Error::New(env, "Failed to encode image to buffer").ThrowAsJavaScriptException(); // 显式使用 Napi::Error
    return Buffer<uint8_t>::New(env, 0);
  }

  // 创建返回的 Buffer
  return Buffer<uint8_t>::Copy(
    env, 
    outputBuffer.data(), 
    outputBuffer.size()
  );
}

Object Init(Env env, Object exports) {
  exports.Set(
    Napi::String::New(env, "convertToGrayscale"),  // 显式使用 Napi::String
    Function::New(env, ConvertToGrayscale)
  );
  return exports;
}

NODE_API_MODULE(grayscale, Init)