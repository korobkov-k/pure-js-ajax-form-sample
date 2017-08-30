GITHUB_FOLDER_LINK = "https://gitcdn.link/repo/korobkov-k/yandex-njs-school-test/master/json";
MyForm = {
    validate: function () {
        var formData = this.getData();
        var errorFields = [];

        //Check name
        if (formData.fio.split(" ").length !== 3) {
            errorFields.push("fio")
        }

        //Check email
        if (!(formData.email.indexOf("@") > -1 &&
              formData.email.split("@")[0].length > 0 &&
              ["ya.ru", "yandex.ru", "yandex.ua", "yandex.by", "yandex.kz", "yandex.com"].indexOf(formData.email.split("@")[1]) > -1)) {
            errorFields.push("email")
        }

        //Check phone
        var maxSum = 30;
        var phonematches = formData.phone.match(/\+7\([0-9]{3}\)[0-9]{3}-[0-9]{2}-[0-9]{2}/g);
        if (phonematches != null && phonematches[0] == formData.phone) {
            var numbers = formData.phone.match(/[0-9]/g);
            var sum = numbers.reduce(function(a, b) {
                return parseInt(a) + parseInt(b);
            });
            if (sum > maxSum) {
                errorFields.push("phone")
            }
        } else {
            errorFields.push("phone")
        }

        return {
            isValid: errorFields.length === 0,
            errorFields: errorFields
        }
    },
    getData: function () {
        var form = document.getElementById('myForm');
        return {
            fio: form.fio.value,
            email: form.email.value,
            phone: form.phone.value
        }
    },
    setData: function (data) {
        var form = document.getElementById('myForm');
        if (data.fio != null) form.fio.value = data.fio;
        if (data.email != null) form.email.value = data.email;
        if (data.phone != null) form.phone.value = data.phone;
    },
    submit: function () {
        var validationResult = MyForm.validate();

        var form = document.forms['myForm'];
        var inputs = form.getElementsByTagName('input');
        for (var i in inputs) {
            inputs[i].className = "";
        }

        if (validationResult.isValid) {
            var percent = Math.random();
            var xhr = new XMLHttpRequest();
            var button = document.getElementById('submitButton');
            var resultContainer = document.getElementById('resultContainer');

            if (percent < 0.2) {
                xhr.open('GET', GITHUB_FOLDER_LINK + '/error.json');
            } else if (percent < 0.4) {
                xhr.open('GET', GITHUB_FOLDER_LINK + '/success.json');
            } else {
                xhr.open('GET', GITHUB_FOLDER_LINK + '/progress.json');
            }

            xhr.send();
            resultContainer.innerHTML = "";
            resultContainer.className = "";
            button.value = 'Идет загрузка...';
            button.disabled = true;
            xhr.onreadystatechange = function () {
                if (xhr.readyState !== 4) return;

                var responseObj = JSON.parse(xhr.response);
                if (xhr.status !== 200) {
                    resultContainer.innerHTML = responseObj.status + "<span class='reason'>" + responseObj.reason + "</span>";
                    resultContainer.className = "error";
                    button.value = 'Отправить';
                    button.disabled = false;
                } else {
                    resultContainer.innerHTML = responseObj.status;
                    if (responseObj.status === "progress" && typeof responseObj.timeout === "number") {
                        resultContainer.className = "progress";
                        window.setTimeout(function () {
                            MyForm.submit();
                        }, responseObj.timeout)
                    } else if (responseObj.status === "error") {
                        resultContainer.className = "error";
                        resultContainer.innerHTML = responseObj.status + "<span class='reason'>" + responseObj.reason + "</span>";
                        button.value = 'Отправить';
                        button.disabled = false;
                    } else {
                        resultContainer.className = "success";
                        button.value = 'Отправить';
                        button.disabled = false;
                    }
                }
            }
        } else {
            validationResult.errorFields.forEach(function (name) {
                form[name].className = "error";
            })
        }

        return false;
    }
};