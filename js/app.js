/*
Application JS file
*/
var ProductListing = Vue.extend({
    template: '#product-listing-template',
    data: function() {
        return {

          products:[],
	  searchQuery: '',
          pageSize:0,
          pageCount:0,
          totalElements:0,
          currentPage:0,
          pageRange:[],
      }
    },
    computed: {
    searchProduct: function(){
      var self = this
      return self.products.filter(function (product) {
        return product.name.indexOf(self.searchQuery) !== -1
         //console.log(product);
        //return self.products = product;
      })
    }
},
    created: function(){
      
        this.$http.get("http://technicaltest.vme.co/api/products/").then(response => {
          this.products = response.data.data;
          this.totalElements = response.data.total;
          this.pageCount = response.data.last_page;
          this.pageSize = response.data.per_page;
          this.currentPage = response.data.current_page;
          this.paginationRange();
        })
    },
    methods:{
        // Delete Product
        deleteProduct: function(person, index) {

          this.$http.delete('http://technicaltest.vme.co/api/products/' + person.id, function(data) {
            this.$set('products', data.products);
          });
          swal({
            title: 'Record Deleted',
              type: 'success',
            });
          this.products.splice(index, 1);
        },
        paginationRange : function() {
          for (var i=0; i<this.pageCount; i++) {
              this.pageRange.push(i);
            }
        },
        prevPage:function() {
          if (this.currentPage > 1) {
              this.currentPage--;
            }
            this.paginatorResult();
        },
        prevPageDisabled:function(){
          return this.currentPage === 1 ? "disabled" : "";
        },
        nextPage:function() {
                if (this.currentPage < this.pageCount) {
                  this.currentPage++;
                }
            this.paginatorResult();
        },
        nextPageDisabled:function(){
          return this.currentPage === this.pageCount  ? "disabled" : "";
        },
        setPage: function(n) {
          console.log(n);
          this.currentPage = n;
          this.paginatorResult();
        },
        paginatorResult: function(){
          this.$http.get("http://technicaltest.vme.co/api/products?page="+ this.currentPage )
            .then(response => {
              this.products = response.data.data;
            })
        }
    }

});


//Create Product
var ProductCreation = Vue.extend({
    template: '#product-creation-template',
    data: function () {
      return {productName: '', productDescription: '', productPrice: ''}
    },
    methods: {
        createProduct: function() {
            this.$validator.validateAll().then(() => {
                this.$http.post("http://technicaltest.vme.co/api/products/", {
                    name: this.productName,
                    description:this.productDescription,
                    price:this.productPrice
                }, function(data) {
                    
                });
                swal({
                    title: 'Record Added',
                    type: 'success',
                });
            }).catch(() => {
                console.log('Correct the errors!');
            });
        }
  }
});

// Product Update
var ProductUpdate = Vue.extend({
    template: '#product-detail-template',
    data: function () {
        return {productName: '', productDescription: '', productPrice: '', sproduct:[]}
    },
    created: function(){
     
      this.$http.get("http://technicaltest.vme.co/api/products")
       .then(response => {
         this.products = response.data.data;
        
        //TODO: Fetch Single Data End Point
        
        for (var i = 0; i < this.products.length; i++) {  
          if(this.products[i].id == this.$route.params.id) {
            this.sproduct = this.products[i];
            this.productName = this.sproduct.name;
            this.productDescription = this.sproduct.description;
            this.productPrice = this.sproduct.price;
            break;
          }
        }
       })
    },
    methods: {
        updateProduct: function () {
            var product = this.sproduct;
            this.$http.put("http://technicaltest.vme.co/api/products/"+product.id, {
              name: this.productName,
              description:this.productDescription,
              price:this.productPrice
            }, function(data) {
            });
            swal({
                title: 'Record updated',
                type: 'success',
            });
        }
    }
});

var UserLogin = Vue.extend({
    template: '#login-template',
    data: function () {
        return {userName: '', userPass: '', fname: '', lname: '', password: '',email: '',uname: '', seen: false}
    },
    created: function(){
     
    },
    methods: {
        userLogin: function () {
            //console.log(this.userName);
	    //console.log(this.userPass);
//	    this.$http.post("api/action.php", {
//              action: 'login',
//	      username: this.userName,
//              password:this.userPass,
//            }, function(data) {
//            });
	    
	    this.$http.post('api/action.php', { action: 'login',
	      username: this.userName,
              password:this.userPass,}).then((response) => {
	      if(response.body.records > 0){
	         this.$router.push('/products');
	      }else{
		  alert("Please enter correct details!!");
	      }	 
        });
	    
        },
	userRegister: function () {
	    this.$http.post('api/action.php', { action: 'register',
	      fname: this.fname,
              lname:this.lname,
	      password:this.password,
	      email:this.email,
              uname:this.uname}).then((response) => {
	      if(response.body.id > 0){
		  swal({
		    title: 'User registration sucessfull!!',
		    type: 'success',
		  });
	         this.$router.push('/products');
	      }else{
		  alert("Please enter correct details!!");
	      }	 
        });
	    
        }
    }
});

// Create Routes
var router = new VueRouter({
    
    mode: 'hash',
    base: window.location.href,
    routes: [
	{path: '/', component: UserLogin},
        {path: '/products', component: ProductListing},
        {path: '/create', component: ProductCreation},
        {name: 'person', path: '/:id', component: ProductUpdate }
    ],
});


var app = new Vue({
    router
}).$mount('#app');
