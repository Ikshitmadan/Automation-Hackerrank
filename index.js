const url = "https://www.hackerrank.com/auth/login";
const { resolve } = require('path');
const puppeteer = require('puppeteer');
const { answer } = require('./codes');
const email = "xamot46817@stvbz.com";
const password = "222525";
let cTab = "";
let browseropenPromise = puppeteer.launch(
    {
        headless: false,
        defaultViewport: null

    }
);

browseropenPromise
    .then(function (browser) {
        console.log("browser is opened");

        let allTabpromises = browser.pages();

        return allTabpromises;


    }).then(function (allTabsArr) {
        cTab = allTabsArr[0];
        console.log("new Tab");
        let loginPagepromise = cTab.goto("https://www.hackerrank.com/auth/login");

        return loginPagepromise;
    }).then(function () {
        console.log("opened website");
        let emalisfilledpromise = cTab.type("#input-1", email);
        return emalisfilledpromise;
    }).then(function () {
        let passwordisfilledpromise = cTab.type("#input-2", password);
        return passwordisfilledpromise;
    })
    .catch(function (err) {
        console.log("rejected");
    }).then(function () {
        let loginpromised = cTab.click(".ui-btn.ui-btn-large.ui-btn-primary.auth-button.ui-btn-styled");
        return loginpromised;
    }).then(function () {
        let algorithmpromise = waitAndclick("div[data-automation=algorithms]")
        return algorithmpromise;


    }).then(function (string) {
        console.log(string);
        console.log("Algorithm page has been opened");

    }).then(function () {
        let allquestion = cTab.waitForSelector('a[class="js-track-click challenge-list-item"]');
        return allquestion;
    }). then(function () {
        function getAllQuesLinks() {
          let allElemArr = document.querySelectorAll(
            'a[data-analytics="ChallengeListChallengeName"]'
          );
          let linksArr = [];
          for (let i = 0; i < allElemArr.length; i++) {
            linksArr.push(allElemArr[i].getAttribute("href"));
          }
          return linksArr;
        }
        let linksArrPromise = cTab.evaluate(getAllQuesLinks);

        return linksArrPromise;
      }).then(function(linkArr) {

        let questionwillbesolved=questionsolver(linkArr[0],0);
        return  questionwillbesolved;
    }).then()

    .catch(function (params) {
        console.log(params);
    })



function waitAndclick(selector) {
    let waitclickpromise = new Promise(function name(resolve, reject) {
        let waitforselector = cTab.waitForSelector(selector);
        waitforselector
            .then(function () {
                let clickselector = cTab.click(selector);

                return clickselector;
            }).then(function () {
                resolve("clicked selector");
            }).catch(function (err) {
                console.log(err);

                reject(err);
            })

    });
    return waitclickpromise;

}

function questionsolver(url,idx) {
    return new Promise(function(resolve,reject) {
        let fulllink=`https://www.hackerrank.com${url}`;
    let gotoquestion=cTab.goto(fulllink);
    gotoquestion.then(function() {
        console.log("question is opened");
       let waitforcheckboxAndclick=waitAndclick(".checkbox-input");
       return waitforcheckboxAndclick;
    }).then(function () {
        let waitFortextbox=cTab.waitForSelector(".custominput");
        return waitFortextbox;
    }).then(function () {
        let Typeanspromise=cTab.type(".custominput",answer[idx]);
        return Typeanspromise;
    }).then(function() {
        let controlkeypresspromise=cTab.keyboard.press("Control");
        return controlkeypresspromise;
    }).then(function() {
        let akeypresspromise=cTab.keyboard.press("a");
        return akeypresspromise;
    }).then(function() {
        let xkeypresspromise=cTab.keyboard.press("x");
        return xkeypresspromise;
    }).then(function(params) {
        let curreditorPromise=cTab.click(".monaco-editor.no-user-select");
        return curreditorPromise;
    }).then(function() {
        let akeypresspromise=cTab.keyboard.press("a");
        return akeypresspromise;
    }).then(function() {
        let vkeypresspromise=cTab.keyboard.press("v");
        return vkeypresspromise;
    }).then(function(params) {
        let submitbutton=cTab.click(".hr-monaco-submit");
        return submitbutton;
    }).then(function(params) {
        let controldown=cTab.keyboard.up("control");
        return controldown;
    }).then(function (params) {
        console.log("submitted");
        resolve();
    })
    .catch(function (err) {

        // console.log(err);
        reject(err);
    })
    })
    

    
}