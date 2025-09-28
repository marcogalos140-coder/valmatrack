/* CARD FLIP */
function flipCard() {
  const card = document.getElementById('auth-card');
  const arrow = document.getElementById('arrow-btn');
  card.classList.toggle('flipped');
  arrow.classList.toggle('rotated');
}

/* SHOW/CLOSE POPUP */
function showPopup(content) {
  const popup = document.getElementById('popup');
  const box = document.getElementById('popup-box');
  box.innerHTML = content;
  popup.style.display = 'flex';
}
function closePopup() {
  const popup = document.getElementById('popup');
  popup.style.display = 'none';
  document.getElementById('popup-box').innerHTML = '';
}

/* ROLE SELECTION */
function signupRole(role){
  if(role==='student') studentSignup();
  else if(role==='parent') parentSignup();
  else if(role==='admin') adminSignup();
}

/* BACK BUTTON */
function backToRole(){
  closePopup();
  const card = document.getElementById('auth-card');
  if(!card.classList.contains('flipped')) card.classList.add('flipped');
}

/* LOGIN FORM */
document.getElementById('loginForm').addEventListener('submit', function(e){
  e.preventDefault();
  const email = this.querySelector('input[type="email"]').value.trim();
  const pass = this.querySelector('input[type="password"]').value.trim();
  const bubble = document.getElementById('login-bubble');
  if(!email || !pass){
    bubble.style.transform='translateX(-50%) scale(1)';
    bubble.style.opacity='1';
    setTimeout(()=>{bubble.style.transform='translateX(-50%) scale(0)';bubble.style.opacity='0';},2000);
    return;
  }
  alert('Login successful (placeholder)');
});

/* STUDENT SIGNUP */
function studentSignup(){
  showPopup(`
    <h2>Do you already have an RFID sticker?</h2>
    <button onclick="studentHasRFID()">Yes</button>
    <button onclick="studentNoRFID()">No</button>
  `);
}
function studentHasRFID(){
  showPopup(`
    <h2>Student Sign Up</h2>
    <input type="text" id="student-rfid" class="card-input" placeholder="Enter RFID No.">
    <input type="password" id="student-pass" class="card-input" placeholder="Enter Password">
    <button onclick="submitStudent()">Sign Up</button>
    <button onclick="backToRole()">Back</button>
    <div class="bubble-msg" id="student-bubble">Please fill all fields</div>
  `);
}
function studentNoRFID(){
  showPopup(`
    <h2>Please buy a RFID sticker from Marco Galosmo at room 10 - Ampere</h2>
    <a href="https://www.facebook.com/marco.galosmo.1" target="_blank">Contact: Messenger</a>
    <button onclick="backToRole()">OK</button>
  `);
}
function submitStudent(){
  const rfid = document.getElementById('student-rfid').value.trim();
  const pass = document.getElementById('student-pass').value.trim();
  const bubble = document.getElementById('student-bubble');
  if(!rfid||!pass){bubble.style.transform='translateX(-50%) scale(1)';bubble.style.opacity='1';
    setTimeout(()=>{bubble.style.transform='translateX(-50%) scale(0)';bubble.style.opacity='0';},2000); return;}
  showPopup(`<h2>You have successfully signed up as a student.</h2><button onclick="studentDashboard()">OK</button>`);
}
function studentDashboard(){closePopup(); alert('Redirecting to student part...');}

/* PARENT SIGNUP */
function parentSignup(){
  showPopup(`
    <h2>Do you already have an RFID sticker?</h2>
    <button onclick="parentHasRFID()">Yes</button>
    <button onclick="parentNoRFID()">No</button>
  `);
}
function parentHasRFID(){
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
function parentNoRFID(){
  showPopup(`
    <h2>Please buy a RFID sticker from Marco Galosmo at room 10 - Ampere</h2>
    <a href="https://www.facebook.com/marco.galosmo.1" target="_blank">Contact: Messenger</a>
    <button onclick="backToRole()">OK</button>
  `);
}
function submitParent(){
  const rfid=document.getElementById('parent-rfid').value.trim();
  const email=document.getElementById('parent-email').value.trim();
  const pass=document.getElementById('parent-pass').value.trim();
  const bubble=document.getElementById('parent-bubble');
  if(!rfid||!email||!pass){bubble.style.transform='translateX(-50%) scale(1)';bubble.style.opacity='1';
    setTimeout(()=>{bubble.style.transform='translateX(-50%) scale(0)';bubble.style.opacity='0';},2000);return;}
  alert('Email verification would be sent here (placeholder)');
  showPopup(`<h2>You have successfully signed up as a parent.</h2><button onclick="parentDashboard()">OK</button>`);
}
function parentDashboard(){closePopup(); alert('Redirecting to parent part...');}

/* ADMIN SIGNUP */
function adminSignup(){
  showPopup(`
    <h2>Admin Sign Up</h2>
    <button onclick="teacherSignup()">Teacher</button>
    <button onclick="developerSignup()">Developer</button>
    <button onclick="backToRole()">Back</button>
  `);
}
function teacherSignup(){
  showPopup(`
    <h2>Enter Class Code</h2>
    <input type="text" id="teacher-code" class="card-input" placeholder="Class Code">
    <button onclick="submitTeacher()">Submit</button>
    <button onclick="backToRole()">Back</button>
  `);
}
function submitTeacher(){
  const code=document.getElementById('teacher-code').value.trim();
  if(!code){alert('Please enter code'); return;}
  showPopup(`<h2>You have teacher access.</h2><button onclick="teacherDashboard()">OK</button>`);
}
function teacherDashboard(){closePopup(); alert('Redirecting to teacher part...');}

function developerSignup(){
  showPopup(`
    <h2>Enter Developer PIN</h2>
    <input type="text" id="dev-pin" class="card-input" placeholder="0000" maxlength="4">
    <button onclick="submitDeveloper()">Submit</button>
    <button onclick="backToRole()">Back</button>
  `);
}
function submitDeveloper(){
  const pin=document.getElementById('dev-pin').value.trim();
  if(pin!=="0000"){alert('Incorrect PIN'); return;}
  showPopup(`<h2>You have developer access bro.</h2><button onclick="devDashboard()">OK</button>`);
}
function devDashboard(){closePopup(); alert('Redirecting to developer part...');}
