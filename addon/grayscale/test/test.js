const fs = require('fs');
const path = require('path');
const grayscale = require('bindings')('grayscale-node');

// 测试灰度转换
const inputImagePath = path.join(__dirname, '..', 'test', 'test-image.jpg');
const outputImagePath = path.join(__dirname, '..', 'test', 'output-gray.jpg');

try {
    // 1. 读取图片文件为 Buffer
    const inputBuffer = fs.readFileSync(inputImagePath);

    // 2. 调用 C++ 扩展处理 Buffer
    const grayBuffer = grayscale.convertToGrayscale(inputBuffer);

    // 3. 保存处理后的 Buffer 到文件
    fs.writeFileSync(outputImagePath, grayBuffer);

    console.log('Grayscale conversion successful. Output saved to:', outputImagePath);

    // 4. (可选) 验证输出文件
    const stats = fs.statSync(outputImagePath);
    console.log(`Output file size: ${stats.size} bytes`);

} catch (error) {
    console.error('Error:', error);
    // 如果有部分写入的文件，删除无效输出
    if (fs.existsSync(outputImagePath)) {
        fs.unlinkSync(outputImagePath);
    }
}