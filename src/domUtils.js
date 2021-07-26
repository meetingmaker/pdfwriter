/* eslint no-await-in-loop: 0 */
import { isSafari, isIE, isEdge } from 'react-device-detect';
import domtoimage from './domtoimage';

const html2canvas = require('html2canvas');

export function dataURItoBlob(dataURI) {
  // convert base64 to raw binary data held in a string
  // doesn't handle URLEncoded DataURIs - see SO answer #6850276 for code that does this
  const byteString = atob(dataURI.split(',')[1]);

  // separate out the mime component
  const mimeString = dataURI
    .split(',')[0]
    .split(':')[1]
    .split(';')[0];

  // write the bytes of the string to an ArrayBuffer
  const ab = new ArrayBuffer(byteString.length);
  const ia = new Uint8Array(ab);
  for (let i = 0; i < byteString.length; i += 1) {
    ia[i] = byteString.charCodeAt(i);
  }
  return new Blob([ab], { type: mimeString });
}

export function isForeignObjectSupported() {
  return !isSafari && !isEdge && !isIE;
}

export function convertURIToImageData(URI) {
  return new Promise(resolve => {
    if (URI == null) {
      resolve(null);
    }
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    const image = new Image();
    // console.log(URI);
    image.addEventListener(
      'load',
      () => {
        canvas.width = image.width;
        canvas.height = image.height;
        context.drawImage(image, 0, 0, canvas.width, canvas.height);
        // resolve(context.getImageData(0, 0, canvas.width, canvas.height));
        // console.log(context.getImageData(0, 0, canvas.width, canvas.height));
        canvas.toBlob(blob => resolve(blob), 'image/jpg');
      },
      false
    );
    image.src = URI;
  });
}

function getImage(dom, type, options) {
  return new Promise(resolve => {
    if (type === 'png') {
      domtoimage
        .toPng(dom, options)
        .then(rs => resolve(rs))
        .catch(error => {
          console.log('ERROR', error);
          resolve(null);
        });
      return;
    }
    if (type === 'svg') {
      domtoimage
        .toSvg(dom, options)
        .then(rs => resolve(rs))
        .catch(error => {
          console.log('ERROR', error);
          resolve(null);
        });
      return;
    }
    domtoimage
      .toJpeg(dom, options)
      .then(rs => resolve(rs))
      .catch(error => {
        console.log('ERROR', error);
        resolve(null);
      });
  });
}

function getBlob(dom, type, options) {
  return new Promise(resolve => {
    switch (type) {
      case 'jpeg':
      case 'png':
      case 'svg':
        getImage(dom, type, options).then(dataUri => {
          const blob = dataURItoBlob(dataUri);
          resolve(blob);
        });
        break;
      default:
        domtoimage
          .toBlob(dom, options)
          .then(blob => {
            resolve(blob);
          })
          .catch(error => {
            console.log('ERROR', error);
            resolve(null);
          });
        break;
    }
  });
}

async function getBlobSafari(dom, type, options) {
  let result = null;
  for (let i = 0; i <= 10; i += 1) {
    const blob = await getBlob(dom, type, options);
    console.log('domToBlob', i, blob, result);
    if (result !== null && result !== blob) {
      result = blob;
      break;
    }
    result = blob;
  }
  return result;
}

async function getImageSafari(dom, type, options) {
  let result = null;
  for (let i = 0; i <= 10; i += 1) {
    const image = await getImage(dom, type, options);
    console.log('domToBlob', i, image, result);
    if (result !== null && result !== image) {
      result = image;
      break;
    }
    result = image;
  }
  return result;
}

export function domToBlob(
  dom,
  type = 'jpeg',
  options = { quality: 1, bgcolor: '#FFFFFF', cacheBust: true }
) {
  if (isSafari) {
    return getBlobSafari(dom, type, options);
  }
  if (isIE || isEdge) {
    console.log('domToBlob IE or Edge');
    return new Promise(resolve => {
      html2canvas(dom)
        .then(chart => {
          chart.toBlob(blob => {
            resolve(blob);
          }, `image/${type}`);
        })
        .catch(error => {
          console.log('ERROR', error);
          resolve(null);
        });
    });
  }
  return getBlob(dom, type, options);
}

export function domToImage(
  dom,
  type = 'jpeg',
  options = { quality: 1, bgcolor: '#FFFFFF', cacheBust: true }
) {
  if (!dom || dom === undefined) {
    return Promise.resolve(null);
  }
  if (isSafari) {
    return getImageSafari(dom, type, options);
  }
  if (isIE || isEdge) {
    return new Promise(resolve => {
      html2canvas(dom)
        .then(chart => {
          resolve(chart.toDataURL());
        })
        .catch(error => {
          console.log('ERROR', error);
          resolve(null);
        });
    });
  }
  return getImage(dom, type, options).then(dataUri => {
    // console.log('dataUri', dataUri);
    return dataUri;
  });
}

export function pixelToPt(px) {
  return px * 0.75;
}

export function ptToPixel(pt) {
  return pt * 1.3;
}
