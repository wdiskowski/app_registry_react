const headers = { "Content-Type": "application/json" };

const slowestData =
    [
        {
            methodName: "public void de.deltalloyd.mev.fran.orchestration.suche.FranPartnerDialogSucheService.aktualisierePartnerModelDaten(de.deltalloyd.mev.fran.model.FranPartnerViewModel) throws de.deltalloyd.mev.exception.MevApplicationException", 
            recentDuration: 230, 
            averageDuration: 740, 
            maxDuration: 1411, 
            numberOfExceptions: 1, 
            numberOfInvocations: 3, 
            exception: "de.deltalloyd.mev.exception.MevPartnerNichtGefundenException: Partnerdaten für PID: 3811773 nicht gefunden.",
            lastInvocationTimestamp: 1515073556381
        },
        {
            methodName: "public java.util.List<de.deltalloyd.mev.model.DialogMitPartnerDto<T>> de.deltalloyd.mev.service.AbstractVertragsDialogService.findTasksByMandantSignalBinaryAndJahresRange(java.lang.Integer,org.apache.commons.lang3.Range<java.lang.Integer>,java.lang.Integer)", 
            recentDuration: 291, 
            averageDuration: 332, 
            maxDuration: 942, 
            numberOfExceptions: 0, 
            numberOfInvocations: 5, 
            lastInvocationTimestamp: 1515081488909
        }
    ];

const exceptionalData =
    [
        {
            methodName: "public void de.deltalloyd.mev.fran.orchestration.suche.FranPartnerDialogSucheService.aktualisierePartnerModelDaten(de.deltalloyd.mev.fran.model.FranPartnerViewModel) throws de.deltalloyd.mev.exception.MevApplicationException", 
            recentDuration: 230, 
            averageDuration: 740, 
            maxDuration: 1411, 
            numberOfExceptions: 1, 
            numberOfInvocations: 3, 
            exception: "de.deltalloyd.mev.exception.MevPartnerNichtGefundenException: Partnerdaten für PID: 3811773 nicht gefunden.",
            lastInvocationTimestamp: 1515073556381
        }
    ];

export function findSlowestMethods(url, onSuccess) {
    if(process.env.NODE_ENV !== "production") {
        findSlowestMethodsMock(url, onSuccess);
    } else {
        fetch(url, {
            headers,
            credentials: 'include'
        })
        .then(resp => resp.json())
        .then(json => onSuccess(json));
    }
}

export function findExceptionalMethods(url, onSuccess) {
    if(process.env.NODE_ENV !== "production") {
        findExceptionalMethodsMock(url, onSuccess);
    } else {
        fetch(url, {
            headers,
            credentials: 'include'
        })
        .then(resp => resp.json())
        .then(json => onSuccess(json));
    }
}

function findSlowestMethodsMock(url, onSuccess) {
    new Promise(
        function (resolve, reject) {
            window.setTimeout(
                function () {
                    resolve(slowestData)
                }, Math.random() * 2000 + 1000);
        }).then(data => onSuccess(data));
}

function findExceptionalMethodsMock(url, onSuccess) {
    new Promise(
        function (resolve, reject) {
            window.setTimeout(
                function () {
                    resolve(exceptionalData)
                }, Math.random() * 2000 + 1000);
        }).then(data => onSuccess(data));
}


