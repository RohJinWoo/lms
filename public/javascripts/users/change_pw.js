var change_pw = function(){
    let password = u.qu('#password');
    let password_check = u.qu('#password_check');

    var test = (password.value === password_check.value) && u.validation(password.value, 'password');

    // 원래 test가 들어가야함
    if(test){
    // if(password.value === password_check.value){
        var form = u.qu('#form');
        u.axios('./change_pw', { password : password.value }, "put" );
    }else{
        alert('다시 한번 확인 요망');
    }
}