 function switchTab(tab) {
    document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.panel').forEach(p => p.classList.remove('active'));
    document.getElementById('tab-' + tab).classList.add('active');
    document.getElementById('panel-' + tab).classList.add('active');
  }

  function toggle(id, btn) {
    const inp = document.getElementById(id);
    if (inp.type === 'password') { inp.type = 'text';     btn.textContent = 'Hide'; }
    else                         { inp.type = 'password'; btn.textContent = 'Show'; }
  }

  function handleSignIn() {
    const e = document.getElementById('email-in').value.trim();
    const p = document.getElementById('pw-in').value;
    if (!e || !p) { alert('Please fill in all fields.'); return; }
    alert('Signing in as ' + e + ' …\n(Connect to your backend here!)');
  }

  function handleSignUp() {
    alert('Account creation flow — connect to your backend here!');
  }

  function handleGoogle() {
    alert('Google OAuth flow — integrate your Google client ID here!');
  }
