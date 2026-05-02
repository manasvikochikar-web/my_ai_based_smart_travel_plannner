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

async function handleSignIn() {
  const email    = document.getElementById('email-in').value.trim();
  const password = document.getElementById('pw-in').value;

  if (!email || !password) { alert('Please fill in all fields.'); return; }

  try {
    const response = await fetch('/signin', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });

    const data = await response.json();

    if (response.ok) {
      alert('Signed in successfully! ' + (data.message || ''));
    } else {
      alert('Sign in failed: ' + (data.error || 'Unknown error'));
    }

  } catch (err) {
    alert('Network error: ' + err.message);
  }
}

async function handleSignUp() {
  const email    = document.getElementById('email-up').value.trim();
  const password = document.getElementById('pw-up').value;

  if (!email || !password) { alert('Please fill in all fields.'); return; }

  try {
    const response = await fetch('/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });

    const data = await response.json();

    if (response.ok) {
      alert('Account created! ' + (data.message || ''));
    } else {
      alert('Sign up failed: ' + (data.error || 'Unknown error'));
    }

  } catch (err) {
    alert('Network error: ' + err.message);
  }
}

function handleGoogle() {
  alert('Google OAuth flow — integrate your Google client ID here!');
}

// Auto-switch to Sign In tab if URL has ?signin

async function handleSignIn() {
  const email    = document.getElementById('email-in').value.trim();
  const password = document.getElementById('pw-in').value;

  if (!email || !password) { alert('Please fill in all fields.'); return; }

  try {
    const response = await fetch('http://127.0.0.1:5000/signinpython app.py', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });

    const text = await response.text();          // ← read as text first
    if (!text) { alert('Empty response from server.'); return; }

    const data = JSON.parse(text);               // ← then parse safely

    if (response.ok) {
      alert('Signed in! ' + (data.message || ''));
    } else {
      alert('Error: ' + (data.error || 'Unknown error'));
    }

  } catch (err) {
    alert('Network error: ' + err.message);
  }
}
