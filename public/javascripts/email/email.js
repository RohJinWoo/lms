var send_email = function(send){
    u.axios('/email/emailpost', { email : u.qu('#email').value, req : send});
}