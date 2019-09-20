$(document).ready(function () {

    $("#restartButton").hide();

    var characters = [
        { name: "Obi-WanKenobt", image: "./assets/images/wan.jpg", healthpPoints: 120, attackPower: 8, counterAttackPower: 15 },
        { name: "luke Skywalker", image: "./assets/images/luke.jpg", healthpPoints: 100, attackPower: 10, counterAttackPower: 5 },
        { name: "Darth Sidious", image: "./assets/images/sidious.png", healthpPoints: 150, attackPower: 8, counterAttackPower: 10 },
        { name: "Darth Maul", image: "./assets/images/maul.jpg", healthpPoints: 180, attackPower: 10, counterAttackPower: 20 }
    ]

    var selectedCharacter = "";
    var selectedEnemy = "";
    var selectedDefender = "";
    var counter = 0;
    var attack = 0;
    var counterattack = 0;

    function createCharacter(name, image, hp) {
        var divElement = $("<div>");
        divElement.addClass("col-sm-6 col-md-3 col-lg-1");
        var nameElement = $("<p>");
        nameElement.addClass("characterName");
        nameElement.text(name);
        var imageElement = $("<img>");
        imageElement.addClass("img-fluid characterImage");
        imageElement.attr("src", image);
        var healthPointsElement = $("<p>");
        healthPointsElement.addClass("characterHP");
        healthPointsElement.text(hp);
        divElement.append(nameElement);
        divElement.append(imageElement);
        divElement.append(healthPointsElement);
        return divElement;
    }

    function loadCharacters() {
        for (var i = 0; i < characters.length; i++) {
            var characterDiv = createCharacter(characters[i].name, characters[i].image, characters[i].healthpPoints);
            characterDiv.addClass("character");
            $("#charactersSection").append(characterDiv);
        }
    }



    $(document).on("click", ".character", function () {

        selectedCharacter = $(this);
        selectedCharacter.addClass("selectedCharacter");

        //move the other characters to enemeies Section 
        var characterDivs = $("#charactersSection").children(".character");
        for (var i = 0; i < characterDivs.length; i++) {
            if ($(characterDivs[i]).hasClass("selectedCharacter") === false) {
                var char = characterDivs[i];
                $(characterDivs[i]).removeClass("character");
                $(characterDivs[i]).remove();
                $(char).addClass("enemy");
                $(char).appendTo("#enemiesSection");
            }
        }

    });

    //click event on character div to choose the character
    $(document).on('click', ".enemy", function () {
        //take the control of selected character and add class selected 
        $("#message").text("");        
        selectedEnemy = $(this);
        selectedEnemy.addClass("selectedEnemy");
        selectedEnemy.removeClass("enemy");
        selectedEnemy.addClass("defender");
        $("#defendersSection").append(selectedEnemy);
        selectedDefender = $(this);
    });

    $("button").on("click", function () {
        if ($("#defendersSection").children().length === 0 & $("#enemiesSection").children().length > 0) {

            $("#message").text(" No enemy selected");
        }
        else {
            $("#message").text("");
            var characterName = selectedCharacter.children("p.characterName").html();
            var defenderName = selectedDefender.children(".characterName").html();
            var characterHP = selectedCharacter.children("p.characterHP").html();
            var defenderHP = selectedDefender.children(".characterHP").html();

            if (characterHP < 0) {
                $("#message").text(" You been defeated...GAME OVER!!! ");
                $("#yourHit").text("");
                $("#opponetHit").text("");
                $("#restartButton").show();
            }
            else{
            counter++;
            
            for (var i = 0; i < characters.length; i++) {
                if (characters[i].name === characterName) {
                    attack = characters[i].attackPower;
                }
                if (characters[i].name === defenderName) {
                    counterattack = characters[i].counterAttackPower;
                }
            }
           
            yourAttack = counter * attack;
            characterHP = characterHP - counterattack;
            defenderHP = defenderHP - yourAttack;
            selectedCharacter.children("p.characterHP").text(characterHP);
            selectedDefender.children("p.characterHP").text(defenderHP);
            $("#yourHit").text("You attacked " + defenderName + " for " + yourAttack + " damage");
            $("#opponetHit").text(defenderName + " attacked you back" + " for " + counterattack + " damage");       
            

            if (defenderHP < 0) {
                $("#defendersSection").empty();
                $("#yourHit").text("");
                $("#opponetHit").text("");
                $("#message").text(" You have defeated " + defenderName + " You can choose to fight another enemy.");
            }

            if ($("#enemiesSection").children().length === 0 & $("#defendersSection").children().length === 0 & characterHP > 0) {
                $("#yourHit").text("");
                $("#opponetHit").text("");
                $("#message").text(" Congratulations!! You won ");
            }
        }

        }

    });

    $("#restartButton").on("click", function () {
        $("#charactersSection").empty();
        loadCharacters();
        $("#enemiesSection").empty();
        $("#defendersSection").empty();
        $("#restartButton").hide();
        $("#message").text("");
        $("#yourHit").text("");
        $("#opponetHit").text("");
        selectedCharacter = "";
        selectedEnemy = "";
        selectedDefender = "";
        counter = 0;
        attack = 0;
        counterattack = 0;

    });

    loadCharacters();


});






















// //click event to choose the character
//     $(".character").on("click", function () {

//         //take the control of selected character and add class selected         
//         var selectedCharacter=$(this);
//         selectedCharacter.addClass("selectedCharacter");

//         //move the other characters to enemeies Section 
//         var characterDivs = $("#charactersSection").children(".character");
//         for(var i=0;i<characterDivs.length;i++) {
//             if($(characterDivs[i]).hasClass("selectedCharacter")===false)
//             {
//                 var char=characterDivs[i];
//                 $(characterDivs[i]).removeClass("character");
//                 $(characterDivs[i]).remove();                
//                 $(char).addClass("enemy");
//                 $(char).appendTo("#enemiesSection");
//             }
//         }    

//     });

//     //click event on character div to choose the character
//     $(document).on('click', ".enemy", function() { 
//         //take the control of selected character and add class selected         
//         var selectedEnemy=$(this);
//         selectedEnemy.addClass("selectedEnemy");
//         selectedEnemy.removeClass("enemy");
//         selectedEnemy.addClass("defender");
//         $("#defendersSection").append(selectedEnemy);


//     });

// });