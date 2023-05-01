var thumbUp = document.getElementsByClassName("fa-thumbs-up");
var trash = document.getElementsByClassName("fa-trash");
let sneakerOne = document.querySelector('#s1')
let sneakerTwo = document.querySelector('#s2')
let sneakerThree = document.querySelector('#s3')
let sneakerFour = document.querySelector('#s4')
let sneakerFive = document.querySelector('#s5')
let sneakerSix = document.querySelector('#s6')
let sneakerSeven = document.querySelector('#s7')
let sneakerEight = document.querySelector('#s8')
let sneakerNine = document.querySelector('#s9')
let sneakerTen = document.querySelector('#s10')



const sneakers = [
  {
    brand: 'Nike',
    model: 'Air Force 1',
    colorway: 'White',
    price: 100,
    image_url: 'https://images.footlocker.com/is/image/EBFL2/W2288111_a1?wid=520&hei=520&fmt=png-alpha',
    sizes: [7, 8, 9, 10, 11]
  },
  {
    brand: 'Adidas',
    model: 'Superstar',
    colorway: 'Black/White',
    price: 80,
    image_url: 'https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/4e894c2b76dd4c8e9013aafc016047af_9366/Superstar_Shoes_White_FV3284_01_standard.jpg',
    sizes: [6, 7, 8, 9, 10]
  },
  {
    brand: 'Jordan',
    model: '1 Retro High',
    colorway: 'Royal Blue/Black',
    price: 160,
    image_url: 'https://m.media-amazon.com/images/I/61GNW4P2O2L.__AC_SY395_SX395_QL70_FMwebp_.jpg',
    sizes: [8, 9, 10, 11, 12]
  },
  {
    brand: 'Converse',
    model: 'Chuck Taylor All Star',
    colorway: 'white/black',
    price: 55,
    image_url: 'https://m.media-amazon.com/images/I/6149X2wAEUL._AC_UL800_FMwebp_QL65_.jpg',
    sizes: [5, 6, 7, 8, 9]
  },
  {
    brand: 'Vans',
    model: 'Old Skool',
    colorway: 'Navy/White',
    price: 65,
    image_url: 'https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcTZ0HAMjZeqv08cBauIDIHaXRTbjo3iwRDZMmfWl8GBnSe_XgLWL9BN4OejP00balPX7M07UNumn7IRPrTJTYwgxPPbiG_784KigzsHfSQyZB68wIcQebrIEd-nuLSrvublmVQ&usqp=CAc',
    sizes: [6, 7, 8, 9, 10]
  },
  {
    brand: 'New Balance',
    model: '990v5',
    colorway: 'Grey',
    price: 175,
    image_url: 'https://nb.scene7.com/is/image/NB/m990gl6_nb_02_i?$pdpflexf22x$&qlt=80&fmt=webp&wid=880&hei=880',
    sizes: [7, 8, 9, 10, 11]
  },
  {
    brand: 'Puma',
    model: 'Clyde',
    colorway: 'Black/White',
    price: 75,
    image_url: 'https://m.media-amazon.com/images/I/71F0TTti8RL._AC_UX695_.jpg',
    sizes: [6, 7, 8, 9, 10]
  },
  {
    brand: 'Reebok',
    model: 'Club C 85',
    colorway: 'White/Green',
    price: 80,
    image_url: 'https://m.media-amazon.com/images/I/71TQe48xt1L.__AC_SY395_SX395_QL70_FMwebp_.jpg',
    sizes: [7, 8, 9, 10, 11]
  },
  {
    brand: 'Under Armour',
    model: 'Curry 8',
    colorway: 'Black/White',
    price: 160,
    image_url: 'https://m.media-amazon.com/images/I/61T142XhUeL._AC_UY695_.jpg',
    sizes: [8, 9, 10, 11, 12]
  },
  {
    brand: 'ASICS',
    model: 'GEL-Kayano 27',
    colorway: 'Blue/Yellow',
    price: 160,
    image_url: 'https://m.media-amazon.com/images/I/616aiPFjRaL.__AC_SX395_SY395_QL70_FMwebp_.jpg',
    sizes: [7, 8, 9, 10, 11]
  }
];

sneakerOne.src = sneakers[0].image_url
sneakerTwo.src = sneakers[1].image_url
sneakerThree.src = sneakers[2].image_url
sneakerFour.src = sneakers[3].image_url
sneakerFive.src = sneakers[4].image_url
sneakerSix.src = sneakers[5].image_url
sneakerSeven.src = sneakers[6].image_url
sneakerEight.src = sneakers[7].image_url
sneakerNine.src = sneakers[8].image_url
sneakerTen.src = sneakers[9].image_url


Array.from(thumbUp).forEach(function(element) {
      element.addEventListener('click', function(){
        const name = this.parentNode.parentNode.childNodes[1].innerText
        const msg = this.parentNode.parentNode.childNodes[3].innerText
        const thumbUp = parseFloat(this.parentNode.parentNode.childNodes[5].innerText)
        fetch('messages', {
          method: 'put',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            'name': name,
            'msg': msg,
            'thumbUp':thumbUp
          })
        })
        .then(response => {
          if (response.ok) return response.json()
        })
        .then(data => {
          console.log(data)
          window.location.reload(true)
        })
      });
});

Array.from(trash).forEach(function(element) {
      element.addEventListener('click', function(){
        const name = this.parentNode.parentNode.childNodes[1].innerText
        const msg = this.parentNode.parentNode.childNodes[3].innerText
        fetch('messages', {
          method: 'delete',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            'name': name,
            'msg': msg
          })
        }).then(function (response) {
          window.location.reload()
        })
      });
});
const displaySneakerDetails = (index) => {
  const sneaker = sneakers[index];
  const details = `<h2>${sneaker.brand} ${sneaker.model}<br>
                   Colorway: ${sneaker.colorway}<br>
                   Sizes: ${sneaker.sizes.join(', ')}<br></h2>`;
  const detailsDiv = document.getElementById('sneaker-details');
  detailsDiv.innerHTML = details;
};

const imageElements = document.querySelectorAll('.sneaker-image');
imageElements.forEach((image, index) => {
  image.addEventListener('click', () => {
    displaySneakerDetails(index);
  });
});