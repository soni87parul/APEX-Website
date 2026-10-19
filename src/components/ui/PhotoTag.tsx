import { isIllustrative } from '../../content/images';

/** Caption chip on a photo. Illustrative (AI-generated) images are always marked as such. */
export function PhotoTag({ image, children }: { image: string; children: React.ReactNode }) {
  const illustrative = isIllustrative(image);
  return (
    <span className={`photo-tag${illustrative ? ' photo-tag--illustrative' : ''}`}>
      {illustrative && <strong>Illustrative · </strong>}
      {children}
    </span>
  );
}
