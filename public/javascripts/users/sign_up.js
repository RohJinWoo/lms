var sign_up = function(){
    let u_id = u.qu('#u_id');
    let u_name = u.qu('#u_name');
    let password = u.qu('#password');
    let email = u.qu('#email');

    var test = u.validation(u_id.value,'id') &&
        u.validation(u_name.value,'engkor') &&
        u.validation(password.value,'password') &&
        u.validation(email.value,'email');
        
    // 회원가입 요청시 랜덤한 token 값을 생성.
    var token = "";
    var text = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for(var i = 0; i < 20; i++){
        token += text.charAt(Math.floor(Math.random() * text.length));
    }

    // 원래 test가 들어가야함
    if(test){
    // if(!(u_name.value === "") && !(u_id.value === "") && !(password.value === "") && !(email.value === "")){
        let form = u.qu('#form');
        u.axios('./email/sign_auth', { u_id : u_id.value, u_name : u_name.value, password : password.value, email : email.value, token : token } , "post" );
    } else {
        alert("다 입력");
    }
}

var redundancy_check = function(){
    let u_id = u.qu('#u_id');

    if(!(u_id.value === "")){
        u.axios('./user/redundancy_check', { u_id : u_id.value } , "post" );
    }else{
        alert("ID를 입력바랍니다.");
    }
}