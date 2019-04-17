
var login = function(user){
    let u_id = u.qu('#u_id');
    let password = u.qu('#password');
    if(u_id.value === "" || password.value === ""){
        alert("ID와 비밀번호를 입력바랍니다.");
    }else{
        let form = u.qu('#form');

        switch (user){
        case 'std' :
            au.post('./user/login_std', { u_id : form.u_id.value, password : form.password.value } );
            break;
        case 'prof' :
            au.post('./user/login_prof', { u_id : form.u_id.value, password : form.password.value } );
            break;
        default :
            alert('올바른 입력 바랍니다.');
            break;
        }
    }
};

var sign_up = function(){
    u.link("./sign_up");
};

var find_id = function(){
    u.link("./find_id");
};

var find_pw = function(){
    u.link("./find_pw");
};

var change_pw = function(){
    u.link("./change_pw");
};