module.exports = {
    // 학생이 현재 수강 신청 가능한 강좌를 DB로부터 가져오는 것
    find(req, res){
        console.log('수강신청이 가능한 강좌를 DB로부터 가져옴');
        console.log('실제로는 현 페이지에서 추가 요청을 위해 과목, 강좌, 교육자의 ID를 각각 가지고 있어야함');
        return [{ subject_name : '과목1', cource_name : '강좌1', professor_name : '교육자명1', start_date : '2019-04-01', end_date : '2020-04-01', other_details : '간단한 강좌 설명정보1'},
        { subject_name : '과목2', cource_name : '강좌2', professor_name : '교육자명2', start_date : '2019-04-01', end_date : '2020-04-01', other_details : '간단한 강좌 설명정보2'}];
    },

    exam_find(req, res){
        console.log();
        return [{ subject_name : '과목1', cource_name : '강좌1', professor_name : '교육자명1', start_date : '2019-04-01', end_date : '2020-04-01'},
        { subject_name : '과목2', cource_name : '강좌2', professor_name : '교육자명2', start_date : '2019-04-01', end_date : '2020-04-01'}];
    },

    rating_class_find(req, res){
        console.log();
        return [{ subject_name : '과목1', cource_name : '강좌1', professor_name : '교육자명1' },
        { subject_name : '과목2', cource_name : '강좌2', professor_name : '교육자명2' }];
    }
}