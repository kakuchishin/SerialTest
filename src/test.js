var page;
var globalData;
var fs = require('fs')
const { execSync } = require('child_process')

module.exports = {
    before(browser) {
        page = browser.page.dsdlv2.ScanPage();
        globalData = browser.globals;
        execSync('date >> /automation/test/free.log; free >> /automation/test/free.log', (err, stdout, stderr) => {
            if (err) {
                console.log(`stderr: ${stderr}`);
                return;
            }
        });
    },

    after(browser) {
        browser.end();
        execSync('date >> /automation/test/free.log; free >> /automation/test/free.log', (err, stdout, stderr) => {
            if (err) {
                console.log(`stderr: ${stderr}`);
                return;
            }
        });
    },

    'test'(browser) {
        page.navigate();
        page.expect.element('@startButton').to.be.present;
        page.click('@startButton');
        page.expect.element('@resultImg').to.be.present;
        for (let index = 0; index < 720; index++) {
            browser.pause(60000)
            // browser.pause(1000);
            page.assert.visible('@resultImg');
            page.assert.attributeContains('@resultImg', 'src', '/img/');
            page.getAttribute('@resultImg', 'src', function (result) {
                let text = 'Iteration:' + index + ', src=' + result.value + '\n';
                fs.appendFile('/automation/test/image_src.log', text, (err, data) => {
                    if (err) {
                        console.log(`stderr: ${stderr}`);
                        return;
                    }
                });
                if (index % 60 == 0) {
                    execSync('date >> /automation/test/free.log; free >> /automation/test/free.log', (err, stdout, stderr) => {
                        if (err) {
                            console.log(`stderr: ${stderr}`);
                            return;
                        }
                    });
                }
            });
        }
    },
}
