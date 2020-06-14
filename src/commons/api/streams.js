import APIService from '../api.service';

const CourseAPI = {
  query() {
    return APIService.query('list-streams');
  },
  get(id) {
    return APIService.query(`stream/${id}`);
  },
  post(params) {
    return APIService.post('stream', params);
  },
};
export default CourseAPI;
