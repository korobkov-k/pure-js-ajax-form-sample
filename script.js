GITHUB_FOLDER_LINK = "https://raw.githubusercontent.com/korobkov-k/yandex-njs-school-test/master/json";
MyForm = {
    validate: function () {
        var formData = this.getData();
        console.log(formData);
        return {
            isValid: true
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
    setData: function () {
        // body...
    },
    submit: function () {
        var validationResult = MyForm.validate();

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
            button.value = 'Идет загрузка...';
            button.disabled = true;
            xhr.onreadystatechange = function () {
                if (xhr.readyState !== 4) return;

                button.value = 'Отправить';
                button.disabled = false;


                var responseObj = JSON.parse(xhr.response);
                if (xhr.status !== 200) {
                    resultContainer.innerHTML = responseObj.status + "<span class='reason'>" + responseObj.reason + "</span>";
                } else {
                    resultContainer.innerHTML = responseObj.status;
                }
            }
        } else {

        }

        return false;
    }
};