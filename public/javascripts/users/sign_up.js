var sign_up = function(){
    let u_id = u.qu('#u_id');
    let u_name = u.qu('#u_name');
    let password = u.qu('#password');
    let email = u.qu('#email');

    var test = u.validation(u_id.value,'id') &&
        u.validation(u_name.value,'engkor') &&
        u.validation(password.value,'password') &&
        u.validation(email.value,'email');
        
    // 원래 test가 들어가야함
    if(!(u_name.value === "") && !(u_id.value === "") && !(password.value === "") && !(email.value === "")){
        let form = u.qu('#form');
        console.log(form);
        u.form(form, './user/sign_up', 'post');
    } else {
        alert("다 입력");
    }
}