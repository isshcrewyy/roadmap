document.getElementById("roadmapForm").addEventListener("submit", async function(event) {
    event.preventDefault();

    let selectedSubjects = [];
    document.querySelectorAll('input[name="subjects"]:checked').forEach((checkbox) => {
        selectedSubjects.push(checkbox.value);
    });

    if (selectedSubjects.length === 0) {
        alert("Please select at least one subject.");
        return;
    }

    // Send data to backend
    try {
        let response = await fetch("http://127.0.0.1:5000/get-roadmap", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ subjects: selectedSubjects })
        });

        let result = await response.json();

        if (result.error) {
            alert(result.error);
        } else {
            document.getElementById("roadmapOutput").innerHTML = 
                "<strong>Possible Bachelor's Programs:</strong><br>" + result.roadmap.join(", ");
            document.getElementById("roadmapOutput").classList.remove("hidden");
        }
    } catch (error) {
        console.error("Error:", error);
    }
});
