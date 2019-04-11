var find_id = function(){
    let l_name = u.qu('#l_name');
    let email = u.qu('#email');

    var test = u.validation(l_name.value, 'engkor') &&
                u.validation(email.value, 'email');
                
    if(test){
        var form = u.qu('#form');
        console.log(form);
        //
    }else{
        alert("다 입력");
    }
}