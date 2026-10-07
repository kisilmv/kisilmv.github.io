/* =========================================================================
   Налаштування Firebase — заповніть ОДИН раз (див. README.md, крок 1–4)
   Firebase Console → ⚙ Project settings → General → Your apps → Web app → SDK setup and configuration → Config
   Ці ключі не є секретом: захист забезпечують правила бази (database.rules.json).
   ========================================================================= */
window.FIREBASE_CONFIG = {
  apiKey: "AIzaSyASOCkkuxd-ikXRURnzKN8Fd6i1e2vZ13E",
  authDomain: "kisilmv-8c0e2.firebaseapp.com",
  databaseURL: "https://kisilmv-8c0e2-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "kisilmv-8c0e2",
  appId: "1:996211549761:web:39151cece8dd71dd4308c0"
};

/* Ваш Google-акаунт — лише він відкриває пульт викладача.
   Ту саму адресу вкажіть у database.rules.json (чотири рази: вузли teacher і rooms). */
window.TEACHER_EMAIL = "kisilmv@gmail.com";
