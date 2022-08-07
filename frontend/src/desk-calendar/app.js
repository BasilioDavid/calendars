const options = {
  url: '/changeMe',
  method: 'post',
  paramName: 'photos',
  maxFiles: 13,
  clickable: true,
  acceptedFiles: 'image/png, image/jpeg, image/bmp, image/webp',
}
const dropzone = new Dropzone('.my-dropzone', options)
