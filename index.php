<!DOCTYPE html>
<html>
<head>
	<title>Movie Search</title>
    <link rel="stylesheet" href="css/style.css" />
    <script src="script/jquery-3.5.1.js"></script>
	<script src="https://code.jquery.com/jquery-3.5.1.js"></script>	
	<script src="js/script.js"></script>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery-modal/0.9.1/jquery.modal.min.js"></script>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/jquery-modal/0.9.1/jquery.modal.min.css" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body>
    <header>
        <h1>Movie Search</h1>
    </header>	
    <main>
        <div id="all_search">
            <fieldset >
                <form action="">
                    <input id="txtTitle" name="txtTitle" placeholder='Movie Title' type="text"  required tabindex="1"><br>
                    <input type="button" id="btnSubTitle" value="Search By movie title" required tabindex="2">
                </form>
            </fieldset>
            <fieldset >
                <form action="">          
                    <input id="txtTitleYear" name="txtTitleYear" placeholder= 'Movie Title' type="text"  required tabindex="3"><br>
                    <input id="txtYear" name="txtYear" placeholder= 'Release Year' type="number" pattern="[0-9]{4}" required tabindex="4"><br>
                    <input type="button" id="btnSubYear" value="Search By title & Year" required tabindex="5">
                </form>
            </fieldset>
            <fieldset >
                <form action=""> 
                    <input id="txtPerson" name="txtPerson" placeholder='Name' type="text"  required tabindex="6"><br>
                    <input type="button" id="btnSubPerson" value="Search By Person Name" required tabindex="7">
                </form>
            </fieldset>
        </div>
        <div id="movies">
            
            
        </div>
    </main>
    <footer>2021 Abul Kasem Mohammed Omar Sharif</footer>
</body>
</html>