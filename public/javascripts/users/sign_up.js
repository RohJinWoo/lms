var sign_up = function(){
    let l_id = u.qu('#l_id');
    let l_name = u.qu('#l_name');
    let password = u.qu('#password');
    let email = u.qu('#email');

    var test = u.validation(l_id.value,'id') &&
        u.validation(l_name.value,'engkor') &&
        u.validation(password.value,'password') &&
        u.validation(email.value,'email');
        
    if(test){
        let form = u.qu('#form');
        console.log(form);
        // u.form(form, './', 'post');
    }else{
        alert("다 입력");
    }
}
