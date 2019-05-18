document.addEventListener("DOMContentLoaded", function() {

    var names = ['HTML', 'CSS', 'JavaScript'];

    var nameLengths = names.map(function(name) {
      return name.length;
    });

    console.log("reduce map"+ nameLengths)
/////////////////
    var arr1 = [1, 2, 3, 4, 5]

    // для каждого элемента массива запустить функцию,
    // промежуточный результат передавать первым аргументом далее
    var result = arr1.reduce( (sum, item)=> {
        return sum + item;
    }, 0);

    console.log("reduce example"+ result)
////////////////
    var arr2 = [1, -1, 2, -2, 3];

    function isPositive(number) {
    return number > 0;
    }

    alert( arr2.every(isPositive) ); // false, не все положительные
    alert( arr2.some(isPositive) ); // true, есть хоть одно положительное


alert( result ); // 15

});