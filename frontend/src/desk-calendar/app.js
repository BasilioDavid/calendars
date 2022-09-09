import { ENVIRONMENT } from '../common/const';

const options = {
  url: `${ENVIRONMENT.API_URL}/images`,
  method: 'post',
  paramName: 'photos',
  maxFiles: 13,
  clickable: true,
  acceptedFiles: 'image/png, image/jpeg, image/bmp, image/webp',
};
const dropzone = new Dropzone('.my-dropzone', options);
