const form = document.getElementById('studentForm');
const submitBtn = document.getElementById('submitBtn');
const resetBtn = document.getElementById('resetBtn');
const calculateAgainBtn = document.getElementById('calculateAgainBtn');
const hideResultBtn = document.getElementById('hideResultBtn');
const resultCard = document.getElementById('resultCard');
const resultContent = document.getElementById('resultContent');

const fieldIds = [
    'name',
    'roll',
    'class',
    'section',
    'email',
    'phone',
    'english',
    'mathematics',
    'science',
    'social',
    'computer'
];

function clearErrors() {
    fieldIds.forEach((fieldId) => {
        const input = document.getElementById(fieldId);
        const error = document.getElementById(`${fieldId}Error`);

        if (input) {
            input.classList.remove('input-error');
        }

        if (error) {
            error.textContent = '';
        }
    });
}

function showError(fieldId, message) {
    const input = document.getElementById(fieldId);
    const error = document.getElementById(`${fieldId}Error`);

    if (input) {
        input.classList.add('input-error');
    }

    if (error) {
        error.textContent = message;
    }
}

function validateForm() {
    clearErrors();
    let isValid = true;

    const name = document.getElementById('name').value.trim();
    if (name === '') {
        showError('name', 'Name is required.');
        isValid = false;
    } else if (!/^[A-Za-z\s]+$/.test(name)) {
        showError('name', 'Name should contain only alphabets.');
        isValid = false;
    }

    const roll = document.getElementById('roll').value.trim();
    if (roll === '') {
        showError('roll', 'Roll number is required.');
        isValid = false;
    }

    const studentClass = document.getElementById('class').value;
    if (studentClass === '') {
        showError('class', 'Please select a class.');
        isValid = false;
    }

    const section = document.getElementById('section').value;
    if (section === '') {
        showError('section', 'Please select a section.');
        isValid = false;
    }

    const email = document.getElementById('email').value.trim();
    if (email === '') {
        showError('email', 'Email is required.');
        isValid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        showError('email', 'Please enter a valid email address.');
        isValid = false;
    }

    const phone = document.getElementById('phone').value.trim();
    if (phone === '') {
        showError('phone', 'Phone number is required.');
        isValid = false;
    } else if (!/^\d{10}$/.test(phone)) {
        showError('phone', 'Phone number must contain exactly 10 digits.');
        isValid = false;
    }

    const subjects = [
        { id: 'english', label: 'English' },
        { id: 'mathematics', label: 'Mathematics' },
        { id: 'science', label: 'Science' },
        { id: 'social', label: 'Social Science' },
        { id: 'computer', label: 'Computer' }
    ];

    const marks = [];

    subjects.forEach((subject) => {
        const value = document.getElementById(subject.id).value.trim();
        if (value === '') {
            showError(subject.id, `${subject.label} marks are required.`);
            isValid = false;
        } else {
            const mark = Number(value);
            if (Number.isNaN(mark)) {
                showError(subject.id, 'Please enter a valid number.');
                isValid = false;
            } else if (mark < 0 || mark > 100) {
                showError(subject.id, 'Marks must be between 0 and 100.');
                isValid = false;
            } else {
                marks.push(mark);
            }
        }
    });

    return {
        isValid,
        name,
        roll,
        studentClass,
        section,
        email,
        phone,
        marks
    };
}

function getGradeInfo(percentage) {
    let grade = '';
    let remarks = '';

    switch (true) {
        case percentage >= 90:
            grade = 'A+';
            remarks = 'Outstanding';
            break;
        case percentage >= 80:
            grade = 'A';
            remarks = 'Excellent';
            break;
        case percentage >= 70:
            grade = 'B';
            remarks = 'Very Good';
            break;
        case percentage >= 60:
            grade = 'C';
            remarks = 'Good';
            break;
        case percentage >= 50:
            grade = 'D';
            remarks = 'Average';
            break;
        case percentage >= 40:
            grade = 'E';
            remarks = 'Needs Improvement';
            break;
        default:
            grade = 'F';
            remarks = 'Failed';
            break;
    }

    return { grade, remarks };
}

