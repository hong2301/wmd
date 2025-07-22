const path = require('path');
const grayscale = require('bindings')('grayscale-node');

// 测试灰度转换
const inputImage = path.join(__dirname, '..', 'test', 'test-image.jpg'); // 准备一个测试图片
const outputImage = path.join(__dirname, '..', 'test', 'output-gray.jpg');

try {
    const result = grayscale.convertToGrayscale(inputImage, outputImage);
    console.log('Grayscale conversion successful. Output saved to:', result);
} catch (error) {
    console.error('Error:', error);
}