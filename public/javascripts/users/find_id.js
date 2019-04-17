var find_id = function(){
    let u_name = u.qu('#u_name');
    let email = u.qu('#email');

    var test = u.validation(u_name.value, 'engkor') &&
                u.validation(email.value, 'email');

    // 원래 test가 들어가야함
    if(!(u_name.value === "") && !(email.value === "")){
        var form = u.qu('#form');
        console.log(form);
        u.form(form, './user/find_id', 'post');
    }else{
        alert("다 입력");
    }
}