/* ==========================================================
   Sends every enquiry form on the site to WhatsApp.
   Any <form data-whatsapp> collects all its filled-in fields
   and opens WhatsApp with the message ready to send.
   ========================================================== */
(function () {
  var WA_NUMBER = '918007540773'; // business WhatsApp number (country code + number)

  // Friendly labels for the field names used on this website
  var LABELS = {
    name: 'Name',
    phone: 'Phone',
    email: 'Email',
    property_type: 'Service required',
    service: 'Service required',
    location: 'Location',
    budget: 'Budget',
    message: 'Message'
  };

  function labelFor(el) {
    if (LABELS[el.name]) return LABELS[el.name];
    if (el.id) {
      var l = document.querySelector('label[for="' + el.id + '"]');
      if (l) return l.textContent.trim();
    }
    return el.getAttribute('aria-label') || el.getAttribute('placeholder') || el.name;
  }

  function buildMessage(form) {
    var lines = ['Hello, I would like a free consultation.'];
    Array.prototype.forEach.call(form.elements, function (el) {
      if (!el.name || el.disabled) return;
      if (el.type === 'submit' || el.type === 'button' || el.type === 'reset' || el.type === 'hidden') return;
      if ((el.type === 'checkbox' || el.type === 'radio') && !el.checked) return;
      var value = (el.value || '').trim();
      if (!value) return; // skips empty optional fields and the "I am looking for" placeholder
      lines.push(labelFor(el) + ': ' + value);
    });
    lines.push('Page: ' + document.title.split('|')[0].trim());
    return lines.join('\n');
  }

  Array.prototype.forEach.call(document.querySelectorAll('form[data-whatsapp]'), function (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault(); // browser has already checked the required fields
      var url = 'https://wa.me/' + WA_NUMBER + '?text=' + encodeURIComponent(buildMessage(form));
      window.open(url, '_blank', 'noopener');
    });
  });
})();
