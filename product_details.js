const ShowProduct = async()=>{
    const id = new URLSearchParams(window.location.search).get('id')
    const response = await fetch(`https://fakestoreapi.com/products/${id}`)
    const product = await response.json()
    const parent = document.getElementById('products_container')
    parent.innerHTML = `
    <div class="row gx-5">
    <aside class="col-lg-6">
        <div class="border rounded-4 mb-3 d-flex justify-content-center">
            <a data-fslightbox="mygalley" class="rounded-4" target="_blank" data-type="image"
                href="https://mdbcdn.b-cdn.net/img/bootstrap-ecommerce/items/detail1/big.webp">
                <img style="max-width: 100%; max-height: 100vh; margin: auto;" class="rounded-4 fit"
                    src="${product.image}" />
            </a>
        </div>
        <!-- gallery-wrap .end// -->
    </aside>
    <main class="col-lg-6">
        <div class="ps-lg-3">
            <h4 class="title text-dark">
                ${product.title}
            </h4>
            <div class="d-flex flex-row my-3">
                <div class="text-warning mb-1 me-2">
                    <i class="fa fa-star"></i>
                    <i class="fa fa-star"></i>
                    <i class="fa fa-star"></i>
                    <i class="fa fa-star"></i>
                    <i class="fas fa-star-half-alt"></i>
                    <span class="ms-1">
                        ${product.rating.rate}
                    </span>
                </div>
                <span class="text-muted"><i class="fas fa-shopping-basket fa-sm mx-1"></i>154
                    orders</span>
                <span class="text-success ms-2">In stock</span>
            </div>

            <div class="mb-3">
                <span class="h5">$${product.price}</span>
                <span class="text-muted">/per</span>
            </div>

            <p>
                ${product.description}
            </p>

            <div class="row">
                <dt class="col-3">Type:</dt>
                <dd class="col-9">Regular</dd>

                <dt class="col-3">Color</dt>
                <dd class="col-9">Brown</dd>

                <dt class="col-3">Material</dt>
                <dd class="col-9">Cotton, Jeans</dd>

                <dt class="col-3">Brand</dt>
                <dd class="col-9">Reebook</dd>
            </div>

            <hr />
    </main>
</div>
    
    `
}

async function main(){
    await ShowProduct()
}

main()