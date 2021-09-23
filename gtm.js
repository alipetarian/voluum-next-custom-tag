<script>
  console.log('Ali Here')
  var links = document.getElementsByTagName('a');
  console.log('ALL LINKS', links)
  for(i in links){
    if(links[i].href ){
      
      
      var hrefAttr= links[i].getAttribute('href')
      
      console.log('hrefAttr ----- ---',hrefAttr );
      console.log('HREF VALUE', links[i].href)
      var url = new URL(links[i].href);
      console.log('URL ------',url)
      
      console.log('url.search ______________---before', url.search)
      var searchParams = new URLSearchParams(url.search);
      console.log('searchParams-----------------', searchParams)
      console.log('searchParams-----------tostring------', searchParams.toString())
      searchParams.delete('param2'); //delete if exits
      searchParams.delete('test-cep');
      searchParams.append('test-cep', 'some-cep-value');
      url.search = searchParams.toString();
      url.searchParams= searchParams 
      
      console.log('url.search ------------ after', url.search )
      console.log('url.string() string ----', url.toString())
      
      if(hrefAttr.startsWith('/')){
      
      console.log('Next Internal link',hrefAttr )
        
        var internalLink =url.pathname+'/'+url.search;
        console.log('INTERNAL LINK++++++++++++++++++++++++++++++++++', internalLink);
        links[i].href = internalLink;
      
      } else{
      
      console.log('External link', hrefAttr)
        
        links[i].href = url.toString();
      }
      
      links[i].onclick =function(){ 
       document.location.href = url.toString()
       }
      
        

      //links[i].href = url.toString();
    }
  }
  
</script>