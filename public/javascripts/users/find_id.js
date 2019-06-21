var find_id = function(){
    let u_name = u.qu('#u_name');
    let email = u.qu('#email');

    var test = u.validation(u_name.value, 'engkor') &&
                u.validation(email.value, 'email');

    // 원래 test가 들어가야함
    if(test){
    // if(!(u_name.value === "") && !(email.value === "")){
        var form = u.qu('#form');
        u.axios('./user/find_id', { u_name : u_name.value, email : email.value }, "post" );
    }else{
        alert("다 입력");
    }
}