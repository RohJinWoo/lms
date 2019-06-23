let img = document.getElementsByTagName('img');
for(let i = 0; i < img.length; i++){
    console.log("에러시 바꿈");
    // img[i].setAttribute('onerror', 'this.src="http://localhost:3000/file_sample/images/no_image.jpg"');
    img[i].onerror = () => {
    console.log(i,'번 에러발생');
    img[i].removeAttribute('style');
    img[i].setAttribute('src', location.origin + '/file_sample/images/no_image.jpg');
  };
}
