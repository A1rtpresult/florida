$(document).ready(function() {

    $(document).on('click', '.predict-click', function(e) {
        $(".loader").removeClass('d-none')
        let id = $(this).data('id');
        $.ajax({
            method: 'POST',
            url: "home/getPrediksi",
            data: {
                id: id
            },
            success: function(prediksi) {
                $('#predictModalRender').html(prediksi)
                $(".loader").addClass('d-none')
                $("#predictModal").modal('show')

            },
            error: function(err) {
                $(".loader").addClass('d-none')
                console.log(err)
            }
        });
    });

    $(document).on('click', '.livedraw-click', function(e) {
        $(".loader").removeClass('d-none')
        let id = $(this).data('id');
        $.ajax({
            method: 'POST',
            url: "home/getLivedraw",
            data: {
                id: id
            },
            success: function(data) {
                $('#livedrawModalRender').html(data)
                $(".loader").addClass('d-none')
                $("#livedrawModal").modal('show')
            },
            error: function(err) {
                $(".loader").addClass('d-none')
                console.log(err)
            }
        });
    });
});