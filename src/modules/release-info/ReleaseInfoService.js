const headers = { "Content-Type": "application/json" };

const releaseInfoData =
    {
        projekt: "WFS.ADAM",
        buildDate: "2017-12-22T08:36:57Z",
        version: "WFS.ADAM-1.0.0-SNAPSHOT"
    };

const releaseInfoMultiData =
    [
        {
            projekt: "WFS.ADAM",
            buildDate: "2017-12-22T08:36:57Z",
            version: "WFS.ADAM-1.0.0-SNAPSHOT"
        },
        {
            projekt: "WFS.PUB.PUB-gui",
            buildDate: "2018-02-08T08:22:15Z",
            version: "WFS.PUB.PUB-gui-1.0-SNAPSHOT"
        }
            
    
];


export function findReleaseInfoData(url, onSuccess) {
    if (process.env.NODE_ENV !== "production") {
        findReleaseInfoDataMock(url, onSuccess);
    } else {
        fetch(url, {
            headers,
            credentials: 'include'
        })
            .then(resp => resp.json())
            .then(json => onSuccess(json));
    }
}

function findReleaseInfoDataMock(url, onSuccess) {
    new Promise(
        function (resolve, reject) {
            window.setTimeout(
                function () {
                    resolve(url.indexOf("ex092vm") > -1 ? releaseInfoData : releaseInfoMultiData)
                }, Math.random() * 2000 + 1000);
        }).then(data => onSuccess(data));
}



