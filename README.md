# @meetingmaker/pdfwriter

> Very simple ReactJS PDF Writer library using PDFKit

[![NPM](https://img.shields.io/npm/v/@meetingmaker/pdfwriter.svg)](https://www.npmjs.com/package/@meetingmaker/pdfwriter) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save @meetingmaker/pdfwriter
```

## Usage

```jsx
import React, { Component } from 'react'

import Pdf from '@meetingmaker/pdfwriter'

import { domToImage } from '@meetingmaker/pdfwriter/domUtils'

const html2canvas = require('html2canvas');

const text = '3. <b>Consultation Services</b>: The Recruitment team provides <b>consultation on </b>new and replacement positions - hiring  –  process, salary<b> range, </b> hehehe<br><br>   <b>availability, possible</b> challenges/risks and strategies <br>to close the roles.';

const text2 = 'The man who knows his worth respects his fellow man because he respects himself first. He does not boast; is not self-seeking; nor does he force his personal opinion on others.';

const text3 = '<span style="color: #FF6347;font-weight: bold;">#</span> What website or app has completely changed your life for better or for worse?'


class Example extends Component {
  async onClick() {
    const pdf = new Pdf({ defaultFontSize: 11, defaultColor: '#222222' });
    try {
      pdf.addText(text, { fontSize: 12, color: '#BBBBBB' });
      pdf.addText(' ');
      pdf.addIcon('', { color: '#BBBBBB' });
      pdf.moveUp();
      pdf.addText(text2, null, { indent: 16 });
      pdf.addText(' ');
      pdf.addText(text3);
      pdf.addText(' ');

      const dataUrl = await domToImage(this.chart);
      pdf.addImage(dataUrl);

      // add Page
      pdf.addPage();
    } catch (e) {
      console.log('ERROR', e);
    }
    // const blob = await pdf.output();
    // console.log('blob', blob);
    await pdf.save('test.pdf');
  }
  render () {
    return (
      <div>
        <div ref={el => {this.chart = el || this.chart; }} >
          {...chart}
        </div>
        <button onClick={() => this.onClick()}>Download PDF</button>
      </div>
    )
  }
}
```
## Example
https://meetingmaker.github.io/meetingmaker/pdfwriter/

## License

MIT © [meetingmaker](https://github.com/meetingmaker)
