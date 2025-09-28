/* CARD FLIP */
function flipCard(){
  const card=document.getElementById('auth-card');
  card.classList.toggle('flipped');
}

/* POPUP */
function showPopup(content){
  const popup=document.getElementById('popup');
  const box=document.getElementById('popup-box');
  box.innerHTML=content;
  popup.style.display='flex';
}
function closePopup(){document.getElementById('popup').style.display='none';document.getElementById('popup-box').innerHTML='';}

/* BUBBLE */
function showBubble(target,msg){
  let bubble=document.createElement('div');
  bubble.className='bubble-msg';
  bubble.textContent=msg;
  target.parentNode.appendChild(bubble);
  bubble.style.transform='translateX(-50%) scale(1)';
  setTimeout(()=>{bubble.remove();},2000);
}

/* BACK TO ROLE SELECTION */
function backToRole(){closePopup();document.getElementById('auth-card').classList.add('flipped');}

/* LOGIN */
document.getElementById('loginForm').addEventListener('submit',function(e){
  e.preventDefault();
  const email=this.querySelector('input[type="email"]').value.trim();
  const pass=this.querySelector('input[type="password"]').value.trim();
  if(!email||!pass){showBubble(this.querySelector('button'),'Please fill out all fields');return;}
  alert('Login successful (placeholder)');
});

/* ROLE SIGNUP */
function signupRole(role){
  if(role==='student') studentSignup();
  else if(role==='parent') parentSignup();
  else if(role==='admin') adminSignup();
}

/* STUDENT SIGNUP */
function studentSignup(){
  showPopup(`<h2>Do you already have an RFID sticker?</h2>
    <button onclick="studentHasRFID()">Yes</button>
    <button onclick="studentNoRFID()">No</button>`);
}
function studentHasRFID(){
  showPopup(`<h2>Student Sign Up</h2>
    <input type="text" id="student-rfid" class="card-input" placeholder="Enter RFID No.">
    <input type="password" id="student-pass" class="card-input" placeholder="Enter Password">
    <button onclick="submitStudent(this)">Sign Up</button>
    <button onclick="backToRole()">Back</button>`);
}
function studentNoRFID(){
  showPopup(`<h2>Please buy a RFID sticker from Marco Galosmo at room 10 - Ampere</h2>
    <a href="https://www.facebook.com/marco.galosmo.1" target="_blank">Contact</a>
    <button onclick="backToRole()">OK</button>`);
}
function submitStudent(btn){
  const rfid=document.getElementById('student-rfid').value.trim();
  const pass=document.getElementById('student-pass').value.trim();
  if(!rfid||!pass){showBubble(btn,'Please fill out all fields');return;}
  showPopup(`<h2>You have successfully signed up as a student.</h2>
    <button onclick="closePopup()">OK</button>`);
}

/* PARENT SIGNUP */
let parentVerificationCode='';
function parentSignup(){
  showPopup(`<h2>Do you already have an RFID sticker?</h2>
    <button onclick="parentHasRFID()">Yes</button>
    <button onclick="parentNoRFID()">No</button>`);
}
function parentHasRFID(){
  showPopup(`<h2>Parent Sign Up</h2>
    <input type="text" id="parent-rfid" class="card-input" placeholder="Enter Student RFID No.">
    <input type="email" id="parent-email" class="card-input" placeholder="Enter Email">
    <input type="password" id="parent-pass" class="card-input" placeholder="Enter Password">
    <button onclick="submitParent(this)">Sign Up</button>
    <button onclick="backToRole()">Back</button>`);
}
function parentNoRFID(){backToRole();}
function submitParent(btn){
  const rfid=document.getElementById('parent-rfid').value.trim();
  const email=document.getElementById('parent-email').value.trim();
  const pass=document.getElementById('parent-pass').value.trim();
  if(!rfid||!email||!pass){showBubble(btn,'Please fill out all fields');return;}
  parentVerificationCode=Math.floor(100000+Math.random()*900000).toString();
  console.log("Verification Code (for testing):",parentVerificationCode);
  showParentVerification(email);
}
function showParentVerification(email){
  let timer=100;let interval;
  const content=`<h2>Email Verification</h2><p>Enter the 6-digit code sent to ${email}</p>
  <div class="input-group"><input type="text" maxlength="1" class="code-digit" id="digit0"><input type="text" maxlength="1" class="code-digit" id="digit1"><input type="text" maxlength="1" class="code-digit" id="digit2"><input type="text" maxlength="1" class="code-digit" id="digit3"><input type="text" maxlength="1" class="code-digit" id="digit4"><input type="text" maxlength="1" class="code-digit" id="digit5"></div>
  <p id="timer">Time Left: 100s</p><button onclick="verifyParentCode()">Verify</button><button onclick="resendParentCode('${email}')">Resend Code</button><button onclick="backToRole()">Cancel</button>`;
  showPopup(content);
  interval=setInterval(()=>{timer--;document.getElementById('timer').innerText=`Time Left: ${timer}s`;if(timer<=0){clearInterval(interval);parentVerificationCode='';alert('Code expired! Please resend code.');}},1000);
}
function verifyParentCode(){
  let inputCode='';
  for(let i=0;i<6;i++){
    const digit=document.getElementById(`digit${i}`).value;
    inputCode+=digit;
  }
  if(inputCode===parentVerificationCode){showPopup(`<h2>You have successfully signed up as a parent.</h2><button onclick="closePopup()">OK</button>`);}
  else{alert('Incorrect code. Try again.');}
}
function resendParentCode(email){parentVerificationCode=Math.floor(100000+Math.random()*900000).toString();console.log("Resent Code:",parentVerificationCode);showParentVerification(email);}

