/* UNIVERSAL PASSWORD TOGGLE */
function togglePassword(inputId, btn) {
  const input = document.getElementById(inputId);
  if (input.type === "password") {
    input.type = "text";
    btn.textContent = "🙈"; // monkey when visible
  } else {
    input.type = "password";
    btn.textContent = "👁️"; // eye when hidden
  }
}

/* CARD FLIP */
function flipCard() {
  const card = document.getElementById('auth-card');
  const arrow = document.getElementById('arrow-btn');
  card.classList.toggle('flipped');
  arrow.classList.toggle('rotated');
}

/* SHOW POPUP */
function showPopup(content) {
  const popup = document.getElementById('popup');
  const box = document.getElementById('popup-box');
  box.innerHTML = content;
  popup.style.display = 'flex';
}

/* CLOSE POPUP */
function closePopup() {
  const popup = document.getElementById('popup');
  popup.style.display = 'none';
  document.getElementById('popup-box').innerHTML = '';
}

/* PASSWORD TOGGLE */
function togglePasswordLogin() {
  const pwdInput = document.getElementById("loginPassword");
  const pwdToggle = document.getElementById("passwordToggle");

  if (pwdInput.type === "password") {
    pwdInput.type = "text";
    pwdToggle.textContent = "🙈"; // monkey when visible
  } else {
    pwdInput.type = "password";
    pwdToggle.textContent = "👁️"; // eye when hidden
  }
}

// Set default state to hidden password with eye icon
document.addEventListener("DOMContentLoaded", () => {
  const pwdToggle = document.getElementById("passwordToggle");
  if (pwdToggle) pwdToggle.textContent = "👁️"; // always start with eye
});

/* ROLE SIGNUP FLOW */
function signupRole(role) {
  if (role === 'student') studentSignup();
  else if (role === 'parent') parentSignup();
  else if (role === 'admin') adminSignup();
}

/* STUDENT SIGNUP */
function studentSignup() {
  showPopup(`
    <h2>Do you already have an RFID sticker?</h2>
    <button onclick="studentHasRFID()">Yes</button>
    <button onclick="studentNoRFID()">No</button>
  `);
}

function studentHasRFID() {
  showPopup(`
    <h2>Student Sign Up</h2>
    <input type="text" id="student-rfid" class="card-input" placeholder="Enter RFID No.">
    <div class="password-group">
      <input type="password" id="student-pass" class="card-input" placeholder="Create Password">
      <button type="button" class="password-toggle" onclick="togglePassword('student-pass', this)">👁️</button>
    </div>
    <button onclick="submitStudent()">Sign Up</button>
    <button onclick="backToRole()">Back</button>
    <div class="bubble-msg" id="student-bubble">Please fill all fields</div>
  `);
}

function studentNoRFID() {
  showPopup(`
    <h2>Please buy a RFID sticker from Marco Galosmo at room 10 - Ampere</h2>
    <a href="https://www.facebook.com/marco.galosmo.1" target="_blank">Contact: Messenger</a>
    <button onclick="backToRole()">OK</button>
  `);
}

function submitStudent() {
  const rfid = document.getElementById('student-rfid').value.trim();
  const pass = document.getElementById('student-pass').value.trim();
  const bubble = document.getElementById('student-bubble');
  if (!rfid || !pass) {
    bubble.style.transform = 'translateX(-50%) scale(1)';
    bubble.style.opacity = '1';
    setTimeout(() => {
      bubble.style.transform = 'translateX(-50%) scale(0)';
      bubble.style.opacity = '0';
    }, 2000);
    return;
  }
  showTerms("student");
}

/* PARENT SIGNUP */
function parentSignup() {
  showPopup(`
    <h2>Do you already have an RFID sticker?</h2>
    <button onclick="parentHasRFID()">Yes</button>
    <button onclick="parentNoRFID()">No</button>
  `);
}

function parentHasRFID() {
  showPopup(`
    <h2>Parent Sign Up</h2>
    <input type="text" id="parent-rfid" class="card-input" placeholder="Enter Student RFID No.">
    <input type="email" id="parent-email" class="card-input" placeholder="Enter Email">
    <div class="password-group">
      <input type="password" id="parent-pass" class="card-input" placeholder="Create Password">
      <button type="button" class="password-toggle" onclick="togglePassword('parent-pass', this)">👁️</button>
    </div>
    <button onclick="submitParent()">Sign Up</button>
    <button onclick="backToRole()">Back</button>
    <div class="bubble-msg" id="parent-bubble">Please fill all fields</div>
  `);
}

