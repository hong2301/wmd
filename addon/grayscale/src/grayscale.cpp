#include <napi.h>
#include <opencv2/opencv.hpp>

using namespace cv;

Napi::Value ConvertToGrayscale(const Napi::CallbackInfo& info) {
    Napi::Env env = info.Env();

    // 检查参数
    if (info.Length() < 1 || !info[0].IsString()) {
        Napi::TypeError::New(env, "String expected for image path").ThrowAsJavaScriptException();
        return env.Null();
    }

    std::string inputPath = info[0].As<Napi::String>().Utf8Value();
    std::string outputPath = "output_gray.jpg";

    if (info.Length() > 1 && info[1].IsString()) {
        outputPath = info[1].As<Napi::String>().Utf8Value();
    }

    // 读取输入图片
    Mat image = imread(inputPath, IMREAD_COLOR);
    if (image.empty()) {
        Napi::Error::New(env, "Could not open or find the image").ThrowAsJavaScriptException();
        return env.Null();
    }

    // 转换为灰度图
    Mat grayImage;
    cvtColor(image, grayImage, COLOR_BGR2GRAY);

    // 保存输出
    try {
        imwrite(outputPath, grayImage);
    } catch (const cv::Exception& e) {
        Napi::Error::New(env, "Failed to save image: " + std::string(e.what())).ThrowAsJavaScriptException();
        return env.Null();
    }

    return Napi::String::New(env, outputPath);
}

Napi::Object Init(Napi::Env env, Napi::Object exports) {
    exports.Set(Napi::String::New(env, "convertToGrayscale"), 
                Napi::Function::New(env, ConvertToGrayscale));
    return exports;
}

NODE_API_MODULE(grayscale, Init)