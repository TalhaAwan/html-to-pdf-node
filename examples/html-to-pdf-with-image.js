const pdfMake = require("pdfmake/build/pdfmake");
const pdfFonts = require("pdfmake/build/vfs_fonts");
pdfMake.vfs = pdfFonts.pdfMake.vfs;
const fs = require("fs");
const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const { window } = new JSDOM("");
const htmlToPdfMake = require("html-to-pdfmake");
const axios = require("axios");


// https://bobbyhadz.com/blog/convert-image-to-base64-using-node#convert-an-image-url-to-base64-in-nodejs-using-axios
async function imageUrlToBase64(url) {
  try {
    const response = await axios.get(url, {
      responseType: "arraybuffer",
    });

    const contentType = response.headers["content-type"];

    const base64String = `data:${contentType};base64,${Buffer.from(
      response.data
    ).toString("base64")}`;

    return base64String;
  } catch (err) {
    console.log(err);
  }
}

const imageUrl = "https://loremflickr.com/400/400";

let HTML = `
<div>
  <h1>This below image is downloaded from <a href="https://loremflickr.com" target="_blank">LoremFlickr</a> on Node js with axios and converted to PDF!</h1>   
  <img src="${imageUrl}" alt="LoremFlickr Random Image" width="400" height="400">
</div>            
`;


async function start() {
  HTML = HTML.replace(
    imageUrl,
    await imageUrlToBase64(imageUrl)
  );

  const html = htmlToPdfMake(HTML, {
    window
  });

  const docDefinition = {
    content: [html],
    // pageOrientation: "landscape",
  };

  const pdfDocGenerator = pdfMake.createPdf(docDefinition);
  pdfDocGenerator.getBuffer(function (buffer) {
    fs.writeFileSync("example-image.pdf", buffer);
  });
}

start();