/* ADMIN SIGNUP */
function adminSignup(){
  showPopup(`<h2>Admin Sign Up</h2>
    <button onclick="teacherSignup()">Teacher</button>
    <button onclick="developerSignup()">Developer</button>
    <button onclick="backToRole()">Back</button>`);
}
function teacherSignup(){
  showPopup(`<h2>Enter Class Code</h2>
    <input type="text" id="teacher-code" class="card-input" placeholder="Class Code">
    <button onclick="submitTeacher(this)">Submit</button>
    <button onclick="backToRole()">Back</button>`);
}
function submitTeacher(btn){
  const code=document.getElementById('teacher-code').value.trim();
  if(!code){showBubble(btn,'Please enter code');return;}
  showPopup(`<h2>You have teacher access.</h2><button onclick="closePopup()">OK</button>`);
}
function developerSignup(){
  showPopup(`<h2>Enter Developer PIN</h2>
    <input type="text" id="dev-pin" class="card-input" placeholder="0000" maxlength="4">
    <button onclick="submitDeveloper(this)">Submit</button>
    <button onclick="backToRole()">Back</button>`);
}
function submitDeveloper(btn){
  const pin=document.getElementById('dev-pin').value.trim();
  if(pin!=='0000'){showBubble(btn,'Incorrect PIN');return;}
  showPopup(`<h2>You have developer access bro.</h2><button onclick="closePopup()">OK</button>`);
}
/* CARD FLIP */
function flipCard(){
  const card=document.getElementById('auth-card');
  card.classList.toggle('flipped');
}

/* POPUP */
function showPopup(content){
  const popup=document.getElementById('popup');
  const box=document.getElementById('popup-box');
  box.innerHTML=content;
  popup.style.display='flex';
}
function closePopup(){document.getElementById('popup').style.display='none';document.getElementById('popup-box').innerHTML='';}

/* BUBBLE */
function showBubble(target,msg){
  let bubble=document.createElement('div');
  bubble.className='bubble-msg';
  bubble.textContent=msg;
  target.parentNode.appendChild(bubble);
  bubble.style.transform='translateX(-50%) scale(1)';
  setTimeout(()=>{bubble.remove();},2000);
}

/* BACK TO ROLE SELECTION */
function backToRole(){closePopup();document.getElementById('auth-card').classList.add('flipped');}

/* LOGIN */
document.getElementById('loginForm').addEventListener('submit',function(e){
  e.preventDefault();
  const email=this.querySelector('input[type="email"]').value.trim();
  const pass=this.querySelector('input[type="password"]').value.trim();
  if(!email||!pass){showBubble(this.querySelector('button'),'Please fill out all fields');return;}
  alert('Login successful (placeholder)');
});

/* ROLE SIGNUP */
function signupRole(role){
  if(role==='student') studentSignup();
  else if(role==='parent') parentSignup();
  else if(role==='admin') adminSignup();
}

