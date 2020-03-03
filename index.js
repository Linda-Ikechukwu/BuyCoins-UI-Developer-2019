/* 
 * ✅ Use the Coinlore API (Coins) 
 *    https://www.coinlore.com/cryptocurrency-data-api
 * 
 *    Get 10 coins per "page"
*/

//DOM Variables
const tbody = document.querySelector('#coins-data');
const prevButton = document.querySelector('#prev');
const nextButton = document.querySelector('#next');

const state = {};

class Actions {
    count = 10;
    array = [];
    constructor(coinsPerPage){
        this.coinsPerPage = coinsPerPage;
    }
    
    async fetchCoins() {
        try{
            const response = await fetch('https://api.coinlore.com/api/tickers/');
            const result = await response.json();
            this.array = result.data;
            return this.array;
        }
        catch(error){
           console.log(error)
        }
    }
    
    nextCoins(){
        this.count = this.count + this.coinsPerPage;
        console.log(this.count);
        return this.array.slice(this.count, this.count + this.coinsPerPage);
    }

    prevCoins(){
        this.count -= this.coinsPerPage;
        return this.array.slice(this.count, this.count + this.coinsPerPage);
    }

    displayButtons(){
        prevButton.style.visibility = this.count > 0 ?  "visible" : "hidden";
        nextButton.style.visibility = this.count >= (this.array.length - this.coinsPerPage) ?  "hidden" : "visible";
    }
    
    getCoins(coins){
        for(let coin of coins){
             let tableRow = `<tr>
                         <td>${coin.name}</td>
                         <td>${coin.symbol}</td>
                         <td>${coin.price_usd}</td>
                         <td>${coin.tsupply} ${coin.symbol}</td>
                         </tr>`
            tbody.insertAdjacentHTML('beforeend', tableRow);     
         }
    }

    displayNewCoins(button){
        let coins;
        tbody.innerHTML = " ";
        button === 'next' ? coins = this.nextCoins() : coins = this.prevCoins();
        this.getCoins(coins);
        this.displayButtons();
    }
    
    init(coins, direction){
        let coinsData = coins.slice(this.count, this.coinsPerPage);
        this.getCoins(coinsData);
        this.displayNewCoins(direction);
    }
}


const actions = new Actions(10);
const newAction = async (direction) => {
    try{
      const coinData = await actions.fetchCoins();
      actions.init(coinData, direction);
      //actions.displayButtons();
      console.log(actions.count);
    }catch(error){
       console.log(error);
    }
    
}
newAction(next);

nextButton.addEventListener('click', () => {
newAction('next');
nextButton.blur();
});

prevButton.addEventListener('click', () => {
 newAction('prev');
 nextButton.blur();
} );


//Fetch Version, This is faster, I think 
/*const tbody = document.querySelector('#coins-data');
const prevButton = document.querySelector('#prev');
const nextButton = document.querySelector('#next');


fetch('https://api.coinlore.com/api/tickers/')
   .then(response => response.json())
   .then(coins => {
       let i = 0;
       let arrLength = coins.data.length
       console.log(arrLength);
       let array = coins.data;
       coinsData = array.slice(0,10);
       getCoins();

       function nextCoins(){
           i = i + 10;
           return array.slice(i, i+10);
       }

       function prevCoins(){
           i = i - 10;
           return array.slice(i, i+10);
        }

        function displayButtons(){
            prevButton.style.visibility = i > 0 ?  "visible" : "hidden";
            nextButton.style.visibility = i >= 90 ?  "hidden" : "visible";
        }

       function getCoins(){
            for(let coin of coinsData){
                let tableRow = `<tr>
                                <td>${coin.name}</td>
                                <td>${coin.symbol}</td>
                                <td>${coin.price_usd}</td>
                                <td>${coin.tsupply} ${coin.symbol}</td>
                                </tr>`
                tbody.insertAdjacentHTML('beforeend', tableRow);     
           }
       }

        nextButton.addEventListener('click', function(e){
           tbody.innerHTML = " ";
           coinsData = nextCoins();
           getCoins();
           displayButtons()

        })

        prevButton.addEventListener('click', function(e){
            tbody.innerHTML = " ";
            coinsData = prevCoins();
            getCoins();
            displayButtons()

        })

   }) 
   .catch(error =>{
       console.log(error);
   }); 
 */
 
