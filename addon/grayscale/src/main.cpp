#include <iostream>
#include <opencv2/opencv.hpp>

using namespace std;
using namespace cv;

int main(int argc, char** argv)
{
    // 检查参数
    if (argc != 2) {
        cerr << "Usage: " << argv[0] << " <input_image_path>" << endl;
        return -1;
    }

    // 读取输入图片
    Mat image = imread(argv[1], IMREAD_COLOR);
    if (image.empty()) {
        cerr << "没有找到图片" << endl;
        return -1;
    }

    // 转换为灰度图
    Mat grayImage;
    cvtColor(image, grayImage, COLOR_BGR2GRAY);

    // 保存输出
    string outputPath = "../images/output_gray.jpg";
    imwrite(outputPath, grayImage);

    cout << "灰度转换图已保存至 " << outputPath << endl;

    return 0;
}