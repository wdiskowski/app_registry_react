const headers = { "Content-Type": "application/json" };

const interfaceInfoData =
    [
        {
            name: "AdamSoapFacadeBean", url: "http://wp7005.ad49.dir:8080/AdamSoapFacadeBean/AdamSoapFacadeBean?wsdl",
            description: "Zugriff auf Document Management System"
        },
        {
            name: "AdamMonitoringWebService", url: "http://wp7005.ad49.dir:8080/AdamMonitoringWebService/AdamMonitoringWebService?wsdl",
            description: "SOAP Schnittstelle f\u00fcr die Application Availability Monitoring"
        }
    ];

const interfaceInfoMultiData =

    [
        {
            name: "ADAM",
            interfaceInfoData: [
                {
                    name: "AdamSoapFacadeBean", url: "http://wp7005.ad49.dir:8080/AdamSoapFacadeBean/AdamSoapFacadeBean?wsdl",
                    description: "Zugriff auf Document Management System"
                },
                {
                    name: "AdamMonitoringWebService", url: "http://wp7005.ad49.dir:8080/AdamMonitoringWebService/AdamMonitoringWebService?wsdl",
                    description: "SOAP Schnittstelle f\u00fcr die Application Availability Monitoring"
                }
            ]
        },
        {
            name: "MEV",
            interfaceInfoData: [
                {
                    name: "MevServiceBean", url: "http://wp7005.ad49.dir:8080/MevServiceBean/MevServiceBean?wsdl",
                    description: "Zugriff auf MEV System"
                }
            ]
        }
    ];



export function findInterfaceInfoData(url, onSuccess) {
    if (process.env.NODE_ENV !== "production") {
        findInterfaceInfoDataMock(url, onSuccess);
    } else {
        fetch(url, {
            headers,
            credentials: 'include'
        })
            .then(resp => resp.json())
            .then(json => onSuccess(json));
    }
}


function findInterfaceInfoDataMock(url, onSuccess) {
    return new Promise(
        function (resolve, reject) {
            window.setTimeout(
                function () {
                    resolve(url.indexOf("ex092vm") > -1 ? interfaceInfoData : interfaceInfoMultiData)
                }, Math.random() * 2000 + 1000);
        }).then(data => onSuccess(data));
}

