let anwser_page = function (event) {
    event.returnValue = "현재 진행사항이 저장되지 않습니다. 창을 닫으시겠습니까?";
};

// 현재 창을 닫으려할때 물어보는창
window.addEventListener("beforeunload", anwser_page);

let img_delete = () => {
    axios.post('/notice/img_delete', { upload_image : upload_image } );
};

// 현재 창을 닫을때 서버에 업로드되어있는 이미지 파일 삭제를 요청한다
window.addEventListener('unload', img_delete);

// 공지사항을 작성할때
// u.qu("#notice_edit").addEventListener('click', () => {
//     // 창을 닫거나 페이지 이동시 나타나는 이벤트를 잠시 지우고 진행.
//     window.removeEventListener('click', img_delete);

//     u.axios('/notice/test', { content : u.qu('#content').value }, 'post');
// });

// upload_image 저장없이 페이지 이동시 업로드된 이미지를 업로드 폴더내에서 삭제하기 위함.
// upload_image_cnt는 upload_image 배열 수를 세기위함.
let upload_image = [], upload_image_cnt = 0;
$('#content').summernote({
    callbacks: {
        onImageUpload: function(files) {
            // 이미지를 올릴때 서버와 ajax 통신을 통해 이미지 파일을 업로드하고 파일명을 응답받아 이를 img태그로 만들어서 summernote에 붙여준다.
            let formData = new FormData();
            let contenttype = { headers : { "content-type" : "multipart/form-data" } };
            formData.append('userimage', files[0]);
            console.log("이미지 업로드 onImageUpload : ", files[0]);
            
            axios.post('/notice/img_upload', formData, contenttype)
            .then(response => {
                if(response.data.errMessage){
                    alert(response.data.errMessage);
                }
                if(response.data.imagename){
                    // upload image to server and create imgNode...
                    upload_image[upload_image_cnt++] = response.data.imagename;
                    $('#content').summernote('insertNode', u.node("<img src=\'" + location.origin + "/file_sample/images/" + response.data.imagename + "\'>"));
                }
            });
        }
    }
});