const loginText = document.querySelector(".title-text .login");
const loginForm = document.querySelector("form.login");
const loginBtn = document.querySelector("label.login");
const signupBtn = document.querySelector("label.signup");
const signupLink = document.querySelector("form .signup-link a");
signupBtn.onclick = () => {
	loginForm.style.marginLeft = "-50%";
	loginText.style.marginLeft = "-50%";
};
loginBtn.onclick = () => {
	loginForm.style.marginLeft = "0%";
	loginText.style.marginLeft = "0%";
};
signupLink.onclick = () => {
	signupBtn.click();
	return false;
};

function signUp() {
	// e.preventDefault(); // Prevent form submission

	// var username = document.getElementById('username').value;
	var password = document.getElementById("password").value;
	var email = document.getElementById("email").value;
	var phone = document.getElementById("phone").value;

	// Hash the password (you should use a stronger hashing algorithm in production)
	var hashedPassword = sha256(password);

	// Save signup details to localStorage (this is just an example, in real-world scenario, use a database)
	// localStorage.setItem('username', username);
	localStorage.setItem("password", hashedPassword);
	localStorage.setItem("email", email);
	localStorage.setItem("phone", phone);

	alert("Sign up successful! You can now log in.");
}

function login() {
	var email = document.getElementById("email1").value;
	var password = document.getElementById("password1").value;

	// Retrieve stored signup details from localStorage
	var storedEmail = localStorage.getItem("email");
	var storedPassword = localStorage.getItem("password");

	if (email === storedEmail && sha256(password) === storedPassword) {
		window.location.href = "../index.html";
		alert("Login successful!");
		// Redirect to the home page or perform any other action
		// Redirect to home page
	} else {
		alert("Invalid username or password");
	}
}

// SHA-256 hashing function (source: https://geraintluff.github.io/sha256/)
// SHA-256 hashing function (source: https://geraintluff.github.io/sha256/)
function sha256(ascii) {
	function rightRotate(value, amount) {
		return (value >>> amount) | (value << (32 - amount));
	}

	var mathPow = Math.pow;
	var maxWord = mathPow(2, 32);
	var lengthProperty = "length";
	var i, j; // Used as a counter across the whole file
	var result = "";

	var words = [];
	var asciiBitLength = ascii[lengthProperty] * 8;

	//* caching results is optional - remove/add slash from front of this line to toggle
	// Initial hash value: first 32 bits of the fractional parts of the square roots of the first 8 primes
	// (we actually calculate the first 64, but extra values are just ignored)
	var hash = (sha256.h = sha256.h || []);
	// Round constants: first 32 bits of the fractional parts of the cube roots of the first 64 primes
	var k = (sha256.k = sha256.k || []);
	var primeCounter = k[lengthProperty];
	/*/
  var hash = [], k = [];
  var primeCounter = 0;
  //*/

	var isComposite = {};
	for (var candidate = 2; primeCounter < 64; candidate++) {
		if (!isComposite[candidate]) {
			for (i = 0; i < 313; i += candidate) {
				isComposite[i] = candidate;
			}
			hash[primeCounter] = (mathPow(candidate, 0.5) * maxWord) | 0;
			k[primeCounter++] = (mathPow(candidate, 1 / 3) * maxWord) | 0;
		}
	}

	ascii += "\x80"; // Append Ƈ' bit (plus zero padding)
	while ((ascii[lengthProperty] % 64) - 56) ascii += "\x00"; // More zero padding
	for (i = 0; i < ascii[lengthProperty]; i++) {
		j = ascii.charCodeAt(i);
		if (j >> 8) return; // ASCII check: only accept characters in range 0-255
		words[i >> 2] |= j << (((3 - i) % 4) * 8);
	}
	words[words[lengthProperty]] = (asciiBitLength / maxWord) | 0;
	words[words[lengthProperty]] = asciiBitLength;

	// Process each chunk
	for (j = 0; j < words[lengthProperty]; ) {
		var w = words.slice(j, (j += 16)); // The message is expanded into 64 words as part of the iteration
		var oldHash = hash;
		// This is now the undefinedworking hash", often labelled as variables a...g
		// (we have to truncate as well, otherwise extra entries at the end accumulate
		hash = hash.slice(0, 8);

		for (i = 0; i < 64; i++) {
			var i2 = i + j;
			// Expand the message into 64 words
			// Used below if
			var w15 = w[i - 15],
				w2 = w[i - 2];

			// Iterate
			var a = hash[0],
				e = hash[4];
			var temp1 =
				hash[7] +
				(rightRotate(e, 6) ^ rightRotate(e, 11) ^ rightRotate(e, 25)) + // S1
				((e & hash[5]) ^ (~e & hash[6])) + // ch
				k[i] +
				// Expand the message schedule if needed
				(w[i] =
					i < 16
						? w[i]
						: (w[i - 16] +
								(rightRotate(w15, 7) ^ rightRotate(w15, 18) ^ (w15 >>> 3)) + // s0
								w[i - 7] +
								(rightRotate(w2, 17) ^ rightRotate(w2, 19) ^ (w2 >>> 10))) | // s1
						  0);
			// This is only used once, so *could* be moved below, but it only saves 4 bytes in exchange for readability
			var temp2 =
				(rightRotate(a, 2) ^ rightRotate(a, 13) ^ rightRotate(a, 22)) + // S0
				((a & hash[1]) ^ (a & hash[2]) ^ (hash[1] & hash[2])); // maj

			hash = [(temp1 + temp2) | 0].concat(hash); // We don't bother trimming off the extra ones, they're harmless as long as we slice/hash.length at the end
			hash[4] = (hash[4] + temp1) | 0;
		}

		for (i = 0; i < 8; i++) {
			hash[i] = (hash[i] + oldHash[i]) | 0;
		}
	}

	for (i = 0; i < 8; i++) {
		for (j = 3; j + 1; j--) {
			var b = (hash[i] >> (j * 8)) & 255;
			result += (b < 16 ? 0 : "") + b.toString(16);
		}
	}
	return result;
}
