// Variables
const select_variation = $('#select_variation');
const diametruWrapper = $('#diametru');
const materialWrapper = $('#material');
const capacitateWrapper = $('#capacitate');

// Reset all values
function resetAllInputs() {
    select_variation.prop('selectedIndex', false);
    $("form input").removeClass('disabled').prop('checked', false).attr('disabled', false);
    $('.form-wrapper').trigger("reset");
}

$(document).ready(function () {
    $.getJSON( "assets/product_variations.json", function( data ) {
        const dataKeys = Object.keys(data);
        const dataValues = Object.values(data);

        // Populate select options with product variations
        $.each( dataKeys, function( key, value ) {
            select_variation.append(
                $("<option />").val(value).text(value)
            );
        });

        // Return unique attributes from object and sort
        let diametruArr = [], materialArr = [], capacitateArr = [];
        $.each( data, function( key, value ) {
            diametruArr.push(value.diametru);
            materialArr.push(value.material);
            capacitateArr.push(value.capacitate);
        });
        diametruArr = [...new Set(diametruArr)].sort();
        materialArr = [...new Set(materialArr)].sort();
        capacitateArr = [...new Set(capacitateArr)].sort();

        // Populate attribute diametru
        $.each( diametruArr, function( key, value ) {
            diametruWrapper.append(
                $(`<input type='radio' name='diametru' id=${value} />`).val(value).text(value),
                $(`<label for="${value}" />`).text(value)
            );
        });

        // Populate attribute material
        $.each( materialArr, function( key, value ) {
            materialWrapper.append(
                $(`<input type='radio' name='material' id=${value} />`).val(value).text(value),
                $(`<label for="${value}" />`).text(value)
            );
        });

        // Populate attribute capacitate
        $.each( capacitateArr, function( key, value ) {
            capacitateWrapper.append(
                $(`<input type='radio' name='capacitate' id='capacitate-${value}' />`).val(value).text(value),
                $(`<label for="capacitate-${value}" />`).text(value)
            );
        });

        // Changes attributes value from select
        select_variation.on('change', function () {
            // Reset inputs when choose an option
            $("form input").removeClass( "disabled");

            // Find selected option
            const selectedVal = $(this).find("option:selected").val();

            $.each( data[selectedVal], function( key, value ) {
                $("#" + key + " input:not([value='" + value + "'])").addClass( "disabled").attr('disabled', true);
                $("#" + key + " input[value='" + value + "']").removeClass( "disabled").attr('disabled', false).prop('checked', true);
            });
        });

        // Map and filter array with selected inputs
        let results = [...dataValues];
        $("#diametru input").on('change', function (e) {
            results = results.filter( field => {
                if(field.diametru === e.target.value) {
                    return field;
                }
            });
            return results;
        });
        $("#material input").on('change', function (e) {
            results = results.filter( field => {
                if(field.material === e.target.value) {
                    return field;
                }
            });
            return results;
        });
        $("#capacitate input").on('change', function (e) {
            results = results.filter( field => {
                if(field.capacitate === e.target.value) {
                    return field;
                }
            });
            return results;
        });

        // Reset array when button reset clicked
        $(".reset-btn").on('click', function () {
            results = [...dataValues];
        });

        $("form input").on('change', function () {
            // When is only one available option from each fieldset, automatic select that option from <select>
            if( results.length === 1 ) {
                $("#select_variation option[value='" + results[0].cod + "']").prop('selected', true);
                $( "input[value='" + results[0].diametru + "'], form input[value='" + results[0].material + "'], input[value='" + results[0].capacitate + "']" ).click();
            }

            // Mark disabled inputs that is not correspondent with selected one.
            results.forEach(function(result) {
                $("form input:not([value='" + result.diametru + "']), form input:not([value='" + result.material + "']), form input:not([value='" + result.capacitate + "'])").addClass( "disabled").attr('disabled', true);
                setTimeout(function () {
                    $( "form input[value='" + result.diametru + "'], form input[value='" + result.material + "'], form input[value='" + result.capacitate + "']" ).removeClass( "disabled").attr('disabled', false);
                });
            });

        });

    });

});
