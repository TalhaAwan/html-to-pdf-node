const pdfMake = require("pdfmake/build/pdfmake");
const pdfFonts = require("pdfmake/build/vfs_fonts");
pdfMake.vfs = pdfFonts.pdfMake.vfs;
const fs = require("fs");
const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const { window } = new JSDOM("");
const htmlToPdfMake = require("html-to-pdfmake");


const HTML = `
<div>
  <h1>World Companies</h1>
  <p>Following is the data of some notable companies:</p>

  <table>
    <tr>
      <th>Company</th>
      <th>Headquarters</th>
      <th>Country</th>
    </tr>
    <tr>
      <td>Google</td>
      <td>Mountain View, California</td>
      <td>United States</td>
    </tr>
    <tr>
      <td>Facebook</td>
      <td>Menlo Park, California</td>
      <td>United States</td>
    </tr>
    <tr>
      <td>Bosch</td>
      <td>Gerlingen</td>
      <td>Germany</td>
    </tr>
    <tr>
      <td>Honda</td>
      <td>Minato City, Tokyo</td>
      <td>Japan</td>
    </tr>
    <tr>
      <td>Tata</td>
      <td>Mumbai</td>
      <td>India</td>
    </tr>
  </table>
</div>
`;


const html = htmlToPdfMake(HTML, {
  window
});

const docDefinition = {
  content: [html],
  // pageOrientation: "landscape",
  styles: {
    "html-h1": {
      color: "#003366",
      background: "white",
    },
  },
};

const pdfDocGenerator = pdfMake.createPdf(docDefinition);
pdfDocGenerator.getBuffer(function (buffer) {
  fs.writeFileSync("companies.pdf", buffer);
});



