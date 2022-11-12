var cars = []
var carSearch = { brand: '', model: '',price: '',kilometer: '',fuel: '',gear: '',caseType: '',location: '' }
$(document).ready(function () {
    getCarList()
    searchCar()
    clearForm()
});
function getCarList() {
    $.getJSON("http://localhost:8080/car/getCars", function (data)  {
        console.log(data)
        cars = data
        var car = "";
        $.each(cars, function (key, obj) {
            car +=
                `
            <tr >               
                <td class="table-warning">  ${obj.id}  </td>
                <td class="table-warning">  ${obj.brand} </td>
                <td class="table-warning">  ${obj.model} </td>
                <td class="table-warning">  ${obj.price} </td>
                <td class="table-warning">  ${obj.year} </td>
                <td class="table-warning">  ${obj.kilometer} </td>
                <td class="table-warning">  ${obj.fuel} </td>
                <td class="table-warning">  ${obj.gear} </td>
                <td class="table-warning">  ${obj.caseType} </td>
                <td class="table-warning">  ${obj.location} </td>
                <td class="table-warning">   <input type=\'button\'value=\'Update\' class= \'btn btn-info \' onclick=\'onRowClick("${key}")\'> 
                <input type=\'button\'value=\'Delete\' class= \'btn btn-danger\' id=\'delete   \' onclick=\'onRowDelete("${obj.id}")\'> </td>
            </tr>
        `
        })
        $("#carList").html(car);
    }
    )
}
function onRowClick(index) {
    $("#textId").val(cars[index].id);
    $('#textBrand').val(cars[index].brand);
    $('#textModel').val(cars[index].model);
    $('#textPrice').val(cars[index].price);
    $('#textKilometer').val(cars[index].kilometer);
    $('#textFuel').val(cars[index].fuel);
    $('#textGear').val(cars[index].gear);
    $('#textCasetype').val(cars[index].caseType);
    $('#textLocation').val(cars[index].location);
}
function emptyForm() {
    $("#textId").val("");
    $('#textBrand').val("");
    $('#textModel').val("");
    $('#textPrice').val("");
    $('#textKilometer').val("");
    $('#textFuel').val("");
    $('#textGear').val("");
    $('#textCasetype').val("");
    $('#textLocation').val("");
    
}
function onRowDelete(id) {
    // var car = { id: id };
    // console.log(id);
    $.ajax({
        url: 'http://localhost:8080/car/' + id,
        type: 'DELETE',
        success: function () {
            alert('SUCCESSFULLY DELETED');
            getCarList();
            emptyForm();
        },
        error: function (error) { alert(error); }
    });
}
function saveCar() {
    if ($('#textId').val() === null || $('#textId').val() === "") addCar()
    else updateCar()
}
function addCar() {
    var car = { brand: $('#textBrand').val(), model: $("#textModel").val(), price: $("#textPrice").val(),kilometer:$("#textKilometer").val(),fuel:$("#textFuel").val(),gear:$("#textGear").val(),caseType:$("#textCasetype").val(),location:$("#textLocation").val() }
    $.ajax({
        type: "POST",
        url: "http://localhost:8080/car/rentAcar",
        data: JSON.stringify(car),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            alert("SUCCESSFULLY ADDED")
            getCarList()
            emptyForm()
        },
        error: function (errMsg) {
            console.log(errMsg);
        }
    });
}
function updateCar() {
    var car = { id: $('#textId').val(),brand: $('#textBrand').val(), model: $("#textModel").val(), price: $("#textPrice").val(),kilometer:$("#textKilometer").val(),fuel:$("#textFuel").val(),gear:$("#textGear").val(),caseType:$("#textCasetype").val(),location:$("#textLocation").val() }
    $.ajax({
        type: "PUT",
        url: "http://localhost:8080/car/" + car.id,
        data: JSON.stringify(car),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function () { getCarList() },
        error: function (errMsg) {
            console.log(errMsg);
        }
    });
}
function searchCar() {
    carSearch = { brand: $('#textBrand').val(), model: $("#textModel").val(), price: $("#textPrice").val(),kilometer:$("#textKilometer").val(),fuel:$("#textFuel").val(),gear:$("#textGear").val(),caseType:$("#textCasetype").val(),location:$("#textLocation").val() }
    // getCarList()
}
function clearForm() {
    emptyForm()
}

