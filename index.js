const fetch = require('sync-fetch');
const Page = require("./_layout/Default");

module.exports = class extends Page {
    constructor(){
        super({title:"Home", sName:"Sachita Patel & Dharani Pandya"});
    }
    render(sPage) {
        const oJson = fetch("https://prog8110liveserver-default-rtdb.firebaseio.com/meals.json").json();
        console.log(oJson);
        let sResult = "<h1>Upcoming Popup Meals</h1>";
        let n = 0;
        Object.keys(oJson).map((key) => {
            const oEntity = oJson[key];
            console.log(oEntity);
            oEntity.id = key;
            sResult += `
            <h2>${oEntity.title}</h2>
            <p><img src="${oEntity.featured_image}" alt="${oEntity.title}"</p>
            <p>${oEntity.full_description}</p>
            <p><b>Location:${oEntity.location}</b></p>
            <p><b>Cost: $${oEntity.cost}</b></p>
            <form>
                <button id="button_${n++}" disabled class="paypal_button" data-cost="${oEntity.cost}">
                Order now
                </button>
            </form>
            `;
        });
        return sResult;
    }
}