/* STUDENT SIGNUP */
function studentSignup(){
  showPopup(`<h2>Do you already have an RFID sticker?</h2>
    <button onclick="studentHasRFID()">Yes</button>
    <button onclick="studentNoRFID()">No</button>`);
}
function studentHasRFID(){
  showPopup(`<h2>Student Sign Up</h2>
    <input type="text" id="student-rfid" class="card-input" placeholder="Enter RFID No.">
    <input type="password" id="student-pass" class="card-input" placeholder="Enter Password">
    <button onclick="submitStudent(this)">Sign Up</button>
    <button onclick="backToRole()">Back</button>`);
}
function studentNoRFID(){
  showPopup(`<h2>Please buy a RFID sticker from Marco Galosmo at room 10 - Ampere</h2>
    <a href="https://www.facebook.com/marco.galosmo.1" target="_blank">Contact</a>
    <button onclick="backToRole()">OK</button>`);
}
function submitStudent(btn){
  const rfid=document.getElementById('student-rfid').value.trim();
  const pass=document.getElementById('student-pass').value.trim();
  if(!rfid||!pass){showBubble(btn,'Please fill out all fields');return;}
  showPopup(`<h2>You have successfully signed up as a student.</h2>
    <button onclick="closePopup()">OK</button>`);
}

/* PARENT SIGNUP */
let parentVerificationCode='';
function parentSignup(){
  showPopup(`<h2>Do you already have an RFID sticker?</h2>
    <button onclick="parentHasRFID()">Yes</button>
    <button onclick="parentNoRFID()">No</button>`);
}
function parentHasRFID(){
  showPopup(`<h2>Parent Sign Up</h2>
    <input type="text" id="parent-rfid" class="card-input" placeholder="Enter Student RFID No.">
    <input type="email" id="parent-email" class="card-input" placeholder="Enter Email">
    <input type="password" id="parent-pass" class="card-input" placeholder="Enter Password">
    <button onclick="submitParent(this)">Sign Up</button>
    <button onclick="backToRole()">Back</button>`);
}
function parentNoRFID(){backToRole();}
function submitParent(btn){
  const rfid=document.getElementById('parent-rfid').value.trim();
  const email=document.getElementById('parent-email').value.trim();
  const pass=document.getElementById('parent-pass').value.trim();
  if(!rfid||!email||!pass){showBubble(btn,'Please fill out all fields');return;}
  parentVerificationCode=Math.floor(100000+Math.random()*900000).toString();
  console.log("Verification Code (for testing):",parentVerificationCode);
  showParentVerification(email);
}
function showParentVerification(email){
  let timer=100;let interval;
  const content=`<h2>Email Verification</h2><p>Enter the 6-digit code sent to ${email}</p>
  <div class="input-group"><input type="text" maxlength="1" class="code-digit" id="digit0"><input type="text" maxlength="1" class="code-digit" id="digit1"><input type="text" maxlength="1" class="code-digit" id="digit2"><input type="text" maxlength="1" class="code-digit" id="digit3"><input type="text" maxlength="1" class="code-digit" id="digit4"><input type="text" maxlength="1" class="code-digit" id="digit5"></div>
  <p id="timer">Time Left: 100s</p><button onclick="verifyParentCode()">Verify</button><button onclick="resendParentCode('${email}')">Resend Code</button><button onclick="backToRole()">Cancel</button>`;
  showPopup(content);
  interval=setInterval(()=>{timer--;document.getElementById('timer').innerText=`Time Left: ${timer}s`;if(timer<=0){clearInterval(interval);parentVerificationCode='';alert('Code expired! Please resend code.');}},1000);
}
function verifyParentCode(){
  let inputCode='';
  for(let i=0;i<6;i++){
    const digit=document.getElementById(`digit${i}`).value;
    inputCode+=digit;
  }
  if(inputCode===parentVerificationCode){showPopup(`<h2>You have successfully signed up as a parent.</h2><button onclick="closePopup()">OK</button>`);}
  else{alert('Incorrect code. Try again.');}
}
function resendParentCode(email){parentVerificationCode=Math.floor(100000+Math.random()*900000).toString();console.log("Resent Code:",parentVerificationCode);showParentVerification(email);}

