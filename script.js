// CARD FLIP
function flipCard() {
  const card = document.getElementById('auth-card');
  const arrow = document.getElementById('arrow-btn');
  card.classList.toggle('flipped');
  arrow.classList.toggle('rotated');
}

// POPUP HANDLER
const popup = document.getElementById('popup');
const popupBox = document.getElementById('popup-box');

function showPopup(contentHTML) {
  popupBox.innerHTML = contentHTML;
  popup.style.display = 'flex';
}

function closePopup() {
  popup.style.display = 'none';
}

// ROLE SELECTION
function signupRole(role) {
  if(role === 'student') studentSignup();
  else if(role === 'parent') parentSignup();
  else if(role === 'admin') adminSignup();
}

// STUDENT SIGNUP FLOW
function studentSignup() {
  showPopup(`
    <h2>Do you already have an RFID sticker?</h2>
    <button onclick="studentHasRFID(true)">Yes</button>
    <button onclick="studentHasRFID(false)">No</button>
  `);
}

function studentHasRFID(has) {
  if(!has) {
    showPopup(`
      <h2>Please buy a RFID sticker from Marco Galosmo at room 10 - Ampere</h2>
      <p><a href="https://www.facebook.com/marco.galosmo.1" target="_blank">Contact</a></p>
      <button onclick="closePopup()">OK</button>
    `);
    return;
  }
  // show student signup inputs
  showPopup(`
    <h2>Student Sign Up</h2>
    <input type="text" id="student-rfid" placeholder="Enter RFID No.">
    <input type="password" id="student-pass" placeholder="Enter Password">
    <button onclick="submitStudent()">Sign Up</button>
    <button onclick="backToRole()">Back</button>
    <div class="bubble-msg" id="student-bubble">Please fill all fields</div>
  `);
}

function submitStudent() {
  const rfid = document.getElementById('student-rfid').value.trim();
  const pass = document.getElementById('student-pass').value.trim();
  const bubble = document.getElementById('student-bubble');

  if(!rfid || !pass) {
    bubble.style.transform = 'translateX(-50%) scale(1)';
    bubble.style.opacity = '1';
    setTimeout(()=>{ bubble.style.transform='translateX(-50%) scale(0)'; bubble.style.opacity='0'; },2000);
    return;
  }

  showPopup(`
    <h2>You have successfully signed up as a student.</h2>
    <button onclick="studentDashboard()">OK</button>
  `);
}

function studentDashboard() {
  closePopup();
  alert("Redirecting to student part of website...");
}

// PARENT SIGNUP FLOW
function parentSignup() {
  showPopup(`
    <h2>Do you already have an RFID sticker?</h2>
    <button onclick="parentHasRFID(true)">Yes</button>
    <button onclick="parentHasRFID(false)">No</button>
  `);
}

function parentHasRFID(has) {
  if(!has) { closePopup(); return; } // automatically back to role selection
  showPopup(`
    <h2>Parent Sign Up</h2>
    <input type="text" id="parent-rfid" placeholder="Enter Student RFID No.">
    <input type="email" id="parent-email" placeholder="Enter Email">
    <input type="password" id="parent-pass" placeholder="Enter Password">
    <button onclick="submitParent()">Sign Up</button>
    <button onclick="backToRole()">Back</button>
    <div class="bubble-msg" id="parent-bubble">Please fill all fields</div>
  `);
}

function submitParent() {
  const rfid = document.getElementById('parent-rfid').value.trim();
  const email = document.getElementById('parent-email').value.trim();
  const pass = document.getElementById('parent-pass').value.trim();
  const bubble = document.getElementById('parent-bubble');

  if(!rfid || !email || !pass) {
    bubble.style.transform = 'translateX(-50%) scale(1)';
    bubble.style.opacity = '1';
    setTimeout(()=>{ bubble.style.transform='translateX(-50%) scale(0)'; bubble.style.opacity='0'; },2000);
    return;
  }

  // generate 6 digit code
  const code = Math.floor(100000 + Math.random()*900000);
  showEmailVerification(code);
}

// EMAIL VERIFICATION
function showEmailVerification(code) {
  let timer = 100;
  showPopup(`
    <h2>Email Verification</h2>
    <p>Enter the 6-digit code sent to your email.</p>
    <div class="input-group">
      <input type="text" maxlength="1" id="code1">
      <input type="text" maxlength="1" id="code2">
      <input type="text" maxlength="1" id="code3">
      <input type="text" maxlength="1" id="code4">
      <input type="text" maxlength="1" id="code5">
      <input type="text" maxlength="1" id="code6">
    </div>
    <p id="timer">Time: 100s</p>
    <button onclick="verifyCode(${code})">Verify</button>
    <button onclick="resendCode()">Resend Code</button>
    <button onclick="backToRole()">Back</button>
  `);

  const timerEl = document.getElementById('timer');
  const interval = setInterval(()=>{
    timer--;
    timerEl.innerText = `Time: ${timer}s`;
    if(timer <= 0) { clearInterval(interval); alert('Code expired'); }
  },1000);
}

// placeholder verify/resend
function verifyCode(code) {
  const val = Array.from({length:6}, (_,i)=>document.getElementById('code'+(i+1)).value).join('');
  if(val==code.toString()) {
    showPopup(`<h2>You have successfully signed up as a parent.</h2><button onclick="parentDashboard()">OK</button>`);
  } else alert('Incorrect code');
}
function resendCode(){ alert('New code sent!'); }

// DASHBOARDS
function parentDashboard(){ closePopup(); alert("Redirecting to parent part of website..."); }

// ADMIN SIGNUP FLOW
function adminSignup(){
  showPopup(`
    <h2>Admin Signup</h2>
    <button onclick="teacherSignup()">Teacher</button>
    <button onclick="developerSignup()">Developer</button>
    <button onclick="backToRole()">Back</button>
  `);
}

// TEACHER
function teacherSignup(){
  showPopup(`
    <h2>Teacher Signup</h2>
    <input type="text" id="class-code" placeholder="Enter Class Code">
    <button onclick="submitTeacher()">Submit</button>
    <button onclick="backToRole()">Back</button>
  `);
}
function submitTeacher(){
  const code = document.getElementById('class-code').value.trim();
  if(!code) { alert('Fill class code'); return; }
  showPopup(`<h2>You have teacher access.</h2><button onclick="teacherDashboard()">OK</button>`);
}
function teacherDashboard(){ closePopup(); alert("Redirecting to teacher part..."); }

// DEVELOPER
function developerSignup(){
  showPopup(`
    <h2>Developer Signup</h2>
    <input type="text" id="dev-pin" maxlength="4" placeholder="Enter 4-digit PIN">
    <button onclick="submitDev()">Submit</button>
    <button onclick="backToRole()">Back</button>
  `);
}
function submitDev(){
  const pin = document.getElementById('dev-pin').value.trim();
  if(pin==='0000') showPopup(`<h2>You have developer access bro.</h2><button onclick="devDashboard()">OK</button>`);
  else alert('Incorrect PIN');
}
function devDashboard(){ closePopup(); alert("Redirecting to developer part..."); }

// BACK BUTTON
function backToRole(){ closePopup(); }
