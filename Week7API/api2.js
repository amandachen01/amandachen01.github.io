document.addEventListener('DOMContentLoaded', () => {
    const uuid = document.getElementById('ochreContainer').getAttribute('data-uuid');
    const ochre_url = "https://ochre.lib.uchicago.edu/ochre?uuid=";
    const link = ochre_url + uuid;

    loadXML();
    function loadXML() {
      requestXML(link, {redirect: 'follow'});
      console.log('loadXML -- OK');
    }

    // function to request
    function requestXML(link) {
      var connect = new XMLHttpRequest();
      connect.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
          parseXML(this.responseXML); 
        }
      };
      connect.open("GET", link, true);
      connect.send();
      console.log('requestXML -- OK');
    };

    
    function parseXML(sourceXML) {
      //api getting title 
      var textTitle = sourceXML.getElementsByTagName('identification');
      var title_string = document.createTextNode(textTitle[1].textContent);
      document.getElementById('title').appendChild(title_string);

      //api getting properties
      if (sourceXML.getElementsByTagName('property').length > 1) {
        const properties = sourceXML.querySelectorAll('property');
        i = 0;
        properties.forEach(p => {
          
          var tr = document.createElement('tr');
          tr.setAttribute('class', 'ochreTableRows');
          tr.setAttribute('id', 'row_' + i);
          document.getElementById('ochreTableBody').appendChild(tr);

          var property = document.createElement('td');
          property.setAttribute('id', 'property_' + i);
          property.textContent = p.querySelector('string').textContent;
          document.getElementById('row_' + i).appendChild(property);

          var value = document.createElement('td');
          value.setAttribute('id', 'property_value_' + i);
          value.textContent = p.querySelector('value').textContent;
          document.getElementById('row_' + i).appendChild(value);
          i++;
        });
      }
      
       // getting image
      if (sourceXML.getElementsByTagName('resource')[0].getAttribute("format") == 'image/jpeg') {
        var img = document.createElement('img');
        var src = link + "&preview";
        img.src = src;
        document.getElementById('preview').appendChild(img);
      }
    };
});