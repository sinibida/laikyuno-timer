// LATER: Possibly unsafe...
const sampleUrl =
  "https://cdn.freesound.org/previews/787/787350_5674468-lq.mp3";

export async function isAutoplayAllowed(): Promise<boolean> {
  const audio = new Audio(sampleUrl);

  const ret = await audio
    .play()
    .then(() => true)
    .catch(() => {
      return false;
    });

  audio.pause();
  audio.srcObject = null;

  return ret;
}
