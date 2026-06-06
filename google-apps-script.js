// =====================================================
//  Baroud Store — Google Apps Script
//  الصق هذا الكود في Extensions > Apps Script
// =====================================================

const SHEET_NAME = 'Sheet1'; // اسم الشيت (غيّره إذا كان مختلفاً)

function doGet(e) {
  try {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_NAME);
    const data  = sheet.getDataRange().getValues();
    const headers = data[0]; // الصف الأول = العناوين

    // تحويل كل صف إلى object
    const products = [];
    for (let i = 1; i < data.length; i++) {
      const row = data[i];
      // تخطي الصفوف الفارغة
      if (!row[0] || !row[1]) continue;

      const product = {};
      headers.forEach((header, index) => {
        let value = row[index];
        // تحويل isNew من TRUE/FALSE إلى boolean
        if (header === 'isNew') value = (value === true || value === 'TRUE' || value === 'true');
        // تحويل price إلى رقم
        if (header === 'price') value = Number(value) || 0;
        // تحويل id إلى رقم
        if (header === 'id') value = Number(value) || i;
        product[header] = value;
      });
      products.push(product);
    }

    // إرسال الرد بصيغة JSON مع السماح بـ CORS
    const output = ContentService
      .createTextOutput(JSON.stringify({ status: 'ok', products: products }))
      .setMimeType(ContentService.MimeType.JSON);

    return output;

  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ status: 'error', message: err.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
