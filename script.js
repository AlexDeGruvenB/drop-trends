document.addEventListener('DOMContentLoaded', () => {
    console.log("Drop Trends website loaded.");
    loadXMLData();
});

function loadXMLData() {
    // This function will fetch and parse data.xml
    fetch('data.xml')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.text();
        })
        .then(str => (new window.DOMParser()).parseFromString(str, "text/xml"))
        .then(data => {
            console.log("XML Data loaded successfully:", data);
            displayXMLData(data);
        })
        .catch(err => console.error("Error loading XML data: ", err));
}

function displayXMLData(xmlDoc) {
    const container = document.getElementById('xml-data-container');
    if (!container) return;

    // Example parsing, adjust based on the actual structure of data.xml
    const items = xmlDoc.getElementsByTagName("item");
    if (items.length === 0) {
        container.innerHTML = "<p>No data available yet.</p>";
        return;
    }

    let html = '<h3>Latest Trends Data</h3><ul class="list-group mb-3">';
    for (let i = 0; i < items.length; i++) {
        const titleNode = items[i].getElementsByTagName("title")[0];
        const title = titleNode ? titleNode.textContent : "Unknown Title";

        const linkNode = items[i].getElementsByTagName("link")[0];
        const link = linkNode ? linkNode.textContent : "#";

        const priceNode = items[i].getElementsByTagName("price")[0];
        const price = priceNode ? priceNode.textContent : "";

        html += `<li class="list-group-item bg-transparent" style="color: #000000; border-color: #222975;"><a href="${link}" class="custom-link" target="_blank">${title}</a> ${price ? `- ${price}` : ''}</li>`;
    }
    html += '</ul>';

    container.innerHTML = html;
}
