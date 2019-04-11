var change_pw = function(){
    let password = u.qu('#password');
    let password_check = u.qu('#password_check');

    var test = (password.value === password_check.value) && u.validation(password.value, 'password');

    if(test){
        var form = u.qu('#form');
        console.log(form);
    }else{
        alert('다시 한번 확인 요망');
    }
}