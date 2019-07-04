import React, {Component} from 'react';


const serverHost = ""
let NetUtil = {
    get(url, data, callback, errorCallbak) {



        url = serverHost + url;

        let headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/x-www-form-urlencoded',
        };


        let fetchOptions = {
            method: 'POST',
            headers: headers,
            body: data
        };

        try {
            fetch(url, fetchOptions)
                .then((response) => {
                    let a = response.json();
                    return a;
                })
                .then((responseJson) => {
                    let data = JSON.parse(responseJson);
                    callback(data);
                }).catch((err) => {
                    if (typeof(errorCallbak) === 'function') {
                        errorCallbak(err);
                    }
            });
        } catch (e) {
            errorCallbak(e)
        }
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
