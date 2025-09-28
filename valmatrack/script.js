const popup = document.getElementById('popup');
const popupBox = document.getElementById('popupBox');

function flipCard() {
  const card = document.getElementById('auth-card');
  const arrow = document.getElementById('arrow-btn');
  card.classList.toggle('flipped');
  arrow.classList.toggle('rotated');
}

function showPopup(contentHTML) {
  popupBox.innerHTML = contentHTML;
  popup.style.display = 'flex';
}

function closePopup() { popup.style.display = 'none'; }

function showBubble(msg, container=document.body) {
  let bubble = document.createElement('div');
  bubble.className = 'bubble-msg';
  bubble.innerText = msg;
  container.appendChild(bubble);
  setTimeout(() => bubble.remove(), 2000);
}

function addBackButton() {
  return `<button class="secondary" onclick="closePopup();">Back</button>`;
}

// -------------- LOGIN ----------------
function submitLogin(e){
  e.preventDefault();
  const email = document.getElementById('loginEmail').value;
  const password = document.getElementById('loginPassword').value;

  if(!email || !password){
    const loginForm = document.getElementById('loginForm');
    showBubble("Please fill all fields", loginForm);
    return false;
  }
  alert("Login successful (simulation)");
  return true;
}

// ----------------- STUDENT -----------------
function startStudentSignup() {
  showPopup(`<h2>Do you already have an RFID sticker?</h2>
  <button class="success" onclick="studentRFIDYes()">Yes</button>
  <button class="danger" onclick="studentRFIDNo()">No</button>`);
}

function studentRFIDYes() { closePopup(); showStudentForm(); }
function studentRFIDNo() {
  showPopup(`<h2>Please buy a RFID sticker</h2>
  <p>From Marco Galosmo at room 10 - Ampere<br>
  <a href="https://www.facebook.com/marco.galosmo.1" target="_blank">Contact</a></p>
  <button onclick="studentRFIDNoOk()">OK</button>`);
}
function studentRFIDNoOk() { closePopup(); const card = document.getElementById('auth-card'); if(!card.classList.contains('flipped')) card.classList.add('flipped'); }

function showStudentForm() {
  showPopup(`<h2>Student Sign Up</h2>
  <input class="card-input" type="text" id="studentRFID" placeholder="Enter RFID No.">
  <input class="card-input" type="password" id="studentPassword" placeholder="Password">
  ${addBackButton()}
  <button class="success" onclick="submitStudent()">Sign Up</button>`);
}

function submitStudent() {
  const rfid = document.getElementById('studentRFID').value;
  const password = document.getElementById('studentPassword').value;
  if(!rfid || !password){ showBubble("Please fill all fields", popupBox); return; }
  showPopup(`<h2>Success!</h2><p>You have successfully signed up as a student.</p>
  <button class="success" onclick="goToStudent()">OK</button>`);
}

function goToStudent() { closePopup(); alert("Redirecting to student dashboard..."); }
