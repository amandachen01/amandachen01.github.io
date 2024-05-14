document.addEventListener('DOMContentLoaded', () => {
    const uuid = document.getElementById('ochreContainer').getAttribute('data-uuid');
    const ochreUrl = "https://ochre.lib.uchicago.edu/ochre?uuid=" + uuid;

    function loadXML() {
        requestXML(ochreUrl);
        console.log('loadXML -- OK');
    }

    function requestXML(url) {
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function() {
            if (this.readyState === 4 && this.status === 200) {
                parseXML(this.responseXML);
                console.log('requestXML -- OK');
            }
        };
        xhr.open("GET", url, true);
        xhr.send();
    }

    function parseXML(xml) {
        // Getting title from XML
        var textTitle = xml.getElementsByTagName('identification');
        if (textTitle.length > 1) {
            var titleNode = document.createTextNode(textTitle[1].textContent);
            document.getElementById('title').appendChild(titleNode);
        }

        // Parsing and appending properties from XML
        var properties = xml.querySelectorAll('property');
        properties.forEach((p, index) => {
            var tr = document.createElement('tr');
            tr.className = 'ochreTableRows';
            tr.id = 'row_' + index;
            document.getElementById('ochreTableBody').appendChild(tr);

            var tdProperty = document.createElement('td');
            tdProperty.id = 'property_' + index;
            tdProperty.textContent = p.querySelector('string').textContent;
            tr.appendChild(tdProperty);

            var tdValue = document.createElement('td');
            tdValue.id = 'property_value_' + index;
            tdValue.textContent = p.querySelector('value').textContent;
            tr.appendChild(tdValue);
        });

        // Handling image preview if available
        var resources = xml.getElementsByTagName('resource');
        for (let i = 0; i < resources.length; i++) {
            if (resources[i].getAttribute("format") === 'image/jpeg') {
                var img = document.createElement('img');
                img.src = resources[i].getAttribute("href");
                document.getElementById('preview').appendChild(img);
                break; // Assuming we only need the first image
            }
        }
    }

    loadXML(); // Call the function to load and parse the XML
});
