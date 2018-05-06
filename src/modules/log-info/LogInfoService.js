const headers = { "Content-Type": "application/json" };

const logInfoData =
    [
        { key: "JPA_LOG", value: "/var/opt/sun/glassfish/gf-inst1/log/mev/jpa.log" },
        { key: "WEB_SERVICE_CLIENT_LOG", value: "/var/opt/sun/glassfish/gf-inst1/log/mev/ws.client.log" },
        { key: "WEB_SERVICE_SERVER_LOG", value: "/var/opt/sun/glassfish/gf-inst1/log/mev/ws.server.log" },
        { key: "DEV_LOG", value: "/var/opt/sun/glassfish/gf-inst1/log/mev/jpa.log" }
    ];


const logInfoMultiData =
    [
        {
            name: "MEV",
            logInfoData: [
                { key: "JPA_LOG", value: "/var/opt/sun/glassfish/gf-inst1/log/mev/jpa.log" },
                { key: "WEB_SERVICE_CLIENT_LOG", value: "/var/opt/sun/glassfish/gf-inst1/log/mev/ws.client.log" },
                { key: "WEB_SERVICE_SERVER_LOG", value: "/var/opt/sun/glassfish/gf-inst1/log/mev/ws.server.log" },
                { key: "DEV_LOG", value: "/var/opt/sun/glassfish/gf-inst1/log/mev/jpa.log" }
            ]
        },
        {
            name: "ADAM",
            logInfoData: [
                { key: "JPA_LOG", value: "/var/opt/sun/glassfish/gf-inst1/log/adam/jpa.log" },
                { key: "DEV_LOG", value: "/var/opt/sun/glassfish/gf-inst1/log/adam/jpa.log" }
            ]
        }        
    ];


export function findLogInfoData(url, onSuccess) {

    if (process.env.NODE_ENV !== "production") {
        findLogInfoDataMock(url, onSuccess);
    } else {
        fetch(url, {
            headers,
            credentials: 'include'
        })
            .then(resp => resp.json())
            .then(json => onSuccess(json));
    }
}

function findLogInfoDataMock(url, onSuccess) {
    new Promise(
        function (resolve, reject) {
            window.setTimeout(
                function () {
                    resolve(url.indexOf("ex092vm") > -1 ? logInfoData : logInfoMultiData)
                }, Math.random() * 2000 + 1000);
        }).then(data => onSuccess(data));
}


