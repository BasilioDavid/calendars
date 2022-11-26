import { unregisteredUserGuard } from '../common/unregistered-user.guard';
import { ENVIRONMENT } from '../common/const';
import { sendForm, preventDefault } from '../common/utils';
import { token } from '../common/token.service';

const UPLOAD_IMAGES_URL = `${ENVIRONMENT.API_URL}/images`;
const GET_IMAGES_URL = `${ENVIRONMENT.API_URL}/images/all`;
unregisteredUserGuard();

const userToken = token.get();
const parameters = new URLSearchParams(window.location.search);
const calendarId = parameters.get('calendarId');

if (typeof calendarId === 'undefined') {
  window.location.replace('/hub');
}

document.getElementById('generateCalendar').href =
  '/visualize-calendar?calendarId=' + calendarId;

const partsName = [
  'cover',
  'january',
  'febrary',
  'march',
  'april',
  'may',
  'june',
  'july',
  'august',
  'september',
  'november',
  'december',
];

// [part: string]: {normal: "", thumbnail: ""}
const partsCached = {};
async function loadFromServer() {
  let serverImages;
  try {
    const params = new URLSearchParams();
    params.set('calendarId', calendarId);
    const response = await sendForm({
      url: GET_IMAGES_URL + '?' + params.toString(),
      method: 'GET',
      headers: {
        authorization: userToken,
      },
    });
    serverImages = response;
  } catch (e) {
    console.error(e);
    throw e;
  }
  for (const [partNumber, images] of Object.entries(serverImages)) {
    partsCached[partsName[partNumber]] = images;
  }
  console.log(partsCached);
}

class DragNDropOrchestator {
  constructor(imagePreviewer, imageUploader, defaultPart) {
    this.part = defaultPart;
    this.imagePreviewer = imagePreviewer;
    this.imageUploader = imageUploader;
  }

  addAsidePart(asidePartPreviewer) {
    this.asidePartPreviewer = asidePartPreviewer;
    this.imagePreviewer.previewImage(partsCached[this.part].normal);
  }

  async onUpload(files) {
    for (const file of files) {
      const processedFile =
        file instanceof File
          ? await ImagePreviewer.getBase64FromBlob(file)
          : file;

      this.imagePreviewer.previewImage(processedFile);
      this.asidePartPreviewer.addImage(this.part, processedFile);
      const success = await this.imageUploader.uploadImage(file, this.part);
      if (!success) {
        console.error('Something went wrong');
        // this.imagePreviewer.errorOnUpload();
      }
    }
  }

  switchPart(partName) {
    this.part = partName;
    this.imagePreviewer.previewImage(partsCached[partName].normal);
  }
}

class AsideImagePreviewer {
  constructor(partsWithImgPreviewers) {
    this.partsWithImgPreviewers = partsWithImgPreviewers;
  }

  addImage(part, image) {
    this.partsWithImgPreviewers[part].previewImage(image);
  }
}

class DropRegion {
  static createFakeInput() {
    const fakeInput = document.createElement('input');
    fakeInput.type = 'file';
    fakeInput.accept = 'image/png, image/jpeg, image/bmp, image/webp';
    fakeInput.multiple = true;
    return fakeInput;
  }

  constructor(element, onUpload) {
    element.addEventListener('dragenter', preventDefault, false);
    element.addEventListener('dragleave', preventDefault, false);
    element.addEventListener('dragover', preventDefault, false);
    element.addEventListener('drop', preventDefault, false);

    const fakeInput = DropRegion.createFakeInput();

    element.addEventListener('click', () => fakeInput.click());

    fakeInput.addEventListener('change', () => {
      const files = fakeInput.files;
      onUpload(files);
    });
  }
}

class ImagePreviewer {
  static getBase64FromBlob(image) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        resolve(e.target.result);
      };
      reader.onerror = (e) => {
        reject(e);
      };

      reader.readAsDataURL(image);
    });
  }
  constructor(element) {
    this.element = element;
  }

  previewImage(image) {
    this.element.src = image;
  }
}

class ImageUploader {
  static validateImage(image) {
    const validTypes = ['image/png', 'image/jpeg', 'image/bmp', 'image/webp'];
    if (validTypes.indexOf(image.type) === -1) {
      return false;
    }

    const maxSizeInBytes = 10e6; // 10MB
    if (image.size > maxSizeInBytes) {
      return false;
    }

    return true;
  }

  async uploadImage(image, part) {
    if (!ImageUploader.validateImage(image)) {
      return false;
    }

    try {
      const formData = new FormData();
      formData.append('image', image);
      formData.append('calendarId', calendarId);
      formData.append('partNumber', partsName.indexOf(part));

      await sendForm({
        url: UPLOAD_IMAGES_URL,
        method: 'POST',
        body: formData,
        headers: {
          authorization: userToken,
        },
      });
    } catch (e) {
      console.error(e);
      throw e;
    }
    return true;
  }
}

const $dropzone = document.getElementById('dropzone');
const $img = $dropzone.querySelector('img');

const imageUploader = new ImageUploader();
const imagePreviewer = new ImagePreviewer($img);
const dragNDrop = new DragNDropOrchestator(
  imagePreviewer,
  imageUploader,
  partsName[0] // cover
);
new DropRegion($dropzone, dragNDrop.onUpload.bind(dragNDrop));

function onClickBehaviour(partName, drop) {
  return (e) => {
    preventDefault(e);
    drop.switchPart(partName);
  };
}

function main() {
  const $parts = document.getElementById('parts');
  const asidesImagesPreviews = {};
  for (const part of partsName) {
    const li = document.createElement('li');
    li.addEventListener('click', onClickBehaviour(part, dragNDrop));
    const img = document.createElement('img');
    const imagePreviewer = new ImagePreviewer(img);
    if (!partsCached[part]) {
      partsCached[part] = { thumbnail: '', normal: '' };
    }
    imagePreviewer.previewImage(partsCached[part].thumbnail);
    asidesImagesPreviews[part] = imagePreviewer;
    li.appendChild(img);
    $parts.appendChild(li);
  }

  dragNDrop.addAsidePart(new AsideImagePreviewer(asidesImagesPreviews));
}

(async function init() {
  await loadFromServer();
  main();
})();
