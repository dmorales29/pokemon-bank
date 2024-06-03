const { jsPDF } = window.jspdf;

// Default export is a4 paper, portrait, using millimeters for units
const doc = new jsPDF();

function createPDF() {
  doc.text("Hello world!", 10, 10);
  doc.save("a4.pdf");
}

createPDF();
