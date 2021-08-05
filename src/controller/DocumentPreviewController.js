const pdfjslib = require('pdfjs-dist');

pdfjslib.GlobalWorkerOptions.workerSrc = '../../node_modules/pdfjs-dist/build/pdf.worker.js';

export default class DocumentPreviewController
{
    constructor(file)
    {
        this._file = file;
    }

    getPreviewData()
    {
        return new Promise((resolve, reject) => {
            let reader = new FileReader();

            switch(this._file.type)
            {
                case 'image/png':
                case 'image/jpg':
                case 'image/jpeg':
                case 'image/gif':
                    reader.onload = e => {
                        resolve({
                            src: reader.result,
                            info: this._file.name
                        });
                    }

                    reader.onerror = e => {
                        reject(e);
                    };

                    reader.readAsDataURL(this._file);
                break;

                case 'application/pdf':

                    reader.onload = e => {
                        pdfjslib.getDocument(new Uint8Array(reader.result)).promise.then(pdf => {
                            console.log(pdf);
                            resolve();
                        }).catch(err => {
                            reject(err);
                        });
                    }

                    reader.readAsArrayBuffer(this._file);
                break;

                default:
                    reject();
            } 
        });
    }
}