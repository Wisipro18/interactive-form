const form = document.getElementById("signupForm");
const name = document.getElementById("name");
const email = document.getElementById("email");
const phone = document.getElementById("phone");
const password = document.getElementById("password");
const confirmPassword = document.getElementById("confirmPassword");

const nameError = document.getElementById("nameError");
const emailError = document.getElementById("emailError");
const phoneError = document.getElementById("phoneError");
const passwordError = document.getElementById("passwordError");
const confirmPasswordError = document.getElementById("confirmPasswordError");

const strengthBar = document.getElementById("strengthBar");
const progressBar = document.getElementById("progressBar");
const submitBtn = document.getElementById("submitBtn");

// HELPER FUNCTION: update progress bar
function updateProgress(){
  let filled = 0;
  if(name.value.trim()) filled++;
  if(email.value.trim()) filled++;
  if(phone.value.trim()) filled++;
  if(password.value.trim()) filled++;
  if(confirmPassword.value.trim()) filled++;
  let percent = (filled/5)*100; // total 5 fields now
  progressBar.style.width = percent + "%";
}

// NAME VALIDATION
name.addEventListener("blur", ()=>{
  if(!name.value.trim()) nameError.textContent = "Don't forget your name 🙂";
  else nameError.textContent="";
  updateProgress();
});
name.addEventListener("input", updateProgress);

// EMAIL VALIDATION
email.addEventListener("blur", ()=>{
  const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if(!pattern.test(email.value)) emailError.textContent = "Hmm… that email doesn't look right.";
  else emailError.textContent="";
  updateProgress();
});
email.addEventListener("input", updateProgress);

// PHONE AUTO-FORMAT + VALIDATION
phone.addEventListener("input", ()=>{
  // Remove non-digits
  let nums = phone.value.replace(/\D/g,'');
  // Format: 0801 234 5678
  if(nums.length>3 && nums.length<=7) nums = nums.slice(0,4)+' '+nums.slice(4);
  if(nums.length>7) nums = nums.slice(0,4)+' '+nums.slice(4,7)+' '+nums.slice(7,11);
  phone.value = nums;
  // Validation
  if(nums.replace(/\s/g,'').length<11) phoneError.textContent="Phone must be 11 digits";
  else phoneError.textContent="";
  updateProgress();
});

// PASSWORD STRENGTH
password.addEventListener("input", ()=>{
  let strength=0;
  let val=password.value;
  if(val.length>=8) strength++;
  if(/[A-Z]/.test(val)) strength++;
  if(/[0-9]/.test(val)) strength++;
  if(/[^A-Za-z0-9]/.test(val)) strength++;
  strengthBar.style.width = (strength*25)+"%";
  if(strength<=1) strengthBar.style.background="red";
  else if(strength==2) strengthBar.style.background="orange";
  else if(strength==3) strengthBar.style.background="yellow";
  else strengthBar.style.background="green";
  updateProgress();
});

// CONFIRM PASSWORD VALIDATION + SMART BORDER
confirmPassword.addEventListener("input", ()=>{
  if(confirmPassword.value === password.value && confirmPassword.value !== ""){
    confirmPassword.style.borderColor = "green";
    confirmPasswordError.textContent = "";
  } else {
    confirmPassword.style.borderColor = "red";
    confirmPasswordError.textContent = "Passwords do not match 😅";
  }
  updateProgress();
});

// FORM SUBMIT
form.addEventListener("submit", (e)=>{
  e.preventDefault();

  // Check all fields + password match
  if(
    name.value && email.value && phone.value && password.value && confirmPassword.value &&
    password.value === confirmPassword.value
  ){
    // Smart submit button animation
    submitBtn.classList.add("loading");
    setTimeout(()=>{
      submitBtn.classList.remove("loading");
      document.getElementById("successMessage").textContent = `🎉 Welcome, ${name.value}! Your account is ready.`;
      form.reset();
      strengthBar.style.width="0%";
      progressBar.style.width="0%";
      confirmPassword.style.borderColor = "#ccc"; // reset border
    },1500); // simulate loading
  } else {
    // Show confirm password error if mismatch
    if(password.value !== confirmPassword.value){
      confirmPasswordError.textContent = "Passwords do not match 😅";
      confirmPassword.style.borderColor = "red";
    }
  }
});