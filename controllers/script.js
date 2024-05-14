function goToBookingPage() {
	window.location.href = "views/booking.html";
}
function goToLoginPage() {
	window.location.href = "views/login.html";
}
function goToLoginPage2() {
	window.location.href = "login.html";
}
function goToBooking2Page() {
	window.location.href = "booking2.html";
}

const dropdownLabels = document.querySelectorAll(".dropdown-label");
const dropdownMenus = document.querySelectorAll(".dropdown-menu");

dropdownLabels.forEach((label, index) => {
	label.addEventListener("click", () => {
		dropdownMenus.forEach((menu) => {
			menu.style.display = "none";
		});
		dropdownMenus[index].style.display = "block";
	});
});

window.addEventListener("click", (event) => {
	if (!event.target.matches(".dropdown-label")) {
		dropdownMenus.forEach((menu) => {
			menu.style.display = "none";
		});
	}
});

// Add event listeners to dropdown items
const dropdownItems = document.querySelectorAll(".dropdown-item");
dropdownItems.forEach((item) => {
	item.addEventListener("click", () => {
		const value = item.dataset.value;
		const labelId = item
			.closest(".dropdown")
			.querySelector(".dropdown-label").id;
		document.getElementById(labelId).textContent = value;
	});
});

// Get input element and calendar container
const dateInput = document.getElementById("dateInput");
const calendar = document.getElementById("calendar");

// Function to generate calendar HTML
function generateCalendar(year, month) {
	const date = new Date(year, month, 1);
	const daysInMonth = new Date(year, month + 1, 0).getDate();

	let html = "<table>";
	html +=
		'<tr><th colspan="7">' +
		date.toLocaleString("default", { month: "long" }) +
		" " +
		year +
		"</th></tr>";
	html +=
		"<tr><th>Sun</th><th>Mon</th><th>Tue</th><th>Wed</th><th>Thu</th><th>Fri</th><th>Sat</th></tr>";

	let dayCounter = 0;
	html += "<tr>";
	// Fill the gaps until the first day of the month
	for (let i = 0; i < date.getDay(); i++) {
		html += "<td></td>";
		dayCounter++;
	}

	// Fill in the days of the month
	for (let i = 1; i <= daysInMonth; i++) {
		html += "<td>" + i + "</td>";
		dayCounter++;
		if (dayCounter % 7 === 0) {
			html += "</tr><tr>";
		}
	}

	// Fill the gaps until the end of the week
	while (dayCounter % 7 !== 0) {
		html += "<td></td>";
		dayCounter++;
	}

	html += "</tr>";
	html += "</table>";
	return html;
}

// Function to show calendar
function showCalendar() {
	const now = new Date();
	const year = now.getFullYear();
	const month = now.getMonth();

	calendar.innerHTML = generateCalendar(year, month);
	calendar.style.display = "block";
}

// Function to hide calendar
function hideCalendar() {
	calendar.style.display = "none";
}

// Function to update input with selected date
function selectDate(day) {
	const now = new Date();
	const year = now.getFullYear();
	const month = now.getMonth() + 1; // Adding 1 because months are zero-based
	dateInput.value =
		year +
		"-" +
		(month < 10 ? "0" : "") +
		month +
		"-" +
		(day < 10 ? "0" : "") +
		day;
	hideCalendar();
}

// Event listeners
dateInput.addEventListener("click", showCalendar);

calendar.addEventListener("click", function (e) {
	if (e.target.tagName === "TD" && e.target.textContent !== "") {
		selectDate(parseInt(e.target.textContent));
	}
});

document.addEventListener("click", function (e) {
	if (!calendar.contains(e.target) && e.target !== dateInput) {
		hideCalendar();
	}
});

function confirm_booking() {
	window.location.href = "../index.html";
	alert("Your booking has been confirmed!");
}

function autofill() {
	var storedEmail = localStorage.getItem("email");
	var storedPhone = localStorage.getItem("phone");

	// Assuming your email and phone input fields have the ids 'email' and 'phone' respectively
	var emailField = document.getElementById("name");
	var phoneField = document.getElementById("contact-number");

	if (emailField) emailField.value = storedEmail;
	if (phoneField) phoneField.value = storedPhone;
}
