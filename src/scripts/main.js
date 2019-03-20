const outEl = document.querySelector("#output");
const allButton = document.createElement("button");
const manuButton = document.createElement("button");
const agentButton = document.createElement("button");
const header = document.querySelector("#header");
allButton.textContent = "Show All Businesses";
manuButton.textContent = "Show Manufacturing Businesses";
agentButton.textContent = "Show Purchasing Agents";
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

const agentsList = businesses.map(business => {
    let agentObj = {
        fullName: `${business.purchasingAgent["nameFirst"]}  ${business.purchasingAgent["nameLast"]}`,
        company: business.companyName,
        phoneNumber: business.phoneWork
    }
    return agentObj;
});

const getAgents = () => {
    outEl.innerHTML = "<h1>Purchasing Agents</h1>";
    agentsList.forEach(agentItem => {
        outEl.innerHTML += `<h2>${agentItem.fullName}</h2>
        <h3>${agentItem.company}</h3>
        <p>${agentItem.phoneNumber}</p>`;
        outEl.innerHTML += "<hr/>";
    });
}


allButton.addEventListener("click", getAllBiz);
manuButton.addEventListener("click", getManufacturingBiz);
agentButton.addEventListener("click", getAgents);

/*
    This event handler is meant to search the company names in our business list and return the company information that matches the search value. Then it will be appended to the DOM.
*/

// document.querySelector("#companySearch")
//     .addEventListener("keypress", keyPressEvent => {
//         if (keyPressEvent.charCode === 13) {
//             /* WHEN  USER PRESSES ENTER, FIND MATCHING BUSINESS.
//                FIND METHOD NEEDS TO RETURN A BOOLEAN. FIRST RESULT THAT MATCHES THE SEARCH VALUE WILL APPEAR ON THE DOM.
//                .INCLUDE METHOD IS A STRING METHOD THAT RETURNS A BOOLEAN.
//             */
//             const foundBusiness = businesses.find(
//                 business =>
//                 business.companyIndustry.includes(keyPressEvent.target.value) ||
//                 business.companyName.includes(keyPressEvent.target.value)
//             );

//         outEl.innerHTML = `
//             <h2>
//             ${foundBusiness.companyName}
//             </h2>
//             <section>
//             ${foundBusiness.addressFullStreet}
//             </section>
//             <section>
//             ${foundBusiness.addressCity},
//             ${foundBusiness.addressStateCode}
//             ${foundBusiness.addressZipCode}
//             </section>
//             `;

//         document.querySelector("#companySearch").value = "";
//         }
//     });

/*
    This event handler is meant to search our agent list with the value in the search bar. If any part of the agents name matches the value in the search bar, the agent will appear on the DOM. Only the first match will appear.
*/

document.querySelector("#companySearch")
    .addEventListener("keypress", keyPressEvent => {
        if (keyPressEvent.charCode === 13) {
            /* WHEN  USER PRESSES ENTER, FIND MATCHING PURCHASING         AGENT. FIND METHOD NEEDS TO RETURN A BOOLEAN. FIRST        RESULT THAT MATCHES THE SEARCH VALUE WILL APPEAR ON THE    DOM. INCLUDE METHOD IS A STRING METHOD THAT RETURNS A      BOOLEAN.
            */
            const foundAgent = agentsList.find(
                agent =>
                agent.fullName.includes(keyPressEvent.target.value)
            );

        outEl.innerHTML = `
            <h2>
            ${foundAgent.fullName}
            </h2>
            <h3>
            ${foundAgent.company}
            </h3>
            <p>
            ${foundAgent.phoneNumber}
            </p>
            `;

        document.querySelector("#companySearch").value = "";
        }
    });