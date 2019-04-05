module.exports = {
    // 공지 사항 내용을 DB로부터 가져오는 곳
    notice(req, res){
        console.log('공지사항을 DB로부터 값을 가져와야함')
        return  [ {title : '공지 제목1', date : '2019-02-04'}, {title : '공지 제목2', date : '2019-01-29'} ];
    }
}