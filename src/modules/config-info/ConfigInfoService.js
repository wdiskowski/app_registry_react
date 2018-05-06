const headers = { "Content-Type": "application/json" };

const configInfoData =
    [
        { key: "SERVICE_PASSWORD", value: "***af9" },
        { key: "IMS_WSDL", value: "http://ims.ad49.dir/ExterneService/WebService?wsdl" },
        { key: "isDebug", value: "false" },
        { key: "SERVICE_USER", value: "batch-user" }
    ];

const configInfoMultiData =
    [
        {
            name: "MEV",
            configInfoData: [
                { key: "SERVICE_PASSWORD", value: "***me9" },
                { key: "MEV_WSDL", value: "http://mev.ad49.dir/ExterneService/WebService?wsdl" }
            ]
        },
        {
            name: "PDB",
            configInfoData: [
                { key: "SERVICE_PASSWORD", value: "***pd9" },
                { key: "PDB_WSDL", value: "http://pdb.ad49.dir/ExterneService/WebService?wsdl" }
            ]
        }
        
    ];


export function findConfigInfoData(url, onSuccess) {
    if (process.env.NODE_ENV !== "production") {
        findConfigInfoDataMock(url, onSuccess);
    } else {
        fetch(url, {
            headers,
            credentials: 'include'
        })
            .then(resp => resp.json())
            .then(json => onSuccess(json));
    }
}

function findConfigInfoDataMock(url, onSuccess) {
    new Promise(
        function (resolve, reject) {
            window.setTimeout(
                function () {
                    resolve(url.indexOf("ex092vm") > -1 ? configInfoData : configInfoMultiData)
                }, Math.random() * 2000 + 1000);
        }).then(data => onSuccess(data));
}