function parentNoRFID() {
  showPopup(`
    <h2>Please buy a RFID sticker from Marco Galosmo at room 10 - Ampere</h2>
    <a href="https://www.facebook.com/marco.galosmo.1" target="_blank">Contact: Messenger</a>
    <button onclick="backToRole()">OK</button>
  `);
}

function verifyParentEmail() {
  const email = document.getElementById('parent-email').value.trim();
  const rfid = document.getElementById('parent-rfid').value.trim();
  const pass = document.getElementById('parent-pass').value.trim();
  const bubble = document.getElementById('parent-bubble');
  if (!email || !rfid || !pass) {
    bubble.style.transform = 'translateX(-50%) scale(1)';
    bubble.style.opacity = '1';
    setTimeout(() => {
      bubble.style.transform = 'translateX(-50%) scale(0)';
      bubble.style.opacity = '0';
    }, 2000);
    return;
  }
  showPopup(`
    <h2>Email Verification</h2>
    <p>A 4-digit code was sent to ${email}</p>
    <div class="input-group">
      <input type="text" id="code1" maxlength="1">
      <input type="text" id="code2" maxlength="1">
      <input type="text" id="code3" maxlength="1">
      <input type="text" id="code4" maxlength="1">
    </div>
    <button onclick="submitParentCode()">Verify</button>
    <button onclick="backToRole()">Back</button>
  `);
}

function submitParentCode() {
  const c1 = document.getElementById('code1').value;
  const c2 = document.getElementById('code2').value;
  const c3 = document.getElementById('code3').value;
  const c4 = document.getElementById('code4').value;
  if (c1+c2+c3+c4 === "1234") {
    showTerms("parent");
  } else {
    alert("Incorrect code. Try 1234.");
  }
}

/* ADMIN */
function adminSignup() {
  showPopup(`<h2>Admin Signup</h2>
    <button onclick="teacherSignup()">Teacher</button>
    <button onclick="developerSignup()">Developer</button>
    <button onclick="backToRole()">Back</button>`);
}

/* TEACHER */
function teacherSignup() {
  showPopup(`<h2>Teacher Signup</h2>
    <input type="text" id="class-code" placeholder="Enter Class Code">
    <button onclick="submitTeacher()">Submit</button>
    <button onclick="backToRole()">Back</button>`);
}
function submitTeacher() {
  const code = document.getElementById('class-code').value.trim();
  if(!code) { alert('Fill class code'); return; }
  showConstruction();
}

/* DEVELOPER */
function developerSignup() {
  showPopup(`<h2>Developer Signup</h2>
    <input type="text" id="dev-pin" maxlength="4" placeholder="Enter 4-digit PIN">
    <button onclick="submitDev()">Submit</button>
    <button onclick="backToRole()">Back</button>`);
}
function submitDev() {
  const pin = document.getElementById('dev-pin').value.trim();
  if(pin === '0000') showConstruction();
  else alert('Incorrect PIN');
}

/* TERMS & CONDITIONS */
function showTerms(role) {
  showPopup(`
    <h2>Terms and Conditions</h2>
    <p style="max-height:200px;overflow-y:auto;text-align:left;">
      By creating an account, accessing. or using VALMATRACK, you agree to comply with these Terms and Conditions. If you do not agree with these terms, you may not use the app.<br><br>
      By using VALMATRACK, you consent to the collection, use, and storage of data such as student information, attendance records, and parent contact details. Your data will be used solely for school-related monitoring and communication purposes.<br><br>
      You agree to provide accurate information during registration. Sharing your account credentials with others is strictly prohibited. Parents must only register using verified contact information.<br><br>
      All attendance records generated by the RFID system are final and tampering with RFID stickers, data, or system access is strictly forbidden. Any misuse will result in account suspension and reporting to school authorities.<br><br>
      The app and its developers are not liable for connectivity issues, delays in notifications, or misuse of data caused by users. The school administration reserves the right to review and correct attendance logs if errors are detected.<br><br>
      Parents and students are responsible for checking real-time updates and ensuring they have stable internet access to receive notifications.<br><br>
      VALMATRACK reserves the right to update these Terms at any time. Continued use of the app means acceptance of updated terms.<br><br>
      Violation of these terms may result in immediate suspension or termination of your account, and further action may be taken by the school.<br><br>
      <strong>By clicking "I Accept", you confirm that you have read, understood, and agreed to these Terms and Conditions.</strong>
    </p>
    <button onclick="acceptTerms('${role}')">I Accept</button>
    <button onclick="backToRole()">Back</button>
  `);
}

function acceptTerms(role) {
  showConstruction();
}

/* CONSTRUCTION PAGE */
function showConstruction() {
  window.location.href = "construction.html";
}

/* BACK TO ROLE */
function backToRole() {
  closePopup();
  signupRole(''); // back to main signup role
}
