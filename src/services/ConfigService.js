import React from 'react';
import { sort } from '../utils/PropertySorter';


const configProdUrl = window.location.protocol + '//' + window.location.hostname + (window.location.port ? ':' + window.location.port : '') + "/ApplicationsRegistryWeb/rest/registry";

const headers = { "Content-Type": "application/json" }

const configData = [
    {
        name: 'MEV',
        title: 'MEV WebApp',
        targets: [
            {
                name: 'ex092vm',
                url: 'http://ex092vm.ad49.dir:28082/MEV.WebApp/rest/monitoring'
            },
            {
                name: 'px092vm',
                url: 'http://px092vm.ad49.dir:8080/MEV.WebApp/rest/monitoring'
            }
        ]
    },
    {
        name: 'JobReport',
        title: 'JobReport',
        targets: [
            {
                name: 'ex092vm',
                url: 'http://ex092vm.ad49.dir:8080/JobReport/rest/monitoring'
            },
            {
                name: 'tx092vm',
                url: 'http://tx092vm.ad49.dir:8080/JobReport/rest/monitoring'
            }
        ]
    },
    {
        name: 'JobRegistry',
        title: 'JobRegistry',
        targets: [
        ]
    }

];

export function findConfigData(onSuccess) {
    if (process.env.NODE_ENV !== "production") {
        findConfigDataMock(onSuccess);
    } else {
        fetch(configProdUrl, {
            headers,
            credentials: 'include'
        })
            .then(resp => resp.json())
            .then(json => onSuccess(sort(json, 'name')));
    }
}

function findConfigDataMock(onSuccess) {
    new Promise(
        function (resolve, reject) {
            window.setTimeout(
                function () {
                    resolve(configData)
                }, Math.random() * 2000 + 1000);
        }).then(data => onSuccess(sort(data, 'name')));
}

export function findUrl(appName, targetName, onSuccess) {
    return findConfigData(data => onSuccess(getUrl(appName, targetName, data)));
}

function getUrl(appName, targetName, data) {
    for (let i = 0; i < data.length; i++) {
        if (data[i].name === appName) {
            for (let j = 0; j < data[i].targets.length; j++) {
                if (data[i].targets[j].name === targetName) {
                    return data[i].targets[j].url;
                }
            }
        }
    }
    return null;
}


