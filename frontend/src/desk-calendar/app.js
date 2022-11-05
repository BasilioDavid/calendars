import { ENVIRONMENT } from '../common/const';
import { preventDefault } from '../common/utils';

const API_URL = `${ENVIRONMENT.API_URL}/images`;

const surface = document.getElementById('main');
class DragNDrop {
  constructor(month) {
    const imagePreviewRegion = new ImagePrevieRegion(month);
    const dropRegion = new DropRegion(month, imagePreviewRegion);
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

  constructor(month, imagePreviewRegion) {
    this.dropRegion = document.createElement('div');

    this.dropRegion.classList.add('drop_region');

    month.appendChild(this.dropRegion);

    this.dropRegion.addEventListener('dragenter', preventDefault, false);
    this.dropRegion.addEventListener('dragleave', preventDefault, false);
    this.dropRegion.addEventListener('dragover', preventDefault, false);
    this.dropRegion.addEventListener('drop', preventDefault, false);

    const fakeInput = DropRegion.createFakeInput();

    this.dropRegion.addEventListener('click', () => fakeInput.click());

    fakeInput.addEventListener('change', () => {
      const files = fakeInput.files;
      imagePreviewRegion.handleFiles(files);
    });
  }
}

class ImagePrevieRegion {
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

  constructor(month) {
    this.imagePreviewRegion = document.createElement('div');
    month.appendChild(this.imagePreviewRegion);
  }

  handleFiles(files) {
    for (const file of files) {
      if (ImagePrevieRegion.validateImage(file))
        this.previewAndUploadImage(file);
    }
  }

  previewAndUploadImage(image) {
    this.previewImage(image);
    this.uploadImage(image);
  }

  previewImage(image) {
    // container
    const imgView = document.createElement('div');
    imgView.className = 'image-view';
    this.imagePreviewRegion.appendChild(imgView);

    // previewing image
    const img = document.createElement('img');
    imgView.appendChild(img);

    // progress overlay
    const overlay = document.createElement('div');
    overlay.className = 'overlay';
    imgView.appendChild(overlay);

    const reader = new FileReader();
    reader.onload = function (e) {
      img.src = e.target.result;
    };

    reader.readAsDataURL(image);
  }

  uploadImage() {}
}

const test = [];
for (const month of surface.children) {
  test.push(new DragNDrop(month.querySelector('section')));
}
