window.html2canvas = html2canvas;
window.jsPDF = window.jspdf.jsPDF;
let doc = new jsPDF({
  orientation: "l",
  unit: "pt",
  format: "a4",
});
var elementHTML = document.querySelector(".bg-white");
console.log(elementHTML);

doc.html(elementHTML, {
  callback: function (doc) {
    doc.setFontSize(14);
    // Save the PDF
    doc.save("sample-document.pdf");
  },
  x: 10,
  y: 10,
  width: 800, //target width in the PDF document
  windowWidth: 1600, //window width in CSS pixels
});
