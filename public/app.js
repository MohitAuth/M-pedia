 document.getElementById("button").addEventListener("click", wiki);

      function wiki() {
        var outputWiki = document.querySelector("#wikioutput");
        var outputYoutube = document.querySelector("#youtube");
        var searchTerm = document.querySelector('input[name="search"]').value;
        var url =
          "https://en.wikipedia.org/w/api.php?format=json&action=opensearch&origin=*&search=" +
          searchTerm;
        outputWiki.innerHTML =
          "<h2>Showing results for '<b>" + searchTerm + "</b>'</h2>";
        ajax(url, function(response) {
          for (var x in response) {
            outputWiki.innerHTML +=
              '<div class="dataOutput">' + response[x] + "</div>";
          }
        });
        var url1 =
          "https://www.googleapis.com/youtube/v3/search/?part=snippet&key=***KEY***=" +
          searchTerm +
          "&maxResults=4";
        outputYoutube.innerHTML =
          "<h2>Videos of '<b>" + searchTerm + "</b>'</h2>";
        ajax(url1, function(data) {
          for (var x in data.items) {
            var title = data.items[x].snippet.title;
            var desc = data.items[x].snippet.description;
            var thumb = data.items[x].snippet.thumbnails.default.url;
            var videoID = data.items[x].id.videoId;
            outputYoutube.innerHTML +=
              '<div class="panel"><a href="https://youtu.be/' +
              videoID +
              '" target="_blank"><img src="' +
              thumb +
              '" alt="' +
              title +
              '"</a><br>' +
              title +
              "</div>";
          }
        });
      }

      function ajax(url, callback) {
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function() {
          if (xhr.readyState == 4 && xhr.status == 200) {
            callback(JSON.parse(xhr.responseText));
            //console.log(xhr.responseText);
          }
        };

        xhr.open("GET", url, true);
        xhr.send();
      }
    </script>
