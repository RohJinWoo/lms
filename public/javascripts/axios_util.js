const au = {
    post: function(req_path, form){
        axios.post(req_path, form)
            .then((response) => {
                u.link(response.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }
}