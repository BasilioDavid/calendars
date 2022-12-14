import { unregisteredUserGuard } from '../common/unregistered-user.guard';
import { mobileGuard } from '../common/mobile.guard';
import { ENVIRONMENT } from '../common/const';
import { sendForm, preventDefault } from '../common/utils';
import { token } from '../common/token.service';

mobileGuard();
const UPLOAD_IMAGES_URL = `${ENVIRONMENT.API_URL}/images`;
const GET_IMAGES_URL = `${ENVIRONMENT.API_URL}/images/all`;
const GET_NAME_URL = `${ENVIRONMENT.API_URL}/images/name`;

unregisteredUserGuard();

const userToken = token.get();
const parameters = new URLSearchParams(window.location.search);
const calendarId = parameters.get('calendarId');

if (calendarId === null) {
  window.location.replace('/hub');
}

document.getElementById('generateCalendar').href =
  '/visualize-calendar?calendarId=' + calendarId;

const partsName = [
  'january',
  'february',
  'march',
  'april',
  'may',
  'june',
  'july',
  'august',
  'september',
  'october',
  'november',
  'december',
];

// [part: string]: {normal: "", thumbnail: ""}
const partsCached = {};
async function loadImagesFromServer() {
  const params = new URLSearchParams();
  params.set('calendarId', calendarId);
  const serverImages = await sendForm({
    url: GET_IMAGES_URL + '?' + params.toString(),
    method: 'GET',
    headers: {
      authorization: userToken,
    },
  });

  if (typeof serverImages.errorCode !== 'undefined') {
    errorHandling(serverImages);
  } else {
    for (const [partNumber, images] of Object.entries(serverImages)) {
      partsCached[partsName[partNumber]] = images;
    }
  }
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
      const processedFile = await this.imageUploader.uploadImage(
        file,
        this.part
      );
      if (typeof processedFile.errorCode !== 'undefined') {
        errorHandling(processedFile);
      } else {
        if (typeof processedFile === 'undefined') {
          return;
        }
        this.asidePartPreviewer.addImage(this.part, processedFile.thumbnail);
        this.imagePreviewer.previewImage(processedFile.normal);
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
      return undefined;
    }

    const formData = new FormData();
    formData.append('image', image);
    formData.append('calendarId', calendarId);
    formData.append('partNumber', partsName.indexOf(part));

    const data = await sendForm({
      url: UPLOAD_IMAGES_URL,
      method: 'POST',
      body: formData,
      headers: {
        authorization: userToken,
      },
    });
    if (typeof data.errorCode !== 'undefined') {
      errorHandling(data);
    } else {
      return data;
    }
  }
}

const $dropzone = document.getElementById('dropzone');
const $img = $dropzone.querySelector('img');

const imageUploader = new ImageUploader();
const imagePreviewer = new ImagePreviewer($img);
const dragNDrop = new DragNDropOrchestator(
  imagePreviewer,
  imageUploader,
  partsName[0]
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
      partsCached[part] = {
        normal: '/resources/utils/insert-here.png',
        thumbnail: `/resources/utils/${part}.png`,
      };
    }
    imagePreviewer.previewImage(partsCached[part].thumbnail);
    asidesImagesPreviews[part] = imagePreviewer;
    li.appendChild(img);
    $parts.appendChild(li);
  }

  dragNDrop.addAsidePart(new AsideImagePreviewer(asidesImagesPreviews));
}

async function loadNameFromServer() {
  const $title = document.getElementById('calendarTitle');
  const params = new URLSearchParams();
  params.set('calendarId', calendarId);

  const response = await sendForm({
    url: GET_NAME_URL + '?' + params.toString(),
    method: 'GET',
    headers: {
      authorization: userToken,
    },
  });
  if (typeof token.errorCode !== 'undefined') {
    errorHandling(token);
  } else {
    $title.innerText = response.calendarName;
  }
}
function errorHandling(error) {
  if (error.errorCode === 'FORBIDDEN')
    window.location = ROUTES.login + '?forbidden=true';
  if (error.errorCode === 'CALENDARNOTFOUND')
    window.location = ROUTES.hub + '?calendarnotfound=true';
  generateErrorToast(
    'Un error desconocido ha sucedido, por favor int??ntelo de nuevo'
  );
}
(async function init() {
  loadNameFromServer();
  await loadImagesFromServer();
  main();
})();
