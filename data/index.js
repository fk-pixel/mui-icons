// const fs = require('fs').promises;
const fs = require('fs');
const path = require('path');

const directoryPath = './icon/';
const dirname = path.resolve(directoryPath);

console.log(fs.readdirSync('./icon/action/123/materialicons').values((x) => x));

// async function readDir(dirname) {
//   const allResults = [];

//   try {
//     const files = await fs.readdir(dirname);

//     for (const fileName of files) {
//       try {
//         const content = await fs.readFile(`${dirname}/${fileName}`, {
//           encoding: 'utf-8',
//         });

//         if (content.includes('content string')) {
//           allResults.push(fileName);
//         }
//       } catch (error) {
//         console.log(error.message);
//       }
//     }

//     return allResults;
//   } catch (error) {
//     console.log(error);
//   }
// }

// readDir(dirname).then((data) => {
//   console.log(data);
// });

// const fs = require('fs');

// fs.readdirSync(directoryPath).flatMap((cat) => {
//   return cat;
//   if (cat.length > 0) {
//     return cat;
//   }
// });

// fs.readdirSync(directoryPath, (err, data) => {
//   if (err) {
//     console.log(err);
//   }

//   data.forEach((x) =>
//     console.log(
//       'icon: ',
//       x.forEach((y) => y),
//     ),
//   );
// });

// function readFiles(dirname) {
//   fs.readdir(dirname, async function (err, filenames) {
//     if (err) {
//       return err;
//     }

//     let promiseArr = filenames.map((file) => {
//       return new Promise((resolve) => {
//         processFile(file, resolve);
//       });
//     });

//     Promise.all(promiseArr).then((ret) => console.log(ret));
//   });
// }

// function processFile(file, callback) {
//   const filePath = path.join(__dirname, directoryPath, file);
//   const readStream = fs.createReadStream(filePath);
//   const fileContent = readline.createInterface({
//     input: readStream,
//   });

//   let iconObj = {
//     id: '',
//     name: '',
//     variant: '',
//     category: '',
//     icon: '',
//   };

//   fileContent.on('line', function (line) {
//     if (!iconObj.id && line.includes('id:')) {
//       const id = line.replace('id: ', '').split(' ')[0];
//       iconObj.id = id;
//     } else if (line.includes('Total Earnings')) {
//       const amount = line.replace(/[^0-9.]/g, '');
//       iconObj.TotalEarning = amount;
//     } else if (line.includes('Profession Tax')) {
//       const amount = line.split(' ').pop() || 0;
//       iconObj.ProfessionalTax = amount;
//     } else if (line.includes('Gross Income')) {
//       const amount = line.replace(/[^0-9.]/g, '');
//       iconObj.GrossIncome = amount || 0;
//     } else if (line.includes('finance department immediately')) {
//       iconObj.isDone = true;
//       return callback(iconObj);
//     }
//   });

//   fileContent.on('close', function () {
//     fileContent.close();
//   });
// }

// readFiles(directoryPath);
