import { LightningElement, track } from 'lwc';

export default class HtmlTemplatingLWCDirectives extends LightningElement {
    
    categoriesBody = {
  "categories": [
    {
      "id": 1,
      "name": "Electronics",
      "products": [
        {
          "id": 101,
          "name": "Smartphone",
          "description": "Latest model smartphone with a 6.5-inch display.",
          "price": 699,
          "stockStatus": "In Stock",
          "image": "https://img.freepik.com/premium-photo/air-conditioner-against-white-background_109734-357.jpg",
          "rating": 5,
          "reviews": [
            {
              "user": "Rahul Sharma",
              "rating": 5,
              "comment": "Amazing phone, great value for money!"
            }
          ]
        },
        {
          "id": 102,
          "name": "Laptop",
          "description": "A high-performance laptop with Intel i7 processor.",
          "price": 999,
          "stockStatus": "Out of Stock",
          "image": "https://img.freepik.com/premium-photo/air-conditioner-against-white-background_109734-357.jpg",
          "rating": 3,
          "reviews": [
            {
              "user": "Priya Verma",
              "rating": 3,
              "comment": "Decent laptop but a bit overpriced."
            }
          ]
        }
      ]
    },
    {
      "id": 2,
      "name": "Clothing",
      "products": [
        {
          "id": 201,
          "name": "T-shirt",
          "description": "Comfortable cotton t-shirt available in various colors.",
          "price": 25,
          "stockStatus": "In Stock",
          "image": "https://img.freepik.com/premium-photo/air-conditioner-against-white-background_109734-357.jpg",
          "rating": 3,
          "reviews": [
            {
              "user": "Ankit Mehra",
              "rating": 3,
              "comment": "Good fit, but color faded after one wash."
            }
          ]
        }
      ]
    },
    {
      "id": 3,
      "name": "Home Appliances",
      "products": [
        {
          "id": 301,
          "name": "Air Conditioner",
          "description": "Energy-efficient AC with smart controls.",
          "price": 499,
          "stockStatus": "In Stock",
          "image": "https://img.freepik.com/premium-photo/air-conditioner-against-white-background_109734-357.jpg",
          "rating": 4,
          "reviews": [
            {
              "user": "Sneha Iyer",
              "rating": 4,
              "comment": "Cools the room quickly and operates quietly."
            }
          ]
        }
      ]
    }
  ]
};

orders = [
  {"label": "All", "value": "All"},
  {"label": "Low to High",
    "value": "asc"},
  {"label": "High to Low",
    "value": "desc"}
]
@track categoryList = [{"label": "All", "value": "All"}];
@track selectedCategory = 'All';
@track priceOrder = '';
@track ratingOrder = '';
@track allProductList = [];
@track filteredProducts = [];
// @track priceOrder = 'All';
// @track ratingOrder = 'All';

connectedCallback() {
    this.categoriesBody.categories.forEach(element => {
        this.categoryList.push({"label": element.name, "value": element.name});
        console.log(element.name, element.id);
    })

    for(const subObj of this.categoriesBody.categories){
        this.allProductList.push(...subObj.products);
    }
    console.log(JSON.stringify(this.allProductList));
    this.filteredProducts = this.allProductList;
}

get categoriesOption() {
    return this.categoryList;
}

categoryChange(event) {
    this.selectedCategory = event.detail.value;
}

priceOrderChange(event) {
    this.priceOrder = event.detail.value;
}

ratingOrderChange(event) {
  this.ratingOrder = event.detail.value;
}

sortAndFilterProducts() {
    switch(this.selectedCategory) {
        case 'All':
            this.filteredProducts = [...this.allProductList];
            break;
        case 'Electronics':
            this.filteredProducts = [...this.categoriesBody.categories[0].products];
            break;
        case 'Clothing':
            this.filteredProducts = [...this.categoriesBody.categories[1].products];
            break;
        case 'Home Appliances':
            this.filteredProducts = [...this.categoriesBody.categories[2].products];
            break;
        default:
            this.filteredProducts = [...this.allProductList];
    
        // case 'Clothing':
        //     this.filteredProducts = this.productList.filter(product => product.id > 200 && product.id <= 300);
        //     break;
        // case 'Home Appliances':
        //     this.filteredProducts = this.productList.filter(product => product.id > 300 && product.id <= 400);
        //     break;
        // default:
        //     this.filteredProducts = this.productList

    }
    if(this.priceOrder === 'asc') {
        this.filteredProducts.sort((a, b) => {
          return a.price - b.price;
        })
    }
    else if(this.priceOrder === 'desc') {
        this.filteredProducts.sort((a, b) => {
          return b.price - a.price;
        })
    }

    if(this.ratingOrder === 'asc') {
        this.filteredProducts.sort((a, b) => {
          return a.rating - b.rating;
        })
    }
    else if(this.ratingOrder === 'desc') {
        this.filteredProducts.sort((a, b) => {
          return b.rating - a.rating;
        })
      }
}

}