/* ADMIN SIGNUP */
function adminSignup(){
  showPopup(`<h2>Admin Sign Up</h2>
    <button onclick="teacherSignup()">Teacher</button>
    <button onclick="developerSignup()">Developer</button>
    <button onclick="backToRole()">Back</button>`);
}
function teacherSignup(){
  showPopup(`<h2>Enter Class Code</h2>
    <input type="text" id="teacher-code" class="card-input" placeholder="Class Code">
    <button onclick="submitTeacher(this)">Submit</button>
    <button onclick="backToRole()">Back</button>`);
}
function submitTeacher(btn){
  const code=document.getElementById('teacher-code').value.trim();
  if(!code){showBubble(btn,'Please enter code');return;}
  showPopup(`<h2>You have teacher access.</h2><button onclick="closePopup()">OK</button>`);
}
function developerSignup(){
  showPopup(`<h2>Enter Developer PIN</h2>
    <input type="text" id="dev-pin" class="card-input" placeholder="0000" maxlength="4">
    <button onclick="submitDeveloper(this)">Submit</button>
    <button onclick="backToRole()">Back</button>`);
}
function submitDeveloper(btn){
  const pin=document.getElementById('dev-pin').value.trim();
  if(pin!=='0000'){showBubble(btn,'Incorrect PIN');return;}
  showPopup(`<h2>You have developer access bro.</h2><button onclick="closePopup()">OK</button>`);
}
/* CARD FLIP */
function flipCard(){
  const card=document.getElementById('auth-card');
  card.classList.toggle('flipped');
}

/* POPUP */
function showPopup(content){
  const popup=document.getElementById('popup');
  const box=document.getElementById('popup-box');
  box.innerHTML=content;
  popup.style.display='flex';
}
function closePopup(){document.getElementById('popup').style.display='none';document.getElementById('popup-box').innerHTML='';}

/* BUBBLE */
function showBubble(target,msg){
  let bubble=document.createElement('div');
  bubble.className='bubble-msg';
  bubble.textContent=msg;
  target.parentNode.appendChild(bubble);
  bubble.style.transform='translateX(-50%) scale(1)';
  setTimeout(()=>{bubble.remove();},2000);
}

/* BACK TO ROLE SELECTION */
function backToRole(){closePopup();document.getElementById('auth-card').classList.add('flipped');}

/* LOGIN */
document.getElementById('loginForm').addEventListener('submit',function(e){
  e.preventDefault();
  const email=this.querySelector('input[type="email"]').value.trim();
  const pass=this.querySelector('input[type="password"]').value.trim();
  if(!email||!pass){showBubble(this.querySelector('button'),'Please fill out all fields');return;}
  alert('Login successful (placeholder)');
});

/* ROLE SIGNUP */
function signupRole(role){
  if(role==='student') studentSignup();
  else if(role==='parent') parentSignup();
  else if(role==='admin') adminSignup();
}

/* STUDENT SIGNUP */
function studentSignup(){
  showPopup(`<h2>Do you already have an RFID sticker?</h2>
    <button onclick="studentHasRFID()">Yes</button>
    <button onclick="studentNoRFID()">No</button>`);
}
function studentHasRFID(){
  showPopup(`<h2>Student Sign Up</h2>
    <input type="text" id="student-rfid" class="card-input" placeholder="Enter RFID No.">
    <input type="password" id="student-pass" class="card-input" placeholder="Enter Password">
    <button onclick="submitStudent(this)">Sign Up</button>
    <button onclick="backToRole()">Back</button>`);
}
function studentNoRFID(){
  showPopup(`<h2>Please buy a RFID sticker from Marco Galosmo at room 10 - Ampere</h2>
    <a href="https://www.facebook.com/marco.galosmo.1" target="_blank">Contact</a>
    <button onclick="backToRole()">OK</button>`);
}
function submitStudent(btn){
  const rfid=document.getElementById('student-rfid').value.trim();
  const pass=document.getElementById('student-pass').value.trim();
  if(!rfid||!pass){showBubble(btn,'Please fill out all fields');return;}
  showPopup(`<h2>You have successfully signed up as a student.</h2>
    <button onclick="closePopup()">OK</button>`);
}

