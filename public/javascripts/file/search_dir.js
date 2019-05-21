var list = document.getElementById('list');
var backbutton = document.createElement('button');
backbutton.setAttribute('onclick', "back()");
backbutton.appendChild(document.createTextNode("뒤로가기"));
var backp = document.createElement('p').appendChild(backbutton);
var dir_path = '';

function filelist(){
    list.childNodes[0] === undefined ? null : list.removeChild(list.childNodes[0]);

    console.log('./list' + (dir_path !== '' ? '?dir=' + dir_path : ''));

    axios.post('./list' + (dir_path !== '' ? '?dir=' + dir_path : ''), {})
    .then(response => {
        response.data.link !== undefined ? location.href = response.data.link : null;
        console.log(response.data.list);
        var div = document.createElement('div');
        for(var data in response.data.list){
            var p = document.createElement('p');
            var button = document.createElement('button');
            button.setAttribute('onclick', "search_dir('" + response.data.list[data] + "')");
            button.appendChild(document.createTextNode(response.data.list[data]));
            p.appendChild(button);
            div.appendChild(p);
        }
        if(dir_path !== ''){
            div.appendChild(backbutton);
        }
        list.appendChild(div);
        console.log('location.href : ', location);
    });
}
filelist();

var search_dir = (dir) => {
    dir_path = dir_path + "\/" + dir;
    filelist();
}

var back = function(){
    console.log(dir_path);
    var back_path = '';
    var path_split = dir_path.split('/');
    for(var cnt = 1; cnt < path_split.length - 1; cnt++){
        back_path = back_path + "\/" + path_split[cnt];
        console.log("for : ", path_split[cnt]);
    }
    dir_path = back_path;
    console.log("dir_path :: ", dir_path, "    : path_split    : ", path_split);
    filelist();
}