var find_pw = function(){
    let l_name = u.qu('#l_name');
    let l_id = u.qu('#l_id');
    let email = u.qu('#email');

    var test = u.validation(l_name.value, 'engkor') &&
                u.validation(l_id, 'id') &&
                u.validation(email, 'email')
                
    if(test){
        let form = u.qu('#form');
        console.log(form);
    }else{
        alert('다 입력');
    }
}