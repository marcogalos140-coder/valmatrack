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
    <input type="password" id="student-pass" class="card-input" placeholder="Enter Password">
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
  showConstruction();
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
    <input type="password" id="parent-pass" class="card-input" placeholder="Enter Password">
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

function submitParent() {
  const rfid = document.getElementById('parent-rfid').value.trim();
  const email = document.getElementById('parent-email').value.trim();
  const pass = document.getElementById('parent-pass').value.trim();
  const bubble = document.getElementById('parent-bubble');
  if (!rfid || !email || !pass) {
    bubble.style.transform = 'translateX(-50%) scale(1)';
    bubble.style.opacity = '1';
    setTimeout(() => {
      bubble.style.transform = 'translateX(-50%) scale(0)';
      bubble.style.opacity = '0';
    }, 2000);
    return;
  }
  showConstruction();
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

/* BACK TO ROLE SELECTION */
function backToRole() { closePopup(); }

/* REDIRECT TO CONSTRUCTION PAGE */
function showConstruction() { window.location.href = "construction.html"; }
