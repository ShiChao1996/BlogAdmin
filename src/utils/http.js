
'use strict';

const TIMEOUT = 5 * 1000;

function promiseTimeout(ms, promise) {
    return new Promise((resolve, reject) => {
        const timeoutId = setTimeout(() => {
            console.error('errorrrrr');
            reject(new Error('request timeout!'))
        }, ms);
        promise.then((res) => {
                clearTimeout(timeoutId);
                resolve(res);
            }, (err) => {
                clearTimeout(timeoutId);
                reject(err);
            }
        );
    });
}

function requestByGet(url, token, onSucceed, onFailure) {
    console.log("Get " + url + " started.");
    let header;
    if(token){
        header = {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        }
    }else{
        header = {
            "Content-Type": "application/json",
        }
    }

    promiseTimeout(TIMEOUT, fetch(url, { // eslint-disable-line no-undef
        method: "GET",
        headers: header,
        mode: "cors",
        // credentials: "include"
    })).then((resp) => resp.json())
        .then((json) => {
            //console.log("Get Succeed for " + url + ", response:" + JSON.stringify(json));
            onSucceed(json);
        })
        .catch((err) => {
            //console.error("[HTTP Exception] Get failed for " + url + ", error:" + err);
            if (onFailure) {
                onFailure(err);
            }
        })
}

function requestByPost(url, token, params, onSucceed, onFailure) {
    let header;
    if(token){
        header = {
            "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
        }
    }else{
        header = {
            "Content-Type": "application/json",
        }
    }
    promiseTimeout(TIMEOUT, fetch(url, {
        method: "POST",
        headers: header,
        mode: "cors",
        // credentials: "include",
        body: JSON.stringify(params)
    })).then((resp) => resp.json())
        .then((json) => {
            console.log("Post succeed for " + url); // + ", params:" + JSON.stringify(params) + ", response:" + JSON.stringify(json));
            onSucceed(json);
        })
        .catch((err) => {
            console.error("[HTTP Exception] Post failed for " + url + ", error:" + err);

            if (onFailure) {
                onFailure(err);
            }
        });
}

function getUrl(path) {
  return 'http://127.0.0.1:7001/' + path;
}

export const Http = {
    get: requestByGet,
    post: requestByPost,
    url: getUrl
};
