var customer = []
// ,carModel: '' aşağıdan alındı
var customerSearch = { name: '', surname: '', identificationNumber: '', age: '', gender: '', carBrand: '' }
$(document).ready(function () {
    // getCustomerList()
    getCarPull()
    searchCustomer()
    clearForm()
});
function getCustomerList() {
    $.getJSON("http://localhost:8080/rent/getRents" ,function (data) {
        console.log(data)
        customers = data
        var customer = "";
        // <td class="table-warning">  ${obj.car.model} </td> aşağıdan alındı
        $.each(customers, function (key, obj) {
            customer +=
                `
            <tr >               
                <td class="table-warning">  ${obj.id}  </td>
                <td class="table-warning">  ${obj.name} </td>
                <td class="table-warning">  ${obj.surname} </td>
                <td class="table-warning">  ${obj.identificationNumber} </td>
                <td class="table-warning">  ${obj.age} </td>
                <td class="table-warning">  ${obj.gender} </td>
                <td class="table-warning">  ${obj.car.brand} </td>

                <td class="table-warning">   <input type=\'button\'value=\'Update\'id=\'update\'class= \'btn btn-info \' onclick=\'onRowClick("${key}")\'> 
                <input type=\'button\'value=\'Delete\'class= \'btn btn-danger\' id=\'delete   \' onclick=\'onRowDelete("${obj.id}")\'> </td>
            </tr>
        `
        })
        $("#customerList").html(customer);
    }
    );
}
function getCarPull() {
    $.getJSON("http://localhost:8080/car/getCars").done(function (data) {
        customers = data
        var car = `<option >SEÇİNİZ</option>`;
        $.each(customers, function (key, obj) {
            car +=
                `<option value=\"${obj.id}\">${obj.brand}</option> `
            $("#selectId").html(car);
        });
    })
}
function onRowClick(index) {
    $("#textId").val(customers[index].id);
    $('#textName').val(customers[index].name);
    $('#textSurname').val(customers[index].surname);
    $('#textIdentificationNumber').val(customers[index].identificationNumber);
    $('#textAge').val(customers[index].age);
    $('#checkActive').prop('checked', customers[index].gender);
    $('#selectId').val(customers[index].car.id);
}
function emptyForm() {
    $("#textId").val("");
    $('#textName').val("");
    $('#textSurname').val("");
    $('#textIdentificationNumber').val("");
    $('#textAge').val("");
    $('#checkActive').prop('checked', false);
    $('#selectId').val("SEÇİNİZ");
}
function onRowDelete(id) {
    // var customer = { id: id };
    // console.log(id);
    $.ajax({
        url: 'http://localhost:8080/rent/' + id ,
        type: 'DELETE',
        success: function () {
            alert('SUCCESSFULLY DELETED');
            getCustomerList();
            emptyForm();
        },
        error: function (error) { alert(error); }
    });
}
function saveCustomer() {
    if ($('#textId').val() === null || $('#textId').val() === "") addCustomer()
    else updateCustomer()
}
function addCustomer() {

    var customer = { name: $('#textName').val(), surname: $("#textSurname").val(), identificationNumber: $("#textIdentificationNumber").val(), age: $("#textAge").val(), active: $("#checkActive").is(':checked'), car: { id: $("#selectId").val() } }
    $.ajax({
        type: "POST",
        url: "http://localhost:8080/rent/addRents",
        data: JSON.stringify(customer),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            alert("SUCCESSFULLY ADDED")
            // console.log(data), $("#selectId").val(data.car.id), 
            getCustomerList()
            emptyForm()
        },
        error: function (errMsg) {
            console.log(errMsg);
        }
    });
    


}
function updateCustomer() {
    var customer = {
        id: $('#textId').val(), name: $('#textName').val(), surname: $("#textSurname").val(), identificationNumber: $("#textIdentificationNumber").val(), age: $("#textAge").val(), active: $("#checkActive").is(':checked'), car: { id: $("#selectId").val() }
    }
    $.ajax({
        type: "PUT",
        url: "http://localhost:8080/rent/" + customer.id,
        data: JSON.stringify(customer),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function () { getCustomerList() },
        error: function (errMsg) {
            console.log(errMsg);
        }
    });
    emptyForm()
}
function searchCustomer() {
    studentSearch = { name: $("#searchName").val(), surname: $("#searchSurname").val(), identificationNumber: $("#searchIdentificationNumber").val(), age: $("#searchAge").val(), gender: $("#searchGender").val(), carBrand: $("#searchCarBrand").val() }
    getCustomerList()
}
function clearForm() {
    emptyForm()
}