const outEl = document.querySelector("#output");
const allButton = document.createElement("button");
const manuButton = document.createElement("button");
const agentButton = document.createElement("button");
const header = document.querySelector("#header");
allButton.textContent = "All Businesses";
manuButton.textContent = "Manufacturing Businesses";
agentButton.textContent = "Agents";
header.appendChild(allButton);
header.appendChild(manuButton);
header.appendChild(agentButton);


const getAllBiz = () => {
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
}
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

    if (business.companyIndustry === "Manufacturing") {
        isManufacturing = true;

    }
    return isManufacturing;
})

const getManufacturingBiz = () => {
    outEl.innerHTML = "<h1>Active Businesses</h1>";
    manufacturingBusinesses.forEach(business => {

        outEl.innerHTML += `
        <h2>${business.companyName}</h2>
        <section>
          ${business.addressFullStreet}
        </section>
        <section>
            ${business.addressCity}, ${business.addressStateCode}, ${business.addressZipCode}
        </section>`;
        outEl.innerHTML += "<hr/>"
    })

}

const agents = businesses.map(business => {
    let agentObj = {
        fullName: `${business.purchasingAgent["nameFirst"]}  ${business.purchasingAgent["nameLast"]}`,
        company: business.companyName,
        phoneNumber: business.phoneWork
    }
    return agentObj;
});

const getAgents = () => {
    outEl.innerHTML = "<h1>Purchasing Agents</h1>";
    agents.forEach(agent => {
        outEl.innerHTML += `<h2>${agent.fullName}, ${agent.company}, ${agent.phoneNumber}</h2>`;
        outEl.innerHTML += "<hr/>";
      });
}

allButton.addEventListener("click", getAllBiz);
manuButton.addEventListener("click", getManufacturingBiz);
agentButton.addEventListener("click", getAgents);
