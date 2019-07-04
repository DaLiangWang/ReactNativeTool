import React, {Component} from 'react';


const serverHost = ""
let NetUtil = {
    get(url, data, callback, errorCallback) {
        this.http(url,data,"GET",callback,errorCallback);
    },
    getTo(url, data) {
        return this.httpTo(url,data,"GET");
    },





    http(url, data , method , callback, errorCallback) {
        url = serverHost + url;

        //设置请求头
        let headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/x-www-form-urlencoded',
        };
        //设置请求参数
        let fetchOptions = {
            method: method,
            headers: headers,
            body: data
        };

        try {
            fetch(url, fetchOptions)
                .then((response) => {
                    return response.json();
                })
                .then((responseJson) => {
                    callback(responseJson);
                }).catch((err) => {
                    if (typeof(errorCallback) === 'function') {
                        errorCallback(err);
                    }
            });
        } catch (e) {
            errorCallback(e)
        }
    },

    httpTo(url, data, method ) {
        let userPromise = new Promise(function (resolve, reject) {
                let headers = {
                    'Accept': 'application/json',
                    'Content-Type': 'application/x-www-form-urlencoded',
                };

            let fetchOptions = {
                    method: method,
                    headers: headers,
                    body: data,
                };
                return resolve(fetchOptions);
            });

        return new Promise(function (resolve, reject) {
            userPromise.then(function (fetchOptions) {
                try {
                    fetch(url, fetchOptions)
                        .then(function (response) {
                            return response.json();
                        })
                        .then((responseJson) => {
                            resolve(responseJson);
                        }).catch((err) => {
                        reject(err);
                    })
                } catch (e) {
                    reject('服务器异常！--02');
                }
            });

        })
    },


    uploadFile(url, data) {
        let formData = new FormData();

        for (var key in data) {
            formData.append(key, data[key]);
        }

        return new Promise((resolve, reject) => {
            fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
                body: formData,
            })
                .then((response) => response.text())
                .then((responseData) => {
                    resolve(JSON.parse(responseData))
                })
                .catch((error) => {
                    reject(error)
                });
        });

    },
}
export default NetUtil;
