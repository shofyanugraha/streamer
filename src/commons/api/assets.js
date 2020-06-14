import APIService from '../api.service';

const CourseAPI = {
  query() {
    return APIService.query('list-assets');
  },
  get(id) {
    return APIService.query(`asset/${id}`);
  },
};
export default CourseAPI;
