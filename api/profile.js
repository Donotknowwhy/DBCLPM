import request from '../utils/request';
import {getCurrentUser} from '../utils/use-user';


export function getProfile() {
  return getCurrentUser().then((values) =>
    // console.log(values);
    request({
      url: `/profile-composite-service/api/profiles?id=${values.uid}`,
      method: 'get',
    }),
  );
}

// export function updateEmail(data) {
//   return request({
//     url: '/profile-composite-service/api//profiles/7dXdwgbcDhddnAoZcDkpGT/emails/3YHYxmq5sBFNTulOrkJiSI',
//     method: 'put',
//     data,
//   });
// }

export function updateProfile(data) {
  return getCurrentUser().then((values) => {
    request({
      url: `/profile-composite-service/api/profiles?id=${values.uid}`,
      method: 'put',
      data,
    });
  });
}
