const remove = document.querySelectorAll('.remove')

Array.from(remove).forEach(function(element) {
      element.addEventListener('click', function(e){
        const _id = e.target.value
        window.location.reload()
        fetch('remove', {
          method: 'delete',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            _id
          })
        })
      });
});



