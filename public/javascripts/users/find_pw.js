var find_pw = function(){
    let u_name = u.qu('#u_name');
    let u_id = u.qu('#u_id');
    let email = u.qu('#email');

    var test = u.validation(u_name.value, 'engkor') &&
                u.validation(u_id, 'id') &&
                u.validation(email, 'email');
               
    // 원래 test가 들어가야함
    if(test){
    // if(!(u_name.value === "") && !(u_id.value === "") && !(email.value === "")){
        u.axios('./user/find_pw', { u_name : u_name.value, u_id : u_id.value, email : email.value } , "post" );
    }else{
        alert('다 입력');
    }
}