/* PARENT SIGNUP */
let parentVerificationCode='';
function parentSignup(){
  showPopup(`<h2>Do you already have an RFID sticker?</h2>
    <button onclick="parentHasRFID()">Yes</button>
    <button onclick="parentNoRFID()">No</button>`);
}
function parentHasRFID(){
  showPopup(`<h2>Parent Sign Up</h2>
    <input type="text" id="parent-rfid" class="card-input" placeholder="Enter Student RFID No.">
    <input type="email" id="parent-email" class="card-input" placeholder="Enter Email">
    <input type="password" id="parent-pass" class="card-input" placeholder="Enter Password">
    <button onclick="submitParent(this)">Sign Up</button>
    <button onclick="backToRole()">Back</button>`);
}
function parentNoRFID(){backToRole();}
function submitParent(btn){
  const rfid=document.getElementById('parent-rfid').value.trim();
  const email=document.getElementById('parent-email').value.trim();
  const pass=document.getElementById('parent-pass').value.trim();
  if(!rfid||!email||!pass){showBubble(btn,'Please fill out all fields');return;}
  parentVerificationCode=Math.floor(100000+Math.random()*900000).toString();
  console.log("Verification Code (for testing):",parentVerificationCode);
  showParentVerification(email);
}
function showParentVerification(email){
  let timer=100;let interval;
  const content=`<h2>Email Verification</h2><p>Enter the 6-digit code sent to ${email}</p>
  <div class="input-group"><input type="text" maxlength="1" class="code-digit" id="digit0"><input type="text" maxlength="1" class="code-digit" id="digit1"><input type="text" maxlength="1" class="code-digit" id="digit2"><input type="text" maxlength="1" class="code-digit" id="digit3"><input type="text" maxlength="1" class="code-digit" id="digit4"><input type="text" maxlength="1" class="code-digit" id="digit5"></div>
  <p id="timer">Time Left: 100s</p><button onclick="verifyParentCode()">Verify</button><button onclick="resendParentCode('${email}')">Resend Code</button><button onclick="backToRole()">Cancel</button>`;
  showPopup(content);
  interval=setInterval(()=>{timer--;document.getElementById('timer').innerText=`Time Left: ${timer}s`;if(timer<=0){clearInterval(interval);parentVerificationCode='';alert('Code expired! Please resend code.');}},1000);
}
function verifyParentCode(){
  let inputCode='';
  for(let i=0;i<6;i++){
    const digit=document.getElementById(`digit${i}`).value;
    inputCode+=digit;
  }
  if(inputCode===parentVerificationCode){showPopup(`<h2>You have successfully signed up as a parent.</h2><button onclick="closePopup()">OK</button>`);}
  else{alert('Incorrect code. Try again.');}
}
function resendParentCode(email){parentVerificationCode=Math.floor(100000+Math.random()*900000).toString();console.log("Resent Code:",parentVerificationCode);showParentVerification(email);}

/* ADMIN SIGNUP */
function adminSignup(){
  showPopup(`<h2>Admin Sign Up</h2>
    <button onclick="teacherSignup()">Teacher</button>
    <button onclick="developerSignup()">Developer</button>
    <button onclick="backToRole()">Back</button>`);
}
function teacherSignup(){
  showPopup(`<h2>Enter Class Code</h2>
    <input type="text" id="teacher-code" class="card-input" placeholder="Class Code">
    <button onclick="submitTeacher(this)">Submit</button>
    <button onclick="backToRole()">Back</button>`);
}
function submitTeacher(btn){
  const code=document.getElementById('teacher-code').value.trim();
  if(!code){showBubble(btn,'Please enter code');return;}
  showPopup(`<h2>You have teacher access.</h2><button onclick="closePopup()">OK</button>`);
}
function developerSignup(){
  showPopup(`<h2>Enter Developer PIN</h2>
    <input type="text" id="dev-pin" class="card-input" placeholder="0000" maxlength="4">
    <button onclick="submitDeveloper(this)">Submit</button>
    <button onclick="backToRole()">Back</button>`);
}
function submitDeveloper(btn){
  const pin=document.getElementById('dev-pin').value.trim();
  if(pin!=='0000'){showBubble(btn,'Incorrect PIN');return;}
  showPopup(`<h2>You have developer access bro.</h2><button onclick="closePopup()">OK</button>`);
}
