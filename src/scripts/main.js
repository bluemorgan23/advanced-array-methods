const outEl = document.querySelector("#output");
outEl.innerHTML = "<h1>Active Businesses</h1>";

businesses.forEach(business => {
    let zipCode = business.addressZipCode;
    outEl.innerHTML += `
    <h2>${business.companyName}</h2>
    <section>
      ${business.addressFullStreet}
    </section>
    <section>
      ${business.addressCity}, ${business["addressStateCode"]}, ${zipCode}
    </section>
  `;
    outEl.innerHTML += "<hr/>";
})

// Array to contain all the New York businesses
const newYorkBusinesses = businesses.filter(business => {
    let inNewYork = false;
  
    if (business.addressStateCode === "NY") {
        inNewYork = true;
    }
  
    return inNewYork;
})

const manufacturingBusinesses = businesses.filter(business => {
    let isManufacturing = false;

    if(business.companyIndustry === "Manufacturing"){
        isManufacturing = true;
    }
    return isManufacturing;
})

