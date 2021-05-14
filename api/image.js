import axios from 'axios';
export function handleImage(url, image) {
  axios.put(url,
      image,
  ).then(() => {
    console.log('done');
  }).catch((err) => {
    console.log('err', err);
  });
}
