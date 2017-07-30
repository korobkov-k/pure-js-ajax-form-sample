MyForm = {
    validate: function () {
        var formData = this.getData();
        alert(formData);
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

            if (percent < 0.2) {
                xhr.open('GET', 'json/error.json');
            } else if (percent < 0.4) {
                xhr.open('GET', 'json/success.json');
            } else {
                xhr.open('GET', 'json/progress.json');
            }

            xhr.send();
            button.value = 'Идет загрузка...';
            button.disabled = true;
            xhr.onreadystatechange = function () {
                if (xhr.readyState != 4) return;

                button.value = 'Отправить';
                button.disabled = false;

                if (xhr.status != 200) {
                    alert(xhr.status + ': ' + xhr.statusText);
                } else {
                    alert(xhr.responseText);
                }
            }
        } else {

        }

        return false;
    }
};