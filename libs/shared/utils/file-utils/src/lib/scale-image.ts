import { toBase64 } from './to-base64';

export async function scaleImage(
  imageFile: File,
  scale: number,
  scaleAxis: 'x' | 'y' | 'min' | 'max'
): Promise<string> {
  const img = document.createElement('img');
  img.src = await toBase64(imageFile);

  const scaleType: 'x' | 'y' =
    scaleAxis === 'min'
      ? minAxis(img.width, img.height)
      : scaleAxis === 'max'
      ? maxAxis(img.width, img.height)
      : scaleAxis;

  return new Promise((resolve) => {
    img.onload = () => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const width =
        scaleType === 'x' ? scale : img.width * (scale / img.height);
      const height =
        scaleType === 'y' ? scale : img.height * (scale / img.width);
      canvas.width = width;
      canvas.height = height;
      if (!ctx) {
        throw new Error();
      }
      ctx.drawImage(img, 0, 0, width, height);
      resolve(canvas.toDataURL(imageFile.type));
    };
  });
}

function minAxis(width: number, height: number): 'x' | 'y' {
  if (width >= height) {
    return 'x';
  }

  return 'y';
}

function maxAxis(width: number, height: number): 'x' | 'y' {
  if (width <= height) {
    return 'x';
  }

  return 'y';
}
