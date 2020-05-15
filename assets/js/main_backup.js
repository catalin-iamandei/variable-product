let select_variation = $('#select_variation');
let diametruWrapper = $('#diametru');
let materialWrapper = $('#material');
let capacitateWrapper = $('#capacitate');

// Reset all values
function resetAllInputs(btn) {
    select_variation.prop('selectedIndex', false);
    $(".box-wrapper").removeClass('checked');
    if(btn) {
        $('input').removeClass('disabled').prop('checked', false).attr('disabled', false);
        $('.form-wrapper').trigger("reset");
    }
}

$(document).ready(function () {
    $.getJSON( "assets/product_variations.json", function( data ) {
        let dataKeys = Object.keys(data);
        let dataValues = Object.values(data);

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
        select_variation.on('change', function (e) {
            $("input").removeClass( "disabled");
            // Find selected option
            let selectedVal = $(this).find("option:selected").val();

            $.each( data[selectedVal], function( key, value ) {
                $(".box-wrapper").addClass('checked');

                $("#" + key + " input:not([value='" + value + "'])").addClass( "disabled").attr('disabled', true);
                $("#" + key + " input[value='" + value + "']").removeClass( "disabled").attr('disabled', false).prop('checked', true);
            });
        });

        // Changes attributes value from inputs
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

        $("input").on('change', function () {
            console.log('results', results);
            results.forEach(function(result) {
                //console.log($("input:not([value='" + result.diametru + "']), input:not([value='" + result.material + "']), input:not([value='" + result.capacitate + "'])"));
                $("input:not([value='" + result.diametru + "']), input:not([value='" + result.material + "']), input:not([value='" + result.capacitate + "'])").addClass( "disabled").attr('disabled', true);
                $( "input[value='" + result.diametru + "'], input[value='" + result.material + "'], input[value='" + result.capacitate + "']" ).removeClass( "disabled").attr('disabled', false);
            });

            // select_variation.prop('selectedIndex', false);
            // $('input').removeClass('disabled').prop('checked', false);
            //
            // setTimeout(function () {
            //     results.forEach(function(result) {
            //         $("input:not([value='" + result.diametru + "']), input:not([value='" + result.material + "']), input:not([value='" + result.capacitate + "'])").addClass( "disabled");
            //         setTimeout(function () {
            //             $( "input[value='" + result.diametru + "'], input[value='" + result.material + "'], input[value='" + result.capacitate + "']" ).removeClass( "disabled");
            //         }, 50)
            //     });
            // });
        });



    });
    // $.when(resetAllInputs()).done(function () {
    //     console.log('when');
    //     results = [];
    // });
});