function calculateResult(marks) {
    let total = 0;
    let result = 'Pass';

    marks.forEach((mark) => {
        total += mark;
    });

    const percentage = (total / marks.length).toFixed(2);
    const gradeInfo = getGradeInfo(Number(percentage));

    marks.forEach((mark) => {
        if (mark < 35) {
            result = 'Fail';
        }
    });

    if (result === 'Pass' && Number(percentage) < 40) {
        result = 'Fail';
    }

    return {
        total,
        percentage: Number(percentage),
        grade: gradeInfo.grade,
        remarks: gradeInfo.remarks,
        result
    };
}

function renderReportCard(studentData) {
    const subjects = [
        { label: 'English', mark: studentData.marks[0] },
        { label: 'Mathematics', mark: studentData.marks[1] },
        { label: 'Science', mark: studentData.marks[2] },
        { label: 'Social Science', mark: studentData.marks[3] },
        { label: 'Computer', mark: studentData.marks[4] }
    ];

    const resultClass = studentData.result === 'Pass' ? 'pass' : 'fail';

    resultContent.innerHTML = `
        <div class="report-card">
            <div class="report-head">
                <div>
                    <p class="eyebrow"><i class="fas fa-award"></i> Report card preview</p>
                    <h3>${studentData.name}</h3>
                </div>
                <span class="status-pill ${resultClass}"><i class="fas fa-${resultClass === 'pass' ? 'check-circle' : 'exclamation-circle'}"></i> ${studentData.result}</span>
            </div>

            <div class="student-info">
                <p><strong>Name:</strong> ${studentData.name}</p>
                <p><strong>Roll Number:</strong> ${studentData.roll}</p>
                <p><strong>Class:</strong> ${studentData.studentClass}</p>
                <p><strong>Section:</strong> ${studentData.section}</p>
                <p><strong>Email:</strong> ${studentData.email}</p>
                <p><strong>Phone:</strong> ${studentData.phone}</p>
            </div>

            <table class="marks-table">
                <thead>
                    <tr>
                        <th>Subject</th>
                        <th>Marks</th>
                    </tr>
                </thead>
                <tbody>
                    ${subjects.map((subject) => `<tr><td>${subject.label}</td><td>${subject.mark}</td></tr>`).join('')}
                </tbody>
            </table>

            <div class="summary">
                <div class="summary-item">
                    <div class="label">Total Marks</div>
                    <div class="value">${studentData.total}</div>
                </div>
                <div class="summary-item">
                    <div class="label">Percentage</div>
                    <div class="value">${studentData.percentage}%</div>
                </div>
                <div class="summary-item">
                    <div class="label">Grade</div>
                    <div class="value">${studentData.grade}</div>
                </div>
                <div class="summary-item">
                    <div class="label">Result</div>
                    <div class="value ${resultClass}">${studentData.result}</div>
                </div>
            </div>

            <div class="remarks">
                <p><i class="fas fa-comment"></i> ${studentData.grade} - ${studentData.remarks}</p>
            </div>
        </div>
    `;

    resultCard.style.display = 'block';
}

function handleSubmit(event) {
    event.preventDefault();
    const validation = validateForm();

    if (!validation.isValid || validation.marks.length !== 5) {
        resultCard.style.display = 'none';
        resultContent.innerHTML = '';

        const firstError = document.querySelector('.input-error');
        if (firstError) {
            firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
        return;
    }

    const summary = calculateResult(validation.marks);
    const studentData = {
        ...validation,
        ...summary
    };

    renderReportCard(studentData);
    resultCard.style.display = 'block';
    resultCard.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function resetForm() {
    form.reset();
    clearErrors();
    resultCard.style.display = 'none';
    resultContent.innerHTML = '';
}

function calculateAgain() {
    clearErrors();
    resultCard.style.display = 'none';
    resultContent.innerHTML = '';
}

submitBtn.addEventListener('click', handleSubmit);
form.addEventListener('submit', handleSubmit);
resetBtn.addEventListener('click', resetForm);
calculateAgainBtn.addEventListener('click', calculateAgain);
hideResultBtn.addEventListener('click', () => {
    resultCard.style.display = 'none';
});
