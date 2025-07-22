document.getElementById('leftImg').addEventListener('click', function () {
  // 创建文件输入元素
  const fileInput = document.createElement('input');
  fileInput.type = 'file';
  fileInput.accept = 'image/*'; // 只接受图片文件

  // 添加change事件处理
  fileInput.addEventListener('change', function (e) {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();

      reader.onload = function (event) {
        // 创建一个img元素显示选择的图片
        const img = document.createElement('img');
        img.src = event.target.result;
        img.style.maxWidth = '100%';
        img.style.maxHeight = '100%';

        // 清空div内容并添加图片
        const div = document.getElementById('leftImg');
        div.innerHTML = ''; // 先清空
        div.appendChild(img); // 再添加图片

        // 读取二进制数据
        const buffer = event.target.result;
        //
        // // 调用C++处理
        // const grayBuffer = grayscale.convertToGrayscale(buffer);

        // // 转换回Blob并显示
        // const blob = new Blob([grayBuffer], { type: file.type });
        // const grayImg = document.createElement('img');
        // grayImg.src = URL.createObjectURL(blob);
        // grayImg.style.maxWidth = '100%';
        // grayImg.style.maxHeight = '100%';

        // // 显示在右侧容器
        // const rightDiv = document.getElementById('rightImg') || document.body;
        // rightDiv.innerHTML = '';
        // rightDiv.appendChild(grayImg);
      };

      reader.readAsDataURL(file);
    }
  });

  // 触发文件选择对话框
  fileInput.click();
});