
    const URL = 'https://fakestoreapi.com/products';

    const appConfig = {
        data(){
            return {
                goods: [],
                search: '',
                sort: null
            }
        },
        methods: {
            forSearchFilter(item){
                let s = this.search.toLowerCase().trim();

                if(item.title.toLowerCase().trim().includes(s)){
                    return true;
                }

                if(item.description.toLowerCase().trim().includes(s)){
                    return true;
                }

                return false;
               
            }
        },
        computed: {
            showGoods(){
                
                let list = this.goods.filter(this.forSearchFilter);

                if(this.sort){

                    if(this.sort == 'up'){
                        list.sort((a, b) => a.price - b.price);
                    }else {
                        list.sort((a, b) => b.price - a.price);
                    }

                }

                return list;
            }
        },
        async mounted(){
            let result = await fetch(URL);
                result = await result.json();

            console.log(result);

            this.goods = result;
        }
    }

    const app = Vue.createApp(appConfig);

    app.mount('#app');
