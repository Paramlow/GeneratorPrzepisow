$(document).ready(function() {

    var table = $('#recipesTable').DataTable({
        pageLength: 5,
        lengthChange: false,
        columnDefs: [
            { orderable: false, targets: 3 }
        ],
        language: {
            search: "Szukaj:",
            info: "Wyświetlanie _START_ do _END_ z _TOTAL_ przepisów",
            infoEmpty: "Brak przepisów",
            infoFiltered: "(filtrowano z _MAX_ wszystkich)",
            zeroRecords: "Nie znaleziono pasujących przepisów",
            paginate: {
                first: "Pierwsza",
                last: "Ostatnia",
                next: "Następna",
                previous: "Poprzednia"
            }
        }
    });

    function addRecipe(title, ingredients, time) {
        var rowNode = table.row.add([
            title,
            ingredients,
            time + " min",
            '<button class="btn btn-sm btn-danger deleteBtn">Usuń</button>'
        ]).draw(false).node();

        $(rowNode).hide().fadeIn(500);
    }

    // Ręczne dodawanie
    $("#recipeForm").submit(function(e) {
        e.preventDefault();

        var title = $("#title").val().trim();
        var ingredients = $("#ingredients").val().trim();
        var time = $("#time").val().trim();

        if (title === "" || ingredients === "" || time === "") {
            $("#errorMsg").text("Wszystkie pola są wymagane!");
            return;
        }

        if (isNaN(time)) {
            $("#errorMsg").text("Czas musi być liczbą!");
            return;
        }

        $("#errorMsg").text("");

        addRecipe(title, ingredients, time);

        $("#recipeForm")[0].reset();
    });

    // 🎲 LOSOWANIE PRZEPISU
    $("#randomRecipe").click(function() {

        const names = [
            "Makaron Alfredo",
            "Sałatka Grecka",
            "Zupa Pomidorowa",
            "Kurczak Teriyaki",
            "Naleśniki z owocami",
            "Tortilla z warzywami"
        ];

        const ingredientsList = [
            "makaron, śmietana, czosnek",
            "pomidor, ogórek, feta",
            "pomidory, ryż, przyprawy",
            "kurczak, sos sojowy, miód",
            "mąka, mleko, jajka",
            "tortilla, papryka, kukurydza"
        ];

        const times = [15, 20, 25, 30, 35, 40];

        var randomIndex = Math.floor(Math.random() * names.length);

        var randomName = names[randomIndex];
        var randomIngredients = ingredientsList[randomIndex];
        var randomTime = times[Math.floor(Math.random() * times.length)];

        addRecipe(randomName, randomIngredients, randomTime);
    });

    // Usuwanie
    $("#recipesTable tbody").on("click", ".deleteBtn", function() {
        var row = $(this).closest("tr");
        row.fadeOut(400, function() {
            table.row(row).remove().draw();
        });
    });

    // Tryb ciemny
    $("#toggleTheme").click(function() {
        $("body").toggleClass("dark-mode light-mode");
    });

});