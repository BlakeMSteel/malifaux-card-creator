import html2canvas from "html2canvas";
import jsPDF from "jspdf";

const PX_TO_PT = 0.75; // 1 CSS px = 1/96in, 1pt = 1/72in

// Renders each direct child of `container` (one card face) to its own PDF
// page, sized to match that face's on-screen dimensions, at 2x resolution
// for crisper print output.
export async function exportContainerToPdf(
  container: HTMLElement,
  filename: string,
) {
  const faces = Array.from(container.children).filter(
    (el): el is HTMLElement => el instanceof HTMLElement,
  );
  if (faces.length === 0) return;

  let pdf: jsPDF | null = null;

  for (const face of faces) {
    const widthPt = face.offsetWidth * PX_TO_PT;
    const heightPt = face.offsetHeight * PX_TO_PT;
    const canvas = await html2canvas(face, {
      scale: 2,
      backgroundColor: "#ffffff",
    });
    const imgData = canvas.toDataURL("image/png");
    const orientation = widthPt > heightPt ? "landscape" : "portrait";

    if (!pdf) {
      pdf = new jsPDF({
        orientation,
        unit: "pt",
        format: [widthPt, heightPt],
      });
    } else {
      pdf.addPage([widthPt, heightPt], orientation);
    }
    pdf.addImage(imgData, "PNG", 0, 0, widthPt, heightPt);
  }

  pdf!.save(filename);
}
