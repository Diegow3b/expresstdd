$(function(){
    $.get('/cities', appendToList);

    $('form').on('submit', function(event){
        event.preventDefault();

        var form = $(this);
        var cityData = form.serialize();

        $('.alert').hide();

        $.ajax({
            type: 'POST', url: '/cities', data: cityData
        })
        .error(() => {
            $('.alert').show();
        })
        .success(function(cityName){
            appendToList([cityName]);
            form.trigger('reset');
        });
    });

    $('.city-list').on('click', 'a[data-city]', function(event){
        event.preventDefault();
        if (!confirm("Are you sure ?")){
            return false;
        }

        var target = $(event.currentTarget);

        $.ajax({
            type:'DELETE', url: '/cities/' + target.data('city')
        }).done(function(){
            target.parents('li').remove();
        });
    })

    function appendToList(cities){
        var list = [];
        for(var i in cities){
            city = cities[i];
            content = `
            <a href="/cities/${city}">${city}</a>
            <a href="#" data-city="${city}">
                <img src="img/delete.png">
            </a>`
            list.push($('<li>', { html: content }));
        }
        $('.city-list').append(list);
    }
})