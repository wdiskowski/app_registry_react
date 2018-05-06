const headers = { "Content-Type": "application/json" };

const registryDataAll =

    {
        releaseInfo: "/release-info",
        configInfo: "/config-info",
        erDiagramm: "/er-diagramm",
        interfaceInfo: "/interface-info",
        logInfo: "/log-info",
        monitoringInfo: {
            slowest: "/monitoring-info/slowest",
            exceptional: "/monitoring-info/exceptional"
        }
    };

const registryDataPart =
    {
        releaseInfo: "/release-info",
        configInfo: "/config-info",
        erDiagramm: "/er-diagramm",
        interfaceInfo: "/interface-info",
        monitoringInfo: {
            slowest: "/monitoring-info/slowest",
            exceptional: "/monitoring-info/exceptional"
        }
    };

export function findRegistryData(url, onSuccess) {
    if(process.env.NODE_ENV !== "production") {
        findRegistryDataMock(url, onSuccess);
    } else {
        fetch(url, {
            headers,
            credentials: 'include'
        })
        .then(resp => resp.json())
        .then(json => onSuccess(json));
    }    

}

function findRegistryDataMock(url, onSuccess) {
    return new Promise(
        function (resolve, reject) {
            window.setTimeout(
                function () {
                    resolve(url.indexOf("px092vm") > -1 ? registryDataPart : registryDataAll)
                }, Math.random() * 2000 + 1000);
        }).then(data => { onSuccess(data) });
}


