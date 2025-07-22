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

      reader.onload = async function (event) {
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
        const base64Data = event.target.result;
        // 提取纯 Base64 部分（去掉 data:image/png;base64, 前缀）
        const base64String = base64Data.split(',')[1];

        // 将 Base64 字符串转换为 ArrayBuffer
        const binaryString = atob(base64String);
        const len = binaryString.length;
        const bytes = new Uint8Array(len);
        for (let i = 0; i < len; i++) {
          bytes[i] = binaryString.charCodeAt(i);
        }

        // node扩展
        const grayBuffer = await window.electron.grayscaleAPI.convertToGrayscale(bytes)
        console.log(grayBuffer)


        // 假设 grayBuffer 是 Uint8Array 类型的图片数据
        const blob = new Blob([grayBuffer], { type: file.type }); // 转换为 Blob
        const grayImg = document.createElement('img');
        grayImg.src = URL.createObjectURL(blob); // 生成可访问的 URL
        grayImg.style.maxWidth = '100%';
        grayImg.style.maxHeight = '100%';

        // 显示在右侧容器
        const rightDiv = document.getElementById('rightImg') || document.body;
        rightDiv.innerHTML = '';
        rightDiv.appendChild(grayImg);
      };

      reader.readAsDataURL(file);
    }
  });

  // 触发文件选择对话框
  fileInput.click();
});