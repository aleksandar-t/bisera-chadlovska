const menuButton = document.querySelector('[data-menu-button]');
const navigation = document.querySelector('[data-navigation]');

if (menuButton && navigation) {
  const setMenuState = (isOpen) => {
    menuButton.setAttribute('aria-expanded', String(isOpen));
    navigation.dataset.open = String(isOpen);
    document.body.classList.toggle('menu-open', isOpen);
  };

  menuButton.addEventListener('click', () => {
    const isOpen = menuButton.getAttribute('aria-expanded') === 'true';
    setMenuState(!isOpen);
  });

  navigation.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => setMenuState(false));
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') setMenuState(false);
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth > 980) setMenuState(false);
  });
}

document.querySelectorAll('[data-current-year]').forEach((element) => {
  element.textContent = String(new Date().getFullYear());
});

document.querySelectorAll('[data-contact-form]').forEach((form) => {
  form.addEventListener('submit', (event) => {
    event.preventDefault();

    const data = new FormData(form);
    const language = form.dataset.language === 'mk' ? 'mk' : 'en';
    const name = String(data.get('name') || '').trim();
    const email = String(data.get('email') || '').trim();
    const organization = String(data.get('organization') || '').trim();
    const inquiry = String(data.get('inquiry') || '').trim();
    const message = String(data.get('message') || '').trim();

    const labels = language === 'mk'
      ? {
          subject: `Професионално барање од ${name}`,
          name: 'Име и презиме',
          email: 'Е-пошта',
          organization: 'Организација / институција',
          inquiry: 'Вид на ангажман',
          message: 'Порака',
          status: 'Вашето барање е подготвено во апликацијата за е-пошта.'
        }
      : {
          subject: `Professional enquiry from ${name}`,
          name: 'Name',
          email: 'Email',
          organization: 'Organisation / institution',
          inquiry: 'Type of enquiry',
          message: 'Message',
          status: 'Your enquiry is ready in your email application.'
        };

    const body = [
      `${labels.name}: ${name}`,
      `${labels.email}: ${email}`,
      `${labels.organization}: ${organization || '—'}`,
      `${labels.inquiry}: ${inquiry}`,
      '',
      `${labels.message}:`,
      message
    ].join('\n');

    const status = form.querySelector('[data-form-status]');
    if (status) status.textContent = labels.status;

    window.location.href = `mailto:biseracadlovska@yahoo.com?subject=${encodeURIComponent(labels.subject)}&body=${encodeURIComponent(body)}`;
  });
});
