# js实现下载图片

``` javascrit
   /**
       * 获取 blob
       * @param  {String} url 目标文件地址
       * @return {Promise} 
    */
    getBlob(url) {
          return new Promise(resolve => {
              const xhr = new XMLHttpRequest();
              xhr.open('GET', url, true);
              xhr.responseType = 'blob';
              xhr.onload = () => {
                  if (xhr.status === 200) {
                      resolve(xhr.response);
                  }
              };
              xhr.send();
          });
      },
      /**
       * 保存
       * @param  {Blob} blob     
       * @param  {String} filename 想要保存的文件名称
      */
      saveAs(blob, filename) {
          if (window.navigator.msSaveOrOpenBlob) {
              navigator.msSaveBlob(blob, filename);
          } else {
              const a = document.createElement('a');
              const body = document.querySelector('body');
              a.href = window.URL.createObjectURL(blob);
              a.download = filename;
              // fix Firefox
              a.style.display = 'none';
              body.appendChild(a);          
              a.click();
              body.removeChild(a);
              window.URL.revokeObjectURL(a.href);
              this.sleep(500)
          }
      },

      /**
       * 下载
       * @param  {String} url 目标文件地址
       * @param  {String} filename 想要保存的文件名称
      */
      download(url, filename) {
          this.getBlob(url).then(blob => {
              this.saveAs(blob, filename);
          });
      }

```