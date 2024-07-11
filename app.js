function slider() {
  var swiper = new Swiper(".mySwiper", {
    pagination: {
      el: ".swiper-pagination",
      type: "fraction",
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    autoplay: {
      delay: 5000,
      disableOnInteraction: false,
    },
    effect: 'fade', // or 'cube', 'coverflow', 'flip'
    fadeEffect: {
      crossFade: true
    },
    on: {
      slideChangeTransitionStart: function () {
        let captions = document.querySelectorAll('.swiper-caption .animated');
        captions.forEach(function (caption) {
          caption.classList.remove('fadeInLeft', 'one-delay', 'one-point-five-delay');
          void caption.offsetWidth; // trigger reflow
          caption.classList.add('fadeInLeft');
        });
      }
    }
  });

}

const DynamicSlider = async () => {
  try {

    const response = await fetch('https://fakestoreapi.com/products')
    const products = await response.json()
    ShowAllProducts(products)
    const parentSlider = document.getElementById('swiper-wrapper')
    let traking = 0
    parentSlider.innerHTML = ''

    products.some(product => {


      if (product.title.length < 30) {


        let slider = document.createElement('swiper-slide')
        slider.classList.add('swiper-slide')
        slider.innerHTML = `
        <div class="overlay"></div>
        <img src="${product.image}"
            alt="">
        <div class="swiper-caption">
            <div class="caption-container">
                <h2 class="animated fadeInLeft">${product.title}</h2>
                <p class="caption-bullet animated fadeInLeft one-delay">
                    ${product.description.slice(0, 250)}...
                </p>
                <br>
                <div class="caption-bullet animated fadeInLeft one-point-five-delay"><i
                        class="fas fa-check"><a href="#">Learn More</a></div><br>
            </div>
        </div>
      `

        traking += 1
        parentSlider.appendChild(slider)
      }


      if (traking == 7) {
        return true; // Breaks out of the loop
      }
      return false; // Continues the loop

    });

  } catch (error) {
    console.log(`Hello ${error}`)
  }
}

const LoadCategory = async()=>{
  const response = await fetch('https://fakestoreapi.com/products/categories')
  const cats = await response.json()
  let parent = document.getElementById('cat')
  
  cats.forEach((cat)=>{
    const li = document.createElement('li')
    li.style.cursor='pointer'
    li.classList.add('nav-item','nav-link')
    li.addEventListener('click', async (Event)=>{
      const response = await fetch(`https://fakestoreapi.com/products/category/${cat}`)
      const products = await response.json()
      ShowAllProducts(products)
    })

    li.innerText = cat
    parent.appendChild(li)

  })
}

const ShowAllProducts = async(products)=>{
  const parent = document.getElementById('products')
  parent.innerHTML = ''

  products.forEach(product=>{
    let div = document.createElement('div')
    div.classList.add('col','mb-4', 'mb-lg-0')

    div.innerHTML = `
      <div class="card">
        <div class="d-flex justify-content-between p-3">
          <p class="lead mb-0">Today's Combo Offer</p>
          <div
            class="bg-info rounded-circle d-flex align-items-center justify-content-center shadow-1-strong"
            style="width: 35px; height: 35px;">
            <p class="text-white mb-0 small">x4</p>
          </div>
        </div>
        <a href="product_details.html?id=${product.id}" class="text-decoration-none"><img src="${product.image}"
          class="card-img-top" alt="${product.title} image not found" /></a>
        <div class="card-body">
          <div class="d-flex justify-content-between">
            <p class="small"><a href="#!" class="text-muted">${product.category}</a></p>
            <p class="small text-danger">${product.rating.rate}</p>
          </div>

          <div class="d-flex justify-content-between mb-3">
          <a href="product_details.html?id=${product.id}" class="text-decoration-none"><h5 class="mb-0">${product.title.slice(0, 30)}...</h5></a>
            <h5 class="text-dark mb-0">$${product.price}</h5>
          </div>

          <div class="d-flex justify-content-between mb-2">
            <p class="text-muted mb-0">Available: <span class="fw-bold">6</span></p>

          </div>
        </div>
    </div>
    `
    parent.appendChild(div)
  })
}


const main = async () => {
  slider()
  await DynamicSlider()
  await LoadCategory()
}

main()