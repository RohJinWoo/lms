var login = function(user){
    let form = u.qu('#form');

    switch (user){
    case 'std' :
        u.form(form, "./login/std", 'POST');
        break;
    case 'prof' :
        u.form(form, "./login/prof", 'POST');
        break;
    default :
        alert('올바른 입력 바랍니다.');
        break;
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