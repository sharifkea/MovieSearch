"use strict";
$(document).ready(function() {
    const myKey = 'ca73e20ca9988634ee1a49b12fb9f736';

    $("#btnSubYear").on("click", function () {
        
        const txtTitleYear =$("#txtTitleYear").val().trim();
       
        const txtYear = $("#txtYear").val();
        const year = parseInt(txtYear);
        console.log(typeof year);
       if(year<1900 || year>2021)
            { alert("Enter Year from 1900 to 2021.");
            return;}

        $('#txtTitle').val('');
        $("#txtPerson").val('');
        
        if (txtTitleYear==""|| txtYear==""){
            alert("Titel or Year field can not be Empty ");
            return;
        }
        const urlYear = 'https://api.themoviedb.org/3/search/movie?api_key=' + myKey + '&language=en-US&query=' + txtTitleYear + '&page=1&include_adult=false&primary_release_year=' +txtYear;
        movieInformation(urlYear);
    })

    $("#btnSubTitle").on("click", function () {
        
        const txtTitle =$("#txtTitle").val().trim();
        $("#txtPerson").val('');
        $('#txtTitleYear').val('');
        $('#txtYear').val('');
        
        if (txtTitle==""){
            alert("Enput Titel field Empty");
            return;
        }
        const urlTitel ='https://api.themoviedb.org/3/search/movie?api_key='+myKey+'&language=en-US&query='+txtTitle+'&page=1&include_adult=false';
        movieInformation(urlTitel);
    })



    $("#btnSubPerson").on("click", function () {
        
        const txtPerson =$("#txtPerson").val().trim();
        $('#txtTitle').val('');
        $('#txtTitleYear').val('');
        $('#txtYear').val('');
        if (txtPerson==""){
            alert("Enput Titel field Empty");
            return;
        }
        const urlPerson ='https://api.themoviedb.org/3/search/person?api_key=' + myKey + '&language=en-US&query=' + txtPerson + '&page=1&include_adult=false';
        
        $("div#movies").empty();
        $.ajax({
            url: urlPerson,
            type: 'GET'
        })
        
        .done(function (data) {
            
            $.each(data.results, function (key, value) {
                
                let name = value.name;
                let img = "https://image.tmdb.org/t/p/w500" + value.profile_path;
                let personId = value.id;
                let mainActivity = value.known_for_department;
                const personLink = 
                    `<div class="list_out">
                        <a href="#${personId}" rel="modal:open">
                            <img src="${img}" width="200">
                            <br>Name :${name}
                        </a>
                        <p>Main Activity : ${mainActivity}
                        </p>
                    </div> `;

                const urlPersonDtl = "https://api.themoviedb.org/3/person/" + personId + "?api_key=" + myKey
            
                $.ajax({
                    url: urlPersonDtl,
                    type: 'GET'
                }).done(function (data) {
                    let birthday =data.birthday;
                    let birthPlace =data.place_of_birth;
                    let death = data.deathday;
                    let biography =data.biography;
                    let homePage =data.homepage;
                    var usedId = [];
                    const urlPersonCdt = "https://api.themoviedb.org/3/person/" + personId + "/movie_credits?api_key=" + myKey
                    
                    $.ajax({
                        url: urlPersonCdt,
                        type: 'GET'
                    }).done(function (data) {
                        var personCastData = '';
                        $.each(data.cast, function (key, value) {
                            var actorRole = 'Acting, ';
                            var dataCrews = data.crew.filter(function (sameMovie) {
                                return value.id === sameMovie.id;
                            });            
                            $.each(dataCrews, function (key, value) {
                                actorRole += value.job+', ';
                            });
                            if (dataCrews.length !== 0) usedId.push(value.id);
                            if(actorRole==='') actorRole="Role not Found.";
                            else actorRole = actorRole.slice(0, -1).replace(/.$/,".");
                            personCastData +=
                                `<div>
                                    <p><strong>Moive Title:</strong> ${value.original_title}</p>
                                    <p><strong>Release Year:</strong> ${value.release_date}</p>
                                    <p><strong>Role:</strong> ${actorRole} </p>
                                    <p><strong>Character:</strong> ${value.character} </p>
                                    <br>
                                </div>`;
                        });
                        var personCrewData = '';
                        
                        $.each(data.crew, function (key, value) {
                            console.log(usedId)
                            let againId=0;
                            usedId.forEach(function(id){
                                if (id===value.id)againId=1;
                                console.log(id);
                            })
                            if (againId===1)return;
                            let crewRole = "";
                            var crews = data.crew.filter(function (sameMovie) {
                                return value.id === sameMovie.id;
                            });
                            $.each(crews, function (key, value) {
                                crewRole +=value.job + ', ';
                            });
                            console.log(crews.length);
                            if (crews.length>1) usedId.push(value.id);
                            if (crews.length === 0) return;
                            
                            if(crewRole==='') crewRole="Role not Found.";
                            else crewRole = crewRole.slice(0, -1).replace(/.$/,".");
                            personCrewData +=
                                `<div>
                                    <p><strong>Moive Title:</strong> ${value.original_title}</p>
                                    <p><strong>Release Year: </strong>${value.release_date}</p>
                                    <p><strong>Role: </strong>${crewRole}</p>
                                    <br>
                                </div>`;
                        });
                        if(!name) name="Sorry Person name not found.";
                        if(!mainActivity) mainActivity="Sorry Main Activity not found.";
                        if(!birthday) birthday="Sorry Birthday not found.";
                        if(!death) death="Alive or date not found";
                        if(!birthPlace) birthPlace="Sorry Birth Place not found.";
                        if(!biography) biography="Sorry Biography not found.";
                        if(!homePage) homePage="Sorry Link for Home Page is not Available.";
                        const personInfo =
                            `<div id="${personId}" class="modal">
                                <p><img src = "${img}"  width="200" /> </p>
                                <p><strong>Name:</strong> ${name}</p>
                                <p><strong>Main Activity:</strong> ${mainActivity}</p>
                                <p><strong>Birthday:</strong> ${birthday}</p>
                                <p><strong>Birth Place:</strong> ${birthPlace}</p>
                                <p><strong>Day of Decease:</strong> ${death}</p>
                                <p><strong>Biography:</strong> ${biography}</p>
                                <p><strong>Homepage:</strong> ${homePage}</p>
                                <p><strong>List of Movie:</strong> ${personCastData}</p>
                                <p>${personCrewData}</p>
                            </div>`;
                        const person = $("<div />", {});
                        person.html(personLink);
                        person.append(personInfo);
                        person.appendTo($("div#movies"));
                    });
            
                });
            });
            if (data.total_results == 0) {
                alert("No Person match found");                
            }
                            
        })
        .fail(function () {
            alert("Some Error has Occurred.");
        });
    })    
    
    function movieInformation(url) {
        
        $("div#movies").empty();
        $.ajax({
            url: url,
            type: "GET"
        })
        .done(function (data) {
            $.each(data.results, function (key, value) {
                let title = value.original_title;
                let img = "https://image.tmdb.org/t/p/w500" + value.poster_path;
                let year = value.release_date.substr(0, 4);
                let language = value.original_language;
                let movieId = value.id; 
                
                const movieLink = 
                    `<div class="list_out">
                        <a href="#${movieId}" rel="modal:open">
                            <img src="${img}" width="200"><br>${title}
                        </a>
                        <p>Release year : ${year}
                            <br>Language : ${language}
                        </p>
                    </div> `;
                    
                var urlMovieDet = "https://api.themoviedb.org/3/movie/" + movieId + "?api_key=" + myKey + "&language=en-US"

                $.ajax({
                    url: urlMovieDet,
                    type: 'GET'
                })
                    
                .done(function (data) {
                    
                    var runtime =data.runtime;
                    var home = data.homepage;
                    const movieData = data;
                    var urlMovieCdt = "https://api.themoviedb.org/3/movie/" + movieId + "/credits?api_key=" + myKey
                    $.ajax({
                        url: urlMovieCdt,
                        type: 'GET'
                    })
                    .done(function (data) {
                        var genresData = '';
                        $.each(movieData.genres, function (key, value) {
                            if (value === undefined) {genresData="Genres is Not Available"; return};
                            genresData += value.name + ','
                        });
                        var productionCompData='';
                        $.each(movieData.production_companies, function (key, value) {
                            if (value === undefined) {productionCompData="Production Companies is Not Available"; return};
                            productionCompData += value.name + ','
                        });

                        var castData = '';
                        $.each(data.cast, function (key, value) {
        
                            if (value === undefined || value.character.indexOf("uncredited") >= 0) return;
        
                            castData +=
                                `<div >                                
                                    <p> <b>Name:</b> ${value.name}</p>
                                    <p> <b>Character:</b> ${value.character}</p>
                                    <br>                                
                                </div>`;
        
                        });
                        var directorData = '';
                        var executiveProducerData = '';
                        var producerData = '';
                        var writerData = '';
                        var musicComposerData = '';

                        $.each(data.crew, function (key, value) {
                            if (value.job == "Director") {
                            
                                directorData += value.name + ", ";
                            
                            }else if (value.job == "Executive Producer") {
        
                                executiveProducerData += value.name + ", ";
        
                            } else if (value.job == "Producer") {
        
                                producerData += value.name + ", ";

                            } else if (value.job == "Writer") {
        
                            writerData += value.name + ", ";

                            } else if (value.job == "Original Music Composer") {
        
                                musicComposerData += value.name + ", ";
                            } 
                        });
                        
                        if(!home) home="Link for Home Page is not Available.";
                        if(!genresData) genresData="Genres is not Available.";
                        else genresData = genresData.slice(0, -1).replace(/.$/,".");
                        if(!productionCompData) productionCompData="Name of Production Company is not Available.";
                        else productionCompData = productionCompData.slice(0, -1).replace(/.$/,".");        
                        if(!directorData) directorData="Director's Name is not Available.";
                        else directorData = directorData.slice(0, -1).replace(/.$/,".");
                        if(!executiveProducerData) executiveProducerData="Executive Producer's Name is not Available.";
                        else executiveProducerData = executiveProducerData.slice(0, -1).replace(/.$/,".");
                        if(!producerData) producerData="Producer's Name is not Available.";
                        else producerData = producerData.slice(0, -1).replace(/.$/,".");
                        if(!writerData) writerData="Writer's Name is not Available.";
                        else writerData = writerData.slice(0, -1).replace(/.$/,".");
                        if(!musicComposerData) musicComposerData="Music Composer's Name is not Available.";
                        else musicComposerData = musicComposerData.slice(0, -1).replace(/.$/,".");
                        const movieInfo =
                            `<div id="${movieId}" class="modal">
                                <p><strong>Title: </strong>${title} </p>                            
                                <p><img src = "${img}"  width="200" /> </p>
                                <p><strong>Language:</strong> ${language} </p>
                                <p><strong>Release Date:</strong> ${value.release_date} </p>
                                <p><strong>Overview:</strong> ${value.overview} </p>
                                <p><strong>Runtime:</strong> ${runtime}</p>
                                <p><strong>Homepage:</strong> ${home}</p>
                                <p><strong>Genres:</strong> ${genresData}</p>
                                <p><strong>Production Companies:</strong> ${productionCompData}</p>                                    
                                <p><strong>Directors:</strong> ${directorData}</p>
                                <p><strong>Script Writers:</strong> ${writerData}</p>
                                <p><strong>Executive Producers</strong>: ${executiveProducerData}</p>
                                <p><strong>Producers:</strong> ${producerData} </p>
                                <p><strong>Music Composers:</strong> ${musicComposerData}</p><br>
                                <p><strong>Cast:</strong> ${castData}</p>   
                            </div>`;
                            

                        const movie = $("<div />", {});
                        movie.html(movieLink);
                        movie.append(movieInfo);                            
                        movie.appendTo($("div#movies"));
                                
                    });
                });            
            });

            if (data.total_results == 0) {
                alert("No Movie match found.");               
            }
                            
        })
        .fail(function () {
            alert("Some Error has Occurred.");
        });
                
    }
})
    