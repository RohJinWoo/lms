var send_email = function(send){
    axios.post('/email/emailpost', { email : u.qu('#email').value, req : send})
    .then((response) => {
        console.log('response', response);
    })
    .catch(function(response) {
        console.log('err', response);
    });
}