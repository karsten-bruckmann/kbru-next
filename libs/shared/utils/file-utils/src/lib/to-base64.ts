export function toBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);

    fileReader.onload = () => {
      const result = fileReader.result;
      if (!result) {
        reject();
        return;
      }
      resolve(result.toString());
    };

    fileReader.onerror = (error) => {
      reject(error);
    };
  });
}
