// External JavaScript file

function displayStudentInfo(name, prn, department, email) {
    const resultDiv = document.getElementById('result');

    resultDiv.style.display = 'block';
    resultDiv.innerHTML =
        "<h3>Student Information Submitted</h3>" +
        "<p><strong>Name:</strong> " + name + "</p>" +
        "<p><strong>PRN:</strong> " + prn + "</p>" +
        "<p><strong>Department:</strong> " + department + "</p>" +
        "<p><strong>Email:</strong> " + email + "</p>";

    resultDiv.scrollIntoView({ behavior: 'smooth' });
}