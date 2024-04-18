function downloadPDF(challengeNumber) {
  // Create an anchor element
  var link = document.createElement('a');
  
  // Set the href attribute to the path of the PDF file
  link.href = 'challenge-pdfs/CHALLENGE ' + challengeNumber + '.pdf';
  
  // Set the download attribute to specify the filename
  link.download = 'CHALLENGE ' + challengeNumber + '.pdf';
  
  // Programmatically click the link to trigger the download
  document.body.appendChild(link);
  link.click();
  
  // Clean up: remove the link from the DOM
  document.body.removeChild(link);
}
