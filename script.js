const API_URL = "https://your-api-url"; // Replace with your deployed API URL

// 🟢 Verify Certificate (Student)
function verifyCertificate() {
    const certificateId = document.getElementById("certificateId").value;

    fetch(`${API_URL}/verify/${certificateId}`)
        .then(response => response.json())
        .then(data => {
            const resultDiv = document.getElementById("result");
            if (data.status === "valid") {
                resultDiv.innerHTML = `✅ Valid Certificate! <br>
                Name: ${data.cert.name} <br>
                <a href="${data.cert.pdf_url}" target="_blank">📄 Download Certificate</a>`;
            } else {
                resultDiv.innerHTML = "❌ Invalid Certificate!";
            }
        })
        .catch(error => console.error("Error:", error));
}

// 🟢 Add Certificate (Admin)
function addCertificate() {
    const certData = {
        certificate_id: document.getElementById("certId").value,
        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        pdf_url: document.getElementById("pdfUrl").value
    };

    fetch(`${API_URL}/admin/add`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(certData)
    })
    .then(response => response.json())
    .then(data => {
        alert("Certificate Added!");
        window.location.reload();
    })
    .catch(error => console.error("Error:", error));
}

// 🟢 Fetch Certificates (Admin)
function fetchCertificates() {
    fetch(`${API_URL}/get-certificates`)
        .then(response => response.json())
        .then(certificates => {
            const certList = document.getElementById("certList");
            certList.innerHTML = "";

            certificates.forEach(cert => {
                certList.innerHTML += `
                    <div>
                        ${cert.name} (${cert.certificate_id}) 
                        <button onclick="deleteCertificate('${cert._id}')">Delete</button>
                    </div>
                `;
            });
        })
        .catch(error => console.error("Error:", error));
}

// 🟢 Delete Certificate (Admin)
function deleteCertificate(id) {
    fetch(`${API_URL}/admin/delete/${id}`, { method: "DELETE" })
    .then(() => {
        alert("Certificate Deleted!");
        fetchCertificates();
    })
    .catch(error => console.error("Error:", error));
}

// Fetch certificates when admin page loads
if (window.location.pathname.includes("admin.html")) {
    fetchCertificates();
}