/**
 * AURIX Clean Image Processor Engine
 * Preserves user's uploaded cutout PNG with 100% pixel fidelity, zero distortion,
 * and zero chalky artifacts.
 */

export const processPhotoToStudioCutout = async (fileOrUrl) => {
  return new Promise((resolve) => {
    if (typeof fileOrUrl === 'string') {
      resolve(fileOrUrl);
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      resolve(e.target.result);
    };
    reader.onerror = () => {
      resolve('/user_cutout.png');
    };
    reader.readAsDataURL(fileOrUrl);
  });
};
